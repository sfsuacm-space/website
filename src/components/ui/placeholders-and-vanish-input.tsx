"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { Button } from "./button"
import { Upload, Send } from "lucide-react"

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")
  const [animating, setAnimating] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Existing placeholder rotation logic
  useEffect(() => {
    const startAnimation = () => {
      intervalRef.current = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length)
      }, 3000)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible" && intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      } else if (document.visibilityState === "visible") {
        startAnimation()
      }
    }

    startAnimation()
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [placeholders])

  // Focus and cursor blinking handling
  useEffect(() => {
    // Set initial focus
    if (inputRef.current) {
      inputRef.current.focus()
      setIsFocused(true)
    }

    // Start cursor blinking
    const blinkCursor = () => {
      cursorIntervalRef.current = setInterval(() => {
        setCursorVisible(prev => !prev)
      }, 530) // Standard cursor blink rate
    }

    blinkCursor()

    // Clean up
    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current)
      }
    }
  }, [])

  // Handle focus changes
  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const vanishAndSubmit = () => {
    if (!animating && value.trim()) {
      setAnimating(true)

      // After animation completes, reset the value
      setTimeout(() => {
        setValue("")
        setAnimating(false)
      }, 600)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    vanishAndSubmit()
    if (onSubmit) onSubmit(e)
  }


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating && value.trim()) {
      e.preventDefault()
      vanishAndSubmit()

      // Create a synthetic form event instead of passing the DOM element
      if (e.currentTarget.form) {
        const syntheticEvent = {
          currentTarget: e.currentTarget.form,
          preventDefault: () => { }
        } as React.FormEvent<HTMLFormElement>;

        if (onSubmit) onSubmit(syntheticEvent)
      }
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setSelectedFile(files[0])
    }
  }

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Split text into individual characters for animation
  const characters = value.split("")

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 relative">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden fixed bottom-0 left-0 right-0 sm:static sm:block z-50 sm:z-0 max-w-3xl mx-auto">
        {/* Move buttons above input when on mobile */}
        <div className="sm:hidden flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-zinc-800/50 border-t border-b border-gray-200 dark:border-zinc-700">
          <div className="flex-grow mr-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="w-full">
                    <Select>
                      <SelectTrigger className="w-full" disabled={true}>
                        <SelectValue placeholder="Choose your model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chatgpt-4o">ChatGPT 4o</SelectItem>
                        <SelectItem value="claude-35">Claude 3.5</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  Coming soon!
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="*/*"
            />
            <Button
              type="button"
              onClick={handleFileUploadClick}
              variant='outline'
              size='icon'
            >
              <Upload />
            </Button>
          </div>
        </div>

        {selectedFile && (
          <div className="sm:hidden text-sm text-gray-600 dark:text-gray-400 px-4 py-1 bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700 truncate">
            {selectedFile.name}
          </div>
        )}
        <form
          className="relative p-4 sm:p-6"
          onSubmit={handleSubmit}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus()
              setIsFocused(true)
            }
          }}
        >
          {/* Real input field (invisible) */}
          <input
            onChange={(e) => {
              if (!animating) {
                setValue(e.target.value)
                if (onChange) onChange(e)
              }
            }}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
            value={value}
            type="text"
            className="opacity-0 absolute inset-0 w-full h-full z-20"
          />

          {/* Visual representation with animations */}
          <div className="min-h-[40px] sm:min-h-[48px] flex items-center relative w-full pr-12 sm:pr-16">
            {/* Placeholder text */}
            {!value && !animating && (
              <AnimatePresence mode="wait">
                <motion.p
                  initial={{
                    y: 5,
                    opacity: 0,
                  }}
                  key={`current-placeholder-${currentPlaceholder}`}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -15,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "linear",
                  }}
                  className="dark:text-zinc-500 text-base sm:text-lg font-normal text-gray-300 text-left absolute left-0"
                >
                  {placeholders[currentPlaceholder]}
                </motion.p>
              </AnimatePresence>
            )}

            {/* Animated text characters */}
            <div className="flex text-base sm:text-lg text-gray-700 dark:text-white items-center">
              {characters.map((char, index) => (
                <motion.span
                  key={`${index}-${char}`}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{
                    opacity: animating ? 0 : 1,
                    y: animating ? -20 : 0,
                    x: animating ? (Math.random() * 40 - 20) : 0
                  }}
                  transition={{
                    duration: 0.4,
                    delay: animating ? index * 0.03 : 0,
                    ease: "easeOut"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}

              {/* Text cursor */}
              {isFocused && !animating && cursorVisible && (
                <div className="w-0.5 h-[1.2em] bg-blue-500 dark:bg-blue-400 animate-pulse mx-0.5 self-center"></div>
              )}
            </div>
          </div>

          <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
            <Button
              onClick={vanishAndSubmit}
              disabled={!value.trim()}
              size='icon'
              className="rounded-full bg-blue-400 hover:bg-blue-500 transition-colors w-8 h-8 sm:w-10 sm:h-10 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Send />
            </Button>
          </div>
        </form>

        {/* Desktop controls */}
        <div className="hidden sm:flex items-center justify-between px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Select>
                      <SelectTrigger className="w-[180px]" disabled={true}>
                        <SelectValue placeholder="Choose your model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chatgpt-4o">ChatGPT 4o</SelectItem>
                        <SelectItem value="claude-35">Claude 3.5</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  Coming soon!
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="*/*"
            />
            {selectedFile && (
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2 max-w-[150px] truncate">
                {selectedFile.name}
              </span>
            )}
            <Button
              type="button"
              onClick={handleFileUploadClick}
              variant='outline'
              size='icon'
            >
              <Upload />
            </Button>
          </div>
        </div>
      </div>

      {/* Padding at the bottom to prevent content from being hidden behind the fixed input */}
      <div className="h-24 sm:hidden"></div>
    </div>
  )
}
