"use client"

import { useEffect, useRef, useState } from "react"

import { RunStats } from "@/components/run-stats"
import { Sentence } from "@/components/sentence"
import { useGameState } from "@/lib/slices"
import { Channel, pusher } from "@/lib/util/pusher/client"
import { generateRandomSentence } from "@/lib/util/sentences/generateRandomSentence"

export function Game() {
  const { localUser, players, addPlayer, updatePlayer } = useGameState()
  const gameChannel = useRef<Channel | null>(null)

  const [startTime, setStartTime] = useState<number | null>(null)
  const [stats, setStats] = useState<RunInfo | null>(null)

  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy",
  )

  //
  // Pusher config
  //
  useEffect(
    () => {
      const channel = pusher.subscribe("private-game")
      gameChannel.current = channel

      setTimeout(
        () => channel.trigger("client-player-joined", players[localUser]),
        2000,
      )

      return () => {
        channel.unbind_all()
        channel.cancelSubscription()
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  //
  // Keyboard event handler
  //
  useEffect(() => {
    if (!gameChannel.current) return

    // Bind pusher channel
    {
      gameChannel.current.bind("client-player-joined", (data: PlayerState) => {
        console.log("player joined: ", data.name)

        if (players[data.name]) {
          console.log("skipping")
          return
        }

        addPlayer(data)

        console.log("responding")
        gameChannel.current?.trigger(
          "client-player-joined-response",
          players[localUser],
        )
      })

      gameChannel.current?.bind(
        "client-player-joined-response",
        (data: PlayerState) => {
          console.log("player joined echo from: ", data.name)

          if (!players[data.name]) addPlayer(data)
        },
      )

      gameChannel.current?.bind("client-player-update", (data: PlayerState) => {
        updatePlayer(data)
        if (data.name === localUser) setStartTime(null)
      })
    }

    // Bind key handler
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the pressed key is alphanumeric or backspace
      if (
        /^[a-zA-Z0-9\s]$/.test(event.key) ||
        event.key === " " ||
        event.key === "Backspace"
      ) {
        const playerData = players[localUser]
        const newPlayerData = {
          ...playerData,
          input:
            event.key === "Backspace"
              ? playerData.input.substring(0, playerData.input.length - 1)
              : playerData.input + event.key,
        }

        updatePlayer(newPlayerData)
        gameChannel.current?.trigger("client-player-update", newPlayerData)
      }

      // Handle reset
      else if (event.key === "Enter") {
        const sentence = generateRandomSentence({ difficulty })
        setStartTime(null)

        Object.values(players).forEach((player) => {
          const newPlayerData = { name: player.name, input: "", sentence }
          updatePlayer(newPlayerData)
          gameChannel.current?.trigger("client-player-update", {
            ...newPlayerData,
            name: player.name,
          })
        })
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    // Cleanup handlers
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      gameChannel.current?.unbind_all()
      gameChannel.current?.cancelSubscription()
    }
  }, [difficulty, localUser, updatePlayer, players, addPlayer])

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
      <div
        onClick={() =>
          setDifficulty(
            difficulty === "easy"
              ? "medium"
              : difficulty === "medium"
                ? "hard"
                : "easy",
          )
        }
      >
        {difficulty}
      </div>

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
