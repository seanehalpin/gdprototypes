<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import ImageLoader from '$lib/util/image/Loader.svelte'
  export let data: PageData;

  let transition = quartOut 

</script>

<svelte:head>
  <title>Sign In</title>
</svelte:head>

<Center
--flex-direction="column" 
  --background="var(--bg)" 
  --gap="var(--24px)" 
>

<div class="with-sidebar">
  <div>
    <button class="donate">
      Donate
    </button>
  </div>
  <div>Over here</div>
</div>


</Center>


<style lang="scss">
  
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
    cursor: pointer;
  }


</style>