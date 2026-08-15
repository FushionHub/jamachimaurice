"use client";
import Link from "next/link";
import memojiImage from '@/assets/images/memoji-computer.png';
import Image from 'next/image';
import ArrowDown from  '@/assets/icons/arrow-down.svg';
import grainImage from '@/assets/images/grain.jpg';
import StarIcon from '@/assets/icons/star.svg';
import SparkleIcon from '@/assets/icons/sparkle.svg';
import {HeroOrbit} from "@/components/HeroOrbit";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return(
      <div className="min-h-screen py-20 md:py-32 lg:py-40 relative z-0 overflow-x-clip">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
            <div
              className="absolute inset-0 -z-30 opacity-5"
              style={{backgroundImage: `url(${grainImage.src})`,
            }}></div>
            {/*Ring of the ui design*/}
            <div className="size-[620px] hero-ring"></div>
            <div className="size-[820px] hero-ring"></div>
            <div className="size-[1020px] hero-ring"></div>
            <div className="size-[1220px] hero-ring"></div>
            {/*HERO OBIT STAR ICONS*/} {/* & */ } {/*HERO OBIT SPARKLE ICONS*/} {/* & */ } {/*HERO OBIT CIRCLE DIVS*/}
            <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="30s" shouldSpin spinDuration={"3s"}>
                <SparkleIcon className="size-8 text-emerald-300/20" />
            </HeroOrbit>
            <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="32s"  shouldSpin spinDuration={"3s"}>
                <SparkleIcon className="size-5 text-emerald-300/20" />
            </HeroOrbit>
            <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
                <div className="size-2 rounded-full bg-emerald-300/20" />
            </HeroOrbit>
            <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="36s" shouldSpin spinDuration={"3s"}>
                <SparkleIcon className="size-10 text-emerald-300/20" />
            </HeroOrbit>
            <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="6s">
                <StarIcon className="size-12 text-emerald-300" />
            </HeroOrbit>
            <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="6s">
                <StarIcon className="size-8 text-emerald-300" />
            </HeroOrbit>
            <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
                <div className="size-2 rounded-full bg-emerald-300/20" />
            </HeroOrbit>
            <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration="44s" shouldSpin spinDuration={"3s"}>
                <SparkleIcon className="size-14 text-emerald-300/20" />
            </HeroOrbit>
            <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
                <div className="size-3 rounded-full bg-emerald-300/20" />
            </HeroOrbit>
            <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration="48s" shouldSpin spinDuration="6s">
                <StarIcon className="size-28 text-emerald-300" />
            </HeroOrbit>
        </div>

          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-2 lg:order-1"
                >
                    {/* Availability Badge */}
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                        <div className="bg-green-500 size-3 rounded-full relative">
                            <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
                        </div>
                        <span className="text-sm font-medium">Available for new projects</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Hello, I'm <span className="bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">Jamachi Mauricennadi</span>
                    </h1>
                    
                    <h2 className="text-2xl md:text-3xl text-white/80 mb-6">
                        Professional Developer & AI Specialist
                    </h2>

                    <p className="text-white/60 text-lg mb-8 max-w-xl">
                        Based in Nigeria, specializing in building scalable applications using React, Next.js, TypeScript, AI integration, and cloud solutions.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-8 py-4 rounded-xl hover:from-emerald-600 hover:to-sky-600 transition-all duration-300 font-semibold text-lg">
                            Hire Me
                            <ArrowDown className="size-5" />
                        </Link>
                        <Link href="/projects" className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg">
                            View Portfolio
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a href="https://linkedin.com/in/mauricennadijamachi" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-emerald-300 transition-colors flex items-center gap-2">
                            <span className="text-lg">LinkedIn</span>
                        </a>
                        <a href="https://x.com/fushiondevhub" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-emerald-300 transition-colors flex items-center gap-2">
                            <span className="text-lg">Twitter</span>
                        </a>
                        <a href="https://github.com/FushionHub" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-emerald-300 transition-colors flex items-center gap-2">
                            <span className="text-lg">GitHub</span>
                        </a>
                    </div>
                </motion.div>

                {/* Right Content - Profile Image */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-1 lg:order-2 flex justify-center"
                >
                    <div className="relative">
                        {/* Background gradient circle */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        
                        {/* Profile image container */}
                        <div className="relative size-64 md:size-80 lg:size-96 rounded-full bg-gradient-to-r from-emerald-500/20 to-sky-500/20 p-1">
                            <div className="size-full rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                                <Image
                                    src={memojiImage}
                                    className="size-full object-cover"
                                    alt="Jamachi Mauricennadi"
                                />
                            </div>
                        </div>

                        {/* Floating badges */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
                        >
                            5+ Years Exp
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold"
                        >
                            50+ Projects
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
                {[
                    { label: "Projects Completed", value: "50+" },
                    { label: "Happy Clients", value: "30+" },
                    { label: "Years Experience", value: "5+" },
                    { label: "Technologies", value: "20+" },
                ].map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="text-3xl md:text-4xl font-bold text-emerald-300 mb-2">{stat.value}</div>
                        <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                ))}
            </motion.div>
        </div>
      </div>
  );
};
