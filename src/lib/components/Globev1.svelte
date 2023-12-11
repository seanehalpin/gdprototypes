<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  let Globe;

  if (browser) {
    import('globe.gl').then(module => {
      Globe = module.default;
      initializeGlobe();
    });
  }

  let globeVizElement;

  function initializeGlobe() {
    if (!globeVizElement) return;

    const N = 20;
    const arcsData = [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: [['green', 'green', 'green', 'green'][Math.round(Math.random() * 3)], ['green', 'green', 'green', 'green'][Math.round(Math.random() * 3)]]
    }));

    const world = Globe()
      .arcsData(arcsData)
      .width(800)
      .height(800)
      .showAtmosphere(false)
      .backgroundColor("#ffffff")
      .arcColor('color')
      .arcDashLength(() => Math.random())
      .arcDashGap(() => Math.random())
      .arcDashAnimateTime(() => Math.random() * 4000 + 500)
      (globeVizElement)
      .globeImageUrl('/dash/earth-blue-marble.jpg')
      .bumpImageUrl('/dash/earth-topology.png');

    // Auto-rotate
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.35;
  }
</script>

<svelte:head>
  <style>
    body { margin: 0; }
    canvas { filter: brightness(1.5); }
  </style>
</svelte:head>

<div bind:this={globeVizElement}></div>

<style>
  /* Additional SCSS or CSS styles */
</style>
