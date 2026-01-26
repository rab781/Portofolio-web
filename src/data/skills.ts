import { SkillCategory } from '@/types/skill';

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "Code2",
    skills: [
      { name: "Python", years: 3, proficiency: "advanced" },
      { name: "JavaScript", years: 2.5, proficiency: "advanced" },
      { name: "TypeScript", years: 1.5, proficiency: "intermediate" },
    ],
  },
  {
    title: "Data Science & Machine Learning",
    icon: "Brain",
    skills: [
      { name: "TensorFlow", years: 2, proficiency: "intermediate" },
      { name: "Scikit-learn", years: 2.5, proficiency: "advanced" },
      { name: "Pandas", years: 3, proficiency: "advanced" },
      { name: "NumPy", years: 3, proficiency: "advanced" },
      // Tambahkan skill lainnya di sini
    ],
  },
  {
    title: "Web Development",
    icon: "Globe",
    skills: [
      { name: "React", years: 2, proficiency: "intermediate" },
      { name: "Next.js", years: 1, proficiency: "intermediate" },
      { name: "Tailwind CSS", years: 1.5, proficiency: "intermediate" },
      { name: "Laravel", years: 1.5, proficiency: "intermediate" },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: "Wrench",
    skills: [
      { name: "Git", years: 3, proficiency: "advanced" },
      { name: "Docker", years: 1, proficiency: "beginner" },
      { name: "Streamlit", years: 1.5, proficiency: "intermediate" },
      // Tambahkan skill lainnya di sini
    ],
  },
];
