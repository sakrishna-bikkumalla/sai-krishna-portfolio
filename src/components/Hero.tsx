import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import profileImage from "@/assets/profile-image.png";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 section-padding max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">Open to opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="heading-xl mb-6"
            >
              Hi, I'm{" "}
              <span className="text-gradient">Sai Krishna</span>
              <br />
              Bikkumalla
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl"
            >
              Aspiring AI/ML Engineer passionate about building innovative solutions. 
              Specialized in <span className="text-foreground font-medium">Machine Learning</span>, {" "}
              <span className="text-foreground font-medium">Deep Learning</span>, and{" "}
              <span className="text-foreground font-medium">Generative AI</span> technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                View Work
                <ArrowDown size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:bg-secondary transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://www.linkedin.com/in/bikkumalla-sai-krishna"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:saikrishnabikkumala@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com/sakrishna-bikkumalla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center p-2">
                <img 
                  src={profileImage} 
                  alt="Sai Krishna Bikkumalla"
                  className="w-full h-full rounded-full object-cover border-4 border-background shadow-2xl"
                />
              </div>
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-card rounded-xl border border-border shadow-lg"
              >
                <span className="text-sm font-medium">BTech CSE</span>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-card rounded-xl border border-border shadow-lg"
              >
                <span className="text-sm font-medium">🤖 AI/ML Engineer</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
