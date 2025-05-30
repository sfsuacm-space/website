"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Icons } from "@/components/icons";
import affiliateOrganizations from "@/constants/organizations";
import { ACM_INFO } from "@/constants/messages";
import CanvasSquircles from "@/components/grid-of-squircles";
import Footer from "@/components/layouts/footer";
import { useTypewriter } from "@/hooks/use-typewriter";

const pageConfig = {
  headerText: "party hard. code harder. ACM at SFSU.",
  monoText: "code harder.",
  typingSpeed: 100,
  deleteSpeed: 50,
  pauseTime: 10000,
};

export default function Home() {
  const typewriter = useTypewriter({
    text: pageConfig.headerText,
    monoText: pageConfig.monoText,
    typingSpeed: pageConfig.typingSpeed,
    deleteSpeed: pageConfig.deleteSpeed,
    pauseTime: pageConfig.pauseTime,
  });

  return (
    <div className="bg-white text-gray-900">
      <CanvasSquircles />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[90vh] md:min-h-screen relative">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
          <div className="h-[6rem] md:h-[4.5rem] flex flex-col-reverse justify-start">
            <span>
              {typewriter.renderTypedText()}
              <span className="animate-blink text-[var(--acm-blue)]">|</span>
            </span>
          </div>
        </h1>
        <p className="text-xl font-medium text-gray-600 text-center mb-5 md:mb-12 max-w-4xl">
          The premiere computer science club at San Francisco State University.
          Building community and helping students grow since 2022.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <Button
            asChild
            className="text-lg font-semibold bg-[var(--discord-blue)] h-12 hover:bg-[oklch(0.70_0.2091_273.85)]"
          >
            <Link href={ACM_INFO.ACM_DISCORD_INVITE_URL} target="_blank">
              <Icons.discord width={24} height={24} />
              Join Us
            </Link>
          </Button>
          <Button
            asChild
            variant={"outline"}
            className="h-12 text-lg font-semibold"
          >
            <Link href={ACM_INFO.ACM_BENTO_URL} target="_blank">
              <Icons.heart
                className="text-[var(--acm-blue)]"
                fill="currentColor"
                size={24}
                style={{ minHeight: 24, minWidth: 24 }}
              />
              Our Socials
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-6 left-0 right-0 w-full">
          <h3 className="text-center text-lg font-semibold text-gray-600">
            Our affiliate organizations
          </h3>
          <InfiniteMovingCards
            organizations={affiliateOrganizations}
            speed="normal"
            pauseOnHover={true}
          />
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
