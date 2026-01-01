import { Code, Database, Globe } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Globe className="w-8 h-8" />,
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 95 },
      ],
    },
    {
      title: "Backend Development",
      icon: <Database className="w-8 h-8" />,
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 75 },
        { name: "PostgreSQL", level: 80 },
      ],
    },
    {
      title: "Tools & Technologies",
      icon: <Code className="w-8 h-8" />,
      skills: [
        { name: "Git", level: 90 },
      ],
    },
  ];

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
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="text-blue-600 dark:text-blue-400 mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Always Learning
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Technology evolves rapidly, and I&apos;m committed to continuous learning. 
            I regularly explore new frameworks, attend tech conferences, and contribute 
            to open-source projects to stay at the forefront of web development.
          </p>
        </div>
      </div>
    </section>
  );
}
