import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import { FolderGit2, GitMerge, AlertCircle, GitCommit, ExternalLink, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import data from "@/data/viswam.json";

type Category = "projects" | "mrs" | "issues" | "commits" | null;
type Item = { primary: string; secondary?: string; meta?: string; url: string; project: string };

const stats = [
  { key: "projects" as const, label: "Contributed Projects", count: data.projects.length, icon: FolderGit2, gradient: "from-emerald-500/20 to-green-500/20" },
  { key: "mrs" as const, label: "Merge Requests", count: data.mrs.length, icon: GitMerge, gradient: "from-purple-500/20 to-pink-500/20" },
  { key: "issues" as const, label: "Issues", count: data.issues.length, icon: AlertCircle, gradient: "from-orange-500/20 to-amber-500/20" },
  { key: "commits" as const, label: "Commits", count: data.commits.length, icon: GitCommit, gradient: "from-cyan-500/20 to-blue-500/20" },
];

// Extract a short project slug from a code.swecha.org URL
const projectFromUrl = (url: string): string => {
  const m = url.match(/code\.swecha\.org\/([^]+?)\/-\//);
  if (!m) return "other";
  const parts = m[1].split("/");
  return parts[parts.length - 1];
};

const ALL = "all";

const ViswamContributions = () => {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<Category>(null);
  const [query, setQuery] = useState("");
  const [activeProject, setActiveProject] = useState<string>(ALL);

  const allItems = useMemo<Item[]>(() => {
    if (!open) return [];
    if (open === "projects") {
      return data.projects.map((p) => ({ primary: p.name, url: p.url, project: p.name }));
    }
    if (open === "mrs") {
      return data.mrs.map((m) => ({ primary: m.title, secondary: m.state, meta: m.date, url: m.url, project: projectFromUrl(m.url) }));
    }
    if (open === "issues") {
      return data.issues.map((m) => ({ primary: m.title, secondary: m.state, meta: m.date, url: m.url, project: projectFromUrl(m.url) }));
    }
    return data.commits.map((c) => ({ primary: c.message, secondary: c.project, meta: c.date, url: c.url, project: c.project }));
  }, [open]);

  // Project tabs: count per project, sorted by count desc
  const projectTabs = useMemo(() => {
    if (!open || open === "projects") return [];
    const counts = new Map<string, number>();
    allItems.forEach((it) => counts.set(it.project, (counts.get(it.project) ?? 0) + 1));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [allItems, open]);

  // Reset filters when dialog opens or category changes
  useEffect(() => {
    setQuery("");
    setActiveProject(ALL);
  }, [open]);

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase();
    return allItems.filter((it) => {
      if (activeProject !== ALL && it.project !== activeProject) return false;
      if (!q) return true;
      return (
        it.primary.toLowerCase().includes(q) ||
        (it.secondary?.toLowerCase().includes(q) ?? false) ||
        it.project.toLowerCase().includes(q)
      );
    });
  }, [allItems, query, activeProject]);

  const titleMap: Record<Exclude<Category, null>, string> = {
    projects: "Contributed Projects",
    mrs: "Merge Requests",
    issues: "Issues",
    commits: "Commits",
  };

  const stateColor = (state?: string) => {
    if (!state) return "bg-background/60 text-muted-foreground";
    const s = state.toLowerCase();
    if (s === "merged") return "bg-purple-500/15 text-purple-400 border border-purple-500/30";
    if (s === "closed") return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
    if (s === "opened") return "bg-sky-500/15 text-sky-400 border border-sky-500/30";
    return "bg-background/60 text-muted-foreground";
  };

  return (
    <section id="viswam" className="section-padding bg-secondary/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Viswam AI Internship
          </span>
          <h2 className="heading-lg">
            My <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Click any card to explore the full list, grouped by project.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.button
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setOpen(s.key)}
              className="glass-card p-6 hover-lift text-left group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4`}>
                <s.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="text-4xl font-bold text-gradient mb-1">{s.count}</div>
              <div className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                {s.label}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{open && titleMap[open]}</DialogTitle>
            <DialogDescription>
              Showing {filteredItems.length} of {allItems.length}
              {activeProject !== ALL && ` in ${activeProject}`}
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {projectTabs.length > 0 && (
            <div className="relative -mx-6 px-6">
              <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1 snap-x">
                <button
                  onClick={() => setActiveProject(ALL)}
                  className={`whitespace-nowrap snap-start px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    activeProject === ALL
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-secondary/60 border-border/50 text-muted-foreground hover:text-foreground hover:border-accent/40"
                  }`}
                >
                  All <span className="opacity-70">· {allItems.length}</span>
                </button>
                {projectTabs.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setActiveProject(t.name)}
                    className={`whitespace-nowrap snap-start px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      activeProject === t.name
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-secondary/60 border-border/50 text-muted-foreground hover:text-foreground hover:border-accent/40"
                    }`}
                  >
                    {t.name} <span className="opacity-70">· {t.count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="overflow-y-auto flex-1 -mx-2 px-2">
            <ul className="space-y-2">
              {filteredItems.map((it, idx) => (
                <motion.li
                  key={`${activeProject}-${idx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.01, 0.2) }}
                >
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 hover:border-accent/50 hover:bg-secondary transition-colors group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                        {it.primary}
                      </p>
                      <div className="flex items-center flex-wrap gap-2 mt-1.5 text-xs text-muted-foreground">
                        {open !== "projects" && (
                          <span className="px-2 py-0.5 rounded-full bg-background/60 border border-border/40">
                            {it.project}
                          </span>
                        )}
                        {it.secondary && open !== "commits" && (
                          <span className={`px-2 py-0.5 rounded-full ${stateColor(it.secondary)}`}>
                            {it.secondary}
                          </span>
                        )}
                        {it.meta && <span>{it.meta}</span>}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent flex-shrink-0 mt-1" />
                  </a>
                </motion.li>
              ))}
              {filteredItems.length === 0 && (
                <li className="text-center text-sm text-muted-foreground py-8">No results</li>
              )}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ViswamContributions;
