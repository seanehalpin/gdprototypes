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
    --s-6: clamp(0.26rem, 0.31rem + -0.29vw, 0.15rem);
    --s-5: clamp(0.33rem, 0.39rem + -0.29vw, 0.18rem);
    --s-4: clamp(0.41rem, 0.47rem + -0.31vw, 0.25rem);
    --s-3: clamp(0.51rem, 0.57rem + -0.31vw, 0.35rem);
    --s-2: clamp(0.64rem, 0.69rem + -0.27vw, 0.5rem);
    --s-1: clamp(0.8rem, 0.84rem + -0.18vw, 0.71rem);
    --s0: clamp(1rem, 1rem + 0vw, 1rem);
    --s1: clamp(1.25rem, 1.19rem + 0.32vw, 1.41rem);
    --s2: clamp(1.56rem, 1.39rem + 0.85vw, 2rem);
    --s3: clamp(1.95rem, 1.61rem + 1.7vw, 2.83rem);
    --s4: clamp(2.44rem, 1.83rem + 3.04vw, 4rem);
    --s5: clamp(3.05rem, 2.04rem + 5.07vw, 5.65rem);
    --s6: clamp(3.81rem, 2.3rem + 7.9vw, 7.5rem);
    --line-height: var(--ratio);
    --line-height-small: calc(0.8* var(--ratio));
    font-size: var(--s0);
}`

  $: filteredKey = 1

  const storyKey = (story: number) => filteredKey = story

  const handleStory = (event: { detail: { text: any; }; }) => {
    let story = event.detail.text
    filteredKey = story
  }

  let storys = [
    {id: 1, title: "Modular spacing", loom: "18ccf85c2d014439ad29a5601148ae13", description: "", key: 1},
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
  --background="var(--bg)" 
  --gap="var(--24px)" 
>

<div class="with-sidebar">
  <div bind:clientWidth={colSmall}>
    <button class="donate">
      Donate
    </button>
  </div>
  <div bind:clientWidth={colBig}>
    <div class="block">
      <div class="item s-6">
        <div class="indicator minus">s-6</div>
      </div>
      <div class="item s-5">
        <div class="indicator minus">s-5</div>
      </div>
      <div class="item s-4">
        <div class="indicator minus">s-4</div>
      </div>
      <div class="item s-3">
        <div class="indicator minus">s-3</div>
      </div>
      <div class="item s-2">
        <div class="indicator minus">s-2</div>
      </div>
      <div class="item s-1">
        <div class="indicator minus">s-1</div>
      </div>
      <div class="item s0">
        <div class="indicator neutral">s0</div>
      </div>
      <div class="item s1">
        <div class="indicator">s1</div>
      </div>
      <div class="item s2">
        <div class="indicator">s2</div>
      </div>
      <div class="item s3">
        <div class="indicator">s3</div>
      </div>
      <div class="item s4">
        <div class="indicator">s4</div>
      </div>
      <div class="item s5">
        <div class="indicator">s5</div>
      </div>
      <div class="item s6">
        <div class="indicator">s6</div>
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
    gap: var(--s3);
    width: 100%;
    padding: 0 var(--s0);
    max-width: calc(var(--u-width) + (var(--s0) * 2));
    // box-shadow: $shadow;
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

  .item {
    position: relative;
    width: 100%;
    // border: 2px solid $outline;
    border-top: 0;
    background: lighten(#d94636, 40%);
    

    &.s-1 {
      height: var(--s-1);
    }

    &.s0 {
      height: var(--s0);
      // border-top: 2px solid $outline;
      
    }
    &.s1 {
      height: var(--s1);
    }
    &.s2 {
      height: var(--s2);
    }
    &.s3 {
      height: var(--s3);
    }
    &.s4 {
      height: var(--s4);
    }
    &.s5 {
      height: var(--s5);
    }
    &.s6 {
      height: var(--s6);
    }
    &.s-1 {
      height: var(--s-1);
    }
    &.s-2 {
      height: var(--s-2);
    }
    &.s-3 {
      height: var(--s-3);
    }
    &.s-4 {
      height: var(--s-4);
    }
    &.s-5 {
      height: var(--s-5);
    }
    &.s-6 {
      height: var(--s-6);
    }
  }

  .indicator {
    position: absolute;
    // left: var(--s0);
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: var(--red-600);
    color: var(--white);
    border-radius: 8px;
    font-size: 10px;
    font-weight: 500;
    padding: 0 var(--8px);
    text-align: center;

    // &.minus {
    //   background: var(--blue-500);
    // }
    // &.neutral {
    //   background: var(--grey-600);
    // }
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
    // box-shadow: $shadow;
    position: relative;
  }

  .block {
    // background: var(--bg-secondary);
    // padding: var(--96px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
  }


</style>