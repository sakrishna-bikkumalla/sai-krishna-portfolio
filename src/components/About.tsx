import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cloud, Cpu, Blocks } from "lucide-react";

const interests = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "Building end-to-end applications with modern technologies",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description: "AWS certified with hands-on experience in cloud services",
  },
  {
    icon: Blocks,
    title: "Blockchain",
    description: "Developing decentralized solutions for real-world problems",
  },
  {
    icon: Cpu,
    title: "AI / ML",
    description: "Exploring machine learning and artificial intelligence",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            About Me
          </span>
          <h2 className="heading-lg mb-6">
            Passionate about building{" "}
            <span className="text-gradient">innovative solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            I'm a highly motivated developer eager to kickstart my career as a Full Stack Developer. 
            With a strong foundation in programming languages and web technologies, I enjoy solving 
            real-world problems, collaborating in teams, and continuously learning modern technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 hover-lift group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-md mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
