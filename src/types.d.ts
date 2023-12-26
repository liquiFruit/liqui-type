type RunInfo = {
  duration: number
  numChars: number
}

type PlayerState = {
  name: string
  sentence: string
  input: string
}

type GameState = {
  players: { [key: string]: PlayerState }
  localUser: string
}
