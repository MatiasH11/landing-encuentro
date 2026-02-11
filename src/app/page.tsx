import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HistorySection from "@/components/sections/HistorySection";
import UpcomingEditionsSection from "@/components/sections/UpcomingEditionsSection";
import ProgramSection from "@/components/sections/ProgramSection";
import GallerySection from "@/components/sections/GallerySection";
import RegistrationSection from "@/components/sections/RegistrationSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HistorySection />
        <UpcomingEditionsSection />
        <ProgramSection />
        <GallerySection />
        <RegistrationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
