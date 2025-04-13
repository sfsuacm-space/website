"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { Icons } from "@/components/icons"
import affiliateOrganizations from "@/constants/organizations"
import { ACM_INFO } from "@/constants/messages"
import CanvasSquircles from "@/components/molecules/grid-of-squircles"
import Image from "next/image"
const pageConfig = {
  headerText: 'party hard. code harder. ACM at SFSU.',
  monoText: 'code harder.',
  typingSpeed: 100,
  deleteSpeed: 50,
  pauseTime: 10000,
}

export default function Home() {
  const [typedText, setTypedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const { headerText, monoText, typingSpeed, deleteSpeed, pauseTime } = pageConfig
  const codeHarderIndex = headerText.indexOf(monoText)
  const codeHarderEndIndex = codeHarderIndex + monoText.length

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting && currentIndex < headerText.length) {
          setTypedText(headerText.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else if (isDeleting && typedText.length > 0) {
          setTypedText(headerText.substring(0, typedText.length - 1))
        } else if (typedText.length === 0 && isDeleting) {
          setIsDeleting(false)
          setCurrentIndex(0)
        } else if (currentIndex === headerText.length) {
          setTimeout(() => {
            setIsDeleting(true)
          }, pauseTime)
        }
      },
      isDeleting ? deleteSpeed : typingSpeed,
    )
    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, typedText, headerText, deleteSpeed, pauseTime, typingSpeed])

  const renderTypedText = () => {
    if (typedText.length <= codeHarderIndex) {
      return <span>{typedText}</span>
    } else if (typedText.length <= codeHarderEndIndex) {
      const beforeCode = typedText.substring(0, codeHarderIndex)
      const codeHarderPart = typedText.substring(codeHarderIndex)

      return (
        <>
          <span>{beforeCode}</span>
          <span className="font-mono font-black">{codeHarderPart}</span>
        </>
      )
    } else if (typedText.length > codeHarderEndIndex) {
      const beforeCode = typedText.substring(0, codeHarderIndex)
      const codeHarderPart = typedText.substring(codeHarderIndex, codeHarderEndIndex)
      const acmPart = typedText.substring(codeHarderEndIndex)

      return (
        <>
          <span>{beforeCode}</span>
          <span className="font-mono">{codeHarderPart}</span>
          <span className="text-[var(--acm-blue)]">{acmPart}</span>
        </>
      )
    }
  }

  return (
    <div className="bg-white text-gray-900">
      <CanvasSquircles />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[90vh] md:min-h-screen relative">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
          <div className="h-[6rem] md:h-[4.5rem] flex flex-col-reverse justify-start">
            <span>
              {renderTypedText()}
              <span className="animate-blink text-[var(--acm-blue)]">|</span>
            </span>
          </div>
        </h1>
        <p className="text-xl font-medium text-gray-600 text-center mb-5 md:mb-12 max-w-4xl">
          The premiere computer science club at San Francisco State University. Building community and helping students grow since 2022.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <Button asChild className="text-lg font-semibold bg-[var(--discord-blue)] h-12 hover:bg-[oklch(0.70_0.2091_273.85)]">
            <Link href={ACM_INFO.ACM_DISCORD_INVITE_URL} target="_blank">
              <Icons.discord width={24} height={24} />
              Join Us
            </Link>
          </Button>
          <Button asChild variant={'outline'} className="h-12 text-lg font-semibold">
            <Link href={ACM_INFO.ACM_BENTO_URL} target="_blank">
              <Icons.heart className="text-[var(--acm-blue)]" fill="currentColor" size={24} style={{ minHeight: 24, minWidth: 24 }} />
              Our Socials
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-6 left-0 right-0 w-full">
          <h3 className="text-center text-lg font-semibold text-gray-600">Our affiliate organizations</h3>
          <InfiniteMovingCards
            organizations={affiliateOrganizations}
            speed="normal"
            pauseOnHover={true}
          />
        </div>
      </section >

      {/* Footer */}
      <footer className="bg-white pt-12 border-t border-gray-200" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold mb-2 text-gray-900 flex flex-row gap-4">
                <Image
                  src="/assets/logos/avatar-logo.png"
                  alt="ACM Logo"
                  width={36}
                  height={36}
                  className="rounded-full"
                />

                ACM at SFSU
              </div>
              <p className="text-gray-600 text-lg font-medium">A community of computer science students, built with love and passion for all things fun and computing.</p>
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
                className="text-gray-700 hover:text-[var(--acm-blue)] transition-colors"
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
      </footer >
    </div >
  )
}
