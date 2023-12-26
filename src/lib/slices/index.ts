// "use client"

import { produce } from "immer"
import { create } from "zustand"

type GameActions = {
  addLocalPlayer: (newPlayer: PlayerState) => void
  addPlayer: (newPlayer: PlayerState) => void
  updatePlayerInput: (username: string, newInput: string) => void
  setPlayerSentence: (username: string, newSentence: string) => void
}

export const useGameState = create<GameState & GameActions>((set) => ({
  players: {},
  localUser: "",

  addLocalPlayer(newPlayer) {
    set(
      produce((state: GameState) => {
        state.players[newPlayer.name] = newPlayer
        state.localUser = "j"
      }),
    )
  },

  addPlayer(newPlayer) {
    set(
      produce((state: GameState) => {
        state.players[newPlayer.name] = newPlayer
      }),
    )
  },

  updatePlayerInput(username, newInput) {
    set(
      produce((state: GameState) => {
        state.players[username].input = newInput
      }),
    )
  },

  setPlayerSentence(username, newSentence) {
    set(
      produce((state: GameState) => {
        state.players[username].input = ""
        state.players[username].sentence = newSentence
      }),
    )
  },
}))
