import inquirer from "inquirer";
import {
  getFrameworks,
  getTemplates,
  TECH_STACKS,
  BUILD_TOOLS,
  UI_LIBRARIES,
  ProjectConfig,
} from "@create-web-cli/core";

interface PromptOptions {
  template?: string;
  typescript?: boolean;
  ui?: string;
  buildTool?: string;
  packageManager?: string;
}

/**
 * 项目配置的交互式提示
 */
export async function prompt(
  projectName: string | undefined,
  options: PromptOptions
): Promise<ProjectConfig> {
  // 获取可用的框架
  const frameworks = await getFrameworks();

  // 项目名称
  const nameAnswer = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "项目名称:",
      default: projectName || "my-web-app",
      when: !projectName,
      validate: (input: string) => {
        if (input.match(/^[a-zA-Z0-9-_]+$/)) {
          return true;
        }
        return "请输入有效的项目名称（只允许字母、数字、连字符和下划线）";
      },
    },
  ]);

  const actualProjectName = projectName || nameAnswer.projectName;

  // 框架
  const frameworkAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "选择框架:",
      choices: frameworks.map((fw) => {
        const frameworkInfo = TECH_STACKS[fw];
        return {
          name: `${frameworkInfo?.name || fw} - ${
            frameworkInfo?.description || ""
          }`,
          value: fw,
        };
      }),
      default:
        options.template ||
        (frameworks.includes("react") ? "react" : frameworks[0]),
    },
  ]);

  const framework = frameworkAnswer.framework;

  // 获取所选框架的模板
  const templates = await getTemplates(framework);
  const templateChoices = templates.map((t) => ({
    name: `${t.name} - ${t.description}`,
    value: t.name.toLowerCase().replace(/\s+/g, "-"),
  }));

  // 获取所选框架可用的构建工具
  const frameworkInfo = TECH_STACKS[framework];
  const availableBuildTools = frameworkInfo?.buildTools || ["vite"];
  const buildToolChoices = availableBuildTools.map((tool) => {
    const buildToolInfo = BUILD_TOOLS[tool];
    return {
      name: `${buildToolInfo?.name || tool} - ${
        buildToolInfo?.description || ""
      }`,
      value: tool,
    };
  });

  // 获取所选框架可用的UI库
  const uiLibraries = UI_LIBRARIES[framework] || {};
  const uiChoices = Object.keys(uiLibraries).map((key) => {
    const uiInfo = uiLibraries[key];
    return {
      name: `${uiInfo?.name || key} - ${uiInfo?.description || ""}`,
      value: key,
    };
  });

  // 为UI添加"无"选项
  uiChoices.unshift({ name: "不使用 UI 组件库", value: "none" });

  // 附加问题
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "选择模板:",
      choices: templateChoices,
      default: templateChoices[0]?.value,
      when: templateChoices.length > 0,
    },
    {
      type: "confirm",
      name: "typescript",
      message: "使用 TypeScript?",
      default: options.typescript !== undefined ? options.typescript : true,
    },
    {
      type: "list",
      name: "buildTool",
      message: "选择构建工具:",
      choices: buildToolChoices,
      default: options.buildTool || "vite",
      when: framework !== "nextjs", // Next.js使用自己的构建系统
    },
    {
      type: "list",
      name: "ui",
      message: "选择 UI 组件库:",
      choices: uiChoices,
      default: options.ui || "none",
    },
    {
      type: "confirm",
      name: "eslint",
      message: "添加 ESLint 支持?",
      default: true,
    },
    {
      type: "confirm",
      name: "prettier",
      message: "添加 Prettier 支持?",
      default: true,
    },
    {
      type: "confirm",
      name: "stylelint",
      message: "添加 Stylelint 支持?",
      default: false,
    },
    {
      type: "confirm",
      name: "commitizen",
      message: "添加 Commitizen (规范化 commit message)?",
      default: false,
    },
    {
      type: "confirm",
      name: "husky",
      message: "添加 husky + lint-staged + commitlint?",
      default: false,
      when: (answers) =>
        answers.eslint || answers.prettier || answers.commitizen,
    },
    {
      type: "list",
      name: "packageManager",
      message: "选择包管理器:",
      choices: [
        { name: "npm", value: "npm" },
        { name: "yarn", value: "yarn" },
        { name: "pnpm", value: "pnpm" },
      ],
      default: options.packageManager || "pnpm",
    },
  ]);

  // 根据框架自动设置样式预处理器
  let styling: ("tailwind" | "scss" | "less" | "stylus")[] = [];

  // 根据框架选择预处理器
  if (framework === "vue") {
    styling.push("scss");
  } else if (framework === "react") {
    styling.push("less");
  }
  // Next.js不设置样式预处理器，将通过模板自带Tailwind CSS

  // 格式化最终的配置对象
  return {
    name: actualProjectName,
    template: framework as "vue" | "react" | "nextjs",
    typescript: answers.typescript,
    buildTool: framework === "nextjs" ? "next" : answers.buildTool,
    ui: answers.ui === "none" ? undefined : answers.ui,
    styling: styling,
    packageManager: answers.packageManager,
    linting: {
      eslint: answers.eslint,
      prettier: answers.prettier,
      stylelint: answers.stylelint,
    },
    git: {
      commitizen: answers.commitizen,
      husky: answers.husky,
    },
  };
}
