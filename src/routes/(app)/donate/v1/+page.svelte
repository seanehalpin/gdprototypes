<script lang="ts">
    import GdLogoSingle from '$lib/svg/GdLogoSingle.svelte';
    import Center from '$lib/util/Center.svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    let name = "Joseph"
</script>

<svelte:head>
  <title>Donate v1 | GiveDirectly</title>
</svelte:head>

<Center
  --flex-direction="column" 
  --background="var(--white)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
>
  <div class="container">
    <div class="nav">
      <GdLogoSingle fill="var(--green-600)"/>
    </div>
    <div class="gallery">
      <img src="/donate/joseph/joseph_01.png" alt="">
    </div>
    <div class="inner">
      <div class="form">
        <div class="header">
          <h1>Help people like {name} by giving today</h1>
        </div>
      </div>
    </div>
  </div>
</Center>

<style lang="scss">

  $width: 1280px;
  $inner: 1024px;
  
  .container {
    margin: 0 auto;
    width: 100%;
    max-width: $width;
    height: 100%;
    position: relative;
  }

  .nav {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .gallery {
    position: absolute;
    left: 0;
    top: 70px;
    z-index: 1;
  }

  .inner {
    width: 100%;
    max-width: $inner;
    margin: 0 auto;
    position: relative;
  }

  .form {
    position: relative;
    z-index: 100;
    width: 100%;
    max-width: 384px;
    margin-top: 94px;
  }

  .header {
    background: var(--white);
    margin-bottom: 10px;
    padding: var(--16px);
  }

  h1 {
    font-size: var(--16px);
    color: var(--green-600);
    font-weight: 700;
    line-height: var(--32px);
    margin: 0;
    padding: 0;
    text-align: center;
  }

</style>