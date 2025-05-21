# Create Web CLI

一个强大的前端项目脚手架工具，用于快速生成不同框架的前端项目，并集成现代开发工具链。

## todoList

- 支持多种前端框架
  - [x] Vue3
  - [x] React
  - [ ] Next.js
- 完整的类型支持
  - [x] JavaScript
  - [x] TypeScript
- 代码质量工具
  - [ ] ESLint 配置（支持框架特定规则）
  - [ ] Prettier 代码格式化
  - [ ] Stylelint 样式检查
- Git 工作流集成
  - [ ] Husky 配置 Git Hooks
  - [ ] Lint-staged 提交前检查
  - [ ] Commitlint 规范化提交信息
  - [ ] 支持 emoji 的提交消息
  - [ ] 双语提交消息支持（英文/中文注释）
- 构建工具选择
  - [x] Vite
  - [ ] Webpack
  - [ ] 其他框架专属构建工具
- UI 框架集成选项
  - [x] Element Plus (Vue)
  - [x] Ant Design (React)

## 安装

```bash
npm install -g create-web-cli
```

## 使用方法

创建新项目：

```bash
create-web-cli create my-project
```

或直接通过 npx 使用：

```bash
npx create-web-cli create my-project
```

然后按照交互式提示选择您需要的配置选项。

## 许可证

MIT 