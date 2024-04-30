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
    {filled: false, title: "Ghost", type:"ghost", description: `For link buttons, like "Go back".`},
    {filled: true, title: "Icon", type:"icon", description: `Icon buttons utlize SVG icons for actions.`},
    {filled: false, title: "Avatar Button", type:"avatar", description: `Navigation control button.`},
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
    font-weight: 500;
    font-family: var(--systemFont);
    margin: 0 auto;
    transition: all 0.2s ease-in-out;

      &.primary {
        padding: var(--s-2) var(--s2);
        color: var(--text-onbrand);
        background: var(--bg-brand);
      }

      &.secondary {
        padding: var(--s-2) var(--s2);
        color: var(--text-muted);
        background: transparent;
        border: 1px solid var(--border-tertiary);
      }
      &.ghost {
        padding: var(--s-2) var(--s2);
        color: var(--text-muted);
        background: transparent;
        // border: 1px solid var(--border-tertiary);

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
      }
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

    

</style>