import * as LucideIcons from "lucide-react";
import { skillCategories } from "@/data/skills";

// Helper function untuk mengambil icon dari lucide-react berdasarkan nama
const getIcon = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Code;
  return <IconComponent className="w-8 h-8" />;
};

// Helper function untuk mendapatkan warna badge berdasarkan proficiency
const getProficiencyColor = (proficiency?: string) => {
  switch (proficiency) {
    case 'expert':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'advanced':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'intermediate':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'beginner':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

export default function Skills() {

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring your ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-6">
                <div className="text-blue-600 dark:text-blue-400 mr-3">
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="text-gray-900 dark:text-gray-100 font-medium block">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {skill.years} {skill.years === 1 ? 'year' : 'years'} experience
                      </span>
                    </div>
                    {skill.proficiency && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getProficiencyColor(skill.proficiency)}`}>
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
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Continuous Growth
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Technology evolves rapidly, and I&apos;m committed to continuous learning and improvement. 
            I actively explore emerging technologies, contribute to open-source projects, and apply 
            best practices to deliver high-quality solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
