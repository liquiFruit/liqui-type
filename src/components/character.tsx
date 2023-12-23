import { cn } from "@/lib/util/cn"

export function Character({
  expected,
  received,
  current = false,
}: {
  expected: string
  received: string | null
  current?: boolean
}) {
  const classNames = current
    ? "text-black bg-yellow-300 animate-pulse rounded px-1"
    : !received
      ? "text-white/40"
      : expected === received
        ? "text-emerald-500/70"
        : "text-rose-500/70"

  if (expected === " ")
    return (
      <span
        className={cn(
          "h-16 w-[calc(1ch)] -translate-y-2 rounded",
          current && classNames + " w-[calc(1ch+0.5rem)]",
          received && received !== expected && "bg-rose-500/80",
          "px-0",
        )}
      />
    )
  else
    return (
      <div className="relative">
        <span className={classNames}>{expected}</span>

        {received ? (
          <span
            className={cn(
              "absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 blur-lg",
              classNames,
            )}
          >
            {expected}
          </span>
        ) : null}
      </div>
    )
}
