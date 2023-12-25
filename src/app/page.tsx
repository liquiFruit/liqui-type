"use client"

import { useEffect, useState } from "react"

import { RunStats } from "@/components/run-stats"
import { Sentence } from "@/components/sentence"
import { useGameState } from "@/lib/slices"
import { pusher } from "@/lib/util/pusher/client"
import { generateRandomSentence } from "@/lib/util/sentences/generateRandomSentence"

export default function Home() {
  const { players, addPlayer, setPlayerSentence, updatePlayerInput } =
    useGameState()

  const [startTime, setStartTime] = useState<number | null>(null)
  const [stats, setStats] = useState<RunInfo | null>(null)

  // Setup event handlers
  useEffect(() => {
    // Keyboard event handler
    //
    //
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
    document.addEventListener("keydown", handleKeyPress)

    // Pusher config
    //
    //
    const channel = pusher.subscribe("private-game")

    channel.bind("client-ping", (data: number) => {
      console.log("ping: ", data)
      channel.emit("client-pong", Date.now())
    })

    channel.bind("client-pong", (data: number) => {
      console.log("pong: ", data)
    })

    channel.emit("client-ping", Date.now(), { user_id: "1" })

    // Cleanup the event listener on component unmount
    //
    //
    return () => {
      document.removeEventListener("keydown", handleKeyPress)

      channel.cancelSubscription()
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

  return (
    <main className="grid h-[100svh] place-content-center backdrop-blur-xl">
      {players.map((p) => (
        <div key={p.name}>
          <RunStats runInfo={stats ?? { duration: 0, numChars: 0 }} />
          <Sentence sentence={p.sentence} userInput={p.input} />
        </div>
      ))}
    </main>
  )
}
