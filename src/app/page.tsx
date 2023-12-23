"use client"

import { useEffect, useRef, useState } from "react"

import { RunStats } from "@/components/run-stats"
import { Sentence } from "@/components/sentence"
import { pusher, type Channel } from "@/lib/util/pusher/client"
import { generateRandomSentence } from "@/lib/util/sentences/generateRandomSentence"

export default function Home() {
  const [sentence, setSentence] = useState("")
  const [userInput, setUserInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [stats, setStats] = useState<RunInfo | null>(null)
  const gameChannel = useRef<Channel | null>(null)

  const generateSentence = () => {
    setSentence(generateRandomSentence({ difficulty: "easy" }))
    setUserInput("")
    setStartTime(null)
    setStats(null)
  }

  useEffect(() => {
    const channel = pusher.subscribe("private-game")

    channel.bind("client-test", (data: {}) => {
      console.log(">> PLAYER_JOINED")
    })

    gameChannel.current = channel

    return () => {
      pusher.unsubscribe("private-game")
    }
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (/^[a-zA-Z0-9\s]$/.test(event.key)) {
        // Check if the pressed key is alphanumeric and append
        setUserInput((prev) => prev + event.key)
      } else if (event.key === " ") {
        // If space bar is pressed, append a space to the typed text
        setUserInput((prev) => prev + " ")
      } else if (event.key === "Backspace") {
        // Handle backspacing
        setUserInput((prev) => prev.substring(0, prev.length - 1))
      } else if (event.key === "Enter") {
        // Handle reset
        generateSentence()
      }
    }

    // Generate first sentence
    generateSentence()

    // Add event listener for keydown event
    document.addEventListener("keydown", handleKeyPress)

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  useEffect(() => {
    if (userInput.length === 1 && startTime === null) setStartTime(Date.now())

    if (userInput.length === sentence.length && startTime !== null) {
      {
        const duration = Date.now() - startTime
        setStats({ duration, numChars: sentence.length })
      }
    }
  }, [userInput, sentence, startTime])

  return (
    <main className="grid h-[100svh] place-content-center backdrop-blur-xl">
      <RunStats runInfo={stats ?? { duration: 0, numChars: 0 }} />
      <Sentence sentence={sentence} userInput={userInput} />
    </main>
  )
}
