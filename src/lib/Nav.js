import { writable } from 'svelte/store'

export let nav = writable([
  {
    title: "Donate Portal",
    open: true,
    links: [
      { url: '/dashboard/v1', text: 'Donate v1' },
      { url: '/dashboard/v2', text: 'Donate v2' },
    ]
  },
  {
    title: "Website",
    open: true,
    links: [
      { url: '/menu/v1', text: 'Menu' },
      { url: '/website/faq', text: 'FAQ' },
      { url: '/website/newsletter', text: 'Newsletter' },
      { url: '/website/newsarticles', text: 'News articles' },
      { url: '/website/storiesv1', text: 'Recipient stories v1' },
      { url: '/website/storiesv2', text: 'Recipient stories v2' },
      { url: '/website/storiesv3', text: 'Recipient stories v3' },
      { url: '/website/storiesv4', text: 'Recipient stories v4' },
    ]
  },
  {
    title: "Donate.givedirectly.org",
    open: true,
    links: [
      { url: '/donate/v1', text: 'Donate v1' },
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
      { url: '/map/maker', text: 'Map maker' },
    ]
  },
  
]);