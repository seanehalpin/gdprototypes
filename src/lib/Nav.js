import { writable } from 'svelte/store'

export let nav = writable([
  {
    title: "Home",
    open: true,
    links: [
      { url: '/home/v1', text: 'Home v1' },
      { url: '/home/v2', text: 'Home v2' },
    ]
  },
  
]);