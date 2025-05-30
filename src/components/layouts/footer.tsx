import { ACM_INFO } from "@/constants/messages";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";

export default function Footer() {
  return (
    <footer className="pt-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold mb-2 flex flex-row gap-4">
              <Image
                src="/assets/logos/avatar-logo.png"
                alt="ACM Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
              ACM at SFSU
            </div>
            <p className="text-foreground text-lg font-medium">
              A community of computer science students, built with love and
              passion for all things fun and computing.
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href={ACM_INFO.ACM_DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[var(--acm-blue)] transition-colors"
            >
              <Icons.discord height={24} width={24} />
              <span className="sr-only">Discord</span>
            </Link>
            <Link
              href={ACM_INFO.GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-acm-blue transition-colors"
            >
              <Icons.github size={24} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href={ACM_INFO.ACM_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[var(--acm-blue)]  transition-colors"
            >
              <Icons.instagram size={24} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href={ACM_INFO.ACM_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[var(--acm-blue)]  ransition-colors"
            >
              <Icons.linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
