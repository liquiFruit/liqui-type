export function RunStats({
  runInfo: { duration, numChars },
}: {
  runInfo: RunInfo
}) {
  return (
    <div className="mb-4 flex flex-row gap-8 text-3xl">
      <span>{(duration / 1000).toFixed(2)}s</span>
      <span>{(numChars / 5 / (duration / 60000)).toFixed(2)}wpm</span>

      <span>{numChars} chars</span>
    </div>
  )
}
