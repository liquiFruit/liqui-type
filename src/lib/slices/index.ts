// "use client"

import { produce } from "immer"
import { create } from "zustand"

type GameActions = {
  addLocalPlayer: (newPlayer: PlayerState) => void
  addPlayer: (newPlayer: PlayerState) => void
  updatePlayer: (playerDate: PlayerState) => void
}

export const useGameState = create<GameState & GameActions>((set) => ({
  players: {},
  localUser: "",

  addLocalPlayer(newPlayer) {
    set(
      produce((state: GameState) => {
        state.players[newPlayer.name] = newPlayer
        state.localUser = newPlayer.name
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

  updatePlayer(playerDate) {
    set(
      produce((s: GameState) => {
        s.players[playerDate.name] = playerDate
      }),
    )
  },
}))
