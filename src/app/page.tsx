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
import SignatureVision from "@/components/SignatureVision";
import ExperienceAtlas from "@/components/ExperienceAtlas";
import GuaranteeSuite from "@/components/GuaranteeSuite";
import Preloader from "@/components/Preloader";
import LiveWallpaper from "@/components/LiveWallpaper";

export default function Page() {
  return (
    <>
      <Nav />
      <Preloader />
      <LiveWallpaper />
      <main id="home" className="pt-20">
        <Hero />
        <SignatureVision />
        <ExperienceAtlas />
        <Packages />
        <Configurator />
        <Tiers />
        <CaseStudies />
        <GuaranteeSuite />
        <Contact />
      </main>
      <Footer />
      <Concierge />
      <StoryboardPortal />
    </>
  );
}
