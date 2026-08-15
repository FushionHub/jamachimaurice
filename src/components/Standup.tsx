"use client";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const standupUpdates = [
  {
    date: "2025-01-15",
    title: "AI Integration Progress",
    update: "Successfully integrated Gemini AI for customer support. Response time improved by 60%.",
    category: "Development",
    icon: "🤖",
  },
  {
    date: "2025-01-12",
    title: "New Client Onboarding",
    update: "Onboarded 3 new enterprise clients for cloud infrastructure projects.",
    category: "Business",
    icon: "👥",
  },
  {
    date: "2025-01-10",
    title: "Performance Optimization",
    update: "Optimized website performance, achieving 95+ Lighthouse scores across all pages.",
    category: "Technical",
    icon: "⚡",
  },
  {
    date: "2025-01-08",
    title: "Payment System Upgrade",
    update: "Integrated Bachs.io payment gateway with multi-currency support (NGN/USD).",
    category: "Development",
    icon: "💳",
  },
  {
    date: "2025-01-05",
    title: "Team Expansion",
    update: "Welcomed 2 new developers to the FushionHub team to handle increased project load.",
    category: "Business",
    icon: "🎉",
  },
];

export const Standup = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % standupUpdates.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-950/20 to-sky-950/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
            Latest Updates
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Stay informed about my latest projects, achievements, and daily standup updates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Update */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl">{standupUpdates[currentIndex].icon}</span>
                <div>
                  <span className="text-emerald-300 text-sm font-semibold">
                    {standupUpdates[currentIndex].date}
                  </span>
                  <h3 className="text-2xl font-serif mt-1">
                    {standupUpdates[currentIndex].title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs mt-2">
                    {standupUpdates[currentIndex].category}
                  </span>
                </div>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                {standupUpdates[currentIndex].update}
              </p>
            </Card>
          </motion.div>

          {/* Recent Updates List */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif mb-6">Recent Activity</h3>
            {standupUpdates.map((update, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer transition-all ${
                  index === currentIndex ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                <Card
                  className={`p-4 ${
                    index === currentIndex
                      ? 'border-2 border-emerald-400'
                      : 'border border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{update.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{update.title}</h4>
                        <span className="text-white/40 text-xs">{update.date}</span>
                      </div>
                      <p className="text-white/60 text-sm mt-1 line-clamp-2">
                        {update.update}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Today's Tasks", value: "8/10" },
            { label: "This Week", value: "42/45" },
            { label: "In Progress", value: "5" },
            { label: "Completed", value: "127" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                <div className="text-2xl font-bold text-emerald-300">{stat.value}</div>
                <div className="text-white/60 text-xs mt-1">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
