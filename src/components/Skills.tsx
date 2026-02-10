'use client';

import { memo } from "react";
import { motion } from "framer-motion";
import { Code2, Brain, Globe, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";
import * as TechIcons from "@/components/TechIcons";
import { Skill } from "@/types/skill";

interface SkillWithIcon extends Skill {
  icon?: string;
}

const getSkillIcon = (skillName: string, categoryIconName?: string) => {
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
        case 'Code2': return <Code2 size={24} />;
        case 'Brain': return <Brain size={24} />;
        case 'Globe': return <Globe size={24} />;
        case 'Wrench': return <Wrench size={24} />;
        default: return <Code2 size={24} />;
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
  speed = 1.2
}: {
  skills: SkillWithIcon[],
  direction?: "left" | "right",
  speed?: number
}) => {

  // Duplicate list to create seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="flex overflow-hidden relative w-full py-6 group">
      {/* Soft Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 sm:gap-6 whitespace-nowrap pl-4"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {duplicatedSkills.map((skill, idx) => (
          <div
            key={`${skill.name}-${idx}`}
            className="
              relative group/card
              flex flex-col items-center justify-center
              w-[160px] h-[160px] sm:w-[180px] sm:h-[180px]
              rounded-2xl
              bg-[#D4D4D4] backdrop-blur-md
              border border-gray-200/60
              shadow-sm
              hover:shadow-lg
              hover:bg-white
              hover:border-gray-200
              hover:scale-105
              transition-all duration-500 ease-out
              cursor-default
              overflow-hidden
            "
          >
            {/* Subtle Gradient Spot */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/[0.02] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

            {/* Icon Container */}
            <div className="
              mb-4 p-4 rounded-2xl
              bg-white/90
              shadow-sm
              group-hover/card:scale-110 group-hover/card:shadow-md
              transition-all duration-500
            ">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                {getSkillIcon(skill.name, skill.icon)}
              </div>
            </div>

            {/* Content */}
            <div className="text-center relative z-10">
              <div className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight group-hover/card:text-black transition-colors duration-300 mb-1">
                {skill.name}
              </div>
              <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover/card:opacity-90 transition-opacity duration-300">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{skill.proficiency}</span>
              </div>
              <div className="mt-1 text-[10px] font-medium text-gray-400 bg-gray-100/50 px-2 py-0.5 rounded-full inline-block">
                {skill.years} Years
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

function Skills() {
  const row1 = getSkillsFromCategory([0]); // Languages
  const row2 = getSkillsFromCategory([1]); // Data Science
  const row3 = getSkillsFromCategory([2, 3]); // Web + Tools

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container-width px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#0D9488] uppercase mb-3">
            Capabilities
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">
            Technical Arsenal
          </h3>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A curated set of tools and technologies I use to build premium digital experiences.
          </p>
        </motion.div>
      </div>

      <div className="space-y-2 relative z-10">
        <MarqueeRow skills={row1} direction="left" speed={10} />
        <MarqueeRow skills={row2} direction="right" speed={10} />
        <MarqueeRow skills={row3} direction="left" speed={10} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
}

export default memo(Skills);
