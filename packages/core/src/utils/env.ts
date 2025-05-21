/**
 * 环境变量工具函数
 */

/**
 * 生成环境变量文件内容
 */
export function generateEnvFiles(options: { name: string }): Record<string, string> {
  const envContent = `# 应用环境变量
APP_NAME=${options.name}
NODE_ENV=development
`;

  const envDevContent = `# 开发环境变量
APP_NAME=${options.name}
NODE_ENV=development
API_URL=http://localhost:3001/api
`;

  const envProdContent = `# 生产环境变量
APP_NAME=${options.name}
NODE_ENV=production
API_URL=https://api.example.com
`;

  return {
    '.env': envContent,
    '.env.development': envDevContent,
    '.env.production': envProdContent
  };
}

/**
 * 生成gitignore文件内容
 */
export function generateGitignore(options: { typescript: boolean, framework: string }): string {
  const { typescript, framework } = options;
  
  const content = `# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Build output
dist
build
out${framework === 'nextjs' ? '\n.next' : ''}${framework === 'vue' ? '\n.nuxt' : ''}

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;

  return content;
} 