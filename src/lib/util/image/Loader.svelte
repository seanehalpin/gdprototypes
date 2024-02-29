<script lang="ts">

  export let src:any
  export let srcset = ''
  export let alt:any
  export let radius = false
  export let fullwidth = false
  export let fit = false
  export let caption = ''
  export let alignBottom = false
  export let maxwidth = false
  export let width = ''
  export let height = ''
  export let skeleton = true
  export let figshadow = false
  export let top = 0
  export let skip = true
  export let alignment = false
  
  import IntersectionObserver from '$lib/util/image/LazyLoader.svelte'
  import Image from '$lib/util/image/Image.svelte'
  let nativeLoading = false
  
</script>

{#if skip}
  <Image {alt} {src} {srcset} {radius} {fit} {caption} {fullwidth} {maxwidth} {width} {height} {skeleton} {figshadow} {alignment} skip={true} />
{:else}
  <IntersectionObserver once={true} let:intersecting={intersecting} {alignBottom} {top}>
    {#if intersecting || nativeLoading}
      <Image {alt} {src} {srcset} {radius} {fit} {caption} {fullwidth} {maxwidth} {width} {height} {skeleton} {figshadow} {alignment} />
    {/if}
  </IntersectionObserver> 
{/if}