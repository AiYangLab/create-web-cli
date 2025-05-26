#!/usr/bin/env node

/**
 * create-web-cli
 * 一个支持多种技术栈的现代前端项目初始化工具
 *
 * @author Liam
 */

import { Command } from "commander";
import { createProject } from "./commands/create.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 动态获取版本号
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

const program = new Command();

program
  .name("create-web")
  .description("一个支持多种技术栈的现代前端项目初始化工具")
  .version(version);

program
  .command("create")
  .description("创建一个新项目")
  .argument("[project-name]", "项目名称")
  .option("-t, --template <template>", "项目模板 (vue, react, nextjs)")
  .option("--typescript", "使用 TypeScript")
  .option("-u, --ui <library>", "要使用的 UI 库")
  .option("-b, --build-tool <tool>", "构建工具 (vite)")
  .option("-p, --package-manager <pm>", "包管理器 (npm, yarn, pnpm)")
  .action(createProject);

// 默认命令是 create
program
  .argument("[project-name]", "项目名称")
  .option("-t, --template <template>", "项目模板 (vue, react, nextjs)")
  .option("--typescript", "使用 TypeScript")
  .option("-u, --ui <library>", "要使用的 UI 库")
  .option("-b, --build-tool <tool>", "构建工具 (vite)")
  .option("-p, --package-manager <pm>", "包管理器 (npm, yarn, pnpm)")
  .action(createProject);

program.parse();
