import HeroSection from "@/components/HeroSection"

import Packages from "@/components/Packages";
import Testimonials from  "@/components/Testimonials";
import CTASection from "@/components/BookingForm"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
    
      <Packages />
      <Testimonials />
      <CTASection />
    </main>
  );
}