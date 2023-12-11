<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import * as THREE from 'three';
  import * as topojson from 'topojson-client';
  let Globe: any;
  let ready = false;

  onMount(async () => {
    if (browser) {
      const module = await import('globe.gl');
      Globe = module.default;
      initializeGlobe();
      ready = true;
    }
  });

  let globeVizElement: HTMLElement;

  async function initializeGlobe() {
    if (!Globe || !globeVizElement) return;

    const N = 5;
    const arcsData = [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: [['white', 'white', 'white', 'white'][Math.round(Math.random() * 3)], ['green', 'green', 'green', 'green'][Math.round(Math.random() * 3)]]
    }));

    const world = Globe({alpha:true})
      .arcsData(arcsData)
      .width(800)
      .height(800)
      // .showGlobe(false)
      .showAtmosphere(false)
      // .backgroundColor('rgba(0,0,0,0)')
      .backgroundColor('#3A796A')
      .showGraticules(false)
      .arcColor('color')
      .arcDashLength(() => Math.random())
      .arcDashGap(() => Math.random())
      .arcDashAnimateTime(() => Math.random() * 4000 + 500)
      (globeVizElement);

      world.globeMaterial().color = new THREE.Color('#70B4A0');

    const landTopo = await fetch('https://unpkg.com/world-atlas/land-110m.json').then(res => res.json());
    world
      .polygonsData(topojson.feature(landTopo, landTopo.objects.land).features)
      .polygonCapMaterial(new THREE.MeshLambertMaterial({ color: '#095845', side: THREE.DoubleSide }))
      .polygonSideColor(() => 'rgba(0,0,0,0)');

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


<div bind:this={globeVizElement} class="globe"></div>

<style lang="scss">

  .globe {
    border-radius: 16px;
    overflow: hidden;
  }
  
</style>
