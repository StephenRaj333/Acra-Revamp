
import HorizontalScroll from "@/components/HorizontalScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StickyReveal from "@/components/StickyReveal";
import Footer from "@/components/Footer"; 

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StickyReveal />
      <HorizontalScroll />
      <Footer />
    </>
  );
}
