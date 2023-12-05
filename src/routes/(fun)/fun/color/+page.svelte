<script lang="ts">
  import Center from "$lib/util/Center.svelte";

  let currentColors = ['#ff0000', '#00ff00', '#0000ff']; // Example current colors
  let augmentColor = '#ffff00'; // Editable augment color

  function hexToRgb(hex) {
          let r = parseInt(hex.slice(1, 3), 16);
          let g = parseInt(hex.slice(3, 5), 16);
          let b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
      }
  // Function to blend two colors
  function blendColors(color1, color2) {
      

      function averageRgb(rgb1, rgb2) {
          return rgb1.map((v, i) => Math.round((v + rgb2[i]) / 2));
      }

      function rgbToHex([r, g, b]) {
          return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      }

      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      const average = averageRgb(rgb1, rgb2);

      return rgbToHex(average);
  }

  // Compute new colors reactively
  $: newColors = currentColors.map(color => blendColors(color, augmentColor));

  // Function to generate 12 hues for each color
  function generateHues(baseColor) {
      let hues = [];
      for (let i = 0; i < 12; i++) {
          // Adjust the lightness of the color
          let lightness = (100 / 12) * i;
          hues.push(`hsl(${getHue(baseColor)}, 100%, ${lightness}%)`);
      }
      return hues;
  }

  // Function to extract the hue from an RGB color
  function getHue(hexColor) {
      let [r, g, b] = hexToRgb(hexColor);

      r /= 255, g /= 255, b /= 255;
      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h;

      if (max === min) {
          h = 0;
      } else if (max === r) {
          h = (60 * ((g - b) / (max - min)) + 360) % 360;
      } else if (max === g) {
          h = (60 * ((b - r) / (max - min)) + 120) % 360;
      } else {
          h = (60 * ((r - g) / (max - min)) + 240) % 360;
      }

      return h;
  }

  // Compute hues for new colors reactively
  $: huesColors = newColors.map(color => generateHues(color));
</script>

<svelte:head>
    <title>Color</title>
</svelte:head>

<Center>
<div class="holder">
  <div class="column">
    <h2>Current</h2>
    {#each currentColors as color}
        <div class="color-box" style="background-color: {color};"></div>
    {/each}
</div>

<div class="column">
    <h2>Augment</h2>
    <input type="color" bind:value={augmentColor} />
    <div class="color-box" style="background-color: {augmentColor};"></div>
</div>

<div class="column">
    <h2>New</h2>
    {#each currentColors as color}
        <div class="color-box" style="background-color: color-mix(in srgb, {color} 50%, {augmentColor} 50%);"></div>
    {/each}
</div>

<div class="column">
    <h2>Hues</h2>
    {#each huesColors as hues}
        <div class="holder">
            {#each hues as hue}
                <div class="hue-box" style="background-color: {hue};"></div>
            {/each}
        </div>
    {/each}
</div>
</div>
</Center>

<style lang="scss">
  .holder {
    display: flex;
  }
  .color-box {
      width: 50px;
      height: 50px;
      margin: 10px;
      border: 1px solid #ccc;
  }
  .column {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 1rem;
  }
  .hue-box {
      width: 20px;
      height: 20px;
      margin: 2px;
      border: 1px solid #ccc;
  }
</style>