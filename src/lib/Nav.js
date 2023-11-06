import { writable } from 'svelte/store'

export let nav = writable([
  {
    title: "Website",
    open: true,
    links: [
      { url: '/menu/v1', text: 'Menu v1' },
    ]
  },
  
]);