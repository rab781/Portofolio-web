'use client';

import { memo } from "react";
import { motion } from "framer-motion";
import { Code2, Brain, Globe, Wrench, Database } from "lucide-react";
import { skillCategories } from "@/data/skills";
import * as TechIcons from "@/components/TechIcons";

const getSkillIcon = (skillName: string, categoryIconName: string) => {
  // Map specific skill names to their icons
  const normalize = (s: string) => s.toLowerCase().replace(/\./g, '');
  const name = normalize(skillName);

  switch (name) {
    case 'python': return <TechIcons.PythonIcon />;
    case 'javascript': return <TechIcons.JSIcon />;
    case 'typescript': return <TechIcons.TSIcon />;
    case 'react': return <TechIcons.ReactIcon />;
    case 'nextjs': return <TechIcons.NextIcon />;
    case 'tailwindcss': return <TechIcons.TailwindIcon />;
    case 'tensorflow': return <TechIcons.TensorflowIcon />;
    case 'scikitlearn': return <TechIcons.SkLearnIcon />;
    case 'pandas': return <TechIcons.PandasIcon />;
    case 'numpy': return <TechIcons.NumPyIcon />;
    case 'git': return <TechIcons.GitIcon />;
    case 'docker': return <TechIcons.DockerIcon />;
    case 'streamlit': return <TechIcons.StreamlitIcon />;
    case 'laravel': return <TechIcons.LaravelIcon />;
    default:
      // Fallback to category icon
      switch (categoryIconName) {
        case 'Code2': return <Code2 size={20} />;
        case 'Brain': return <Brain size={20} />;
        case 'Globe': return <Globe size={20} />;
        case 'Wrench': return <Wrench size={20} />;
        default: return <Code2 size={20} />;
      }
  }
};

// Helper to flatten categories for specific rows
const getSkillsFromCategory = (indices: number[]) => {
  return indices.flatMap(idx => {
    const category = skillCategories[idx];
    return category ? category.skills.map(skill => ({
      ...skill,
      icon: category.icon // Pass parent category icon to skill
    })) : [];
  });
};

const MarqueeRow = ({
  skills,
  direction = "left",
  speed = 20
}: {
  skills: any[],
  direction?: "left" | "right",
  speed?: number
}) => {

  // Duplicate list to create seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="flex overflow-hidden relative w-full py-4 group">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          ease: "linear",
          duration: speed, // Slower duration = slower speed
          repeat: Infinity,
        }}
      // Optional: Pause on hover
      // whileHover={{ animationPlayState: "paused" }} // Framer motion doesn't support this directly easily without useAnimation, keep it simple continous flow
      >
        {duplicatedSkills.map((skill, idx) => (
          <div
            key={`${skill.name}-${idx}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FFA239] hover:scale-105 transition-all duration-300 cursor-default"
          >
            <span className={`p-2 rounded-full ${skill.proficiency === 'expert' ? 'bg-[#111111] text-white' :
              skill.proficiency === 'advanced' ? 'bg-blue-100 text-blue-600' :
                'bg-orange-100 text-orange-600'
              }`}>
              {getSkillIcon(skill.name, skill.icon)}
            </span>
            <div>
              <div className="text-base font-bold text-gray-800">{skill.name}</div>
              <div className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                <span className="capitalize">{skill.proficiency}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{skill.years} yr</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

function Skills() {
  // Mapping based on data/skills.ts structure:
  // 0: Programming Languages
  // 1: Data Science
  // 2: Web Dev
  // 3: Tools

  const row1 = getSkillsFromCategory([0]); // Languages
  const row2 = getSkillsFromCategory([1]); // Data Science
  const row3 = getSkillsFromCategory([2, 3]); // Web + Tools

  return (
    <div className="max-w-[100vw] overflow-hidden py-12">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left">
        <h2 className="text-sm font-bold tracking-widest text-[#0D9488] uppercase mb-4">Capabilities</h2>
        <h3 className="heading-lg">Technical Arsenal</h3>
      </div>

      <div className="space-y-4">
        {/* Row 1: Left */}
        <MarqueeRow skills={row1} direction="left" speed={25} />

        {/* Row 2: Right */}
        <MarqueeRow skills={row2} direction="right" speed={30} />

        {/* Row 3: Left */}
        <MarqueeRow skills={row3} direction="left" speed={28} />
      </div>
    </div>
  );
}

export default memo(Skills);
