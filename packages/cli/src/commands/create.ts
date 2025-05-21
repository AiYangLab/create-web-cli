import { prompt } from '../utils/prompt.js';
import { generate } from '../utils/generator.js';
import chalk from 'chalk';
import ora from 'ora';
import { ProjectConfig } from '@create-web-cli/core';

interface CreateOptions {
  template?: string;
  typescript?: boolean;
  ui?: string;
  buildTool?: string;
  packageManager?: string;
}

/**
 * 创建一个新项目
 */
export async function createProject(projectName: string | undefined, options: CreateOptions): Promise<void> {
  console.log(chalk.bold('\n🚀 create-web-cli - 现代前端项目初始化工具\n'));
  
  try {
    // 不要在交互式提示前使用spinner
    // 直接调用prompt函数，让用户看到交互式提示
    const config = await prompt(projectName, {
      template: options.template,
      typescript: options.typescript,
      ui: options.ui,
      buildTool: options.buildTool,
      packageManager: options.packageManager
    });
    
    console.log(chalk.green('\n✓ 项目配置获取完成'));
    
    // 生成项目
    const generateSpinner = ora(`正在创建项目 ${chalk.cyan(config.name)}...`).start();
    
    await generate(config);
    
    generateSpinner.succeed(`项目 ${chalk.cyan(config.name)} 创建成功！`);
    
    // 显示后续步骤
    showNextSteps(config);
  } catch (error) {
    console.error(chalk.red(`\n❌ 创建项目失败: ${(error as Error).message}`));
    process.exit(1);
  }
}

/**
 * 显示项目创建后的后续步骤
 */
function showNextSteps(config: ProjectConfig): void {
  const { name, packageManager } = config;
  
  console.log(chalk.bold('\n📝 后续步骤:'));
  console.log(`  ${chalk.cyan('cd')} ${name}`);
  
  // 显示适当的包管理器命令
  const installCmd = packageManager === 'npm' ? 'npm install' :
                   packageManager === 'yarn' ? 'yarn' : 'pnpm install';
  
  const startCmd = packageManager === 'npm' ? 'npm run dev' :
                 packageManager === 'yarn' ? 'yarn dev' : 'pnpm dev';
  
  console.log(`  ${chalk.cyan(installCmd)}`);
  console.log(`  ${chalk.cyan(startCmd)}`);
  
  console.log(chalk.bold('\n🎉 祝你编码愉快！'));
} 