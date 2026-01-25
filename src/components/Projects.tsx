import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export default function Projects() {
  // Tampilkan semua project dari data
  const displayedProjects = projects;

  return (
    <section id="projects" className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-4 font-mono">
            &lt;Data_Projects /&gt;
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
            &quot;// Analysing patterns in the noise&quot;
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="glass-panel-gold rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Project Image */}
              <div className="relative w-full h-48 bg-gray-900 overflow-hidden border-b border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-xs font-mono font-semibold rounded border border-[#00F0FF] text-[#00F0FF]">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors font-mono">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">
                  {project.subtitle}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Call to Action */}
                <div className="flex items-center text-[#00F0FF] font-medium text-sm group-hover:text-[#FFD700]">
                  [ACCESS_CASE_STUDY]
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/rab781"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-900 border border-gray-700 text-gray-300 px-6 py-3 rounded hover:bg-gray-800 hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-300 font-mono"
          >
            <Github size={20} className="mr-2" />
            git remote -v
          </a>
        </div>
      </div>
    </section>
  );
}