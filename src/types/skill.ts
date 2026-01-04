export interface Skill {
  name: string;
  years: number; // Lama penggunaan dalam tahun (bisa desimal seperti 2.5 untuk 2.5 tahun)
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'; // Opsional
}

export interface SkillCategory {
  title: string;
  icon: string; // Nama icon dari lucide-react
  skills: Skill[];
}
