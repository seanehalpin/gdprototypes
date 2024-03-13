<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import Qa from '$lib/components/website/Qa.svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let transition = quartOut

</script>


<svelte:head>
  <title>GD: FAQ</title>
</svelte:head>

<Center
--flex-direction="column" 
  --background="var(--white)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
>
  <div class="holder">
    <Qa />
  </div>
  

</Center>

<style lang="scss">

  .holder {
    max-width: 880px;
    width: 100%;
    margin: 0 auto;
    padding-top: 100px;
  }


</style>