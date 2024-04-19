<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import ImageLoader from '$lib/util/image/Loader.svelte'
  import Story from '$lib/util/Story.svelte'

  import '../../../../scale.scss'
    import Highlighter from '$lib/util/Highlighter.svelte';

  export let data: PageData;

  let transition = quartOut 

  let colBig = null
  let colSmall = null

  $: calced = colBig / (colBig + colSmall + 64) * 100

  // $: console.log(calced)
  // $: console.log(colBig)

  let codeButtons = `:root {
  --bg: hsla(0, 0%, 100%, 1);
  --bg-hover: hsla(0, 0%, 0%, 0.03);
  --bg-always-light: hsla(0, 0%, 100%, 1);
  --bg-brand: hsla(166, 81%, 19%, 1);
  --bg-brand-hover: hsla(166, 81%, 17%, 1);
  --bg-secondary: hsla(43, 37%, 96%, 1);
  --bg-tertiary: hsla(42, 28%, 93%, 1);
  --bg-tertiary-hover: hsla(42, 28%, 90%, 1);
  --border: hsla(42, 33%, 92%, 1);
  --border-always-light: hsla(0, 0%, 100%, 0.40);
  --border-brand: hsla(166, 81%, 19%, 1);
  --border-secondary: hsla(43, 37%, 96%, 1);
  --border-tertiary: hsla(42, 20%, 87%, 1);
  --border-active: hsla(42, 10%, 75%, 1);
  --focus: hsla(166, 81%, 19%, 0.24);
  --icon: hsla(0, 0%, 46%, 1);
  --icon-active: hsla(166, 81%, 19%, 1);
  --icon-always-light: hsla(0, 0%, 100%, 1);
  --icon-brand: hsla(166, 81%, 19%, 1);
  --icon-muted: hsla(44, 13%, 72%, 1);
  --icon-onbrand: hsla(0, 0%, 100%, 1);
  --overlay: hsla(0, 0%, 0%, 0.20);
  --text: hsla(0, 0%, 15%, 1);
  --text-always-dark: hsla(0, 0%, 15%, 1);
  --text-always-light: hsla(0, 0%, 100%, 1);
  --text-brand: hsla(166, 81%, 19%, 1);
  --text-muted: hsla(45, 19%, 29%, 1);
  --text-onbrand: hsla(0, 0%, 100%, 1);
}`

let colors = [
  { name: "bg", value: "var(--bg)" },
  { name: "bg-hover", value: "var(--bg-hover)" },
  { name: "bg-always-light", value: "var(--bg-always-light)" },
  { name: "bg-brand", value: "var(--bg-brand)" },
  { name: "bg-brand-hover", value: "var(--bg-brand-hover)" },
  { name: "bg-secondary", value: "var(--bg-secondary)" },
  { name: "bg-tertiary", value: "var(--bg-tertiary)" },
  { name: "bg-tertiary-hover", value: "var(--bg-tertiary-hover)" },
  { name: "border", value: "var(--border)" },
  { name: "border-always-light", value: "var(--border-always-light)" },
  { name: "border-brand", value: "var(--border-brand)" },
  { name: "border-secondary", value: "var(--border-secondary)" },
  { name: "border-tertiary", value: "var(--border-tertiary)" },
  { name: "border-active", value: "var(--border-active)" },
  { name: "icon", value: "var(--icon)" },
  { name: "icon-active", value: "var(--icon-active)" },
  { name: "icon-always-light", value: "var(--icon-always-light)" },
  { name: "icon-brand", value: "var(--icon-brand)" },
  { name: "icon-muted", value: "var(--icon-muted)" },
  { name: "icon-onbrand", value: "var(--icon-onbrand)" },
  { name: "text", value: "var(--text)" },
  { name: "text-always-dark", value: "var(--text-always-dark)" },
  { name: "text-always-light", value: "var(--text-always-light)" },
  { name: "text-brand", value: "var(--text-brand)" },
  { name: "text-muted", value: "var(--text-muted)" },
  { name: "text-onbrand", value: "var(--text-onbrand)" },
  { name: "focus", value: "var(--focus)" },
  { name: "overlay", value: "var(--overlay)" },

];


  $: filteredKey = 1

  const storyKey = (story: number) => filteredKey = story

  const handleStory = (event: { detail: { text: any; }; }) => {
    let story = event.detail.text
    filteredKey = story
  }

  let storys = [
    {id: 1, title: "Dashboard variables", loom: "061c020eb0a645db84b291b08645bf90", description: "", key: 1},
  ]

  let showStory = true
  let ready = false
  onMount(() => {
    ready = true
  })

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

<div class="with-sidebar">
  <div bind:clientWidth={colSmall}>
    <div class="block wrapped">
      {#each colors as color}
      <div class="row">
        <div class="circle" style="background: {color.value}"></div>
        <div class="text">{color.name}</div>
        
      </div>
        
      {/each}
    </div>
  </div>
  <div bind:clientWidth={colBig}>
    
    <div class="block">
      <Highlighter code={codeButtons} />
    </div>
  </div>
</div>


</Center>


<style lang="scss">
  $outline: var(--red-600);
  $shadow: 0 0 0 2px $outline;
  $highlight: hsla(39, 62%, 35%,1);
  
  @import "../../../../donor";
  @import "../../../../mixins";

  .with-sidebar {
    --u-width: 1184px;
    --u-gap: var(--64px);
    display: flex;
    flex-wrap: wrap;
    gap: var(--s3);
    width: 100%;
    padding: 0 var(--s0);
    max-width: calc(var(--u-width) + (var(--s0) * 2));
  }

  .with-sidebar > :first-child {
    flex-basis: 300px; 
    flex-grow: 1;
  }

  .with-sidebar > :last-child {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: 50%;
  }

  div {
    position: relative;
  }

  .block {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;

    &.wrapped {
      // flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      // flex-wrap: wrap;
    }

    .row {
      gap: var(--s0);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .circle {
      width: var(--s1);
      height: var(--s1);
      border-radius: 50%;
      border: 1px solid rgba(0,0,0,0.1);
    }
  }


</style>