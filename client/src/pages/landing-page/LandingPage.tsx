import First from "@/components/landing-page/First";
import HeroSection from "@/components/landing-page/HeroSection";
import Second from "@/components/landing-page/Second";
import Third from "@/components/landing-page/Third";

export default function LandingPage() {
  return (
    <main className="flex-grow bg-[#E7EDF8] min-h-[100vh]">
        <HeroSection />
        <First />
        <Second />
        <Third />
    </main>
  )
}
