"use client";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";
import { useState } from "react";

const milestones = [
  {
    year: "2020",
    title: "Started Coding Journey",
    description: "Began my journey in web development with HTML, CSS, and JavaScript",
    icon: "🚀",
  },
  {
    year: "2021",
    title: "First Professional Project",
    description: "Completed my first commercial website project for a local business",
    icon: "💼",
  },
  {
    year: "2022",
    title: "Founded FushionHub",
    description: "Established FushionHub Technology to provide professional development services",
    icon: "🏢",
  },
  {
    year: "2023",
    title: "AI Integration Specialist",
    description: "Expanded expertise to include AI/ML integration and modern cloud solutions",
    icon: "🤖",
  },
  {
    year: "2024",
    title: "Fus Ai Bot Launch",
    description: "Successfully launched AI chatbot version 1.0 with enhanced user experience",
    icon: "🎯",
  },
  {
    year: "2025",
    title: "Full-Stack Excellence",
    description: "Achieved expertise in full-stack development with 50+ successful projects",
    icon: "⭐",
  },
];

export const Milestones = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
            My Journey
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Key milestones that shaped my career and expertise in technology
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-300 to-sky-400 hidden md:block" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center text-gray-900 font-bold z-10 hidden md:flex">
                  {milestone.icon}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card
                    className="p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setActiveMilestone(index)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{milestone.icon}</span>
                      <span className="text-emerald-300 font-bold text-lg">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-serif mb-2">{milestone.title}</h3>
                    <p className="text-white/60 text-sm">{milestone.description}</p>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Projects Completed", value: "50+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Years Experience", value: "5+" },
            { label: "Technologies", value: "20+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-emerald-300 mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
