import { writable } from 'svelte/store'

export let nav = writable([
  {
    title: "Impact Dashboard",
    open: true,
    links: [
      { url: '/dashboard/v1', text: 'Donate v1' },
      { url: '/dashboard/v2', text: 'Donate v2' },
      { url: '/dashboard/loginv1', text: 'Sign In v1' },
      { url: '/dashboard/gridv1', text: 'Responsiveness' },
      { url: '/dashboard/gridv2', text: 'Harmonic sizes' },
      { url: '/dashboard/gridv3', text: 'Sizing variables' },
      { url: '/dashboard/gridv4', text: 'Color variables' },
      { url: '/dashboard/layoutv1', text: 'ID dynamic sizing' },
      { url: '/dashboard/buttons', text: 'Buttons' },
      { url: '/dashboard/layoutv2', text: 'V1' },
      { url: '/dashboard/layoutv3', text: 'V1 - payment error' },
      { url: '/dashboard/version2', text: 'V2' },
      { url: '/dashboard/multiplev1', text: 'Multiple donations' },
      { url: '/dashboard/error', text: '404' },
    ]
  },
  {
    title: "Website",
    open: true,
    links: [
      { url: '/menu/v1', text: 'Menu' },
      { url: '/website/questions', text: 'FAQ Page' },
      { url: '/website/faq', text: 'FAQ Component' },
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
      { url: '/donate/v1', text: 'Early exploration' },
      { url: '/donate/donatev2', text: 'What things cost' },
      { url: '/donate/homepagev2', text: 'Home edits' },
      { url: '/donate/homepagev3', text: 'Home edits v2' },
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