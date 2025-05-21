import { FrameworkInfo, BuildToolInfo, UILibraryInfo, StyleSolutionInfo, LintingToolInfo, GitToolInfo } from './types.js';

/**
 * 可用技术栈
 */
export const TECH_STACKS: Record<string, FrameworkInfo> = {
  vue: {
    name: 'Vue 3',
    description: 'Vue.js 是一套构建用户界面的渐进式框架。',
    variants: ['JavaScript', 'TypeScript'],
    buildTools: ['vite'],
    ui: ['element-plus', 'ant-design-vue', 'naive-ui']
  },
  react: {
    name: 'React 18',
    description: 'React 是一个用于构建用户界面的 JavaScript 库。',
    variants: ['JavaScript', 'TypeScript'],
    buildTools: ['vite'],
    ui: ['ant-design', 'material-ui', 'chakra-ui']
  },
  nextjs: {
    name: 'Next.js',
    description: 'Next.js 是一个基于 React 的全栈开发框架。',
    variants: ['JavaScript', 'TypeScript'],
    buildTools: ['next'],
    ui: ['shadcn-ui', 'nextui', 'ant-design']
  }
};

/**
 * 可用构建工具
 */
export const BUILD_TOOLS: Record<string, BuildToolInfo> = {
  vite: {
    name: 'Vite',
    description: '下一代前端构建工具',
    url: 'https://vitejs.dev/'
  },
  next: {
    name: 'Next.js Build',
    description: 'Next.js 内置构建工具',
    url: 'https://nextjs.org/docs/app'
  }
};

/**
 * 可用UI库
 */
export const UI_LIBRARIES: Record<string, Record<string, UILibraryInfo>> = {
  vue: {
    'element-plus': {
      name: 'Element Plus',
      description: '基于 Vue 3 的组件库',
      url: 'https://element-plus.org/',
      package: 'element-plus'
    },
    'ant-design-vue': {
      name: 'Ant Design Vue',
      description: 'Ant Design 的 Vue 实现',
      url: 'https://antdv.com/',
      package: 'ant-design-vue'
    },
    'naive-ui': {
      name: 'Naive UI',
      description: '一个 Vue 3 组件库',
      url: 'https://www.naiveui.com/',
      package: 'naive-ui'
    }
  },
  react: {
    'ant-design': {
      name: 'Ant Design',
      description: '企业级 UI 设计语言和 React 组件库',
      url: 'https://ant.design/',
      package: 'antd'
    },
    'material-ui': {
      name: 'Material UI',
      description: '实现 Google Material Design 的 React 组件',
      url: 'https://mui.com/',
      package: '@mui/material'
    },
    'chakra-ui': {
      name: 'Chakra UI',
      description: '简单、模块化和可访问的 UI 组件库',
      url: 'https://chakra-ui.com/',
      package: '@chakra-ui/react'
    }
  },
  nextjs: {
    'shadcn-ui': {
      name: 'Shadcn/UI',
      description: '可重用组件集合，使用 Radix UI 和 Tailwind CSS',
      url: 'https://ui.shadcn.com/',
      package: null // 需要手动安装
    },
    'nextui': {
      name: 'NextUI',
      description: '美观、快速且现代的 UI 库',
      url: 'https://nextui.org/',
      package: '@nextui-org/react'
    },
    'ant-design': {
      name: 'Ant Design',
      description: '企业级 UI 设计语言和 React 组件库',
      url: 'https://ant.design/',
      package: 'antd'
    }
  }
};

/**
 * 可用CSS框架和预处理器
 */
export const STYLE_SOLUTIONS: Record<string, StyleSolutionInfo> = {
  tailwind: {
    name: 'Tailwind CSS',
    description: '功能类优先的 CSS 框架',
    url: 'https://tailwindcss.com/',
    packages: ['tailwindcss', 'postcss', 'autoprefixer']
  },
  scss: {
    name: 'SCSS',
    description: 'CSS 的预处理器',
    url: 'https://sass-lang.com/',
    packages: ['sass']
  },
  less: {
    name: 'Less',
    description: '向后兼容的 CSS 扩展语言',
    url: 'https://lesscss.org/',
    packages: ['less']
  },
  stylus: {
    name: 'Stylus',
    description: '富有表现力、健壮、功能丰富的 CSS 语言',
    url: 'https://stylus-lang.com/',
    packages: ['stylus']
  }
};

/**
 * 可用代码检查和代码质量工具
 */
export const LINTING_TOOLS: Record<string, LintingToolInfo> = {
  eslint: {
    name: 'ESLint',
    description: '可插拔的 JavaScript 和 TypeScript 代码检查工具',
    url: 'https://eslint.org/',
    packages: ['eslint']
  },
  prettier: {
    name: 'Prettier',
    description: '代码格式化工具',
    url: 'https://prettier.io/',
    packages: ['prettier']
  },
  stylelint: {
    name: 'Stylelint',
    description: 'CSS 的强大分析工具',
    url: 'https://stylelint.io/',
    packages: ['stylelint']
  }
};

/**
 * 可用Git工作流工具
 */
export const GIT_TOOLS: Record<string, GitToolInfo> = {
  commitizen: {
    name: 'Commitizen',
    description: '规范化 commit message',
    url: 'http://commitizen.github.io/cz-cli/',
    packages: ['commitizen', 'cz-git']
  },
  husky: {
    name: 'Husky',
    description: 'Git hooks 工具',
    url: 'https://typicode.github.io/husky/',
    packages: ['husky']
  },
  lintStaged: {
    name: 'lint-staged',
    description: '对暂存的 git 文件运行 linters',
    url: 'https://github.com/okonet/lint-staged',
    packages: ['lint-staged']
  },
  commitlint: {
    name: 'commitlint',
    description: '检查 commit message 是否符合规范',
    url: 'https://commitlint.js.org/',
    packages: ['@commitlint/cli', '@commitlint/config-conventional']
  }
}; 