import "server-only"

import Pusher from "pusher"

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_ID!,
  secret: process.env.PUSHER_SK!,
  key: process.env.NEXT_PUBLIC_PUSHER_PK!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
})
