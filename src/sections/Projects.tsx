import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import Image from "next/image";
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg';
import grainImage from  "@/assets/images/grain.jpg";
import {SectionHeader} from "@/components/SectionHeader";
import {Card} from "@/components/Card";

const portfolioProjects = [
  {
    company: "FushionHub Ai",
    year: "2024",
    title: "Fus Ai Bot",
    results: [
      { title: "Was Version 1.0 of the bot" },
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://github.com/FushionHub/fus-aibots",
    image: aiStartupLandingPage,
  },
  {
    company: "Innovative Co",
    year: "2023",
    title: "Cloud Infrastructure App",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://me.fushionhubai.com.ng/projects/cloud-infrastructure-setup",
    image: lightSaasLandingPage,
  },
  {
    company: "Quantum Dynamics",
    year: "2023",
    title: "CRM Website",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://me.fushionhubai.com.ng/projects/crm-system",
    image: darkSaasLandingPage,
  },
];

export const ProjectsSection = () => {
  return(
      <section className="pb-16 lg:py-24">
        <div className="container">
          {/*FEATURED TEXT GRADIENT*/}
          <SectionHeader
              title="Highlighted Featured Projects"
              eyebrow="Real-world Results"
              description="See how I transformed concepts into engaging digital Experiences."
          />

          {/*FEATURED PROJECTS CARDS*/}
          <div className="md:mt-20 flex flex-col mt-10 gap-20">

            {portfolioProjects.map((project, projectIndex) => (
                <Card
                    key={project.title}
                    className="px-8 pt-8 md:pt-12 pb-0 md:px-10 lg:pt-16 lg:px-20 sticky"
                    style={{
                      top: `calc(64px + ${projectIndex * 40}px`,
                    }}
                >

                  <div className="absolute inset-0 -z-10 opacity-5" style={{
                    backgroundImage: `url("${grainImage.src}")`,
                  }}>
                  </div>
                  {/*CARD WRAPPER*/}
                  <div className="lg:grid lg:grid-cols-2 lg:gap-16">

                    {/*COL 1*/}
                    <div className="lg:pb-16">
                      <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                        <span>{project.company}</span>
                        <span>&bull;</span>
                        <span>{project.year}</span>
                      </div>

                      <h3 className="text-serif text-2xl mt-2 md:text-4 md:mt-5">
                        {project.title}
                      </h3>

                      <hr className=" border-t-2 border-white/5 mt-4 md:mt-5" />

                      <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                        {project.results.map((result) => (
                            <li key={result.title} className="flex gap-2 text-sm md:text-base text-white/50">
                              <CheckCircleIcon className="size-5 md:size-6" />
                              <span>{result.title}</span>
                            </li>
                        ))}
                      </ul>

                      <a href={project.link} className="">
                        <button className="bg-white md:w-auto px-6 text-gray-950 h-12 w-full rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                          <span>Visit Live Site</span>
                          <ArrowUpRightIcon className="size-4" />
                        </button>
                      </a>
                    </div>

                    {/*COL 2*/}
                    <div className="relative">
                      <Image
                          src={project.image}
                          alt={project.title}
                          className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                      />
                    </div>

                  </div>
                </Card>
            ))}
          </div>
        </div>
      </section>
  );
};
