import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-accent/10">
                <Briefcase className="w-5 h-5 text-accent" />
              </div>
              <h3 className="heading-md">Experience</h3>
            </div>

            <div className="glass-card p-6 hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg">Software Development Intern</h4>
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
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
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
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
            {["MATLAB Onramp", "Kaggle - Python", "AWS Certification"].map(
              (cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="px-6 py-4 glass-card hover-lift"
                >
                  <span className="font-medium">{cert}</span>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
