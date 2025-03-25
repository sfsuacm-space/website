"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
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

  useEffect(() => {
    startAnimation()
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [placeholders])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const newDataRef = useRef<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")
  const [animating, setAnimating] = useState(false)

  const draw = useCallback(() => {
    if (!inputRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 800
    ctx.clearRect(0, 0, 800, 800)
    const computedStyles = getComputedStyle(inputRef.current)

    const fontSize = Number.parseFloat(computedStyles.getPropertyValue("font-size"))
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`
    ctx.fillStyle = "#FFF"
    ctx.fillText(value, 16, 40)

    const imageData = ctx.getImageData(0, 0, 800, 800)
    const pixelData = imageData.data
    const newData: any[] = []

    for (let t = 0; t < 800; t++) {
      const i = 4 * t * 800
      for (let n = 0; n < 800; n++) {
        const e = i + 4 * n
        if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
          newData.push({
            x: n,
            y: t,
            color: [pixelData[e], pixelData[e + 1], pixelData[e + 2], pixelData[e + 3]],
          })
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }))
  }, [value])

  useEffect(() => {
    draw()
  }, [value, draw])

  const animate = (start: number) => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr = []
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i]
          if (current.x < pos) {
            newArr.push(current)
          } else {
            if (current.r <= 0) {
              current.r = 0
              continue
            }
            current.x += Math.random() > 0.5 ? 1 : -1
            current.y += Math.random() > 0.5 ? 1 : -1
            current.r -= 0.05 * Math.random()
            newArr.push(current)
          }
        }
        newDataRef.current = newArr
        const ctx = canvasRef.current?.getContext("2d")
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800)
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color } = t
            if (n > pos) {
              ctx.beginPath()
              ctx.rect(n, i, s, s)
              ctx.fillStyle = color
              ctx.strokeStyle = color
              ctx.stroke()
            }
          })
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8)
        } else {
          setValue("")
          setAnimating(false)
        }
      })
    }
    animateFrame(start)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit()
    }
  }

  const vanishAndSubmit = () => {
    setAnimating(true)
    draw()

    const value = inputRef.current?.value || ""
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce((prev, current) => (current.x > prev ? current.x : prev), 0)
      animate(maxX)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    vanishAndSubmit()
    onSubmit && onSubmit(e)
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

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 relative">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden fixed bottom-0 left-0 right-0 sm:static sm:block z-50 sm:z-0 max-w-3xl mx-auto">
        {/* Mobile controls above input */}
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

        {/* Conditionally render selected file name */}
        {selectedFile && (
          <div className="sm:hidden text-sm text-gray-600 dark:text-gray-400 px-4 py-1 bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700 truncate">
            {selectedFile.name}
          </div>
        )}

        <form className="relative p-4 sm:p-6" onSubmit={handleSubmit}>
          <canvas
            className={cn(
              "absolute pointer-events-none text-base transform scale-[0.3] sm:scale-50 top-[10%] sm:top-[20%] left-2 origin-top-left filter invert dark:invert-0 pr-10 sm:pr-20",
              !animating ? "opacity-0" : "opacity-100",
            )}
            ref={canvasRef}
          />
          <input
            onChange={(e) => {
              if (!animating) {
                setValue(e.target.value)
                onChange && onChange(e)
              }
            }}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={value}
            type="text"
            className={cn(
              "w-full relative text-base sm:text-lg z-50 border-none dark:text-white bg-transparent text-gray-700 focus:outline-none focus:ring-0 pr-12 sm:pr-16",
              animating && "text-transparent dark:text-transparent",
            )}
          />

          <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
            <Button
              onClick={vanishAndSubmit}
              size='icon'
              className="rounded-full bg-blue-400 hover:bg-blue-500 transition-colors w-8 h-8 sm:w-10 sm:h-10"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          <div className="absolute inset-0 flex items-center pointer-events-none">
            <AnimatePresence mode="wait">
              {!value && (
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
                  className="dark:text-zinc-500 text-base sm:text-lg font-normal text-gray-500 pl-4 sm:pl-6 text-left w-[calc(100%-2rem)]"
                >
                  {placeholders[currentPlaceholder]}
                </motion.p>
              )}
            </AnimatePresence>
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
