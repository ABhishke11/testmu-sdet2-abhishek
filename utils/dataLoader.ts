import * as fs from 'fs';
import * as path from 'path';

export function loadJSON<T>(relativePath: string): T {
  const fullPath = path.resolve(process.cwd(), relativePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}