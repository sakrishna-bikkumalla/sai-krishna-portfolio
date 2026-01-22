import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technicalSkills = [
  "C",
  "Python",
  "Java",
  "HTML/CSS",
  "JavaScript",
  "SQL",
  "AWS",
  "React",
  "Prompt Engineering",
];

const softSkills = [
  "Communication",
  "Teamwork",
  "Time Management",
  "Critical Thinking",
  "Problem Solving",
  "Willingness to Learn",
];

const Skills = () => {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Skills
          </span>
          <h2 className="heading-lg">
            My <span className="text-gradient">Technical</span> Arsenal
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="heading-md mb-8">Technical Skills</h3>
            <div className="flex flex-wrap gap-4">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={visible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="px-6 py-3 glass-card hover-lift cursor-default"
                >
                  <span className="font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="heading-md mb-8">Soft Skills</h3>
            <div className="flex flex-wrap gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={visible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="px-6 py-3 glass-card hover-lift cursor-default"
                >
                  <span className="font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 p-6 glass-card"
            >
              <h4 className="text-lg font-semibold mb-3">Currently Learning</h4>
              <p className="text-muted-foreground mb-4">
                AI/ML Learning Path through Apna College
              </p>
              <div className="flex flex-wrap gap-2">
                {["ML Algorithms", "Deep Learning", "GenAI", "Portfolio Projects"].map(
                  (topic) => (
                    <span
                      key={topic}
                      className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full"
                    >
                      {topic}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
