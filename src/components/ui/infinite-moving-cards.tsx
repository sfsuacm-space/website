"use client";
import getOrganizationLogo from "@/lib/getOrganizationLogo";
import { cn } from "@/lib/utils";
import { AffiliateOrganization } from "@/types/affiliateOrganization";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export const InfiniteMovingCards = ({
  organizations,
  direction = "left",
  speed = "slow",
  pauseOnHover = false,
  className,
}: {
  organizations: AffiliateOrganization[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  // Convert speed string to numeric value for react-fast-marquee
  const getSpeedValue = () => {
    switch (speed) {
      case "fast": return 60;
      case "normal": return 30;
      case "slow": return 15;
      default: return 15;
    }
  };

  return (
    <div className={cn(
      "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
      className
    )}>
      <Marquee
        direction={direction}
        speed={getSpeedValue()}
        pauseOnHover={pauseOnHover}
        gradient={false}
        className="py-6"
      >
        {organizations.map((org) => (
          <li className="flex flex-col px-16 list-none" key={org.fullName}>
            <div className="flex flex-row items-center cursor-pointer justify-start space-x-4 hover:opacity-10 transition-all duration-300">
              <div
                className="flex flex-row space-x-2 w-auto justify-start items-center"
                onClick={() => {
                  window.open(org.joinLink, "_blank");
                }}
              >
                <Image
                  src={getOrganizationLogo(org.name)}
                  alt={`${org.fullName} logo`}
                  width={200}
                  height={200}
                  className="w-10 h-auto"
                />
              </div>
              <p className="text-2xl font-bold text-gray-900">{org.name}</p>
            </div>
          </li>
        ))}
      </Marquee>
    </div>
  );
};;
