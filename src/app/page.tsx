"use client";
import type React from "react";

import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ACM_INFO, SFHACKS_INFO } from "@/constants/messages";
import SocialLinks from "@/components/ui/social-links";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import affiliateOrganizations from "@/constants/organizations";
import Hero from "@/components/molecules/hero";
import { PillButton } from "@/components/atoms/pill-button";
import GridOfSquircles from "@/components/molecules/grid-of-squircles";

export default function LandingPage() {
  const words = [
    {
      text: "party",
    },
    {
      text: "hard.",
    },

    {
      text: "code",
      className: "font-mono",
    },
    {
      text: "harder.",
      className: "font-mono",
    },
    {
      text: "ACM",
      className: "text-primary ",
    },
    {
      text: "at",
      className: "text-primary ",
    },
    {
      text: "SFSU",
      className: "text-primary ",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-clip bg-white">
      <GridOfSquircles />
      <div className="relative z-10 flex flex-col items-center justify-center w-full sm:h-[80vh] md:h-[80vh]">
        <Hero className="px-14 md:px-0 ">
          <div className="min-h-30 md:min-h-auto sm:min-h-auto">
            <TypewriterEffect words={words} />
          </div>
          <p className="text-2xl mt-6 text-center font-medium text-gray-600 ">
            The premiere computer science club at San Francisco State University
            🍃
          </p>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
            <PillButton
              className="bg-[#7289da] active:bg-transparent active:text-[#7289da] transition-all duration-300 dark:bg-[#7289da] text-white"
              actionText="Join our Discord"
              iconRight={
                <i
                  className="fab fa-discord text-lg transition-transform duration-500 ease-in-out transform 
          group-hover:rotate-360"
                ></i>
              }
              onClick={() => {
                window.open(ACM_INFO.ACM_DISCORD_INVITE_URL, "_blank");
              }}
            />
            <PillButton
              actionText="SF Hacks 2025"
              onClick={() => {
                window.open(SFHACKS_INFO.WEBSITE, "_blank");
              }}
            />
          </div>
          <div className="mt-16">
            <SocialLinks />
          </div>
        </Hero>
      </div>
      <div className="p-8">
        <p className="text-base font-bold text-center">
          Our affiliated student organizations
        </p>
        <InfiniteMovingCards organizations={affiliateOrganizations} />
      </div>
    </div>
  );
}
