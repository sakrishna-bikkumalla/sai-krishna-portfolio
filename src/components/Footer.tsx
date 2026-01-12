import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="section-padding py-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Sai Krishna Bikkumalla. All rights reserved.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              Designed & Developed with ❤️
            </p>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-secondary hover:bg-accent/10 border border-border transition-colors group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:text-accent transition-colors" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
