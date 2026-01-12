import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Linkedin, ArrowUpRight } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Shadnagar, Telangana",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "bikkumalla-sai-krishna",
    href: "https://www.linkedin.com/in/bikkumalla-sai-krishna",
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Contact
          </span>
          <h2 className="heading-lg mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full sm:w-auto"
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass-card p-6 hover-lift block group min-w-[250px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="font-medium text-sm break-all">{item.value}</p>
                </a>
              ) : (
                <div className="glass-card p-6 min-w-[250px]">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="font-medium text-sm">{item.value}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="mailto:saikrishnabikkumala@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity text-lg"
          >
            Say Hello
            <ArrowUpRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
