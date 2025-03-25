"use client"
import type React from "react"
import { useState } from "react"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { ConfettiExplosion } from "@/components/confetti"

export default function PlaceholdersAndVanishInputDemo() {
  const [showModal, setShowModal] = useState(false)
  const [triggerConfetti, setTriggerConfetti] = useState(false)
  const placeholders = [
    "How much did it cost to train this model?",
    "Who is Ada Lovelace?",
    "How do I get involved with ACM?",
    "When is SF Hacks 2025?",
    "Is this an April Fool's prank?",
  ]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submitted")
    // Show the modal after a short delay to allow the animation to complete
    setTimeout(() => {
      setShowModal(true)
      setTriggerConfetti(true)
    }, 1000)
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="mb-10 sm:mb-16 text-center">
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="h-6 w-6 mr-2 text-sky-500 animate-pulse" />
          <span className="text-sm font-medium text-sky-500 uppercase tracking-wider">ACM @ SFSU's 2 billion parameter model</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600">
          Hello, I'm Lovelace
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto">
          Ask me anything and I'll try my best to help!
        </p>
      </div>

      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />

      <ConfettiExplosion
        trigger={triggerConfetti}
        duration={1000}
        particleCount={200}
        spread={120}
        onComplete={() => setTriggerConfetti(false)}
      />
      <Dialog
        open={showModal}
        onOpenChange={(open) => {
          if (!open) {
            setShowModal(false)
            setTriggerConfetti(false)
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-2xl font-bold">
              🎉 April Fools! 🎉
            </DialogTitle>
            <DialogDescription className="text-center pt-4 text-xl">
              We don't have our own model, that'd be crazy! But our actual website is almost ready so come back soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                setShowModal(false)
              }}
              className="px-6 bg-blue-600"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
