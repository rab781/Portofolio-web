import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application built with laravel v12. Features include user authentication, product management, and payment processing.",
      image: "/api/placeholder/400/300",
      technologies: ["laravel","blade", "Mysql", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      description: "A responsive weather dashboard that displays current weather and forecasts using OpenWeatherMap API. Built with vanilla JavaScript and modern CSS.",
      image: "/api/placeholder/400/300",
      technologies: ["JavaScript", "CSS3", "OpenWeatherMap API", "Chart.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing projects and skills. Built with Next.js and deployed on Vercel with SEO optimization.",
      image: "/api/placeholder/400/300",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
    },
    {
      title: "Blog Platform",
      description: "A modern blog platform with content management system. Features markdown support, user authentication, and comment system.",
      image: "/api/placeholder/400/300",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "NextAuth"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
    },
    {
      title: "Chat Application",
      description: "Real-time chat application with multiple rooms, file sharing, and emoji support. Built with React and Firebase.",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Firebase", "Material-UI", "PWA"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-900 opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">{project.title}</div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
                  >
                    <Github size={16} className="mr-1" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Other Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm transition-colors duration-300"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 text-sm transition-colors duration-300"
                  >
                    <Github size={14} className="mr-1" />
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
          >
            <Github size={20} className="mr-2" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
