import { memo } from "react";
import { Code2, Brain, Globe, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";
import type { LucideProps } from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Code2,
  Brain,
  Globe,
  Wrench,
};

const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName] || Code2;
  return <IconComponent className="w-6 h-6" />;
};

function Skills() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-sm font-bold tracking-widest text-[#0D9488] uppercase mb-4">Capabilities</h2>
        <h3 className="heading-lg">Technical Arsenal</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gray-50 rounded-lg text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors">
                {getIcon(category.icon)}
              </div>
              <h3 className="text-xl font-bold text-[#111111] ml-4">
                {category.title}
              </h3>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <span className="text-gray-700 font-medium">
                    {skill.name}
                  </span>

                  <div className="flex items-center">
                    <span className="text-sm text-gray-400 mr-4">
                      {skill.years} yr
                    </span>
                    <div className={`w-2 h-2 rounded-full ${skill.proficiency === 'expert' ? 'bg-[#111111]' :
                        skill.proficiency === 'advanced' ? 'bg-[#0D9488]' :
                          'bg-gray-300'
                      }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Skills);
