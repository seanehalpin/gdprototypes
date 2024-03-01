<script lang="ts">
  
  import { onMount } from 'svelte'

  export let once = false;
  export let top = 0;
  export let bottom = 0;
  export let left = 0;
  export let right = 0;
  export let alignBottom = false
  export let height = 'auto'

  let intersecting = false;
  let container: Element;

  onMount(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;

      const observer = new IntersectionObserver(entries => {
        intersecting = entries[0].isIntersecting;
        if (intersecting && once) {
          observer.unobserve(container);
        }
      }, {
        rootMargin
      });

      observer.observe(container);
      return () => observer.unobserve(container);
    }

    function handler() {
      const bcr = container.getBoundingClientRect();

      intersecting = (
        (bcr.bottom + bottom) > 0 &&
        (bcr.right + right) > 0 &&
        (bcr.top - top) < window.innerHeight &&
        (bcr.left - left) < window.innerWidth
      );

      if (intersecting && once) {
        window.removeEventListener('scroll', handler);
      }
    }

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  });
</script>

<div bind:this={container} class:bottom={alignBottom} style="height: {height + 'px' || 'auto'};">
  <slot {intersecting}></slot>
</div>

<style>
  div {
    width: 100%;
    /* height: 100%; */
    --_display: var(--display, flex);
    display: var(--_display);
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: var(--zindex-content);
  }

  .bottom {
    align-items: flex-end;
  }
</style>