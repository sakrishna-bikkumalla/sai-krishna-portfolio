import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, GitMerge, Heart } from "lucide-react";

const contributions = [
  {
    project: "EHRS - Electronic Health Record System",
    description:
      "A healthcare platform designed to manage medical records, medicines, prescriptions, and volunteer activities during medical camps. Contributed frontend features, UI improvements, bug fixes, and backend enhancements.",
    mergeRequests: [
      { title: "Medicine Search Feature", description: "Implemented search functionality in medicine list", mr: "MR !203" },
      { title: "Replace Medicine Search", description: "Replaced dropdown with searchable suggestions", mr: "MR !184" },
      { title: "Dynamic Text Fields", description: "Converted dropdown inputs into suggestion-based text fields", mr: "MR !151" },
      { title: "Medicine PDF Download", description: "Enabled volunteers to download medicine list as PDF", mr: "MR !185" },
      { title: "Counseling Error Improvements", description: "Improved validation and error feedback", mr: "MR !111" },
      { title: "Mobile Back Button Fix", description: "Fixed navigation behavior in mobile interface", mr: "MR !126" },
      { title: "Food Preferences - Frontend", description: "Added food preferences to the camp signup page", mr: "MR !284" },
      { title: "Food Preferences - Backend", description: "Added food preferences in the signup for medical camp endpoint", mr: "MR !131" },
    ],
    projectLink: "https://code.swecha.org/healthcare/medical-camp",
    mrLink: "https://code.swecha.org/groups/healthcare/medical-camp/-/merge_requests?scope=all&state=merged&assignee_username=Saikrishna_b",
  },
];

const OpenSource = () => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="opensource" className="section-padding" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Community
          </span>
          <h2 className="heading-lg">
            Open Source <span className="text-gradient">Contributions</span>
          </h2>
        </motion.div>

        {contributions.map((item, index) => (
          <motion.div
            key={item.project}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="glass-card overflow-hidden"
          >
            {/* Project Header */}
            <div className="p-6 bg-gradient-to-br from-rose-500/20 to-orange-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="heading-md">{item.project}</h3>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href={item.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ExternalLink size={16} />
                  Project
                </a>
                <a
                  href={item.mrLink}
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
                Key Contributions
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {item.mergeRequests.map((mr) => (
                  <div
                    key={mr.mr}
                    className="p-4 rounded-xl bg-secondary/50 border border-border/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <GitMerge size={14} className="text-accent" />
                      <span className="text-xs text-accent font-medium">{mr.mr}</span>
                    </div>
                    <h5 className="text-sm font-medium text-foreground mb-1">{mr.title}</h5>
                    <p className="text-xs text-muted-foreground">{mr.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OpenSource;
