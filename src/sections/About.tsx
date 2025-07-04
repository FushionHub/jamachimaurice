"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HTML5Icon from "@/assets/icons/html5.svg";
import CSS3Icon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import  mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import {CardHeader} from "@/components/CardHeader";
import {ToolboxItems} from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import {useRef} from "react";

const toolboxItems = [
    {
        title: 'JavaScript',
        IconType: JavascriptIcon,
    },
    {
        title: 'HTML5',
        IconType: HTML5Icon,
    },
    {
        title: 'CSS3',
        IconType: CSS3Icon,
    },
    {
        title: 'React.Js',
        IconType: ReactIcon,
    },
    {
        title: 'Chrome',
        IconType: ChromeIcon,
    },
    {
        title: 'GitHub',
        IconType: GithubIcon,
    },
];
const hobbies = [
    {
        title: "Teaching",
        emoji: "👨🏼‍🏫",
        left: "5%",
        top: "5%",
    },
    {
        title: "Graphics",
        emoji: "🎨",
        left: "50%",
        top: "5%",
    },
    {
        title: "Music",
        emoji: "🎧",
        left: "39%",
        top: "40%",
    },
    {
        title: "Podcasting",
        emoji: "🎙",
        left: "10%",
        top: "35%",
    },
    {
        title: "Photography",
        emoji: "📸",
        left: "70%",
        top: "45%",
    },
    {
        title: "Fx Trading",
        emoji: "📈",
        left: "5%",
        top: "65%",
    },
    {
        title: "Blogging",
        emoji: "🖊",
        left: "45%",
        top: "70%",
    },
];
export const AboutSection = () => {
    const constrainRef = useRef(null);
  return (
      <div className="py-20 lg:py-28">
        <div className="container">
            <SectionHeader
                eyebrow="About Me"
                title="A Glimpse Into My World"
                description="My name is Jamachi Mauricennadi M., Learn more about me and my projects, what i do, and what inspires me."
            />
            <div className="mt-20 flex flex-col gap-8">

                 <div className="grid grid-cols-1 gap-8 md:grid md:grid-cols-5 lg:grid-cols-3">

                     <Card className="h-[320px] md:col-span-2 lg:col-span-1">
                         <CardHeader
                             title={"My Read"}
                             description="Explore the books that is shaping my perspectives."
                         />
                        <div className="w-40 mx-auto mt-2 md:mt-0">
                            <Image src={bookImage} alt="Book Cover" className="" />
                        </div>

                     </Card>

                     <Card className="h-[320px] md:col-span-3 lg:col-span-2">

                        <CardHeader
                            title="My Toolbox"
                            description="Explore the technologies and tools I use to craft exceptional digital experiences."
                            className=""
                        />
                        <ToolboxItems items={toolboxItems} className="" itemsWrapperClassName="animate-move-left [animation-duration:30s]" />
                        <ToolboxItems
                            items={toolboxItems}
                            className="mt-6"
                            itemsWrapperClassName="animate-move-right [animation-duration:15s]"
                        />

                    </Card>

                 </div>

                 <div className="grid grid-cols-1 gap-8 md:grid md:grid-cols-5 lg:grid-cols-3">

                    <Card className="h-[320px] p-0 md:col-span-3 flex flex-col lg:col-span-2">

                        <CardHeader
                            title="Beyond the Code"
                            description="Explore the list of other digital skills I have & my hobbies outside coding."
                            className=""
                        />
                        <div className="relative flex-1" ref={constrainRef}>
                            {hobbies.map(hobby => (
                                <motion.div
                                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-400 to-sky-200 rounded-full py-1.5 absolute"
                                    style={{
                                        left: hobby.left,
                                        top: hobby.top,
                                    }}
                                    drag
                                    dragConstraints={constrainRef}
                                    key={hobby.title}
                                >
                                    <span className="font-medium text-gray-950">
                                        {hobby.title}
                                    </span>

                                    <span className="">
                                        {hobby.emoji}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                    </Card>

                    <Card className="h-[320px] relative md:col-span-2 lg:col-span-1">
                        <Image
                            src={mapImage}
                            alt={"map image"}
                            className="h-full w-full object-cover object-left-top"
                        />
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-full after:outline-gray-950/30"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                            <Image src={smileMemoji} alt={"smile memoji"} className="size-20" />
                        </div>

                    </Card>

                 </div>

            </div>

        </div>

      </div>
  );
};
