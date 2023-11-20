<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let transition = quartOut

  

</script>


<svelte:head>
  <title>GD: Email</title>
</svelte:head>

<Center>
  <iframe src="https://parcel.io/embed/7e3169d0-badc-4565-bb03-b1865ef44be4?parts=html&default-part=html&preview-size=500&theme=parcel-light&layout=preview" style="width:100%; height:100%; border:0; border-radius: 4px; overflow:hidden;" scrolling="No" title="Subject goes here" loading="lazy" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-popups-to-escape-sandbox" samesite=none secure=true onload="this.src=this.src+'#source='+window.location.href" > </iframe>
</Center>

<style lang="scss">

  


</style>