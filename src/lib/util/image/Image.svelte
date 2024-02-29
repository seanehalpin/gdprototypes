<script lang="ts">
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  
  export let src:any
  export let alt:any
  export let radius = false
  export let fit = false
  export let fullwidth = false
  export let caption = ''
  export let srcset:any
  export let maxwidth = false
  export let width = ""
  export let height = ""
  export let skeleton = true
  export let figshadow = false
  export let skip = false
  export let alignment = false
  
  let showCaption = false
  let loaded = false
  let thisImage:any
  
  onMount(() => {
    thisImage.onload = () => {
      loaded = true
    }
  })

</script>

<figure class:radius={radius} class:skeleton={skeleton} class:figshadow={figshadow}
  on:mouseenter={() => showCaption = true} 
  on:mouseleave={() => showCaption = false}
>
  <img 
    {src} 
    {srcset} 
    {alt} 
    width={width} 
    height={height} 
    class:loaded bind:this={thisImage} 
    class:radius={radius} 
    class:fit={fit} 
    class:skip={skip}
    class:fullwidth={fullwidth}
    class:maxwidth={maxwidth} 
    class:alignment={alignment}
    loading="lazy" 
  />
  {#if caption.length >= 1}
    {#if showCaption}
      <figcaption in:fly|local={{y:20, duration:250}} out:fly|local={{y:20, duration:250}}>{caption}</figcaption>
    {/if}
  {/if}
</figure>

<style lang="scss">

  $radius: 50px;
  $blur: 10px;
  $saturate: 1.3;

  .skeleton {
    background: var(--color-opaque);
  }

  figure {
    position: relative;
  }

  img {
    opacity: 0;
    transition: all 0.2s ease-in-out;
    max-width: inherit;
    position: relative;
    z-index: var(--zindex-content);
    --_shadow: var(--shadow, none);
    --_radius: var(--radius, 0);
    box-shadow: var(--_shadow);
    border-radius: var(--_radius);
    --_margin: var(--margin, 0);
    margin: var(--_margin);
  }

  img.fullwidth {
    width: 100% !important;
    height: auto !important;
  }

  img.loaded, img.skip {
    opacity: 1;
  }


  img.fit {
    object-fit: cover;
    width: 100%;
  }

  img.maxwidth {
    --_maxwidth: var(--maxwidth, auto);
    max-width: var(--_maxwidth);
  }

  img.alignment {
    --_alignment: var(--alignment, 0 auto);
    margin: var(--_alignment);
  }

  figcaption {
    position: absolute;
    bottom: var(--16px);
    left: var(--16px);
    display: flex;
    z-index: var(--zindex-content);
    background: var(--color-primary);
    // background: var(--color-white50);
    border-radius: calc(var(--16px) / 2);
    padding: calc(var(--16px) / 2) var(--16px);
    color: var(--color-text-secondary);
    // backdrop-filter: blur($blur);
    // -webkit-backdrop-filter: blur($blur);
  }

  .figshadow {
    position: relative;
    &:before {
      content: "";
      z-index: 1;
      box-shadow: var(--shadow-lg);
      display: block;
      width: 95%;
      height: 100%;
      border-radius: 80px;
      position: absolute;
      left: 2%;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }

</style>