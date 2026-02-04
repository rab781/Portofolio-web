import { memo } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

function Projects() {
  const displayedProjects = projects;

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="mb-20">
        <h2 className="text-sm font-bold tracking-widest text-[#EA580C] uppercase mb-4">Selected Work</h2>
        <h3 className="heading-lg">Case Studies</h3>
        <p className="text-xl text-gray-500 max-w-2xl">
          A collection of projects where code meets creativity and data drives decisions.
        </p>
      </div>

      <div className="space-y-12">
        {displayedProjects.map((project, index) => (
          <div
            key={project.id}
            className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px] transition-all duration-300"
            style={{
              top: `${8 + (index * 2)}rem`, // Stacking offset
              zIndex: index + 1
            }}
          >
            {/* Content Left (on desktop) */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between order-2 md:order-1 border-r border-gray-100">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
                  {project.title}
                </h3>
                <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                  {project.subtitle}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-50 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 mt-12">
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-lg font-bold text-[#111111] hover:text-[#EA580C] transition-colors group"
                >
                  View Case Study
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                {index === 0 && ( // Example of conditional extra button
                  <a href="https://github.com/rab781" target="_blank" className="text-gray-400 hover:text-[#111111]">
                    <Github size={24} />
                  </a>
                )}
              </div>
            </div>

            {/* Image Right */}
            <div className="flex-1 bg-gray-100 relative order-1 md:order-2 h-64 md:h-auto">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Projects);
