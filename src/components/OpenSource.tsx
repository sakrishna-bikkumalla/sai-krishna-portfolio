import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { ExternalLink, GitMerge, Heart, FolderGit2 } from "lucide-react";
import data from "@/data/viswam.json";

// Friendly names + descriptions for known project paths
const projectMeta: Record<string, { name: string; description: string; gradient: string }> = {
  "tools/gitlab-compliance-checker": {
    name: "GitLab Compliance Checker",
    description: "Analytics platform for GitLab compliance — team leaderboards, date filtering, JSON-based team configs, issue tracking, Docker builds, and async event-loop fixes.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  "tools/internship-activity-tracker": {
    name: "Internship Activity Tracker",
    description: "Weekly performance tracker for interns — GraphQL data fetching, corpus integration, 100% test coverage, and report-download tooling.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  "healthcare/medical-camp/ehrs-frontend-vite": {
    name: "eHRS Frontend",
    description: "Electronic Health Record System frontend for medical camps — medicine search, PDF downloads, suggestion-based inputs, role-based redirection.",
    gradient: "from-rose-500/20 to-orange-500/20",
  },
  "healthcare/medical-camp/ehrs-fastapi": {
    name: "eHRS Backend",
    description: "FastAPI backend powering the eHRS — food preferences, signup endpoints, and consultation queue improvements.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  "corpus/corpus-client-app": {
    name: "Corpus Client App",
    description: "Client app for the Corpus platform — UI, integrations, and bug fixes.",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  "viswam/admin/internships/api-collection": {
    name: "API Collection",
    description: "Curated Bruno/Postman API collections for internship platforms.",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  "viswam/admin/internships/corpus-api-collection": {
    name: "Corpus API Collection",
    description: "API collection for the Corpus platform endpoints.",
    gradient: "from-sky-500/20 to-cyan-500/20",
  },
  "viswam/admin/internships/icfai-ip-2-hackathon-17-jan/polisense": {
    name: "PoliSense",
    description: "RAG-based employee policy assistant — Groq Llama-3.1, FAISS, HuggingFace embeddings.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  "viswam/admin/internships/ehrs-api-collection": {
    name: "eHRS API Collection",
    description: "Bruno collection for the eHRS backend endpoints.",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  "viswam/admin/internships/custom-agents": {
    name: "Custom Agents",
    description: "Custom AI agents — prompt-engineered debugging agent for the OpenCode platform.",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  "Mukthanand21/corpus-bruno-collections": {
    name: "Corpus Bruno Collections",
    description: "Bruno API collections for the Corpus ecosystem.",
    gradient: "from-teal-500/20 to-emerald-500/20",
  },
  "soai2025/profiles": {
    name: "Summer of AI 2025 — Profiles",
    description: "Intern profile pages for the Summer of AI 2025 cohort.",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
};

const prettify = (slug: string) =>
  slug.split("/").pop()!.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const projectFromUrl = (url: string): string => {
  const m = url.match(/code\.swecha\.org\/([^]+?)\/-\//);
  return m ? m[1] : "other";
};

const mrNumber = (url: string) => {
  const m = url.match(/merge_requests\/(\d+)/);
  return m ? `MR !${m[1]}` : "MR";
};

const stateStyle = (state: string) => {
  const s = state.toLowerCase();
  if (s === "merged") return "bg-purple-500/15 text-purple-400 border-purple-500/30";
  if (s === "closed") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (s === "opened") return "bg-sky-500/15 text-sky-400 border-sky-500/30";
  return "bg-secondary text-muted-foreground border-border";
};

type MR = { title: string; state: string; date: string; url: string };

const OpenSource = () => {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, margin: "-100px" });

  const groups = useMemo(() => {
    const map = new Map<string, MR[]>();
    (data.mrs as MR[]).forEach((mr) => {
      const key = projectFromUrl(mr.url);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(mr);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1].length - a[1].length)
      .map(([slug, mrs]) => {
        const meta = projectMeta[slug];
        return {
          slug,
          name: meta?.name ?? prettify(slug),
          description: meta?.description ?? "Contributions to this project.",
          gradient: meta?.gradient ?? "from-emerald-500/20 to-teal-500/20",
          projectLink: `https://code.swecha.org/${slug}`,
          mrLink: `https://code.swecha.org/${slug}/-/merge_requests?scope=all&state=all&author_username=Saikrishna_b`,
          mrs,
        };
      });
  }, []);

  return (
    <section id="opensource" className="section-padding" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Community
          </span>
          <h2 className="heading-lg">
            Open Source <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Merge requests grouped by project — {data.mrs.length} MRs across {groups.length} repositories.
          </p>
        </motion.div>

        <div className="space-y-8">
          {groups.map((g, gi) => (
            <motion.div
              key={g.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              className="glass-card overflow-hidden"
            >
              {/* Project Header */}
              <div className={`p-6 bg-gradient-to-br ${g.gradient}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Heart className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="heading-md truncate">{g.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {g.mrs.length} merge request{g.mrs.length === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {g.description}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <a
                    href={g.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    <FolderGit2 size={16} />
                    Project
                  </a>
                  <a
                    href={g.mrLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    <GitMerge size={16} />
                    My Merge Requests
                  </a>
                </div>
              </div>

              {/* Merge Requests */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                  Merge Requests
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {g.mrs.map((mr) => (
                    <a
                      key={mr.url}
                      href={mr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-accent/50 hover:bg-secondary transition-colors flex flex-col"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <GitMerge size={14} className="text-accent flex-shrink-0" />
                          <span className="text-xs text-accent font-medium truncate">
                            {mrNumber(mr.url)}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${stateStyle(mr.state)}`}
                        >
                          {mr.state}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-accent transition-colors mb-2">
                        {mr.title}
                      </p>
                      <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                        <span>{mr.date}</span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
