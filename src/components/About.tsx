export default function About() {
  return (
    <section id="about" className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-4 font-mono">
            &lt;About_Me /&gt;
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
            // Get to know more about who I am
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square bg-gradient-to-br from-[#0A1120] to-[#050A14] rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.1)] border border-[#FFD700]/30 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="text-[#FFD700] text-9xl font-bold group-hover:scale-110 transition-transform duration-500">YN</div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Passionate Developer & Problem Solver
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I&apos;m a dedicated web developer with a passion for creating efficient,
              scalable, and user-friendly applications. With experience in both
              frontend and backend technologies, I enjoy the complete process of
              bringing ideas to life.
            </p>
            <p className="text-gray-300 leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with the
              developer community. I believe in continuous learning and staying
              up-to-date with the latest industry trends.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-[#00F0FF] mb-2 font-mono">
                  Frontend Focus
                </h4>
                <p className="text-gray-400 text-sm">
                  Creating intuitive and responsive user interfaces with modern frameworks
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-[#00F0FF] mb-2 font-mono">
                  Backend Expertise
                </h4>
                <p className="text-gray-400 text-sm">
                  Building robust server-side applications and RESTful APIs
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#FFD700] hover:bg-[#D4AF37] text-black px-6 py-3 rounded font-bold transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.4)]"
              >
                DOWNLOAD_RESUME
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
