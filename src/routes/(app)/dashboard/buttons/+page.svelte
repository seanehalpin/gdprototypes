<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import Story from '$lib/util/Story.svelte'
  import '../../../../scale.scss'


  export let data: PageData;

  let transition = quartOut 


  $: filteredKey = 1

  const storyKey = (story: number) => filteredKey = story

  const handleStory = (event: { detail: { text: any; }; }) => {
    let story = event.detail.text
    filteredKey = story
  }

  let storys = [
    {id: 1, title: "Dashboard variables", loom: "061c020eb0a645db84b291b08645bf90", description: "", key: 1},
  ]

  let showStory = false
  let ready = false
  onMount(() => {
    ready = true
  })

  let buttons = [
    {filled: false, title: "Primary", type:"primary", description: `For primary actions, like "Update amount".`},
    {filled: true, title: "Secondary", type:"secondary", description: `Secondary actions, useful when presenting many options.`},
    {filled: false, title: "Ghost", type:"ghost", description: `For link buttons, like "Go back". Only to be used in conjunction with a primary action.`},
    // {filled: true, title: "Icon", type:"icon", description: `Icon buttons utlize SVG icons for actions.`},
    {filled: true, title: "Dropdown", type:"dropdown", description: `For buttons containing a dropdown menu.`},
    {filled: false, title: "Loading", type:"loading", description: `For loading states.`},
    {filled: false, title: "Danger", type:"danger", description: `For destructive actions, like "Cancel donation".`},
    {filled: false, title: "Special", type:"special", description: `For special actions, like "contact us".`},
    {filled: false, title: "Avatar Button", type:"avatar", description: `Special control for user actions & account navigation.`},
    {filled: true, title: "List", type:"list", description: `For button nested inside of a dropdown list.`},
  ]

</script>

<svelte:head>
  <title>Impact Dashboard</title>
</svelte:head>
{#if ready}
  {#if showStory}
    <Story bind:filteredKey={filteredKey} bind:storys={storys} />
  {/if}
{/if}

<Center
  --flex-direction="column"
  --justify-content="flex-start"
  --background="var(--bg)" 
  --gap="var(--24px)" 
  --padding="var(--s5) 0"
>

<div class="holder">

  <h2>Buttons</h2>

  <table class="table">
      {#each buttons as button}
      <tr>
        <td class="middle" class:filled={button.filled}>
          {#if button.type == "avatar"}
          <button class="avatar-button">
            <span class="avatar">
              W
            </span>
            <svg width="16" height="16" fill="var(--icon)" focusable="false" viewBox="0 0 24 24"><path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z"></path></svg>
          </button>
          {:else if button.type == "icon"}
          <button class={button.type}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M3.21938 11.4694L9.96938 4.71937C10.1101 4.57864 10.301 4.49958 10.5 4.49958C10.699 4.49958 10.8899 4.57864 11.0306 4.71937C11.1714 4.8601 11.2504 5.05097 11.2504 5.24999C11.2504 5.44902 11.1714 5.63989 11.0306 5.78062L5.56031 11.25L20.25 11.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75L5.56031 12.75L11.0306 18.2194C11.1714 18.3601 11.2504 18.551 11.2504 18.75C11.2504 18.949 11.1714 19.1399 11.0306 19.2806C10.8899 19.4213 10.699 19.5004 10.5 19.5004C10.301 19.5004 10.1101 19.4213 9.96938 19.2806L3.21938 12.5306C3.14964 12.461 3.09432 12.3782 3.05658 12.2872C3.01884 12.1962 2.99941 12.0986 2.99941 12C2.99941 11.9014 3.01884 11.8038 3.05658 11.7128C3.09432 11.6217 3.14964 11.539 3.21938 11.4694Z" fill="var(--icon)"></path>
            </svg>
          </button>
          {:else if button.type == "dropdown"}
          <button class={button.type}>
            <span>{button.title}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.61663 8.79194C5.65137 8.82837 5.69314 8.85738 5.73941 8.87719C5.78568 8.89701 5.8355 8.90723 5.88584 8.90723C5.93617 8.90723 5.98599 8.89701 6.03226 8.87719C6.07853 8.85738 6.1203 8.82837 6.15504 8.79194L10.0006 4.94637L9.4622 4.40796L5.88584 7.98433L2.30902 4.40796L1.77061 4.94637L5.61663 8.79194Z" fill="var(--icon)"/>
              </svg>
          </button>
          {:else if button.type == "loading"}
          <button class={button.type}>
            <span class="loader-docs"></span>
          </button>
          {:else if button.type == "list"}
          <div class="list-holder">
            <button class={button.type}>
              Extend pause
            </button>
            <button class={button.type}>
              Reactivate donation
            </button>
            <button class={button.type}>
              <span class="destroy">Cancel donation</span>
            </button>
          </div>
          {:else}
          <button class={button.type} on:click>{button.title}</button>
          {/if}
        </td>
        <td>
          {button.description}
        </td>
      </tr>
      {/each}
  
  </table>

</div>

</Center>


<style lang="scss">

  
  @import "../../../../donor";
  @import "../../../../mixins";

  .holder {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--s0);
    width: 100%;
    max-width: calc(var(--s0) * 50);
  }

  // .grid {
  //   width: 100%;
  //   padding: var(--s0);
  //   max-width: calc(var(--s0) * 70);
  //   margin: 0 auto;
  //   display: grid;
  //   grid-gap: var(--s0);
  //   grid-template-columns: repeat(auto-fill, minmax(min(49%, 100%), 1fr));
  // }

  // .block {
  //   border: 1px solid var(--border);
  //   padding: var(--s0);
  // }

  .table {
    border: 1px solid var(--border);
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 200px;

    td {
      border: 1px solid var(--border);
      // border-width: 0 0 1px;
      padding: var(--s2) var(--s2);
      vertical-align: middle;

      &.middle {
        text-align: center;
      }

      &.filled {
        background: var(--bg-secondary);
      }
    }
  }


  button {
    font-size: var(--s-12);
    border: 0;
    cursor: pointer;
    color: var(--text);
    border-radius: var(--s4);
    font-weight: 600;
    font-family: var(--systemFont);
    margin: 0 auto;
    transition: all 0.2s ease-in-out;

      &.primary {
        padding: var(--s-2) var(--s2);
        color: var(--text-onbrand);
        background: var(--bg-brand);

        &:hover {
          background: var(--bg-brand-hover);
        }

        &:focus-visible {
          outline: 0;
          box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
        }
      }

      &.danger {
        padding: var(--s-2) var(--s2);
        color: var(--text);
        background: var(--bg-danger);

        &:hover {
          background: var(--bg-danger-hover);
        
        }

        &:focus-visible {
          outline: 0;
          box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
        }
      }

      &.special {
        padding: var(--s-2) var(--s2);
        color: var(--text);
        background: var(--bg-special);

        &:hover {
          background: var(--bg-special-hover);
        
        }

        &:focus-visible {
          outline: 0;
          box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
        }
      }

      &.loading {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 0 var(--s2);
        color: var(--text-onbrand);
        background: var(--bg-brand);
        width: 100%;
        height: var(--s3);
        pointer-events: none;

        &:focus-visible {
          outline: 0;
          box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
        }
      }



      &.secondary {
        padding: var(--s-2) var(--s2);
        color: var(--text-muted);
        background: transparent;
        box-shadow: inset 0 0 0 0 var(--bg), 0 0 0 1px var(--border-tertiary), 0 0 0 0 var(--focus);

        &:hover {
          background: var(--bg-tertiary);
        }

        &:focus-visible {
          outline: 0;
          box-shadow: inset 0 0 0 1px var(--bg), 0 0 0 1px var(--border-brand), 0 0 0 4px var(--focus);
        }
      }
      &.ghost {
        padding: var(--s-2) var(--s2);
        color: var(--text-muted);
        background: transparent;
        
        &:focus-visible {
          outline: 0;
          box-shadow: inset 0 0 0 1px var(--bg), 0 0 0 1px var(--border-brand), 0 0 0 4px var(--focus);
        }

        &:hover {
          background: var(--bg-secondary);
        }
      }

      &.icon {
        background: transparent;
        border: 1px solid var(--border-tertiary);
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--s3);
        height: var(--s3);

        &:hover {
          background: var(--bg-tertiary);
        }

        &:focus-visible {
          outline: 0;
          box-shadow: inset 0 0 0 1px var(--bg), 0 0 0 1px var(--border-brand), 0 0 0 4px var(--focus);
        }
      }

      &.list {
        font-weight: 400;
        width: 100%;
        text-align: left;
        padding: var(--s-3) var(--s-1);
        font-size: var(--s-12);
        border: 0;
        background: transparent;
        border-radius: var(--s-3);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        color: var(--text);

        .destroy {
          color: var(--red-600);
        }
        
        &:hover {
          background: var(--bg-secondary);
        }

        &:focus-visible {
          outline: 0;
          box-shadow: inset 0 0 0 1px var(--bg), 0 0 0 1px var(--border-brand), 0 0 0 4px var(--focus);
        }
      }

      &.dropdown {
        font-size: var(--s-1);
        background: transparent;
        border-radius: var(--s3);
        color: var(--text-muted);
        box-shadow: inset 0 0 0 0 var(--bg), 0 0 0 1px var(--border-tertiary), 0 0 0 0 var(--focus);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--s-6);
        padding: var(--s-6) var(--s-1);

        &:hover {
          background: var(--bg-tertiary);
        }

        &:focus-visible {
          outline: 0;
          box-shadow: inset 0 0 0 1px var(--bg), 0 0 0 1px var(--border-brand), 0 0 0 4px var(--focus);
        }
      }

    }

    .list-holder {
      width: 100%;
      min-width: 200px;
      font-size: var(--s0);
      background: var(--bg-dropdown);
      border-radius: var(--s-3);
      padding: var(--s-5) var(--s-6);
      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 24px 48px 0px rgba(18, 18, 23, 0.03), 0px 10px 18px 0px rgba(18, 18, 23, 0.03), 0px 5px 8px 0px rgba(18, 18, 23, 0.04), 0px 2px 4px 0px rgba(18, 18, 23, 0.04);
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .avatar-button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: var(--42px);
      background: var(--bg-secondary);
      gap: var(--s-4);
      padding: var(--s-6) var(--s-2) var(--s-6) var(--s-6);
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
          background: var(--bg-tertiary);
        }

      &:focus-visible {
        outline: 0;
        border-color: var(--border-brand);
        box-shadow: inset 0px 0px 0px 1px var(--bg), 0 0 0 1px var(--border-brand), 0px 0px 0px 4px var(--focus);
      }

      .avatar {
        width: var(--s2);
        height: var(--s2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: var(--s-12);
        overflow: hidden;
        color: var(--text-muted);
        background: var(--bg);
      }

      svg {
        transform: rotate(180deg);
      }
    
    }

    .loader-docs {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      position: relative;
      animation: rotate 0.7s linear infinite
    }
    .loader-docs::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: 2px solid var(--bg);
      animation: prixClipFix 2s linear infinite ;
    }

    @keyframes rotate {
      100% {transform: rotate(360deg)}
    }

    @keyframes prixClipFix {
      0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
      25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
      50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
      75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
      100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
    }

    

</style>