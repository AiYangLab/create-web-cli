/**
 * 项目配置
 */
export interface ProjectConfig {
  name: string;
  template: 'vue' | 'react' | 'nextjs';
  typescript: boolean;
  buildTool: 'vite' | 'next';
  ui?: string;
  styling?: ('tailwind' | 'scss' | 'less' | 'stylus')[];
  packageManager: 'npm' | 'yarn' | 'pnpm';
  linting: {
    eslint: boolean;
    prettier: boolean;
    stylelint?: boolean;
  };
  git: {
    commitizen?: boolean;
    husky?: boolean;
  };
}

/**
 * 模板信息
 */
export interface TemplateInfo {
  name: string;
  description: string;
  files: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  buildTools: string[];
  ui: string[];
  typescript: boolean;
}

/**
 * 框架信息
 */
export interface FrameworkInfo {
  name: string;
  description: string;
  variants: string[];
  buildTools: string[];
  ui: string[];
}

/**
 * 构建工具信息
 */
export interface BuildToolInfo {
  name: string;
  description: string;
  url: string;
}

/**
 * UI库信息
 */
export interface UILibraryInfo {
  name: string;
  description: string;
  url: string;
  package: string | null;
}

/**
 * 样式方案信息
 */
export interface StyleSolutionInfo {
  name: string;
  description: string;
  url: string;
  packages: string[];
}

/**
 * 代码检查工具信息
 */
export interface LintingToolInfo {
  name: string;
  description: string;
  url: string;
  packages: string[];
}

/**
 * Git工具信息
 */
export interface GitToolInfo {
  name: string;
  description: string;
  url: string;
  packages: string[];
} 