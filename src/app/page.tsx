"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Icons } from "@/components/icons";
import affiliateOrganizations from "@/constants/organizations";
import { ACM_INFO } from "@/constants/messages";
import CanvasSquircles from "@/components/grid-of-squircles";
import Footer from "@/components/layouts/footer";
import { TypewriterConfig, useTypewriter } from "@/hooks/use-typewriter";

const pageConfig: TypewriterConfig = {
  text: "party hard. code harder. ACM at SFSU.",
  monoText: "code harder.",
  typingSpeed: 100,
  deleteSpeed: 50,
  pauseTime: 10000,
};

export default function Home() {
  const typewriter = useTypewriter(pageConfig);

  return (
    <div className="bg-background">
      <CanvasSquircles />
      {/* Hero Section */}
      <section className="hero-container">
        <h1 className="text-center mb-6">
          <div className="h-[6rem] md:h-[4.5rem] flex flex-col-reverse justify-start">
            <span>
              {typewriter.renderTypedText()}
              <span className="animate-blink text-acm-blue">|</span>
            </span>
          </div>
        </h1>
        <h4 className="text-secondary-foreground text-center mb-5 md:mb-12 max-w-4xl">
          The premiere computer science club at San Francisco State University.
          Building community and helping students grow since 2022.
        </h4>
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <Button
            asChild
            className="bg-discord-blue h-12 hover:bg-discord-blue/o"
          >
            <Link href={ACM_INFO.ACM_DISCORD_INVITE_URL} target="_blank">
              <Icons.discord width={24} height={24} />
              <h4>Join Us</h4>
            </Link>
          </Button>
          <Button asChild variant={"outline"} className="h-12">
            <Link href={ACM_INFO.ACM_BENTO_URL} target="_blank">
              <Icons.heart
                className="text-acm-blue"
                fill="currentColor"
                size={24}
                style={{ minHeight: 24, minWidth: 24 }}
              />
              <h4>Our Socials</h4>
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-6 left-0 right-0 w-full">
          <h5 className="text-center text-secondary-foreground">
            Our affiliate organizations
          </h5>
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
