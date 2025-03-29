"use client";

import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ACM_INFO } from "./constants/messages";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import SocialLinks from "@/components/ui/social-links";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[25rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
        pauseOnHover={false}
      />
    </div>
  );
}

const testimonials = [
  {
    org: "/assets/squircles/3dprinting-squircle.png",
    name: "3D Printing",
    link: "https://example.com/3dprinting-info",
  },
  {
    org: "/assets/squircles/ai-squircle.png",
    name: "AI",
    link: "https://example.com/ai-info",
  },
  {
    org: "/assets/squircles/bitbots-squircle.png",
    name: "Bitbots",
    link: "https://example.com/bitbots-info",
  },
  {
    org: "/assets/squircles/colorstack-squircle.png",
    name: "ColorStack",
    link: "https://example.com/colorstack-info",
  },
  {
    org: "/assets/squircles/cybersecurity-squircle.png",
    name: "Cybersecurity",
    link: "https://example.com/cybersecurity-info",
  },
  {
    org: "/assets/squircles/dss-squircle.png",
    name: "DSS",
    link: "https://example.com/dss-info",
  },
  {
    org: "/assets/squircles/gamedev-squircle.png",
    name: "Game Development",
    link: "https://example.com/gamedev-info",
  },
  {
    org: "/assets/squircles/swe-squircle.png",
    name: "SWE",
    link: "https://example.com/swe-info",
  },
];

export default function TypewriterEffectDemo() {
  const words = [
    {
      text: "build",
    },
    {
      text: "community.",
    },

    {
      text: "develop ",
    },

    {
      text: "skills.",
    },
    {
      text: "touch",
      className: "text-green-400 dark:text-green-400",
    },
    {
      text: "grass.",
      className: "text-green-400 dark:text-green-400",
    },
  ];
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[40rem] ">
        <TypewriterEffect words={words} />
        <p className="text-neutral-600 dark:text-neutral-200 text-base text-center mt-4">
          The premiere computer science club @ San Fransisco State University 🍃
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <button
            className="w-40 h-12 rounded-xl bg-[#7289da] dark:border-white border-transparent text-white text-sm cursor-pointer group"
            onClick={() => {
              window.open(ACM_INFO.ACM_DISCORD_INVITE_URL, "_blank");
            }}
          >
            <div className="flex flex-row items-center justify-center space-x-1.5 font-semibold mx-2">
              <i
                className="fab fa-discord text-xl transition-transform duration-500 ease-in-out transform 
              group-hover:rotate-360"
              ></i>
              <p>Join our Discord</p>
            </div>
          </button>
          <button className="w-40 h-12 rounded-xl bg-black text-white  text-sm font-semibold cursor-pointer group">
            <p>SF Hacks 2025</p>
          </button>
        </div>
        <div className="mt-16 mb-4">
          <SocialLinks />
        </div>
      </div>
      <InfiniteMovingCardsDemo />
    </div>
  );
}
