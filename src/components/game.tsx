"use client"

import { useEffect, useState } from "react"

import { RunStats } from "@/components/run-stats"
import { Sentence } from "@/components/sentence"
import { useGameState } from "@/lib/slices"
import { pusher } from "@/lib/util/pusher/client"
import { generateRandomSentence } from "@/lib/util/sentences/generateRandomSentence"

export function Game() {
  const {
    localUser,
    players,
    addPlayer,
    setPlayerSentence,
    updatePlayerInput,
  } = useGameState()

  const [startTime, setStartTime] = useState<number | null>(null)
  const [stats, setStats] = useState<RunInfo | null>(null)

  console.log(players)

  // Setup event handlers
  useEffect(() => {
    //
    // Keyboard event handler
    //
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the pressed key is alphanumeric or backspace
      if (
        /^[a-zA-Z0-9\s]$/.test(event.key) ||
        event.key === " " ||
        event.key === "Backspace"
      ) {
        updatePlayerInput(localUser, event.key)
      }

      // Handle reset
      else if (event.key === "Enter") {
        setPlayerSentence(
          localUser,
          generateRandomSentence({ difficulty: "easy" }),
        )

        setStartTime(null)
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    //
    // Pusher config
    //
    const channel = pusher.subscribe("private-game")

    channel.bind("client-player-joined", (data: PlayerState) => {
      console.log("player joined: ", data.name)

      if (players[data.name]) {
        console.log("skipping")
        return
      }

      addPlayer(data)

      console.log("responding")
      channel.trigger("client-player-joined-response", players[localUser])
    })

    channel.bind("client-player-joined-response", (data: PlayerState) => {
      console.log("player joined echo from: ", data.name)

      if (!players[data.name]) addPlayer(data)
    })

    setTimeout(
      () => channel.trigger("client-player-joined", players[localUser]),
      2000,
    )

    //
    // Cleanup the event listener on component unmount
    //
    return () => {
      console.log(">> CLEAN UP GAME")
      document.removeEventListener("keydown", handleKeyPress)

      channel.unbind_all()
      channel.cancelSubscription()
    }
  }, [])

  // Game logic
  useEffect(() => {
    if (localUser === "") return

    if (players[localUser].input.length === 1 && startTime === null)
      setStartTime(Date.now())

    if (
      players[localUser].input.length === players[localUser].sentence.length &&
      startTime !== null
    ) {
      {
        const duration = Date.now() - startTime
        setStats({ duration, numChars: players[localUser].sentence.length })
        setStartTime(null)
      }
    }
  }, [players, startTime, localUser])

  return (
    <div>
      <div key={localUser}>
        <p className="text-green-500">lu: {localUser}</p>
        <RunStats runInfo={stats ?? { duration: 0, numChars: 0 }} />
        <Sentence
          sentence={players[localUser].sentence}
          userInput={players[localUser].input}
        />
      </div>

      {Object.values(players)
        .filter((p) => p.name !== localUser)
        .map((p) => (
          <div key={p.name} className="contrast-50">
            <p className="text-emerald-300">{p.name}</p>
            <Sentence sentence={p.sentence} userInput={p.input} />
          </div>
        ))}
    </div>
  )
}
