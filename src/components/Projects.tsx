import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Blocks, Database, Wifi } from "lucide-react";

const projects = [
  {
    title: "Blockchain Product Verification",
    description:
      "Built a system that uses public blockchain to verify the authenticity of products, ensuring transparency and trust in supply chains.",
    tech: ["Python", "Flask", "HTML/CSS", "JavaScript", "Blockchain"],
    icon: Blocks,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Rice Mill Management System",
    description:
      "Full-stack web application for rice mill business operations with comprehensive dashboard and analytics.",
    tech: ["React", "Express.js", "SQLite", "Recharts", "REST API"],
    icon: Database,
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "IoT WiFi Controlled Car",
    description:
      "Mobile-controlled WiFi car using Arduino Uno board and Blink IoT app for remote operation.",
    tech: ["Arduino", "IoT", "Blink IoT", "C++"],
    icon: Wifi,
    gradient: "from-orange-500/20 to-amber-500/20",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Projects
          </span>
          <h2 className="heading-lg">
            Featured <span className="text-gradient">Work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group glass-card overflow-hidden hover-lift"
            >
              {/* Project Header */}
              <div className={`p-6 bg-gradient-to-br ${project.gradient}`}>
                <div className="w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center mb-4">
                  <project.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="heading-md group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Project Body */}
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-secondary rounded-full text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                    <Github size={16} />
                    Code
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                    <ExternalLink size={16} />
                    Demo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
