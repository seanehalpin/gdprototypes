<script lang="ts">
  
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte'

  export let filteredKey = 1
  export let storys: any[] = []
  let filter:any
  const filterStory = (filter: any, storys: any[]) => filter === filteredKey ? storys.filter(t => t.id == filteredKey) : storys

  let expandVideo = false

  $: filteredKey && closeVideo()

  let closeVideo = () => {
    expandVideo = false
  }

  $: width = 0
  $: height = 0
  let updatedWidth = width
  let updatedHeight = height
  let min = false
  let fixedHeight:any
  let fixedWidth:any
  let minVideo = () => {
    min = !min

    if(min) {
      fixedHeight = height
      fixedWidth = width
      // updatedHeight = (height - 35)
      updatedHeight = 50
      updatedWidth = 50
    } else {
      updatedHeight = fixedHeight
      updatedWidth = fixedWidth
    }
  }

  onMount(() => {
    updatedHeight = height
    updatedWidth = width
  })

</script>

<div class="story-holder">
  {#each filterStory(filter, storys) as story}
    {#if story.id == filteredKey}
      {#if !expandVideo}
          <div 
            class="story {min}" 
            bind:clientHeight={height} 
            bind:clientWidth={width} 
            in:fly="{{y: 10, duration: 150, delay: 1000 }}" 
            style="height: {updatedHeight}px; width: {updatedWidth}px;"
          >
          <div class="title {min}" on:click={() => minVideo()}>
            {#if story.loom}
            <img src="/misc/loom.svg" alt="">
            {/if}
            <div>{story.title}</div>
          </div>
          <button class="min" on:click={() => minVideo()}>
          <img class="arrow {min}" src="/misc/arrow-down.svg" alt="">
          <img class="loom-image {min}" src="/misc/loom.svg" alt="">
          </button>
          <div class="desc">{story.description}</div>
          {#if story.figma}
          <div class="desc">
            <a href={story['figma']} class="figma-link" target="_blank">
              <span><img src="/misc/figma.svg" alt=""></span>
              <span>Figma</span>
            </a>
          </div>
          {/if}
          {#if story.loom}
            <div class="iframe no-click" on:click={() => expandVideo = true}>
              <iframe src="https://www.loom.com/embed/{story.loom}" title="video" frameborder="0" allowfullscreen></iframe>
            </div>
          {/if}
        </div>
      {:else}
      <div class="big-video" in:fly|local="{{y: 10, duration: 150, delay: 210 }}" out:fly|local="{{y: 10, duration: 150 }}">
        <button on:click={() => expandVideo = false}>Close</button>
        <div class="iframe" on:click={() => expandVideo = true}>
          <iframe src="https://www.loom.com/embed/{story.loom}" title="video" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      {/if}
    {/if}
  {/each}
</div>

<style lang="scss">

  .iframe {
    position: relative; 
    padding-bottom: 56.25%; 
    height: 0;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    opacity: 1;
    transition: all 0.5s ease-in-out;

    &:hover {
      filter: saturate(1.5);
    }
  }

  .no-click iframe {
    pointer-events: none;
  }

  iframe {
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
  }

  .big-video {
    position: absolute;
    right: 0;
    bottom: 0;
    // background: var(--app-color-white);
    padding: 0;
    box-shadow: rgba(0,0,0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 4px 6px;
    border-radius: 6px;
    width: 800px;

    .iframe {
      background: var(--white);
      backdrop-filter: blur(20px);
      
      &:hover {
        filter: saturate(1); 
      }
    }

    button {
      position: absolute;
      right: 0;
      top: -45px;
      border: 0;
      background: var(--green-600);
      color: var(--white);
      border-radius: 30px;
      padding: 10px 20px;
      font-size: var(--14px);
      cursor: pointer;
    }
  }

  .story-holder {
    position: fixed;
    right: 20px;
    bottom: 19px;
    z-index: 10000;
  }

  .story {
    position: absolute;
    right: 0;
    bottom: 0;
    background: var(--white);
    backdrop-filter: blur(20px);
    padding: 20px;
    box-shadow: rgba(0,0,0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 4px 6px;
    border-radius: 6px;
    width: 400px;
    max-width: 400px!important;
    transition: transform 0.2s ease-in-out;
    overflow: hidden;
    transition: all 0.2s ease-in-out;

    &.true {
      background: var(--white);
      box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.04), 0px 4px 8px rgba(0,0,0,0.1), 0px 5px 8px rgba(99, 116, 134, 0.03);
      border-radius: 50%;

      .desc, .iframe {
        opacity: 0;
      }

    }

    * + * {
      margin-top: 15px;
    }
  }

  .loom-image {
    width: 20px;
    height: auto;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    transform: scale3d(0.01, 0.01, 0.01);
    position: absolute;
    left: 5px;
    top: -10px;
    &.true {
      transform: scale3d(1,1,1);
      opacity: 1;
    }
  }

  .title {
    font-weight: 600;
    font-size: var(--16px);
    color: var(--grey-600);
    text-transform: capitalize;
    line-height: 140%;
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;

    &.true {
      opacity: 0;
    }

    img {
      width: 20px;
      height: auto;
      margin-right: 10px;
    }

    div {
      margin-top: 0;
    }
  }

  .desc {
    color: var(--grey-500);
    font-size: var(--14px);
    line-height: 150%;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    // margin-bottom: 20px;
  }

  .min {
    position: absolute;
    right: 10px;
    top: -5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    transition: background 0.2s ease-in-out;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      // background: var(--color-green-6);
    }

    .arrow {
      display: flex;

      &.true {
        transform: rotate(180deg);
        opacity: 0;
      }
    }
  }

</style>