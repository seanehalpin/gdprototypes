<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  export let map = "", fill = "var(--green-600)";

</script>

{#key map}
<svg width="598" height="330" viewBox="0 0 598 330" fill="none" xmlns="http://www.w3.org/2000/svg" in:fly={{duration:450, y: 20, easing: backOut}}>
  <path fill-rule="evenodd" clip-rule="evenodd" d={map} fill={fill} />
</svg>
{/key}

<style lang="scss">
  
  svg {
    position: relative;
    z-index: 1;
  }
  
</style>