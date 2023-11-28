<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  import { map } from "$lib/util/Maps"
  import { onMount } from 'svelte'
  import html2canvas from 'html2canvas'
  import SvgMap from '$lib/components/SvgMap.svelte';
  import { fade, fly, slide, scale } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"

  let element: HTMLElement;

  async function captureAndDownload() {
    // Optional: Add a delay if dynamic content needs time to load
    await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay

    const canvas = await html2canvas(element, {
      scale: 2, // Scale to 2x
      // width: element.offsetWidth * 2, // Set explicit width
      // height: element.offsetHeight * 2, // Set explicit height
      useCORS: true // If dealing with external images
    });

    canvas.toBlob(blob => {
      const imageUrl = URL.createObjectURL(blob);
      downloadImage(imageUrl, 'map@2x.png');
    }, 'image/png');
  }

  function downloadImage(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  let width = 598;
  let height = 330;

  let currentColor = "var(--green-600)"

  let lastClickedIndex = 0;
  let currentMap = $map[lastClickedIndex].points;
  let currentCountry = $map[lastClickedIndex].country;

  function handleClick(index) {
    showDropdown = false;
    if (lastClickedIndex !== null) {
      map.update($map => {
        $map[lastClickedIndex].active = false;
        return $map;
      });
    }
    map.update($map => {
      $map[index].active = true;
      return $map;
    });
    currentMap = $map[index].points;
    currentCountry = $map[index].country;
    lastClickedIndex = index;
  }

  let showDropdown = false;

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  let circles = []

  let circleID = 0
  let circleColor = 0

  function handleCaptureClick(event) {
    if (!circleActive) {
      const { clientX, clientY } = event;
      const { left, top } = element.getBoundingClientRect();
      const circleSize = 24;
      const circleX = clientX - left - circleSize / 2;
      const circleY = clientY - top - circleSize / 2;
      let circleNewId = circleID++
      let circleNewColor = circleColor++
      circles = [...circles, { x: circleX, y: circleY, id: circleNewId, color: "circle-" + circleNewColor, village: "", desc: "", editMode: false }];
    }
  }

  function removeCircle(id) {
    circles = circles.filter(circle => circle.id !== id);
    circles = circles
    circleColor--
    
    setTimeout(() => {
      circleActive = false
    }, 100);
  }

  function toggleEditMode(id) {
    circles = circles.map(circle => {
      if (circle.id === id) {
        return { ...circle, editMode: true };
      } else {
        return { ...circle, editMode: false };
      }
    });
  }

  let circleActive = false

</script>

<svelte:head>
  <title>GD: Map Maker</title>
</svelte:head>

<Center 
  --flex-direction="column" 
  --background="var(--white)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
  
  >
  <div class="footer">
    <div class="options-holder">
      <div class="dropdown">
        <button class="current" class:active={showDropdown} on:click={() => toggleDropdown()}>
          {#key currentCountry}
          <span in:fly|local={{y: 5, duration:250}}>{currentCountry}</span>
          {/key}
        </button>
        {#if showDropdown}
          <div class="options" in:fly|local={{y:-5, duration:250}} out:fly|local={{y:-5, duration:250}}>
            {#each $map as map, i}
              <button class="option-item {i === lastClickedIndex ? 'active' : ''}" on:click={() => handleClick(i)}>
                <span>{map.short}</span>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
    <button class="primary" on:click={captureAndDownload}>Download</button>
  </div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="export-content">
    <div 
      bind:this={element} 
      id="capture-area" 
      class="capture" 
      style="width: {width}px; height: {height}px;"
      on:click={handleCaptureClick}
      >
      <div class="country-name">
        {#key currentCountry}
          <span in:fade={{duration:50}}>{currentCountry}</span>
        {/key}
      </div>
      <SvgMap map={currentMap} fill={currentColor} />
        <div class="circles">
          {#if circles.length > 0}
            {#each circles as circle}
              <div 
                class="circle {circle.color}" 
                style={`left: ${circle.x}px; top: ${circle.y}px;`} 
                on:click={() => removeCircle(circle.id)} 
                on:mouseenter={() => circleActive = true}
                on:mouseleave={() => circleActive = false} 
                in:scale={{duration:250, easing: quartOut, start: 0.7}}
                >
              </div>
            {/each}
          {/if}
        </div>
    </div>
    {#if circles.length > 0}
    <div class="location-holder">
      {#each circles as circle}
      {#if circle.editMode}
      <div class="location edit-mode" in:fade|local={{duration:250}}>
        <form on:submit|preventDefault={() => circle.editMode = false}>
          <input type="text" bind:value={circle.village} placeholder="Village">
          <input type="text" bind:value={circle.desc} placeholder="Description">
          <button type="submit" class="primary">Save</button>
        </form>
      </div>
      {:else}
      <div class="location" in:fade|local={{duration:250}} on:click={() => toggleEditMode(circle.id)}>
        <div class="color {circle.color}"></div>
        <div class="location-details">
          <div class="name">{circle.village === '' ? 'Village' : circle.village}</div>
          <div class="desc">{circle.desc === '' ? 'Description' : circle.desc}</div>
        </div>
      </div>
      {/if}
      {/each}
    </div>
    {/if}
  </div>
</Center>

<style lang="scss">

  $width: 598px;

  .export-content {
    position: relative;
    z-index: 10;
    // padding-top: var(--24px);
  }

  .country-name {
    pointer-events: none;
    user-select: none;
    position: absolute;
    left: 0;
    top: 138px;
    width: 100%;
    // height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: var(--24px);
    text-align: center;
    z-index: 10;
    font-weight: 500;
    text-shadow: -1px -1px 0 var(--accent-bg-primary), 1px -1px 0 var(--accent-bg-primary), -1px 1px 0 var(--accent-bg-primary), 1px 1px 0 var(--accent-bg-primary);
    text-transform: capitalize;

    span {
      position: relative;
      height: 36px;
      // top: -10px;
    }
  }

  .capture {
    // background: var(--white);
    background: var(--green-100);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

  }

  .primary {
    background: var(--accent-bg-primary);
    color: var(--accent-text-on-primary);
    border: 0;
    display: flex;
    height: 40px;
    padding: 0 var(--24px);
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    width: 120px;
    max-width: $width;

    &:hover {
      opacity: 0.8;
    }
  }

  .options-holder {
    position: relative;
    z-index: 100;
    width: 100%;
  }

  .options {
    flex-direction: row !important;
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--16px) - 6px);
    width: 100%;
    flex-direction: column;
    position: absolute;
    z-index: 10;
    // background: var(--white);
    background: var(--green-200);
    top: calc(100% + 6px);
    padding: calc(var(--16px) / 2);
    border-radius: 8px;

  }

  .dropdown {
    position: relative;
  }

  .current {
    text-transform: capitalize;
    // background: var(--white);
    background: transparent;
    color: var(--accent-text-on-transparent);
    box-shadow: 0 0 0 2px var(--green-300);
    border: 0;
    display: flex;
    height: 40px;
    padding: 0 var(--24px);
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    // width: $width;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;

    &:before {
      content: "";
      position: absolute;
      right: calc(14px + 5px);
      top: 51%;
      width: 5px;
      height: 2px;
      background: var(--green-400);
      transform: rotate(45deg) translateY(-50%);
    }
    &:after {
      content: "";
      position: absolute;
      right: calc(10px + 5px);
      top: 51%;
      width: 5px;
      height: 2px;
      background: var(--green-400);
      transform: rotate(-45deg) translateY(-50%);
    }


    &:hover {
      box-shadow: 0 0 0 2px var(--green-400);
    }

    &.active {
      box-shadow: 0 0 0 2px var(--green-500);
    }

  }

  .option-item {
    text-transform: capitalize;
    background: none;
    color: var(--accent-text-on-transparent);
    // box-shadow: 0 0 0 2px var(--green-300);
    border: 0;
    display: flex;
    height: 40px;
    font-size: var(--14px);
    padding: 0 calc(var(--16px));
    align-items: center;
    justify-content: flex-start;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s linear;
    white-space: nowrap;
    position: relative;

    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    
    }

    &:hover {
      background: var(--green-100);
      box-shadow: inset 0 0 0 2px var(--green-100);
    }

    &.active {
      // background: var(--green-100);
      // color: var(--accent-text-on-tertiary);
      // box-shadow: inset 0 0 0 2px var(--green-100);

      &:before {
        // content: "";
        position: absolute;
        right: 18px;
        top: 20px;
        width: 6px;
        height: 2px;
        background: var(--green-400);
        transform: rotate(45deg) translateY(-50%);
      }
      &:after {
        // content: "";
        position: absolute;
        right: 10px;
        top: 19px;
        width: 10px;
        height: 2px;
        background: var(--green-400);
        transform: rotate(-45deg) translateY(-50%);
      }
    }

  }

  .footer {
    display: flex;
    gap: var(--20px);
    width: $width;
    padding-top: var(--24px);
    position: relative;
    z-index: 100;
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
  }

  .circle {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    // background-color: var(--red-400);
    border: 2px solid #FFA17D;
    background: url('/maps/patterns/pattern-01.svg') center center;

    &.circle-1 {
      border-color: #E18BFF;
      background: url('/maps/patterns/pattern-02.svg') center center;
    }

    &.circle-2 {
      border-color: #88F0D8;
      background: url('/maps/patterns/pattern-03.svg') center center;
    }

    &.circle-3 {
      border-color: #FFDA57;
      background: url('/maps/patterns/pattern-04.svg') center center;
    }

    &.circle-4 {
      border-color: #54B7FF;
      background: url('/maps/patterns/pattern-05.svg') center center;
    }

    &.circle-5 {
      border-color: #FF6F6F;
      background: url('/maps/patterns/pattern-06.svg') center center;
    }

    &:before {
      position: absolute;
      content: "";
      width: 6px;
      height: 6px;
      background: var(--white);
      border-radius: 50%;
      left: calc(50% - 3px);
      top: calc(50% - 3px);
    }
  }

  .location-holder {
    width: $width;
    background: var(--white);
    padding: var(--16px) 0;
  }

  .location {
    padding: var(--16px);
    display: flex;
    gap: var(--16px);
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.25s ease-in-out;

    &:hover {
      box-shadow: 0 0 0 2px var(--green-200);
    }

    &.edit-mode {
      padding: var(--16px);
      cursor: default;
      background: none;
      background: var(--green-100);
      box-shadow: none !important;
    }

    form {
      display: flex;
      width: 100%;
      gap: calc(var(--16px) / 2);
      
      input {
        padding: 0 var(--16px);
        width: 100%;
        border: 0;
        border-radius: 6px;
      }
    }

    .color {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      // background-color: var(--red-400);
      border: 2px solid #FFA17D;
      background-color: var(--green-600);
      background-image: url('/maps/patterns/pattern-01.svg');
      background-position: center center;
      border-radius: 50%;
      position: relative;
      top: 0;

      &.circle-1 {
        border-color: #E18BFF;
        background-image: url('/maps/patterns/pattern-02.svg');
      }

      &.circle-2 {
        border-color: #88F0D8;
        background-image: url('/maps/patterns/pattern-03.svg');
      }

      &.circle-3 {
        border-color: #FFDA57;
        background-image: url('/maps/patterns/pattern-04.svg');
      }

      &.circle-4 {
        border-color: #54B7FF;
        background-image: url('/maps/patterns/pattern-05.svg');
      }

      &.circle-5 {
        border-color: #FF6F6F;
        background-image: url('/maps/patterns/pattern-06.svg');
      }

      &:before {
        position: absolute;
        content: "";
        width: 6px;
        height: 6px;
        background: var(--white);
        border-radius: 50%;
        left: calc(50% - 3px);
        top: calc(50% - 3px);
      }
    }

    .location-details {
      width: 100%;
      flex: 1;
      font-size: var(--15px);
      line-height: 140%;
      display: flex;
      flex-direction: column;
      gap: 4px;
  }

    .name {
      color: var(--green-600);
      font-weight: 600;
      word-wrap: break-word;
    }
    
    .desc {
      color: var(--grey-500);
      word-wrap: break-word;
    }

  }

</style>