import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Blocks, Database, Wifi, Brain, Bot } from "lucide-react";

const projects = [
  {
    title: "PoliSense AI - Intelligent Employee Policy Assistant",
    description:
      "Built a RAG-based chatbot for employee onboarding. Integrated Groq Llama-3.1-8B-Instant LLM for context-aware responses. Implemented PDF-based policy retrieval using FAISS vector store and HuggingFace embeddings.",
    tech: ["Python", "LangChain", "Streamlit", "Groq API", "FAISS", "HuggingFace"],
    icon: Brain,
    gradient: "from-purple-500/20 to-pink-500/20",
    githubLink: "https://code.swecha.org/viswam/internships/icfai-ip-2-hackathon-17-jan/polisense",
  },
  {
    title: "Custom Debugging Agent - OpenCode Platform",
    description:
      "Designed a custom AI agent using prompt engineering that analyzes project files with error messages, identifies root causes, classifies error types, and provides top 3 actionable fixes.",
    tech: ["Prompt Engineering", "LLMs", "OpenCode Agents", "Python"],
    icon: Bot,
    gradient: "from-cyan-500/20 to-blue-500/20",
    githubLink: "https://code.swecha.org/viswam/internships/custom-agents/-/tree/AG1?ref_type=heads",
  },
  {
    title: "Blockchain Product Verification",
    description:
      "Built a system that uses public blockchain to verify the authenticity of products, ensuring transparency and trust in supply chains.",
    tech: ["Python", "Flask", "HTML/CSS", "JavaScript", "Blockchain"],
    icon: Blocks,
    gradient: "from-emerald-500/20 to-teal-500/20",
    githubLink: "https://github.com/sakrishna-bikkumalla/blockchain-product-verification-system.git",
  },
  {
    title: "Rice Mill Management System",
    description:
      "Full-stack web application for rice mill business operations with comprehensive dashboard and analytics.",
    tech: ["React", "Express.js", "SQLite", "Recharts", "REST API"],
    icon: Database,
    gradient: "from-blue-500/20 to-indigo-500/20",
    githubLink: "https://github.com/sakrishna-bikkumalla/ricemill-management-system.git",
  },
  {
    title: "IoT WiFi Controlled Car",
    description:
      "Mobile-controlled WiFi car using Arduino Uno board and Blink IoT app for remote operation.",
    tech: ["Arduino", "IoT", "Blink IoT", "C++"],
    icon: Wifi,
    gradient: "from-orange-500/20 to-amber-500/20",
    githubLink: null,
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding bg-secondary/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
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
              animate={visible ? { opacity: 1, y: 0 } : {}}
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
                  {project.githubLink ? (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-muted-foreground/50">
                      <Github size={16} />
                      Code
                    </span>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
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
