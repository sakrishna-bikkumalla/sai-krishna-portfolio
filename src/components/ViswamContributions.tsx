import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { FolderGit2, GitMerge, AlertCircle, GitCommit, ExternalLink, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import data from "@/data/viswam.json";

type Category = "projects" | "mrs" | "issues" | "commits" | null;

const stats = [
  { key: "projects" as const, label: "Contributed Projects", count: data.projects.length, icon: FolderGit2, gradient: "from-emerald-500/20 to-green-500/20" },
  { key: "mrs" as const, label: "Merge Requests", count: data.mrs.length, icon: GitMerge, gradient: "from-purple-500/20 to-pink-500/20" },
  { key: "issues" as const, label: "Issues", count: data.issues.length, icon: AlertCircle, gradient: "from-orange-500/20 to-amber-500/20" },
  { key: "commits" as const, label: "Commits", count: data.commits.length, icon: GitCommit, gradient: "from-cyan-500/20 to-blue-500/20" },
];

const ViswamContributions = () => {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<Category>(null);
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    if (!open) return [] as Array<{ primary: string; secondary?: string; meta?: string; url: string }>;
    const q = query.toLowerCase();
    if (open === "projects") {
      return data.projects
        .filter((p) => p.name.toLowerCase().includes(q))
        .map((p) => ({ primary: p.name, url: p.url }));
    }
    if (open === "mrs") {
      return data.mrs
        .filter((m) => m.title.toLowerCase().includes(q))
        .map((m) => ({ primary: m.title, secondary: m.state, meta: m.date, url: m.url }));
    }
    if (open === "issues") {
      return data.issues
        .filter((m) => m.title.toLowerCase().includes(q))
        .map((m) => ({ primary: m.title, secondary: m.state, meta: m.date, url: m.url }));
    }
    return data.commits
      .filter((c) => c.message.toLowerCase().includes(q) || c.project.toLowerCase().includes(q))
      .map((c) => ({ primary: c.message, secondary: c.project, meta: c.date, url: c.url }));
  }, [open, query]);

  const titleMap: Record<Exclude<Category, null>, string> = {
    projects: "Contributed Projects",
    mrs: "Merge Requests",
    issues: "Issues",
    commits: "Commits",
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
            Click any card to explore the full list with direct links.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.button
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => { setOpen(s.key); setQuery(""); }}
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
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{open && titleMap[open]}</DialogTitle>
            <DialogDescription>
              {items.length} {open === "commits" ? "commits" : open === "projects" ? "projects" : open === "mrs" ? "merge requests" : "issues"}
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
          <div className="overflow-y-auto flex-1 -mx-2 px-2">
            <ul className="space-y-2">
              {items.map((it, idx) => (
                <li key={idx}>
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
                      {(it.secondary || it.meta) && (
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          {it.secondary && (
                            <span className="px-2 py-0.5 rounded-full bg-background/60">{it.secondary}</span>
                          )}
                          {it.meta && <span>{it.meta}</span>}
                        </div>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent flex-shrink-0 mt-1" />
                  </a>
                </li>
              ))}
              {items.length === 0 && (
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
