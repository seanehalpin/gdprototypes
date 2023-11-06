<script lang="ts">

  import { page } from '$app/stores'
  import { fly, fade } from 'svelte/transition'
  import { onMount, afterUpdate } from 'svelte'

  let ready = false
  export let minimized = false
  export let route = "/"

  export let groups = [
    {
      title: "Inbox",
      open: true,
      links: [
        { url: '/inbox/resize', text: 'Resize' },
      ]
    }
  ]

  const clicked = () => {

  }

  let navElement: HTMLElement
  let hasScrolled = false

  onMount(() => {
    ready = true

    setTimeout(() => {
      
      const activeLink = navElement.querySelector('.links a.active');

        // Check for the presence of the 'active' link
        if (activeLink) {
            const navTop = navElement.getBoundingClientRect().top;
            const linkTop = activeLink.getBoundingClientRect().top;

            const difference = linkTop - navTop;
            navElement.scrollTop = difference;
        }

    }, 200)

  })



</script>

{#if ready}
  {#if !minimized}
  <nav class="disable-scrollbars" bind:this={navElement}>
    <div class="top">
      <a href={route} class="logo">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" rx="4" fill="#265746"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50179 7.54679H5.09386V8.63651H6.28904V9.68229C6.10789 9.79669 5.91102 9.88403 5.70463 9.94153C5.47066 10.0011 5.2298 10.0292 4.9884 10.025C4.41425 10.0249 3.99975 9.83593 3.74489 9.45819C3.49004 9.08045 3.36261 8.54292 3.36261 7.84558C3.36261 7.15433 3.48858 6.61826 3.7405 6.23737C3.99242 5.85656 4.37324 5.66615 4.88295 5.66615C5.06101 5.6618 5.23872 5.68401 5.41023 5.73206C5.5401 5.77011 5.66007 5.8361 5.76175 5.9254C5.85552 6.01062 5.92908 6.11571 5.97706 6.23298C6.03144 6.36821 6.07408 6.50787 6.10449 6.65041L7.40512 6.48344C7.35463 6.22059 7.26735 5.96616 7.14587 5.72767C7.02581 5.49344 6.8617 5.28457 6.66253 5.1125C6.44549 4.92837 6.1948 4.7881 5.92433 4.69946C5.58774 4.59292 5.23592 4.54245 4.88295 4.55007C4.47318 4.54433 4.06653 4.62207 3.68777 4.77856C3.33797 4.92546 3.02673 5.151 2.77821 5.43766C2.5196 5.74182 2.32395 6.0943 2.20259 6.47465C2.06191 6.91778 1.99365 7.38071 2.00046 7.84558C1.99546 8.30186 2.05765 8.75638 2.18501 9.19455C2.29455 9.57664 2.48317 9.93144 2.73866 10.2359C2.99134 10.5279 3.30886 10.7566 3.6658 10.9038C4.08038 11.07 4.52427 11.1508 4.97083 11.1411C5.4417 11.1417 5.90891 11.0584 6.35055 10.895C6.77669 10.7426 7.16809 10.5065 7.50179 10.2008V7.54679ZM10.9499 4.70982H8.60352V10.9845H10.7302C11.1951 10.9913 11.658 10.9231 12.1012 10.7824C12.485 10.6598 12.8363 10.4525 13.1294 10.176C13.4164 9.89763 13.6372 9.55823 13.7753 9.18295C13.9326 8.74337 14.0086 8.27881 13.9994 7.81201C13.9995 6.78673 13.7314 6.01338 13.1953 5.49196C12.6591 4.97053 11.9107 4.70982 10.9499 4.70982ZM11.6266 9.72341C11.3485 9.82666 11.0532 9.87587 10.7566 9.86842H9.91294V5.82591H10.9499C11.219 5.81824 11.4867 5.8661 11.7365 5.96651C11.9407 6.05311 12.1204 6.18898 12.2593 6.36198C12.4016 6.54776 12.502 6.76211 12.5537 6.99032C12.6179 7.26241 12.6489 7.54126 12.646 7.8208C12.6495 8.10406 12.614 8.38646 12.5406 8.66006C12.477 8.896 12.3647 9.11602 12.211 9.30598C12.0548 9.49248 11.8537 9.63614 11.6266 9.72341Z" fill="white"/>
          </svg>
          
          
        <span>Prototypes</span>
      </a>
    <button class="sidepanel" on:click={() => minimized = true }>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2.55556C2 2.24873 2.24873 2 2.55556 2H5.11133V14H2.55556C2.24873 14 2 13.7513 2 13.4444V2.55556ZM7.11133 14H13.4444C13.7513 14 14 13.7513 14 13.4444V2.55556C14 2.24873 13.7513 2 13.4444 2H7.11133V14ZM2.55556 0C1.14416 0 0 1.14416 0 2.55556V13.4444C0 14.8558 1.14416 16 2.55556 16H13.4444C14.8558 16 16 14.8558 16 13.4444V2.55556C16 1.14416 14.8558 0 13.4444 0H2.55556Z"/>
      </svg>
    </button>
  </div>
    {#each groups as group}
      <div class="group">
        <button 
          class="title" 
          on:click={() => group.open = !group.open} 
        >
        <span>{group.title}</span>
        </button>
        {#if group.open}
        <div class="links">
        {#each group.links as link}
        <a 
          href={link.url} 
          on:click={() => clicked()} 
          class="link"
          class:active={link.url === '/' ? $page.url.pathname === '/' : $page.url.pathname.includes(link.url)} 
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>
        </svg>
        <span>{link.text}</span>
        </a>
        {/each}
        </div>
        {/if}
      </div>
    {/each}
  </nav>
{:else}
<div class="minimized" in:fade|local={{duration:200, delay: 50}}>
  <button class="sidepanel" on:click={() => minimized = false }>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2.55556C2 2.24873 2.24873 2 2.55556 2H5.11133V14H2.55556C2.24873 14 2 13.7513 2 13.4444V2.55556ZM7.11133 14H13.4444C13.7513 14 14 13.7513 14 13.4444V2.55556C14 2.24873 13.7513 2 13.4444 2H7.11133V14ZM2.55556 0C1.14416 0 0 1.14416 0 2.55556V13.4444C0 14.8558 1.14416 16 2.55556 16H13.4444C14.8558 16 16 14.8558 16 13.4444V2.55556C16 1.14416 14.8558 0 13.4444 0H2.55556Z"/>
    </svg>
  </button>
</div>
{/if}
{/if}

<style lang="scss">

  .minimized {
    position: fixed;
    left: 0;
    top: 8px;
    z-index: 99999;

    .sidepanel {
      // backdrop-filter: blur(20px);
      // filter: saturate(0.1);
      border-radius: 0 10px 10px 0;
      background: rgba(0,0,0,0.2);
      // width: 25px;

      &:hover {
        background: rgba(0,0,0,0.3);
      }
    }

    svg {
      // filter:invert(2) saturate(2) brightness(2);
      fill: #fff !important;
      opacity: 0.9;
    }
  }
  
  nav {
    background: var(--proto-bg-primary);
    display: flex;
    flex-direction: column;
    font-family: var(--systemFont);
    box-shadow: 1px 0 0 0 var(--proto-border-primary);
    padding: 0 calc(var(--proto-16px) / 2) var(--proto-42px) ;
    position: relative;
    max-height: 100vh;
    overflow-y: scroll;
    z-index: 99999;
  }

  .link {
    padding: 0 0 0 calc(var(--proto-16px) / 2);
    overflow: hidden;
    width: 100%;
    height: 32px;
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    border-radius: var(--proto-radius);
    font-weight: 400;
    font-size: var(--font-sm);
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 4px;
    color: var(--proto-text-primary);

    &:hover {
      background: var(--proto-bg-secondary);
    }

    svg {
      width: var(--proto-16px);
      height: var(--proto-16px);
      margin-right:  calc(var(--proto-16px) / 2);
      flex-shrink: 0;
      
      // opacity: 0.5;
      pointer-events: none;
      stroke: var(--proto-text-tertiary);
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 4px;
      position: relative;
      // top: 1px;
      pointer-events: none;
      color: var(--proto-text-primary);
    }

    &.active {
      background: var(--proto-bg-accent);
      color: var(--proto-text-active);
      font-weight: 700;
      
      span {
        color: var(--proto-text-active);
      }

      svg {
        stroke: var(--proto-text-active);
      }
    }
  }

  .title {
    padding: 4px 0 4px calc(var(--proto-16px) / 2);
    font-size: var(--font-xs);
    color: var(--proto-text-secondary);
    font-weight: 700;
    // text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: transparent;
    border: 0;
    width: 100%;
    border-radius: var(--proto-radius);

    &:hover {
      background: var(--proto-bg-tertiary);
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .links {
    position: relative;
    z-index: 10;
    margin-top: calc(var(--proto-16px) / 2);
  }

  .group {
    position: relative;
    padding: calc(var(--proto-18px)) 0 0;

    & + & {
      // border-top: 1px solid var(--proto-bg-secondary);
      // padding: var(--proto-24px) 0 var(--proto-16px);
    }
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--proto-16px)) 0 calc(var(--proto-16px) / 2);
    position: sticky;
    left: 0;
    top: 0;
    background: var(--proto-bg-primary);
    z-index: 100;

    .logo {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 4px calc(var(--proto-16px) / 2);
      text-decoration: none;
      border-radius: var(--proto-radius);
      color: var(--proto-text-primary);

      &:hover {
        background: var(--proto-bg-secondary);
      }

      svg {
        display: flex;
        fill: var(--proto-bg-accent);
      }

      span {
        font-size: var(--font-sm);
        font-weight: 600;
        margin-left: calc(var(--proto-16px) / 2);
        line-height: 1;
      }
    }
  }

  .sidepanel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    border-radius: 8px;
    
    // background: #fff;

    &:hover {
      // background: rgba(255,255,255,0.4);
    }

    svg {
      // filter:invert(2) saturate(2) brightness(2);
      fill: var(--proto-text-secondary);
    }
  }

  a, button {
  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--proto-bg-primary), 0 0 0 2px var(--proto-bg-accent);
  }
  &:active {
    box-shadow: none;
  }
}

  
</style>