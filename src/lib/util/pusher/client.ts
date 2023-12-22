import Pusher from "pusher-js"

export { type Channel } from "pusher-js"

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_PK!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  authEndpoint: "/api/pusher/auth",
})
