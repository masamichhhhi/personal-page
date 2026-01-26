import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import type { Links } from '@/types/links';

export function loadLinks(): Links {
  const linksPath = path.join(process.cwd(), 'src/data/links.yaml');
  const fileContents = fs.readFileSync(linksPath, 'utf8');
  return yaml.parse(fileContents) as Links;
}
