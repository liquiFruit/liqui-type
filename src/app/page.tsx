"use client"

import { useEffect, useState } from "react"

const words = {
  easy: [
    "the",
    "and",
    "you",
    "that",
    "was",
    "for",
    "are",
    "with",
    "his",
    "they",
    "have",
    "this",
    "from",
    "one",
    "had",
    "word",
    "but",
    "not",
    "what",
    "all",
    "were",
    "we",
    "when",
    "your",
    "can",
    "said",
    "there",
    "use",
    "an",
    "each",
    "which",
    "she",
    "do",
    "how",
    "their",
    "if",
    "will",
    "up",
    "other",
    "about",
    "out",
    "many",
    "then",
    "them",
    "these",
    "so",
    "some",
    "her",
    "would",
    "make",
    "like",
    "him",
    "into",
    "time",
    "has",
    "look",
    "two",
    "more",
    "write",
    "see",
    "number",
    "way",
    "could",
    "people",
    "than",
    "first",
    "water",
    "been",
    "call",
    "who",
    "oil",
    "its",
    "now",
    "find",
    "long",
    "down",
    "day",
    "did",
    "get",
    "come",
    "made",
    "may",
    "part",
    "over",
    "new",
    "sound",
    "take",
    "only",
    "little",
    "work",
    "know",
    "place",
    "year",
    "live",
    "me",
    "back",
    "give",
    "most",
    "very",
  ],

  medium: [
    "meadow",
    "tumour",
    "complain",
    "describe",
    "constant",
    "terrace",
    "representative",
    "similar",
    "introduction",
    "systematic",
    "reserve",
    "useful",
    "orientation",
    "loyalty",
    "happen",
    "generate",
    "ditch",
    "uniform",
    "bench",
    "rocket",
    "method",
    "congress",
    "drama",
    "coincide",
    "industry",
    "communication",
    "committee",
    "sculpture",
    "animal",
    "workshop",
    "hallway",
    "attack",
    "autonomy",
    "attitude",
    "appetite",
    "legislation",
    "flash",
    "persist",
    "skilled",
    "majority",
    "border",
    "support",
    "blank",
    "shell",
    "remind",
    "retirement",
    "tower",
    "thick",
    "proper",
    "expression",
    "although",
    "beginning",
    "children",
    "develop",
    "everybody",
    "friendship",
    "happiness",
    "important",
    "knowledge",
    "literature",
    "maintenance",
    "necessary",
    "operation",
    "particular",
    "questioning",
    "realization",
    "satisfaction",
    "themselves",
    "understand",
    "vocabulary",
    "wonderful",
    "beautiful",
    "character",
    "delicious",
    "elephant",
    "furniture",
    "gratitude",
    "happening",
    "influence",
    "journey",
    "kitchen",
    "landscape",
    "measurement",
    "opportunity",
    "photography",
    "quantity",
    "reflection",
    "sincerely",
    "technology",
    "university",
    "valuable",
    "wondering",
    "yellow",
    "abundance",
    "boundary",
    "celebration",
    "difference",
    "efficiency",
    "flourish",
    "generation",
    "harmony",
    "incredible",
    "judgment",
    "knowledgeable",
    "leadership",
    "mechanism",
    "narrative",
    "occurrence",
    "parallel",
    "quintessential",
    "reliability",
    "transformation",
    "unbelievable",
    "vibrant",
    "wholesome",
    "xylophone",
    "yielding",
    "zealous",
    "aberration",
    "blissful",
    "capitulate",
    "dexterity",
    "effervescent",
    "flamboyant",
    "garrulous",
    "iconoclast",
    "juxtapose",
    "kaleidoscope",
    "labyrinthine",
    "magnanimous",
    "nebulous",
    "obfuscate",
    "peculiar",
    "quixotic",
    "recalcitrant",
    "serendipity",
    "trepidation",
    "ubiquitous",
    "verisimilitude",
    "whimsical",
    "xenophobe",
    "yesteryear",
    "zeppelin",
  ],

  hard: [
    "exaggeration",
    "quizzically",
    "labyrinthine",
    "haphazardly",
    "bewilderment",
    "equivocal",
    "discombobulated",
    "inscrutable",
    "juxtaposition",
    "perfidious",
    "serendipity",
    "cacophony",
    "effervescent",
    "phosphorescent",
    "onomatopoeia",
    "incandescent",
    "paradoxical",
    "ephemeral",
    "lackadaisical",
    "ubiquitous",
    "procrastination",
    "pusillanimous",
    "idiosyncrasy",
    "sesquipedalian",
    "superfluous",
    "facetious",
    "garrulous",
    "mellifluous",
    "recalcitrant",
    "antithesis",
    "grandiloquent",
    "disquisition",
    "perspicacious",
    "ubiquity",
    "pellucid",
    "aberration",
    "capitulate",
    "circumlocution",
    "disparate",
    "ebullient",
    "fastidious",
    "gregarious",
    "iconoclast",
    "jaundiced",
    "kaleidoscope",
    "lugubrious",
    "magnanimous",
    "nonchalant",
    "obfuscate",
    "quintessential",
    "supercilious",
    "tenebrous",
    "umbrage",
    "verisimilitude",
    "welter",
    "xenophobe",
    "yammering",
    "zeppelin",
    "ambidextrous",
    "belligerent",
    "cogent",
    "defenestration",
    "quixotic",
  ],
}
function generateRandomSentence({
  difficulty,
  length = 5,
}: {
  difficulty: "easy" | "medium" | "hard"
  length?: number
}) {
  const _words = words[difficulty]
  let sentence = ""

  for (let i = 0; i < length; i++) {
    const r = Math.floor(Math.random() * _words.length)

    sentence += _words[r]

    if (i !== length - 1) sentence += " "
  }

  return sentence
}

export default function Home() {
  const [sentence, setSentence] = useState("")
  const [userInput, setUserInput] = useState("")

  const generateSentence = () => {
    setSentence(generateRandomSentence({ difficulty: "medium" }))
    setUserInput("")
  }

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
    if (userInput.length === sentence.length) generateSentence()
  }, [userInput, sentence])

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
