"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [sentence, setSentence] = useState("hello world")
  const [userInput, setUserInput] = useState("")

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
        setUserInput("")
      }
    }

    // Add event listener for keydown event
    document.addEventListener("keydown", handleKeyPress)

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  return (
    <main className="grid h-[100svh] place-items-center backdrop-blur-xl">
      <SentenceView sentence={sentence} userInput={userInput} />
    </main>
  )
}

function SentenceView({
  sentence,
  userInput,
}: {
  sentence: string
  userInput: string
}) {
  const sentenceChars = sentence.split("")
  const userInputChars = userInput.split("")

  return (
    <div className="flex flex-row gap-0.5 text-5xl">
      {sentenceChars.map((expected, i) => (
        <Character
          key={expected + i}
          expected={expected}
          received={userInputChars[i] ?? null}
        />
      ))}
    </div>
  )
}

function Character({
  expected,
  received,
}: {
  expected: string
  received: string | null
}) {
  const classNames = !received
    ? "text-white/40"
    : expected === received
      ? "text-emerald-500/70"
      : "text-rose-500/70"

  if (expected === " ") return <span className="w-2" />
  else
    return (
      <div className="relative">
        <span className={classNames}>{expected}</span>

        {expected === received ? (
          <span
            className={
              classNames +
              " absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 blur-md"
            }
          >
            {expected}
          </span>
        ) : null}
      </div>
    )
}
