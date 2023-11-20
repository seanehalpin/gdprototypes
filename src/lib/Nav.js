import { writable } from 'svelte/store'

export let nav = writable([
  {
    title: "Website",
    open: true,
    links: [
      { url: '/menu/v1', text: 'Menu v1' },
    ]
  },
  {
    title: "Email",
    open: true,
    links: [
      { url: '/email/v1', text: 'Email v1' },
    ]
  },
  {
    title: "Map",
    open: true,
    links: [
      { url: '/map/maker', text: 'Map Maker' },
    ]
  },
  
]);