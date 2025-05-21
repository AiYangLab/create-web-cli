import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TemplateInfo } from './types.js';

// 获取当前模块的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 模板目录路径（假设模板在项目根目录）
const TEMPLATES_DIR = path.resolve(__dirname, '../../../templates');

/**
 * 获取特定框架的可用模板
 */
export async function getTemplates(framework: string): Promise<TemplateInfo[]> {
  const frameworkDir = path.join(TEMPLATES_DIR, framework);
  
  if (!fs.existsSync(frameworkDir)) {
    throw new Error(`Framework "${framework}" not found`);
  }
  
  const templateDirs = fs.readdirSync(frameworkDir);
  const templates: TemplateInfo[] = [];
  
  for (const dir of templateDirs) {
    const templateJsonPath = path.join(frameworkDir, dir, 'template.json');
    
    if (fs.existsSync(templateJsonPath)) {
      try {
        const templateInfo = JSON.parse(fs.readFileSync(templateJsonPath, 'utf8')) as TemplateInfo;
        templates.push(templateInfo);
      } catch (error) {
        console.error(`Error parsing template.json in ${dir}:`, error);
      }
    }
  }
  
  return templates;
}

/**
 * 获取可用的框架
 */
export function getFrameworks(): string[] {
  if (!fs.existsSync(TEMPLATES_DIR)) {
    return ['vue', 'react', 'nextjs']; // 如果模板目录不存在，返回默认框架
  }
  
  const dirs = fs.readdirSync(TEMPLATES_DIR);
  return dirs.filter(dir => {
    const stat = fs.statSync(path.join(TEMPLATES_DIR, dir));
    return stat.isDirectory();
  });
}

/**
 * 获取模板目录路径
 */
export function getTemplatePath(framework: string, template: string): string {
  return path.join(TEMPLATES_DIR, framework, template);
}

/**
 * 检查模板是否存在
 */
export function templateExists(framework: string, template: string): boolean {
  const templatePath = getTemplatePath(framework, template);
  return fs.existsSync(templatePath);
} 