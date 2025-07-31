import { Header } from "@/sections/Header";
import { AboutSection } from "@/sections/About";
import { Footer } from "@/sections/Footer";
import { SectionHeader } from "@/components/SectionHeader";

export default function AboutPage() {
  return (
    <div>
      <Header />
      <div className="pt-20">
        <div className="py-16 lg:py-24">
          <div className="container">
            <SectionHeader
              eyebrow="Get to Know Me"
              title="About Jamachi Mauricennadi"
              description="Passionate developer with a proven track record of delivering exceptional digital experiences."
            />
          </div>
        </div>
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
}