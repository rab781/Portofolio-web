import { Code2, Brain, Globe, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";
import type { LucideProps } from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Code2,
  Brain,
  Globe,
  Wrench,
};

// Helper function untuk mengambil icon dari lucide-react berdasarkan nama
const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName] || Code2; // Default to Code2 if not found
  return <IconComponent className="w-8 h-8" />;
};



export default function Skills() {

  return (
    <section id="skills" className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-4 font-mono">
            &lt;Skills_Matrix /&gt;
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
            &quot;// Loaded modules and capabilities&quot;
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="glass-panel rounded-xl p-6 border border-gray-700/50 hover:border-[#FFD700] transition-colors duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="text-[#00F0FF] mr-3">
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-xl font-bold text-white font-mono">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="text-gray-200 font-medium block font-mono">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 text-sm font-mono">
                        {skill.years} {skill.years === 1 ? 'year' : 'years'} exp
                      </span>
                    </div>
                    {skill.proficiency && (
                      <span className={`px-3 py-1 rounded text-xs font-bold uppercase font-mono ${skill.proficiency === 'expert' ? 'text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20' :
                        skill.proficiency === 'advanced' ? 'text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20' :
                          'text-gray-400 bg-gray-800'
                        }`}>
                        {skill.proficiency}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8 font-mono">
            [CONTINUOUS_LEARNING_PROTOCOL]
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Technology evolves rapidly, and I&apos;m committed to continuous learning.
            I regularly explore new frameworks, attend tech conferences, and contribute
            to open-source projects to stay at the forefront of web development.
          </p>
        </div>
      </div>
    </section>
  );
}
