import { Footer, Header } from "@/components/layout";
import {
  Hero,
  About,
  Skills,
  Projects,
  Services,
  // Testimonials,
  Contact
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
