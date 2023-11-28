import { writable } from 'svelte/store'

export let nav = writable([
  {
    title: "Fun",
    open: true,
    links: [
      { url: '/fun/ko', text: 'K.O II' },
    ]
  },
  
]);