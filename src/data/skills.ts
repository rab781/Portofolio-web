import { SkillCategory } from '@/types/skill';

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages & Frameworks",
    icon: "Code2",
    skills: [
      { name: "Python", years: 3, proficiency: "advanced" },
      { name: "SQL", years: 2, proficiency: "advanced" },
      { name: "HTML/CSS", years: 2, proficiency: "advanced" },
      { name: "JavaScript", years: 2.5, proficiency: "advanced" },
    ],
  },
  {
    title: "Data Science & AI",
    icon: "Brain",
    skills: [
      { name: "TensorFlow", years: 2, proficiency: "intermediate" },
      { name: "YOLOv8", years: 1.5, proficiency: "advanced" },
      { name: "Scikit-Learn", years: 2.5, proficiency: "advanced" },
      { name: "Pandas", years: 3, proficiency: "advanced" },
      { name: "NumPy", years: 3, proficiency: "advanced" },
      { name: "Deep Learning", years: 2, proficiency: "intermediate" },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "Wrench",
    skills: [
      { name: "VS Code", years: 3, proficiency: "advanced" },
      { name: "Git/GitHub", years: 3, proficiency: "advanced" },
      { name: "Jupyter", years: 3, proficiency: "advanced" },
      { name: "Telegram API", years: 1, proficiency: "intermediate" },
      { name: "Binance API", years: 1, proficiency: "intermediate" },
    ],
  },
  {
    title: "Organizational & Soft Skills",
    icon: "Globe",
    skills: [
      { name: "Leadership", years: 2, proficiency: "advanced" },
      { name: "Public Speaking", years: 2, proficiency: "advanced" },
      { name: "Problem Solving", years: 3, proficiency: "advanced" },
      { name: "Time Management", years: 3, proficiency: "advanced" },
    ],
  },
];
