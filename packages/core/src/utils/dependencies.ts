import { STYLE_SOLUTIONS, UI_LIBRARIES } from "../constants.js";
import { getEslintDependencies } from "./linting.js";
import { getGitDependencies } from "./git.js";

// 添加常用依赖的实际版本号
const DEPENDENCY_VERSIONS: Record<string, string> = {
  // 框架
  vue: "^3.3.4",
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  next: "^13.4.12",

  // UI库
  "element-plus": "^2.3.8",
  "ant-design-vue": "^4.0.0",
  "naive-ui": "^2.34.4",
  antd: "^5.7.3",
  "@mui/material": "^5.14.2",
  "@chakra-ui/react": "^2.8.0",
  "@nextui-org/react": "^2.0.1",

  // 开发依赖
  typescript: "^5.1.6",
  "vue-tsc": "^1.8.8",
  "@types/react": "^18.2.15",
  "@types/react-dom": "^18.2.7",
  "@types/node": "^20.4.5",
  vite: "^6.3.5",
  "@vitejs/plugin-vue": "^5.0.0",
  "@vitejs/plugin-react": "^4.4.1",

  // 样式
  tailwindcss: "^3.3.3",
  postcss: "^8.4.27",
  autoprefixer: "^10.4.14",
  sass: "^1.64.1",
  less: "^4.1.3",
  stylus: "^0.59.0",

  // 代码质量
  eslint: "^8.45.0",
  prettier: "^3.0.0",
  stylelint: "^15.10.2",
  "stylelint-config-standard": "^34.0.0",
  "@typescript-eslint/eslint-plugin": "^6.2.0",
  "@typescript-eslint/parser": "^6.2.0",
  "eslint-plugin-react": "^7.33.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-config-next": "^13.4.12",
  "eslint-plugin-vue": "^9.15.1",
  "vue-eslint-parser": "^9.3.1",
  "eslint-config-prettier": "^8.9.0",
  "eslint-plugin-prettier": "^5.0.0",

  // Git工具
  commitizen: "^4.3.0",
  "cz-git": "^1.7.0",
  husky: "^8.0.3",
  "lint-staged": "^13.2.3",
  "@commitlint/cli": "^17.6.7",
  "@commitlint/config-conventional": "^17.6.7",
};

/**
 * 获取UI库依赖
 */
export function getUILibraryDependencies(options: {
  framework: string;
  ui?: string;
}): string[] {
  const { framework, ui } = options;

  if (!ui) return [];

  const uiLibrary = UI_LIBRARIES[framework]?.[ui];
  if (!uiLibrary || !uiLibrary.package) return [];

  return [uiLibrary.package];
}

/**
 * 获取样式依赖
 */
export function getStyleDependencies(options: {
  styling?: string[];
}): string[] {
  const { styling } = options;

  if (!styling || styling.length === 0) return [];

  const deps: string[] = [];

  styling.forEach((style) => {
    const styleSolution = STYLE_SOLUTIONS[style];
    if (styleSolution) {
      deps.push(...styleSolution.packages);
    }
  });

  return deps;
}

/**
 * 获取所有项目依赖
 */
export function getProjectDependencies(options: {
  framework: string;
  typescript: boolean;
  buildTool: string;
  ui?: string;
  styling?: string[];
  linting: {
    eslint: boolean;
    prettier: boolean;
    stylelint?: boolean;
  };
  git: {
    commitizen?: boolean;
    husky?: boolean;
  };
}): {
  dependencies: string[];
  devDependencies: string[];
} {
  const { framework, typescript, buildTool, ui, styling, linting, git } =
    options;

  const dependencies: string[] = [];
  const devDependencies: string[] = [];

  // Framework dependencies
  if (framework === "vue") {
    dependencies.push("vue");
  } else if (framework === "react") {
    dependencies.push("react", "react-dom");
  } else if (framework === "nextjs") {
    dependencies.push("next", "react", "react-dom");
  }

  // TypeScript
  if (typescript) {
    devDependencies.push("typescript");

    if (framework === "vue") {
      devDependencies.push("vue-tsc");
    } else if (framework === "react") {
      devDependencies.push("@types/react", "@types/react-dom");
    } else if (framework === "nextjs") {
      devDependencies.push("@types/react", "@types/react-dom", "@types/node");
    }
  }

  // Build tool - 只保留Vite和Next.js的构建工具
  if (buildTool === "vite") {
    devDependencies.push("vite");

    if (framework === "vue") {
      devDependencies.push("@vitejs/plugin-vue");
    } else if (framework === "react") {
      devDependencies.push("@vitejs/plugin-react");
    }
  }

  // UI library
  dependencies.push(...getUILibraryDependencies({ framework, ui }));

  // Styling
  devDependencies.push(...getStyleDependencies({ styling }));

  // Linting tools
  if (linting.eslint) {
    devDependencies.push(...getEslintDependencies({ typescript, framework }));
  }

  if (linting.prettier) {
    devDependencies.push("prettier");

    if (linting.eslint) {
      devDependencies.push("eslint-config-prettier", "eslint-plugin-prettier");
    }
  }

  if (linting.stylelint) {
    devDependencies.push("stylelint", "stylelint-config-standard");
  }

  // Git tools
  devDependencies.push(
    ...getGitDependencies({
      commitizen: git.commitizen || false,
      husky: git.husky || false,
      commitlint: git.husky || false,
    })
  );

  return {
    dependencies: [...new Set(dependencies)],
    devDependencies: [...new Set(devDependencies)],
  };
}

/**
 * 生成package.json内容
 */
export function generatePackageJson(options: {
  name: string;
  dependencies: string[];
  devDependencies: string[];
  framework: string;
  buildTool: string;
  typescript: boolean;
}): string {
  const {
    name,
    dependencies,
    devDependencies,
    framework,
    buildTool,
    typescript,
  } = options;

  const scripts: Record<string, string> = {};

  // Add scripts based on build tool and framework
  if (buildTool === "vite") {
    scripts.dev = "vite";
    scripts.build = "vite build";
    scripts.preview = "vite preview";

    if (typescript) {
      if (framework === "vue") {
        scripts.build = "vue-tsc && vite build";
        scripts.typecheck = "vue-tsc --noEmit";
      } else {
        scripts.typecheck = "tsc --noEmit";
      }
    }
  } else if (framework === "nextjs") {
    scripts.dev = "next dev";
    scripts.build = "next build";
    scripts.start = "next start";
    scripts.lint = "next lint";
  }

  // 添加ESLint脚本 - 只在用户选择了ESLint时添加
  const hasEslint = devDependencies.some(dep => dep === "eslint");
  if (hasEslint && !scripts.lint) {
    const extensions = typescript 
      ? ".js,.jsx,.ts,.tsx" 
      : framework === "vue" ? ".js,.vue" : ".js,.jsx";
    scripts.lint = `eslint . --ext ${extensions}`;
    scripts["lint:fix"] = `eslint . --ext ${extensions} --fix`;
  }

  const packageJson = {
    name,
    private: true,
    version: "0.1.0",
    type: "module",
    scripts,
    dependencies: dependencies.reduce((acc, dep) => {
      // 使用实际版本号或默认为最新版本
      acc[dep] = DEPENDENCY_VERSIONS[dep] || "^0.0.0";
      return acc;
    }, {} as Record<string, string>),
    devDependencies: devDependencies.reduce((acc, dep) => {
      // 使用实际版本号或默认为最新版本
      acc[dep] = DEPENDENCY_VERSIONS[dep] || "^0.0.0";
      return acc;
    }, {} as Record<string, string>),
  };

  return JSON.stringify(packageJson, null, 2);
}
