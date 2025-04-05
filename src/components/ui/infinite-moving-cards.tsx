"use client";
import getOrganizationLogo from "@/lib/getOrganizationLogo";
import { cn } from "@/lib/utils";
import { AffiliateOrganization } from "@/types/affiliateOrganization";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  useEffect(() => {
    addAnimation();
  });

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {organizations.map((org) => (
          <li className="flex flex-col px-16" key={org.fullName}>
            <div className="flex flex-row items-center justify-start space-x-4 hover:opacity-10 transition-all duration-300">
              <div
                className="flex flex-row space-x-2 w-auto cursor-pointer  justify-start items-center"
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
      </ul>
    </div>
  );
};
