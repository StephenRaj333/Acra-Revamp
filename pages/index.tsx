
import HorizontalScroll from "@/components/HorizontalScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ServicesShowcase from "@/components/ServicesShowcase";
import ScrollReveal from "@/components/scrollReveal";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ScrollReveal /> 
      <HorizontalScroll />
      <ServicesShowcase />
      <ContactSection />
      <Footer />
    </>
  );
}
