"use client"

import { Game } from "@/components/game"
import { useGameState } from "@/lib/slices"

export default function Home() {
  const { localUser, addLocalPlayer } = useGameState()

  return (
    <main className="grid h-[100svh] place-content-center backdrop-blur-xl">
      {localUser === "" ? (
        <div>
          <p>enter username:</p>
          <input
            className="text-black"
            onKeyDownCapture={(e) => {
              if (e.code !== "Enter") return

              const username = e.currentTarget.value

              setTimeout(
                () =>
                  addLocalPlayer({
                    name: username,
                    input: "",
                    sentence: "hello world",
                  }),
                100,
              )
            }}
          />
        </div>
      ) : (
        <Game />
      )}
    </main>
  )
}
