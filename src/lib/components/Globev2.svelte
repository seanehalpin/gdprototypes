<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { browser } from '$app/environment';
  import * as THREE from 'three';
  import * as topojson from 'topojson-client';
  import { fade, fly } from 'svelte/transition'

  let globe: any;
  let ready = false;

  onMount(async () => {
    if (browser) {
      ready = true;
      const module = await import('globe.gl');
      globe = module.default;
      initializeglobe();
    }
  });
  $: console.log(ready)

  let globeVizElement: HTMLElement;

  async function initializeglobe() {
    if (!globe || !globeVizElement) return;

    let arcsData = [
      {
        startLat: 40.7128, // USA - Location 5 (New York City, New York)
        startLng: -74.0060, // USA - Location 5 (New York City, New York)
        endLat: -1.286389, // Kenya
        endLng: 36.817223, // Kenya
        color: ['#A4D07F', '#A4D07F'] // Color for the arc
      },
      {
        startLat: 40.7128, // USA - Location 5 (New York City, New York)
        startLng: -74.0060, // USA - Location 5 (New York City, New York)
        endLat: 1.373333, // Kenya
        endLng: 32.290275, // Kenya
        color: ['#A4D07F', '#A4D07F'] // Color for the arc
      },
      {
        startLat: 40.7128, // USA - Location 5 (New York City, New York)
        startLng: -74.0060, // USA - Location 5 (New York City, New York)
        endLat: -18.665695, // Kenya
        endLng: 35.52956, // Kenya
        color: ['#A4D07F', '#A4D07F'] // Color for the arc
      },
      {
        startLat: 40.7128, // USA - Location 5 (New York City, New York)
        startLng: -74.0060, // USA - Location 5 (New York City, New York)
        endLat: 31.791702, // Kenya
        endLng: -7.092620, // Kenya
        color: ['#A4D07F', '#A4D07F'] // Color for the arc
      },
      {
        startLat: 40.7128, // USA - Location 5 (New York City, New York)
        startLng: -74.0060, // USA - Location 5 (New York City, New York)
        endLat: 32.1656, // Kenya
        endLng: -82.9001, // Kenya
        color: ['#A4D07F', '#A4D07F'] // Color for the arc
      },
    ];

    const labelsData = [
      {
        lat: 40.7128, 
        lng: -74.0060,
        text: 'New York',
        color: '#A3DACE',
        size: 1
      },
      {
        lat: -1.286389, // Kenya
        lng: 36.817223, // Kenya
        text: 'Kenya',
        color: '#BEFBD3',
        size: 1
      },
      {
        lat: 1.373333, // Uganda
        lng: 32.290275, // Uganda
        text: 'Uganda',
        color: '#A4D07F',
        size: 1
      },
      {
        lat: -18.665695, // Mozambique
        lng: 35.529562, // Mozambique
        text: 'Mozambique',
        color: '#E58663',
        size: 1
      },
      {
        lat: 31.791702, // Morocco
        lng: -7.092620, // Morocco
        text: 'Morocco',
        color: '#A498F1',
        size: 1
      },
      {
      lat: 32.1656, // USA - Location 6 (Georgia, USA)
      lng: -82.9001, // USA - Location 6 (Georgia, USA)
      text: 'Georgia',
      color: '#5FBBF0',
      size: 1
    }
    ];

    const landTopo = await fetch('https://unpkg.com/world-atlas/land-110m.json').then(res => res.json());


    let world = globe({alpha:true})
      .arcsData(arcsData)
      // .width(896)
      .width(512)
      .height(470)
      // .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
      // .showglobe(false)
      .showAtmosphere(false)
      .backgroundColor('rgba(0,0,0,0)')
      // .backgroundColor('#3A796A')
      // .backgroundColor('#F9F7F1')
      .showGraticules(false)
      .arcColor('color')
      .arcDashLength(0.75)
      .arcDashGap(0.5)
      .arcDashAnimateTime(() => Math.random() * 8000 + 2000)
      .arcStroke(0.8)
      .polygonsData(topojson.feature(landTopo, landTopo.objects.land).features)
      .polygonCapMaterial(new THREE.MeshLambertMaterial({ color: '#095845', side: THREE.DoubleSide }))
      .polygonSideColor(() => 'rgba(0,0,0,0)')
      .polygonAltitude(0.01)
      .labelAltitude(0.02)
      .labelsData(labelsData)
      .labelText('text')
      .labelColor('color')
      .labelSize('size')
      .labelDotRadius(2)
      .labelResolution(2)
      .onLabelClick(label => console.log(label))
      (globeVizElement);

      // world.globeMaterial().color = new THREE.Color('#70B4A0');
      world.globeMaterial().color = new THREE.Color('#ffffff');

    
    // world
    //   .polygonsData(topojson.feature(landTopo, landTopo.objects.land).features)
    //   .polygonCapMaterial(new THREE.MeshLambertMaterial({ color: '#095845', side: THREE.DoubleSide }))
    //   .polygonSideColor(() => 'rgba(0,0,0,0)');

    // Auto-rotate
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.5;

    world.camera().position.set(100, 50, 270);

    // const CLOUDS_IMG_URL = '/dash/clouds.png';
    // const CLOUDS_ALT = 0.03;
    // const CLOUDS_ROTATION_SPEED = -0.01; // deg/frame

    // new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
    //   const clouds = new THREE.Mesh(
    //     new THREE.SphereGeometry(world.getglobeRadius() * (1 + CLOUDS_ALT), 75, 75),
    //     new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
    //   );
    //   world.scene().add(clouds);

    //   (function rotateClouds() {
    //     clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
    //     requestAnimationFrame(rotateClouds);
    //   })();
    // });



  }
</script>

<svelte:head>
  <style>
    body { margin: 0; }
    canvas { 
      filter: brightness(1); 
    }
  </style>
</svelte:head>

{#if ready}
<div bind:this={globeVizElement} class="globe" in:fade={{duration:250, delay: 1200}}></div>
{:else}
<div class="loading">
loading...
</div>
{/if}

<style lang="scss">

  .globe {
    // border-radius: 16px;
    overflow: hidden;
    width: 100%;
  }

  
  
</style>
