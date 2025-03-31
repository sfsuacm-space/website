"use client";
import type React from "react";
import { useState } from "react";

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
      text: "build",
    },
    {
      text: "community. ",
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
      text: "touch",
      className: "text-primary dark:text-green-400",
    },
    {
      text: "grass.",
      className: "text-primary dark:text-green-400",
    },
  ];
  return (
    <div className="h-screen items-center justify-center bg-white overflow-clip">
      <GridOfSquircles />
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <Hero>
          <p className="text-base font-medium mt-4 text-center tracking-[.25em] text-gray-400 capatalize">
            MORE THAN CODE
          </p>
          <TypewriterEffect words={words} />
          <p className="text-base font-medium mt-6 text-center">
            The premiere computer science club @ San Francisco State University
            🍃
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
            <PillButton
              className="bg-[#7289da] active:bg-transparent active:text-[#7289da] transition-all duration-300"
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
          </div>{" "}
          <div className="absolute bottom-0 p-4">
            <p className="text-gray-500 text-base text-center">
              Our Affiliated Student Organizations
            </p>
            <InfiniteMovingCards organizations={affiliateOrganizations} />
          </div>
        </Hero>
      </div>
    </div>
  );
}
