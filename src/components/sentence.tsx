import { Character } from "./character"

export function Sentence({
  sentence,
  userInput,
}: {
  sentence: string
  userInput: string
}) {
  const sentenceChars = sentence.split("")
  const userInputChars = userInput.split("")
  const currentIndex = userInput.length

  return (
    <div className="flex flex-row gap-x-1 text-5xl">
      {sentenceChars.map((expected, i) => (
        <Character
          key={expected + i}
          expected={expected}
          received={userInputChars[i] ?? null}
          current={i === currentIndex}
        />
      ))}
    </div>
  )
}
