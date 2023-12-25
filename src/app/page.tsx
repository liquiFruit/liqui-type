"use client"

import { useEffect, useState } from "react"

import { RunStats } from "@/components/run-stats"
import { Sentence } from "@/components/sentence"
import { useGameState } from "@/lib/slices"
import { generateRandomSentence } from "@/lib/util/sentences/generateRandomSentence"

export default function Home() {
  const { players, addPlayer, setPlayerSentence, updatePlayerInput } =
    useGameState()

  const [startTime, setStartTime] = useState<number | null>(null)
  const [stats, setStats] = useState<RunInfo | null>(null)

  useEffect(() => {
    // Keyboard event handler
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the pressed key is alphanumeric and append
      if (/^[a-zA-Z0-9\s]$/.test(event.key)) {
        updatePlayerInput(0, players[0].input + event.key)
      }

      // If space bar is pressed, append a space to the typed text
      else if (event.key === " ") {
        updatePlayerInput(0, players[0].input + " ")
      }

      // Handle backspacing
      else if (event.key === "Backspace") {
        updatePlayerInput(
          0,
          players[0].input.substring(0, players[0].input.length - 1),
        )
      }

      // Handle reset
      else if (event.key === "Enter") {
        setPlayerSentence(0, generateRandomSentence({ difficulty: "easy" }))
      }
    }
    // Add event listener for keydown event
    document.addEventListener("keydown", handleKeyPress)

    // Add the local player
    if (players.length === 0)
      addPlayer({ name: "liqui", input: "", sentence: "first load" })

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  })

  // Game logic
  useEffect(() => {
    if (players.length === 0) return

    if (players[0].input.length === 1 && startTime === null)
      setStartTime(Date.now())

    if (
      players[0].input.length === players[0].sentence.length &&
      startTime !== null
    ) {
      {
        const duration = Date.now() - startTime
        setStats({ duration, numChars: players[0].sentence.length })
        setStartTime(null)
      }
    }
  }, [players, startTime])

  if (players.length === 0) return

  return (
    <main className="grid h-[100svh] place-content-center backdrop-blur-xl">
      <RunStats runInfo={stats ?? { duration: 0, numChars: 0 }} />
      <Sentence sentence={players[0].sentence} userInput={players[0].input} />
    </main>
  )
}
