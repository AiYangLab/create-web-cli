/**
 * Git 工具函数
 */

/**
 * 生成 Commitlint 配置
 */
export function generateCommitlintConfig(): Record<string, string> {
  return {
    "commitlint.config.cjs": `// @see: https://cz-git.qbenben.com/zh/guide
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
          // 中文版
          // type: "选择你要提交的类型 :",
          // scope: "选择一个提交范围（可选）:",
          // customScope: "请输入自定义的提交范围 :",
          // subject: "填写简短精炼的变更描述 :\\n",
          // body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\\n',
          // breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\\n',
          // footerPrefixsSelect: "选择关联issue前缀（可选）:",
          // customFooterPrefixs: "输入自定义issue前缀 :",
          // footer: "列举关联issue (可选) 例如: #31, #I3244 :\\n",
          // confirmCommit: "是否提交或修改commit ?"
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
          // 中文版
          // { value: "feat", name: "特性:   🚀  新增功能", emoji: "🚀" },
          // { value: "fix", name: "修复:   🧩  修复缺陷", emoji: "🧩" },
          // { value: "docs", name: "文档:   📚  文档变更", emoji: "📚" },
          // { value: "style", name: "格式:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: "🎨" },
          // { value: "refactor", name: "重构:   ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: "♻️" },
          // { value: "perf", name: "性能:    ⚡️  性能优化", emoji: "⚡️" },
          // { value: "test", name: "测试:   ✅  添加疏漏测试或已有测试改动", emoji: "✅" },
          // { value: "build", name: "构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）", emoji: "📦️" },
          // { value: "ci", name: "集成:   🎡  修改 CI 配置、脚本", emoji: "🎡" },
          // { value: "revert", name: "回退:   ⏪️  回滚 commit", emoji: "⏪️" },
          // { value: "chore", name: "其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: "🔨" },
          // { value: "wip", name: "开发:   🕔  正在开发中", emoji: "🕔" },
          // { value: "workflow", name: "工作流:   📋  工作流程改进", emoji: "📋" },
          // { value: "types", name: "类型:   🔰  类型定义文件修改", emoji: "🔰" }
        ],
        useEmoji: true,
        scopes: [...scopes],
        customScopesAlign: "bottom",
        emptyScopesAlias: "empty",
        customScopesAlias: "custom",
        allowBreakingChanges: ["feat", "fix"]
      }
    };`,
  };
}

/**
 * 生成 Husky 配置
 */
export function generateHuskyConfig(): Record<string, string> {
  return {
    ".husky/pre-commit": `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`,
    ".husky/commit-msg": `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
`,
  };
}

/**
 * 生成 lint-staged 配置
 */
export function generateLintStagedConfig(options: {
  typescript: boolean;
  framework: string;
  prettier: boolean;
  stylelint: boolean;
}): Record<string, string> {
  const { typescript, framework, prettier, stylelint } = options;

  const extensions = typescript
    ? framework === "vue"
      ? "js,jsx,ts,tsx,vue"
      : "js,jsx,ts,tsx"
    : framework === "vue"
    ? "js,jsx,vue"
    : "js,jsx";

  let lintStagedContent = "module.exports = {\n";

  // ESLint
  lintStagedContent += `  "*.{${extensions}}": ["eslint --fix"`;

  // Prettier 可能应用于相同的文件
  if (prettier) {
    lintStagedContent += ', "prettier --write"';
  }
  lintStagedContent += "],\n";

  // 其他文件类型的 Prettier
  if (prettier) {
    lintStagedContent +=
      '  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],\n';
    lintStagedContent += '  "package.json": ["prettier --write"],\n';
    lintStagedContent += '  "*.md": ["prettier --write"],\n';
  }

  // Stylelint
  if (stylelint) {
    const styleExtensions =
      framework === "vue" ? "scss,less,styl,html,vue" : "scss,less,styl,html";
    lintStagedContent += `  "*.{${styleExtensions}}": ["stylelint --fix"`;
    if (prettier) {
      lintStagedContent += ', "prettier --write"';
    }
    lintStagedContent += "],\n";
  }

  // 移除尾部逗号并关闭对象
  lintStagedContent = lintStagedContent.replace(/,\n$/, "\n");
  lintStagedContent += "};";

  return {
    "lint-staged.config.cjs": lintStagedContent,
  };
}

/**
 * 生成 commitizen 的 czrc 配置
 */
export function generateCzConfig(): Record<string, string> {
  // 只生成一个空对象，不生成任何文件
  // 我们已经在commitlint.config.cjs中包含了所有配置
  return {};
}

/**
 * 获取 Git 相关依赖
 */
export function getGitDependencies(options: {
  commitizen: boolean;
  husky: boolean;
  commitlint: boolean;
}): string[] {
  const { commitizen, husky, commitlint } = options;
  const deps: string[] = [];

  // 不论是否使用commitizen，我们都需要cz-git作为commitlint的一部分
  deps.push("cz-git");

  if (commitizen) {
    deps.push("commitizen");
  }

  if (husky) {
    deps.push("husky", "lint-staged");
  }

  if (commitlint) {
    deps.push("@commitlint/cli", "@commitlint/config-conventional");
  }

  return deps;
}
