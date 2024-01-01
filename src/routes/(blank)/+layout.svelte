<script lang="ts">
  
  // imports
  import { onMount } from 'svelte'
  import { Body } from 'svelte-body';
  import '../../reset.scss'
  import '../../app.scss'

  // variables
  let ready = false
  let minimized = false

  // functions
  onMount(() => {
    ready = true 
  })

</script>

<Body class="body-scroll" />


<main>
  <slot />
</main>

<style lang="scss">


  main {
    display: block;
    min-height: 100vh;
    position: relative;
    width: 100vw;
    height: 100vh;
    // overflow-y: scroll;
  }

  :global(.body-scroll) {
    overscroll-behavior: inherit;
    overflow: auto;
  }

  :global(.body-scroll > div) {
    display: block !important;
  }

</style>
