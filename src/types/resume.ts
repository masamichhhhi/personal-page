export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  location?: string;
  responsibilities: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  summary: string;
  role: string;
  technologies: string[];
  period: string;
  url?: string;
}

export interface Resume {
  name: string;
  title: string;
  email: string;
  location?: string;
  summary: string;
  experiences: WorkExperience[];
  skills: Skill[];
  projects: Project[];
}
