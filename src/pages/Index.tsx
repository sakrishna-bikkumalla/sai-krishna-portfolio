import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import OpenSource from "@/components/OpenSource";
import ViswamContributions from "@/components/ViswamContributions";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <OpenSource />
      <ViswamContributions />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
