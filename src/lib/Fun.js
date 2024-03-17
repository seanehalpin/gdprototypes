import { writable } from 'svelte/store'

export let nav = writable([
  {
    title: "Fun",
    open: true,
    links: [
      // { url: '/fun/wrapped/23', text: 'Wrapped 23' },
      { url: '/ideas/stories', text: 'Story canvas' },
    ]
  },
  
  
]);