import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";

const Experience = () => {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, margin: "-100px" });

  const certifications = [
    {
      name: "MATLAB Onramp",
      link: "https://drive.google.com/file/d/16eKeVwHjC044LVuXkDxqflLX3Duep5F5/view?usp=sharing",
    },
    {
      name: "Kaggle - Python",
      link: "https://drive.google.com/file/d/1u9Tax7PoC_9RFfU9hrYnRSrbC-cXI3KR/view?usp=sharing",
    },
    {
      name: "AWS Certification",
      link: null,
    },
  ];

  return (
    <section id="experience" className="section-padding" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Journey
          </span>
          <h2 className="heading-lg">
            Experience & <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-accent/10">
                <Briefcase className="w-5 h-5 text-accent" />
              </div>
              <h3 className="heading-md">Experience</h3>
            </div>

            <div className="space-y-4">
              {/* Viswam AI - Current */}
              <div className="glass-card p-6 hover-lift border-l-4 border-accent">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">AI/ML Engineer</h4>
                    <p className="text-accent">Viswam AI</p>
                  </div>
                  <span className="text-xs text-accent px-3 py-1 bg-accent/10 rounded-full font-medium">
                    Present
                  </span>
                </div>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    Developing AI-powered solutions for enterprise clients
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    Working on machine learning models and deep learning architectures
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    Contributing to innovative AI products and research initiatives
                  </li>
                </ul>
              </div>

              {/* Skillbanc */}
              <a
                href="https://drive.google.com/file/d/1kllYhvj_cnFq1VK3l3F-L9ThyMki5JZV/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 hover-lift block group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg group-hover:text-accent transition-colors">Software Development Intern</h4>
                      <ExternalLink size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <p className="text-accent">Skillbanc</p>
                  </div>
                  <span className="text-xs text-muted-foreground px-3 py-1 bg-secondary rounded-full">
                    Remote
                  </span>
                </div>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    Built real-world applications from scratch using modern tools
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    Worked across the complete software development lifecycle
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    Collaborated effectively with a remote team
                  </li>
                </ul>
              </a>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-accent/10">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="heading-md">Education</h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  degree: "BTech - Computer Science Engineering",
                  school: "ICFAI University",
                  score: "CGPA: 7.4 (Till 3rd year)",
                },
                {
                  degree: "Intermediate",
                  school: "Narayana College",
                  score: "916 / 1000",
                },
                {
                  degree: "SSC",
                  school: "Bhashyam Blooms",
                  score: "10.0 CGPA",
                },
              ].map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-5 hover-lift"
                >
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-muted-foreground text-sm">{edu.school}</p>
                  <p className="text-accent text-sm mt-1">{edu.score}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="p-2 rounded-lg bg-accent/10">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <h3 className="heading-md">Certifications</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 glass-card hover-lift flex items-center gap-2 group"
                  >
                    <span className="font-medium group-hover:text-accent transition-colors">{cert.name}</span>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </a>
                ) : (
                  <div className="px-6 py-4 glass-card hover-lift">
                    <span className="font-medium">{cert.name}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
