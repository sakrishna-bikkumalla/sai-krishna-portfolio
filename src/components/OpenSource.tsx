import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { ExternalLink, GitMerge, FolderGit2, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import data from "@/data/viswam.json";

type MR = { title: string; state: string; date: string; url: string };
type Domain = "Healthcare" | "Tools" | "Corpus" | "Others";

const projectMeta: Record<
  string,
  { name: string; description: string; gradient: string; color: string; domain: Domain }
> = {
  "tools/gitlab-compliance-checker": {
    name: "GitLab Compliance Checker",
    description: "Analytics platform for GitLab compliance — team leaderboards, date filtering, JSON-based team configs, issue tracking, Docker builds, and async event-loop fixes.",
    gradient: "from-violet-500/20 to-purple-500/20",
    color: "#8b5cf6",
    domain: "Tools",
  },
  "tools/internship-activity-tracker": {
    name: "Internship Activity Tracker",
    description: "Weekly performance tracker for interns — GraphQL data fetching, corpus integration, 100% test coverage, and report-download tooling.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    color: "#10b981",
    domain: "Tools",
  },
  "healthcare/medical-camp/ehrs-frontend-vite": {
    name: "eHRS Frontend",
    description: "Electronic Health Record System frontend for medical camps — medicine search, PDF downloads, suggestion-based inputs, role-based redirection.",
    gradient: "from-rose-500/20 to-orange-500/20",
    color: "#f43f5e",
    domain: "Healthcare",
  },
  "healthcare/medical-camp/ehrs-fastapi": {
    name: "eHRS Backend",
    description: "FastAPI backend powering the eHRS — food preferences, signup endpoints, and consultation queue improvements.",
    gradient: "from-pink-500/20 to-rose-500/20",
    color: "#ec4899",
    domain: "Healthcare",
  },
  "corpus/corpus-client-app": {
    name: "Corpus Client App",
    description: "Client app for the Corpus platform — UI, integrations, and bug fixes.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    color: "#06b6d4",
    domain: "Corpus",
  },
  "viswam/admin/internships/api-collection": {
    name: "API Collection",
    description: "Curated Bruno/Postman API collections for internship platforms.",
    gradient: "from-amber-500/20 to-yellow-500/20",
    color: "#f59e0b",
    domain: "Tools",
  },
  "viswam/admin/internships/corpus-api-collection": {
    name: "Corpus API Collection",
    description: "API collection for the Corpus platform endpoints.",
    gradient: "from-sky-500/20 to-cyan-500/20",
    color: "#0ea5e9",
    domain: "Tools",
  },
  "viswam/admin/internships/icfai-ip-2-hackathon-17-jan/polisense": {
    name: "PoliSense",
    description: "RAG-based employee policy assistant — Groq Llama-3.1, FAISS, HuggingFace embeddings.",
    gradient: "from-purple-500/20 to-pink-500/20",
    color: "#a855f7",
    domain: "Others",
  },
  "viswam/admin/internships/ehrs-api-collection": {
    name: "eHRS API Collection",
    description: "Bruno collection for the eHRS backend endpoints.",
    gradient: "from-indigo-500/20 to-violet-500/20",
    color: "#6366f1",
    domain: "Healthcare",
  },
  "viswam/admin/internships/custom-agents": {
    name: "Custom Agents",
    description: "Custom AI agents — prompt-engineered debugging agent for the OpenCode platform.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    color: "#3b82f6",
    domain: "Tools",
  },
  "Mukthanand21/corpus-bruno-collections": {
    name: "Corpus Bruno Collections",
    description: "Bruno API collections for the Corpus ecosystem.",
    gradient: "from-teal-500/20 to-emerald-500/20",
    color: "#14b8a6",
    domain: "Corpus",
  },
};

const DOMAIN_ORDER: Domain[] = ["Healthcare", "Tools", "Corpus", "Others"];

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

const domainLabelStyle: Record<Domain, string> = {
  Healthcare: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  Tools:      "text-violet-400 bg-violet-500/10 border-violet-500/30",
  Corpus:     "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  Others:     "text-amber-400 bg-amber-500/10 border-amber-500/30",
};

const OpenSource = () => {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, margin: "-100px" });

  // Build groups enriched with meta + state counts
  const groups = useMemo(() => {
    const map = new Map<string, MR[]>();
    (data.mrs as MR[]).forEach((mr) => {
      const key = projectFromUrl(mr.url);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(mr);
    });
    return Array.from(map.entries())
      .filter(([slug]) => slug !== "soai2025/profiles")
      .sort((a, b) => b[1].length - a[1].length)
      .map(([slug, mrs]) => {
        const meta = projectMeta[slug];
        const counts = { merged: 0, closed: 0, opened: 0 };
        mrs.forEach((mr) => {
          const s = mr.state.toLowerCase() as keyof typeof counts;
          if (s in counts) counts[s]++;
        });
        return {
          slug,
          name: meta?.name ?? prettify(slug),
          description: meta?.description ?? "Contributions to this project.",
          gradient: meta?.gradient ?? "from-emerald-500/20 to-teal-500/20",
          color: meta?.color ?? "#10b981",
          domain: (meta?.domain ?? "Others") as Domain,
          projectLink: `https://code.swecha.org/${slug}`,
          mrLink: `https://code.swecha.org/${slug}/-/merge_requests?scope=all&state=all&author_username=Saikrishna_b`,
          mrs,
          counts,
        };
      });
  }, []);

  // Group by domain in fixed order
  const byDomain = useMemo(() => {
    const map = new Map<Domain, typeof groups>(DOMAIN_ORDER.map((d) => [d, []]));
    groups.forEach((g) => map.get(g.domain)!.push(g));
    return Array.from(map.entries()).filter(([, items]) => items.length > 0);
  }, [groups]);

  return (
    <section id="opensource" className="section-padding" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* ── Heading ── improvement 3: tighter mb-10 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Community
          </span>
          <h2 className="heading-lg">
            Open Source <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {data.mrs.length} MRs across {groups.length} repositories — click a project to explore.
          </p>
        </motion.div>

        {/* ── Domain groups ── improvement 6 */}
        <div className="space-y-8">
          {byDomain.map(([domain, items], di) => (
            <motion.div
              key={domain}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + di * 0.1 }}
            >
              {/* Domain label */}
              <div className="flex items-center gap-3 mb-3 px-1">
                <span
                  className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${domainLabelStyle[domain]}`}
                >
                  {domain}
                </span>
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground">
                  {items.reduce((s, g) => s + g.mrs.length, 0)} MRs
                </span>
              </div>

              {/* Accordion card */}
              <div className="glass-card overflow-hidden">
                <Accordion type="single" collapsible className="divide-y divide-border/50">
                  {items.map((g) => (
                    <AccordionItem key={g.slug} value={g.slug} className="border-0">
                      {/* ── improvement 1: left border accent + improvement 5: hover gradient */}
                      <div className="relative overflow-hidden group">
                        {/* Hover gradient bleed from left */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `linear-gradient(to right, ${g.color}18, transparent 60%)`,
                          }}
                        />
                        {/* Left border accent */}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                          style={{ background: g.color }}
                        />

                        <AccordionTrigger className="pl-8 pr-6 py-5 hover:no-underline transition-colors [&>svg]:hidden w-full">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="flex-1 min-w-0 text-left">
                              {/* improvement 4: no description in collapsed row */}
                              <span className="font-semibold text-base group-hover:text-accent transition-colors">
                                {g.name}
                              </span>
                            </div>

                            {/* improvement 2: state breakdown pills */}
                            <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                              {g.counts.merged > 0 && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 font-medium">
                                  {g.counts.merged} merged
                                </span>
                              )}
                              {g.counts.closed > 0 && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                                  {g.counts.closed} closed
                                </span>
                              )}
                              {g.counts.opened > 0 && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 font-medium">
                                  {g.counts.opened} open
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
                                {g.mrs.length} MR{g.mrs.length !== 1 ? "s" : ""}
                              </span>
                              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </div>
                          </div>
                        </AccordionTrigger>
                      </div>

                      <AccordionContent className="pl-8 pr-6 pb-6 pt-0">
                        {/* Description shown only when expanded */}
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {g.description}
                        </p>

                        {/* Project links */}
                        <div className="flex items-center gap-4 mb-5 pb-4 border-b border-border/50">
                          <a
                            href={g.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors"
                          >
                            <FolderGit2 size={14} />
                            Project
                          </a>
                          <a
                            href={g.mrLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors"
                          >
                            <GitMerge size={14} />
                            All My MRs
                          </a>
                        </div>

                        {/* MR grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {g.mrs.map((mr) => (
                            <a
                              key={mr.url}
                              href={mr.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/mr p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-accent/50 hover:bg-secondary transition-colors flex flex-col"
                            >
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <GitMerge size={13} className="text-accent flex-shrink-0" />
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
                              <p className="text-sm font-medium text-foreground line-clamp-2 group-hover/mr:text-accent transition-colors mb-2">
                                {mr.title}
                              </p>
                              <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                                <span>{mr.date}</span>
                                <ExternalLink size={11} className="opacity-0 group-hover/mr:opacity-100 transition-opacity" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
