// "use client"

import { produce } from "immer"
import { create } from "zustand"

type PlayerState = {
  name: string
  sentence: string
  input: string
}
type GameState = {
  players: PlayerState[]
}

type GameActions = {
  addPlayer: (newPlayer: PlayerState) => void
  updatePlayerInput: (playerId: number, newInput: string) => void
  setPlayerSentence: (playerId: number, newSentence: string) => void
}

export const useGameState = create<GameState & GameActions>((set) => ({
  players: [
    {
      name: "liqui",
      sentence: "first load from store",
      input: "",
    },
  ],

  addPlayer(newPlayer) {
    set(
      produce((state: GameState) => {
        state.players.push(newPlayer)
      }),
    )
  },

  updatePlayerInput(playerId, newInput) {
    set(
      produce((state: GameState) => {
        state.players[playerId].input = newInput
      }),
    )
  },

  setPlayerSentence(playerId, newSentence) {
    set(
      produce((state: GameState) => {
        state.players[playerId].input = ""
        state.players[playerId].sentence = newSentence
      }),
    )
  },
}))
