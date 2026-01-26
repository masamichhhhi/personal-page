import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import type { Resume } from '@/types/resume';

export function loadResume(): Resume {
  const resumePath = path.join(process.cwd(), 'src/data/resume.yaml');
  const fileContents = fs.readFileSync(resumePath, 'utf8');
  return yaml.parse(fileContents) as Resume;
}
