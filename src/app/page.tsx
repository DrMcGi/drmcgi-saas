import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Configurator from "@/components/Configurator";
import Tiers from "@/components/Tiers";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Concierge from "@/components/Concierge";
import StoryboardPortal from "@/components/StoryboardPortal";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="home" className="pt-20">
        <Hero />
        <div className="section-divider" />
        <Packages />
        <Configurator />
        <Tiers />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
      <Concierge />
      <StoryboardPortal />
    </>
  );
}