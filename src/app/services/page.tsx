import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { CardHeader } from "@/components/CardHeader";
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg';
import Link from "next/link";

const services = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies",
    features: [
      "Responsive Design",
      "Performance Optimization",
      "SEO Implementation",
      "Cross-browser Compatibility"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    startingPrice: "$2,500"
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    features: [
      "Native Performance",
      "Cross-platform Compatibility",
      "App Store Optimization",
      "Push Notifications"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    startingPrice: "$5,000"
  },
  {
    title: "E-commerce Solutions",
    description: "Complete online store solutions with payment integration",
    features: [
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Processing",
      "Analytics Dashboard"
    ],
    technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal"],
    startingPrice: "$3,500"
  },
  {
    title: "API Development",
    description: "RESTful APIs and backend services for your applications",
    features: [
      "RESTful Architecture",
      "Database Design",
      "Authentication & Security",
      "Documentation"
    ],
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    startingPrice: "$2,000"
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable cloud solutions and DevOps implementation",
    features: [
      "AWS/Azure Setup",
      "CI/CD Pipelines",
      "Monitoring & Logging",
      "Auto-scaling"
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
    startingPrice: "$3,000"
  },
  {
    title: "Consulting & Code Review",
    description: "Technical consulting and code quality assessment",
    features: [
      "Architecture Review",
      "Performance Audit",
      "Security Assessment",
      "Best Practices"
    ],
    technologies: ["Various", "Code Analysis", "Documentation", "Training"],
    startingPrice: "$150/hour"
  }
];

const process = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We discuss your project requirements, goals, and timeline to create a detailed project plan."
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Create wireframes and prototypes to visualize the solution before development begins."
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "Build your solution using best practices, with regular testing and quality assurance."
  },
  {
    step: "04",
    title: "Deployment & Launch",
    description: "Deploy your project to production and ensure everything works perfectly."
  },
  {
    step: "05",
    title: "Support & Maintenance",
    description: "Ongoing support, updates, and maintenance to keep your project running smoothly."
  }
];

export default function ServicesPage() {
  return (
    <div>
      <Header />
      <div className="pt-20">
        <div className="py-16 lg:py-24">
          <div className="container">
            <SectionHeader
              eyebrow="What I Offer"
              title="Professional Development Services"
              description="Comprehensive solutions to bring your digital ideas to life with cutting-edge technology and best practices."
            />

            {/* Services Grid */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={service.title} className="p-8 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-xl font-serif">{service.title}</h3>
                  </div>
                  
                  <p className="text-white/60 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircleIcon className="size-4 text-emerald-300" />
                          <span className="text-white/70">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">Starting from</p>
                      <p className="text-xl font-bold text-emerald-300">{service.startingPrice}</p>
                    </div>
                    <Link href="/contact" className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-sky-600 transition-all duration-300 flex items-center gap-2">
                      <span className="text-sm font-semibold">Get Quote</span>
                      <ArrowUpRightIcon className="size-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {/* Process Section */}
            <div className="mt-32">
              <SectionHeader
                eyebrow="How I Work"
                title="My Development Process"
                description="A proven methodology that ensures successful project delivery from concept to launch."
              />

              <div className="mt-20 space-y-8">
                {process.map((step, index) => (
                  <Card key={step.step} className="p-8">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif mb-3">{step.title}</h3>
                        <p className="text-white/70 text-lg">{step.description}</p>
                      </div>
                      {index < process.length - 1 && (
                        <div className="hidden md:block w-px h-16 bg-gradient-to-b from-emerald-400 to-sky-400 ml-8"></div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-32">
              <Card className="p-12 text-center bg-gradient-to-br from-emerald-500/20 to-sky-500/20">
                <h2 className="text-3xl font-serif mb-4">Ready to Start Your Project?</h2>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                  Let's discuss your requirements and create something amazing together. 
                  I'm here to help bring your vision to life with professional development services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-8 py-3 rounded-lg hover:from-emerald-600 hover:to-sky-600 transition-all duration-300 flex items-center justify-center gap-2">
                    <span className="font-semibold">Start a Project</span>
                    <ArrowUpRightIcon className="size-4" />
                  </Link>
                  <Link href="/projects" className="border border-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <span className="font-semibold">View Portfolio</span>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}