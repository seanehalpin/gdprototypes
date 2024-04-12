<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import ImageLoader from '$lib/util/image/Loader.svelte'
  import Story from '$lib/util/Story.svelte'

  export let data: PageData;

  let transition = quartOut 

  let colBig = null
  let colSmall = null

  $: calced = colBig / (colBig + colSmall + 64) * 100

  $: console.log(calced)
  // $: console.log(colBig)

  $: filteredKey = 1

  const storyKey = (story: number) => filteredKey = story

  const handleStory = (event: { detail: { text: any; }; }) => {
    let story = event.detail.text
    filteredKey = story
  }

  let storys = [
    {id: 1, title: "Responsive design for ID", loom: "174bba16f5124b0bbe6fa1f93bece7f8", description: "", key: 1},
  ]

  let showStory = true
  let ready = false
  onMount(() => {
    ready = true
  })

</script>

<svelte:head>
  <title>Sign In</title>
</svelte:head>
{#if ready}
  {#if showStory}
    <Story bind:filteredKey={filteredKey} bind:storys={storys} />
  {/if}
{/if}

<Center
--flex-direction="column" 
  --background="var(--bg)" 
  --gap="var(--24px)" 
>

<div class="with-sidebar">
  <div bind:clientWidth={colSmall}>
    <button class="donate">
      Donate
    </button>
    <!-- <div class="indicator">
      {colSmall}px
    </div> -->
  </div>
  <div bind:clientWidth={colBig}>
    <div class="block">
      <h1>flex-grow: 999</h1>
      <div class="indicator">
        {#if calced >= 50}
        {calced.toFixed(0)}% of holder
        {:else}
        100% of holder
        {/if}
      </div>
    </div>
  </div>
</div>


</Center>


<style lang="scss">
  $outline: var(--red-600);
  $shadow: 0 0 0 2px $outline;
  
  @import "../../../../donor";
  @import "../../../../mixins";

  .with-sidebar {
    --u-width: 1184px;
    --u-gap: var(--64px);
    display: flex;
    flex-wrap: wrap;
    gap: var(--u-gap);
    width: 100%;
    padding: 0 var(--16px);
    max-width: calc(var(--u-width) + (var(--16px) * 2));
    box-shadow: $shadow;
  }

  .with-sidebar > :first-child {
    flex-basis: 224px; 
    flex-grow: 1;
  }

  .with-sidebar > :last-child {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: 50%;
  }

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-brand);
    border-radius: var(--48px);
    border: 0;
    height: var(--40px);
    font-size: var(--14px);
    color: var(--text-onbrand);
    font-weight: 600;
    cursor: pointer;
  }

  div {
    box-shadow: $shadow;
    position: relative;
  }

  .block {
    background: var(--bg-secondary);
    padding: var(--96px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .indicator {
    position: absolute;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    bottom: var(--16px);
    background: var(--red-600);
    color: var(--white);
    border-radius: 8px;
    font-size: var(--14px);
    font-weight: 500;
    padding: 0 var(--8px);
  }


</style>