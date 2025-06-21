export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what skills I have
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-xl flex items-center justify-center">
              <div className="text-white text-6xl font-bold">YN</div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Passionate Developer & Problem Solver
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I&apos;m a dedicated web developer with a passion for creating efficient, 
              scalable, and user-friendly applications. With experience in both 
              frontend and backend technologies, I enjoy the complete process of 
              bringing ideas to life.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with the 
              developer community. I believe in continuous learning and staying 
              up-to-date with the latest industry trends.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Frontend Focus
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Creating intuitive and responsive user interfaces with modern frameworks
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Backend Expertise
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Building robust server-side applications and RESTful APIs
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
