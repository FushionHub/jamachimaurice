import { Header } from "@/sections/Header";
import { ProjectsSection } from "@/sections/Projects";
import { Footer } from "@/sections/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { TapeSection } from "@/sections/Tape";

export default function ProjectsPage() {
  return (
    <div>
      <Header />
      <div className="pt-20">
        <div className="py-16 lg:py-24">
          <div className="container">
            <SectionHeader
              eyebrow="My Work"
              title="Featured Projects & Services"
              description="Explore my portfolio of successful projects and the services I offer to bring your ideas to life."
            />
          </div>
        </div>
        <ProjectsSection />
        <TapeSection />
      </div>
      <Footer />
    </div>
  );
}