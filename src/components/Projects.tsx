import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink, Github, Blocks, Database, Wifi,
  Brain, Bot, MilkOff, ShieldCheck, Wheat, Lock,
} from "lucide-react";

type Category = "All" | "AI/ML" | "Full Stack" | "Blockchain" | "IoT" | "Tools";

const CATEGORIES: Category[] = ["All", "AI/ML", "Full Stack", "Tools", "Blockchain", "IoT"];

const projects = [
  {
    title: "TradeFlow",
    subtitle: "Paddy Trading Operations Platform",
    description:
      "A comprehensive, mobile-first platform that digitizes the entire paddy trading lifecycle — lot entry, kanta weighing, vehicle loading, and buyer redirection. Role-aware access for admins, managers, and stall operators with multi-tenant isolation per organization.",
    tech: ["Next.js", "React 19", "TypeScript", "Supabase", "Tailwind CSS"],
    category: "Full Stack" as Category,
    featured: true,
    icon: Wheat,
    gradient: "from-amber-500/20 to-yellow-500/20",
    githubLink: "https://github.com/sakrishna-bikkumalla/trading-manager.git",
    demoLink: null,
  },
  {
    title: "Daily Dairy",
    subtitle: "Smart Dairy Delivery Management",
    description:
      "A full-stack web app to digitize milk delivery operations. Supports Admin, Customer, and Delivery Agent roles with tailored dashboards, interactive Leaflet maps, subscription tracking, billing, and photo proof of delivery.",
    tech: ["React", "Firebase", "Tailwind CSS", "Leaflet.js", "Cloudinary"],
    category: "Full Stack" as Category,
    featured: true,
    icon: MilkOff,
    gradient: "from-green-500/20 to-emerald-500/20",
    githubLink: "https://github.com/sakrishna-bikkumalla/DailyDairy.git",
    demoLink: "https://farmtohome-cde97.web.app/login",
  },
  {
    title: "GitLab Compliance Checker",
    subtitle: "Analytics & Compliance Platform",
    description:
      "Contributed to an analytics platform for GitLab compliance. Built team leaderboards, date filtering, JSON-based team config, issue tracking, and UI improvements across multiple merge requests.",
    tech: ["Python", "Streamlit", "GitLab API", "Analytics", "JSON"],
    category: "Tools" as Category,
    featured: false,
    icon: ShieldCheck,
    gradient: "from-violet-500/20 to-purple-500/20",
    githubLink: "https://github.com/sakrishna-bikkumalla/compaliance_checker.git",
    demoLink: "https://complianceanalyticstool.streamlit.app",
  },
  {
    title: "PoliSense AI",
    subtitle: "Intelligent Employee Policy Assistant",
    description:
      "Built a RAG-based chatbot for employee onboarding. Integrated Groq Llama-3.1-8B-Instant LLM for context-aware responses. Implemented PDF-based policy retrieval using FAISS vector store and HuggingFace embeddings.",
    tech: ["Python", "LangChain", "Streamlit", "Groq API", "FAISS", "HuggingFace"],
    category: "AI/ML" as Category,
    featured: false,
    icon: Brain,
    gradient: "from-purple-500/20 to-pink-500/20",
    githubLink: "https://code.swecha.org/viswam/internships/icfai-ip-2-hackathon-17-jan/polisense",
    demoLink: null,
  },
  {
    title: "Custom Debugging Agent",
    subtitle: "OpenCode Platform",
    description:
      "Designed a custom AI agent using prompt engineering that analyzes project files with error messages, identifies root causes, classifies error types, and provides top 3 actionable fixes.",
    tech: ["Prompt Engineering", "LLMs", "OpenCode Agents", "Python"],
    category: "AI/ML" as Category,
    featured: false,
    icon: Bot,
    gradient: "from-cyan-500/20 to-blue-500/20",
    githubLink: "https://code.swecha.org/viswam/internships/custom-agents/-/tree/AG1?ref_type=heads",
    demoLink: null,
  },
  {
    title: "Blockchain Product Verification",
    subtitle: "Supply Chain Authenticity",
    description:
      "Built a system that uses public blockchain to verify the authenticity of products, ensuring transparency and trust in supply chains.",
    tech: ["Python", "Flask", "HTML/CSS", "JavaScript", "Blockchain"],
    category: "Blockchain" as Category,
    featured: false,
    icon: Blocks,
    gradient: "from-emerald-500/20 to-teal-500/20",
    githubLink: "https://github.com/sakrishna-bikkumalla/blockchain-product-verification-system.git",
    demoLink: null,
  },
  {
    title: "Rice Mill Management System",
    subtitle: "Business Operations Dashboard",
    description:
      "Full-stack web application for rice mill business operations with comprehensive dashboard and analytics.",
    tech: ["React", "Express.js", "SQLite", "Recharts", "REST API"],
    category: "Full Stack" as Category,
    featured: false,
    icon: Database,
    gradient: "from-blue-500/20 to-indigo-500/20",
    githubLink: "https://github.com/sakrishna-bikkumalla/ricemill-management-system.git",
    demoLink: null,
  },
  {
    title: "IoT WiFi Controlled Car",
    subtitle: "Hardware & Embedded Systems",
    description:
      "Mobile-controlled WiFi car using Arduino Uno board and Blink IoT app for remote operation.",
    tech: ["Arduino", "IoT", "Blink IoT", "C++"],
    category: "IoT" as Category,
    featured: false,
    icon: Wifi,
    gradient: "from-orange-500/20 to-amber-500/20",
    githubLink: null,
    demoLink: null,
  },
];

const MAX_TAGS = 3;

// improvement 3: max 3 tags + "+N more" chip
const TechTags = ({ tech }: { tech: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tech.slice(0, MAX_TAGS).map((t) => (
      <span key={t} className="text-xs px-3 py-1 bg-secondary rounded-full text-foreground/80">
        {t}
      </span>
    ))}
    {tech.length > MAX_TAGS && (
      <span className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
        +{tech.length - MAX_TAGS} more
      </span>
    )}
  </div>
);

// improvement 2: no disabled ghost link — show Private badge instead
const ProjectLinks = ({
  githubLink,
  demoLink,
}: {
  githubLink: string | null;
  demoLink: string | null;
}) => (
  <div className="flex items-center gap-4">
    {githubLink ? (
      <a
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
      >
        <Github size={15} />
        Code
      </a>
    ) : (
      <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">
        <Lock size={11} />
        Private
      </span>
    )}
    {demoLink && (
      <a
        href={demoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
      >
        <ExternalLink size={15} />
        Demo
      </a>
    )}
  </div>
);

const Projects = () => {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, margin: "-100px" });
  // improvement 5: category filter
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const matches = (p: (typeof projects)[0]) =>
    activeCategory === "All" || p.category === activeCategory;

  const featured = projects.filter((p) => p.featured && matches(p));
  const regular = projects.filter((p) => !p.featured && matches(p));

  return (
    <section id="projects" className="section-padding bg-secondary/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Projects
          </span>
          <h2 className="heading-lg">
            Featured <span className="text-gradient">Work</span>
          </h2>
        </motion.div>

        {/* improvement 5: filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-secondary/60 border-border/50 text-muted-foreground hover:text-foreground hover:border-accent/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* improvement 4: featured cards — horizontal landscape layout */}
            {featured.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {featured.map((project) => (
                  <div
                    key={project.title}
                    className="group glass-card overflow-hidden hover-lift flex flex-col"
                  >
                    {/* Gradient header */}
                    <div className={`p-6 bg-gradient-to-br ${project.gradient} flex items-start gap-4`}>
                      <div className="w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <project.icon className="w-7 h-7 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent/80 mb-0.5 block">
                          Featured · {project.category}
                        </span>
                        {/* improvement 1: title clamped to 1 line */}
                        <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                      </div>
                    </div>

                    {/* improvement 1: flex-col body pushes links to bottom */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* improvement 1: line-clamp-3 on description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                      </p>
                      {/* improvement 3: max tags */}
                      <TechTags tech={project.tech} />
                      <div className="mt-auto pt-5">
                        <ProjectLinks githubLink={project.githubLink} demoLink={project.demoLink} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Regular project cards */}
            {regular.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regular.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group glass-card overflow-hidden hover-lift flex flex-col"
                  >
                    {/* Header */}
                    <div className={`p-5 bg-gradient-to-br ${project.gradient}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-11 h-11 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                          <project.icon className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {project.category}
                        </span>
                      </div>
                      {/* improvement 1: line-clamp-1 on title */}
                      <h3 className="text-lg font-semibold leading-snug group-hover:text-accent transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* improvement 1: flex-col body */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* improvement 1: line-clamp-3 */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      {/* improvement 3 */}
                      <TechTags tech={project.tech} />
                      <div className="mt-auto pt-4">
                        <ProjectLinks githubLink={project.githubLink} demoLink={project.demoLink} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {featured.length === 0 && regular.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                No projects in this category yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
