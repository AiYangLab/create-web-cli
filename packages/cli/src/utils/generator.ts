import fs from 'fs-extra';
import path from 'path';
import { Listr } from 'listr2';
import { 
  ProjectConfig, 
  templateExists, 
  getTemplatePath,
  generateEnvFiles,
  generateGitignore,
  generateEslintConfig,
  generatePrettierConfig,
  generateStylelintConfig,
  generateCommitlintConfig,
  generateHuskyConfig,
  generateLintStagedConfig,
  getProjectDependencies,
  generatePackageJson
} from '@create-web-cli/core';
import { execa } from 'execa';

/**
 * Vue版本的lint-staged配置
 */
function generateVueLintStagedConfig(): Record<string, string> {
  return {
    'lint-staged.config.cjs': `module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"]
};`
  };
}

/**
 * Vue版本的commitlint配置
 */
function generateVueCommitlintConfig(): Record<string, string> {
  return {
    'commitlint.config.cjs': `// @see: https://cz-git.qbenben.com/zh/guide
const fs = require("fs");
const path = require("path");

const scopes = fs
  .readdirSync(path.resolve(__dirname, "src"), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name.replace(/s$/, ""));

/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [commit => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "wip",
        "workflow",
        "types",
        "release"
      ]
    ]
  },
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: "Denote the SCOPE of this change (optional):",
      customScope: "Denote the SCOPE of this change:",
      subject: "Write a SHORT, IMPERATIVE tense description of the change:\\n",
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\\n',
      footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
      customFooterPrefixs: "Input ISSUES prefix:",
      footer: "List any ISSUES by this change. E.g.: #31, #34:\\n",
      confirmCommit: "Are you sure you want to proceed with the commit above?"
    },
    types: [
      {
        value: "feat",
        name: "feat:     🚀  A new feature",
        emoji: "🚀"
      },
      {
        value: "fix",
        name: "fix:      🧩  A bug fix",
        emoji: "🧩"
      },
      {
        value: "docs",
        name: "docs:     📚  Documentation only changes",
        emoji: "📚"
      },
      {
        value: "style",
        name: "style:    🎨  Changes that do not affect the meaning of the code",
        emoji: "🎨"
      },
      {
        value: "refactor",
        name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature",
        emoji: "♻️"
      },
      {
        value: "perf",
        name: "perf:     ⚡️  A code change that improves performance",
        emoji: "⚡️"
      },
      {
        value: "test",
        name: "test:     ✅  Adding missing tests or correcting existing tests",
        emoji: "✅"
      },
      {
        value: "build",
        name: "build:    📦️   Changes that affect the build system or external dependencies",
        emoji: "📦️"
      },
      {
        value: "ci",
        name: "ci:       🎡  Changes to our CI configuration files and scripts",
        emoji: "🎡"
      },
      {
        value: "chore",
        name: "chore:    🔨  Other changes that don't modify src or test files",
        emoji: "🔨"
      },
      {
        value: "revert",
        name: "revert:   ⏪️  Reverts a previous commit",
        emoji: "⏪️"
      },
      {
        value: "wip",
        name: "wip:      🕔  work in process",
        emoji: "🕔"
      },
      {
        value: "workflow",
        name: "workflow: 📋  workflow improvements",
        emoji: "📋"
      },
      {
        value: "type",
        name: "type:     🔰  type definition file changes",
        emoji: "🔰"
      }
    ],
    useEmoji: true,
    scopes: [...scopes],
    customScopesAlign: "bottom",
    emptyScopesAlias: "empty",
    customScopesAlias: "custom",
    allowBreakingChanges: ["feat", "fix"]
  }
};`
  };
}

/**
 * 根据配置生成项目
 */
export async function generate(config: ProjectConfig): Promise<void> {
  const { name, template, typescript, buildTool, ui, styling, linting, git, packageManager } = config;
  
  // 项目目标目录
  const destDir = path.resolve(process.cwd(), name);
  
  // 检查目录是否已存在
  if (fs.existsSync(destDir)) {
    throw new Error(`目录 ${name} 已存在`);
  }
  
  // 检查模板是否存在
  if (!templateExists(template, 'basic')) {
    throw new Error(`模板 ${template}/basic 不存在`);
  }
  
  // 创建项目目录
  fs.mkdirSync(destDir, { recursive: true });
  
  // 定义任务
  const tasks = new Listr([
    {
      title: '复制模板文件',
      task: async () => {
        // 获取模板路径
        const templateDir = getTemplatePath(template, typescript ? 'ts' : 'basic');
        
        // 如果TypeScript模板不存在，使用基础模板
        const sourceDir = fs.existsSync(templateDir) ? templateDir : getTemplatePath(template, 'basic');
        
        // 复制模板文件
        await fs.copy(sourceDir, destDir, {
          filter: (src) => {
            const basename = path.basename(src);
            return basename !== 'template.json';
          }
        });
      }
    },
    {
      title: '创建 package.json',
      task: async () => {
        // 获取依赖
        const { dependencies, devDependencies } = getProjectDependencies({
          framework: template,
          typescript,
          buildTool,
          ui,
          styling,
          linting,
          git
        });
        
        // 生成 package.json
        const packageJsonContent = generatePackageJson({
          name,
          dependencies,
          devDependencies,
          framework: template,
          buildTool,
          typescript
        });
        
        // 写入 package.json
        await fs.writeFile(path.join(destDir, 'package.json'), packageJsonContent);
      }
    },
    {
      title: '创建环境变量文件',
      task: async () => {
        const envFiles = generateEnvFiles({ name });
        
        for (const [filename, content] of Object.entries(envFiles)) {
          await fs.writeFile(path.join(destDir, filename), content);
        }
      }
    },
    {
      title: '创建 .gitignore',
      task: async () => {
        const gitignoreContent = generateGitignore({ typescript, framework: template });
        await fs.writeFile(path.join(destDir, '.gitignore'), gitignoreContent);
      }
    },
    {
      title: '配置 ESLint',
      enabled: () => linting.eslint,
      task: async () => {
        const eslintConfig = generateEslintConfig({ typescript, framework: template });
        
        for (const [filename, content] of Object.entries(eslintConfig)) {
          await fs.writeFile(path.join(destDir, filename), content);
        }
      }
    },
    {
      title: '配置 Prettier',
      enabled: () => linting.prettier,
      task: async () => {
        const prettierConfig = generatePrettierConfig();
        
        for (const [filename, content] of Object.entries(prettierConfig)) {
          await fs.writeFile(path.join(destDir, filename), content);
        }
      }
    },
    {
      title: '配置 Stylelint',
      enabled: () => linting.stylelint === true,
      task: async () => {
        const stylelintConfig = generateStylelintConfig();
        
        for (const [filename, content] of Object.entries(stylelintConfig)) {
          await fs.writeFile(path.join(destDir, filename), content);
        }
      }
    },
    {
      title: '配置 Git',
      task: async () => {
        // 初始化 git 仓库
        await execa('git', ['init'], { cwd: destDir });
        
        if (git.husky) {
          // 根据框架选择使用不同的commitlint配置
          let commitlintConfig;
          if (template === 'vue') {
            commitlintConfig = generateVueCommitlintConfig();
          } else {
            commitlintConfig = generateCommitlintConfig();
          }
          
          const huskyConfig = generateHuskyConfig();
          
          // 对于Vue项目使用Vue的lint-staged配置
          let lintStagedConfig;
          if (template === 'vue') {
            lintStagedConfig = generateVueLintStagedConfig();
          } else {
            // 其他框架使用通用的配置
            lintStagedConfig = generateLintStagedConfig({
              typescript,
              framework: template,
              prettier: linting.prettier,
              stylelint: linting.stylelint === true
            });
          }
          
          for (const [filename, content] of Object.entries(commitlintConfig)) {
            await fs.writeFile(path.join(destDir, filename), content);
          }
          
          // 创建 .husky 目录
          await fs.mkdirp(path.join(destDir, '.husky'));
          
          for (const [filename, content] of Object.entries(huskyConfig)) {
            await fs.writeFile(path.join(destDir, filename), content);
            // 使 husky 脚本可执行
            if (filename.startsWith('.husky/')) {
              await fs.chmod(path.join(destDir, filename), 0o755);
            }
          }
          
          for (const [filename, content] of Object.entries(lintStagedConfig)) {
            await fs.writeFile(path.join(destDir, filename), content);
          }
        }
      }
    },
    {
      title: '创建 README.md',
      task: async () => {
        const readmeContent = `# ${name}

## 项目介绍

这是一个使用 create-web-cli 创建的 ${template.charAt(0).toUpperCase() + template.slice(1)} 项目。

## 开发

\`\`\`bash
# 安装依赖
${packageManager} install

# 启动开发服务器
${packageManager} run dev
\`\`\`

## 构建

\`\`\`bash
${packageManager} run build
\`\`\`
`;
        
        await fs.writeFile(path.join(destDir, 'README.md'), readmeContent);
      }
    }
  ]);
  
  await tasks.run();
} 