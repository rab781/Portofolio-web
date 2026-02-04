// src/types/project.ts

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  problem: string;
  dataOverview: string;
  methodology: string[];
  results: string[];
}
