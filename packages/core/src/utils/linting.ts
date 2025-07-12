/**
 * 代码检查工具函数
 */

/**
 * 生成 ESLint 配置
 */
export function generateEslintConfig(options: {
  typescript: boolean;
  framework: string;
}): Record<string, string> {
  const { typescript, framework } = options;

  if (typescript) {
    if (framework === "react" || framework === "nextjs") {
      return {
        ".eslintrc.json": JSON.stringify(
          {
            root: true,
            env: {
              browser: true,
              es2021: true,
              node: true,
            },
            extends: [
              "eslint:recommended",
              "plugin:@typescript-eslint/recommended",
              "plugin:react/recommended",
              "plugin:react-hooks/recommended",
              framework === "nextjs" ? "next/core-web-vitals" : "",
            ].filter(Boolean),
            parser: "@typescript-eslint/parser",
            parserOptions: {
              ecmaFeatures: {
                jsx: true,
              },
              ecmaVersion: "latest",
              sourceType: "module",
            },
            plugins: ["react", "@typescript-eslint"],
            settings: {
              react: {
                version: "detect",
              },
            },
            rules: {},
          },
          null,
          2
        ),
      };
    } else if (framework === "vue") {
      return {
        ".eslintrc.cjs": `// @see: http://eslint.cn

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 指定如何解析语法
  parser: "vue-eslint-parser",
  // 优先级低于 parse 的语法解析配置
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true
    }
  },
  // 继承某些已有的规则
  extends: ["plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
    "prefer-const": "off", // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
    "no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/no-empty-function": "error", // 禁止空函数
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/ban-ts-comment": "error", // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    "@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
    "@typescript-eslint/no-var-requires": "off", // 允许使用 require() 函数导入模块
    "@typescript-eslint/no-non-null-assertion": "off", // 不允许使用后缀运算符的非空断言(!)

    // vue (https://eslint.vuejs.org/rules)
    "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该 no-unused-vars 规则时有效
    "vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
    "vue/no-mutating-props": "error", // 不允许改变组件 prop
    "vue/custom-event-name-casing": "error", // 为自定义事件名称强制使用特定大小写
    "vue/html-closing-bracket-newline": "error", // 在标签的右括号之前要求或禁止换行
    "vue/attribute-hyphenation": "error", // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
    "vue/attributes-order": "off", // vue api使用顺序，强制执行属性顺序
    "vue/no-v-html": "off", // 禁止使用 v-html
    "vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
    "vue/multi-word-component-names": "off", // 要求组件名称始终为 "-" 链接的单词
    "vue/no-setup-props-destructure": "off" // 禁止解构 props 传递给 setup
  }
}`,
        ".eslintignore": `*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
/src/mock/*
stats.html`,
      };
    }
  } else {
    // JavaScript variants
    if (framework === "react" || framework === "nextjs") {
      return {
        ".eslintrc.json": JSON.stringify(
          {
            root: true,
            env: {
              browser: true,
              es2021: true,
              node: true,
            },
            extends: [
              "eslint:recommended",
              "plugin:react/recommended",
              "plugin:react-hooks/recommended",
              framework === "nextjs" ? "next/core-web-vitals" : "",
            ].filter(Boolean),
            parserOptions: {
              ecmaFeatures: {
                jsx: true,
              },
              ecmaVersion: "latest",
              sourceType: "module",
            },
            plugins: ["react"],
            settings: {
              react: {
                version: "detect",
              },
            },
            rules: {},
          },
          null,
          2
        ),
      };
    } else if (framework === "vue") {
      return {
        ".eslintrc.cjs": `// @see: http://eslint.cn

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 指定如何解析语法
  parser: "vue-eslint-parser",
  // 优先级低于 parse 的语法解析配置
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true
    }
  },
  // 继承某些已有的规则
  extends: ["plugin:vue/vue3-recommended", "plugin:prettier/recommended"],
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
    "prefer-const": "off", // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
    "no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们

    // vue (https://eslint.vuejs.org/rules)
    "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该 no-unused-vars 规则时有效
    "vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
    "vue/no-mutating-props": "error", // 不允许改变组件 prop
    "vue/custom-event-name-casing": "error", // 为自定义事件名称强制使用特定大小写
    "vue/html-closing-bracket-newline": "error", // 在标签的右括号之前要求或禁止换行
    "vue/attribute-hyphenation": "error", // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
    "vue/attributes-order": "off", // vue api使用顺序，强制执行属性顺序
    "vue/no-v-html": "off", // 禁止使用 v-html
    "vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
    "vue/multi-word-component-names": "off", // 要求组件名称始终为 "-" 链接的单词
    "vue/no-setup-props-destructure": "off" // 禁止解构 props 传递给 setup
  }
}`,
        ".eslintignore": `*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
/src/mock/*
stats.html`,
      };
    }
  }

  // Default eslint config
  return {
    ".eslintrc.json": JSON.stringify(
      {
        root: true,
        env: {
          browser: true,
          es2021: true,
          node: true,
        },
        extends: [
          "eslint:recommended",
          typescript ? "plugin:@typescript-eslint/recommended" : "",
        ].filter(Boolean),
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
        },
        rules: {},
      },
      null,
      2
    ),
  };
}

/**
 * 生成 Prettier 配置
 */
export function generatePrettierConfig(): Record<string, string> {
  return {
    ".prettierrc.cjs": `// @see: https://www.prettier.cn

module.exports = {
  // 指定最大换行长度
  printWidth: 130,
  // 缩进制表符宽度 | 空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行 (true：制表符，false：空格)
  useTabs: false,
  // 结尾不用分号 (true：有，false：没有)
  semi: true,
  // 使用单引号 (true：单引号，false：双引号)
  singleQuote: false,
  // 在对象字面量中决定是否将属性名用引号括起来 可选值 "<as-needed|consistent|preserve>"
  quoteProps: "as-needed",
  // 在JSX中使用单引号而不是双引号 (true：单引号，false：双引号)
  jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号 可选值"<none|es5|all>"
  trailingComma: "none",
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }" (true：有，false：没有)
  bracketSpacing: true,
  // 将 > 多行元素放在最后一行的末尾，而不是单独放在下一行 (true：放末尾，false：单独一行)
  bracketSameLine: false,
  // (x) => {} 箭头函数参数只有一个时是否要有小括号 (avoid：省略括号，always：不省略括号)
  arrowParens: "avoid",
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 可以在文件顶部插入一个特殊标记，指定该文件已使用 Prettier 格式化
  insertPragma: false,
  // 用于控制文本是否应该被换行以及如何进行换行
  proseWrap: "preserve",
  // 在html中空格是否是敏感的 "css" - 遵守 CSS 显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
  htmlWhitespaceSensitivity: "css",
  // 控制在 Vue 单文件组件中 <script> 和 <style> 标签内的代码缩进方式
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf 结尾是 可选值 "<auto|lf|crlf|cr>"
  endOfLine: "auto",
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码 (rangeStart：开始，rangeEnd：结束)
  rangeStart: 0,
  rangeEnd: Infinity
};`,
    ".prettierignore": `/dist/*
.local
/node_modules/**

**/*.svg
**/*.sh

/public/*
stats.html`,
  };
}

/**
 * 生成 Stylelint 配置
 */
export function generateStylelintConfig(): Record<string, string> {
  return {
    ".stylelintrc.js": `// @see: https://stylelint.io

module.exports = {
  root: true,
  // 继承某些已有的规则
  extends: [
    "stylelint-config-standard", // 配置 stylelint 拓展插件
    "stylelint-config-html/vue", // 配置 vue 中 template 样式格式化
    "stylelint-config-standard-scss", // 配置 stylelint scss 插件
    "stylelint-config-recommended-vue/scss", // 配置 vue 中 scss 样式格式化
    "stylelint-config-recess-order" // 配置 stylelint css 属性书写顺序插件,
  ],
  overrides: [
    // 扫描 .vue/html 文件中的 <style> 标签内的样式
    {
      files: ["**/*.{vue,html}"],
      customSyntax: "postcss-html"
    }
  ],
  rules: {
    "function-url-quotes": "always", // URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    "color-hex-length": "long", // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
    "rule-empty-line-before": "never", // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行。)"
    "font-family-no-missing-generic-family-keyword": null, // 禁止在字体族名称列表中缺少通用字体族关键字
    "scss/at-import-partial-extension": null, // 解决不能使用 @import 引入 scss 文件
    "property-no-unknown": null, // 禁止未知的属性
    "no-empty-source": null, // 禁止空源
    "selector-class-pattern": null, // 强制选择器类名的格式
    "value-no-vendor-prefix": null, // 关闭 vendor-prefix (为了解决多行省略 -webkit-box)
    "no-descending-specificity": null, // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器
    "value-keyword-case": null, // 解决在 scss 中使用 v-bind 大写单词报错
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "v-deep", "deep"]
      }
    ]
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"]
};`,
    ".stylelintignore": `/dist/*
.local
/node_modules/**

**/*.svg
**/*.sh

/public/*
stats.html`,
  };
}

/**
 * 生成 lint-staged 配置（Vue版本）
 */
export function generateVueLintStagedConfig(): Record<string, string> {
  return {
    "lint-staged.config.cjs": `module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"]
};`,
  };
}

/**
 * 生成 Vue 的 commitlint 配置
 */
export function generateVueCommitlintConfig(): Record<string, string> {
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
};`,
  };
}

/**
 * 根据框架和TypeScript获取ESLint依赖
 */
export function getEslintDependencies(options: {
  typescript: boolean;
  framework: string;
}): string[] {
  const { typescript, framework } = options;
  const deps = ["eslint"];

  if (typescript) {
    deps.push("@typescript-eslint/eslint-plugin", "@typescript-eslint/parser");
  }

  if (framework === "react" || framework === "nextjs") {
    deps.push("eslint-plugin-react", "eslint-plugin-react-hooks");
  }

  if (framework === "nextjs") {
    deps.push("eslint-config-next");
  }

  if (framework === "vue") {
    deps.push(
      "eslint-plugin-vue",
      "prettier",
      "eslint-plugin-prettier",
      "eslint-config-prettier"
    );
    if (typescript) {
      deps.push("vue-eslint-parser");
    }
  }

  return deps;
}

/**
 * 获取 Stylelint 依赖
 */
export function getStylelintDependencies(): string[] {
  return [
    "stylelint",
    "stylelint-config-standard",
    "stylelint-config-html",
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue",
    "stylelint-config-recess-order",
    "postcss-html",
  ];
}

/**
 * 获取 Commitlint 依赖
 */
export function getCommitlintDependencies(): string[] {
  return ["@commitlint/cli", "@commitlint/config-conventional", "cz-git"];
}

/**
 * 获取 Lint Staged 依赖
 */
export function getLintStagedDependencies(): string[] {
  return ["lint-staged", "husky"];
}
