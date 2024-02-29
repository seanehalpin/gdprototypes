<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition'
  import svelteTilt from 'vanilla-tilt-svelte';
  import type { PageLoad } from './$types';
  /** @type {import('./$types').PageData} */
  export let data: ReturnType<PageLoad>;

  // $: console.log("complete data: ", data);
  let releases:any;
  let wants:any;
  let showingRelease = true
  let showingWant = false
  let startdelay = 800

  $: dataInView = releases

  $: {
    if (data.releases) {
      // releases = data.releases.releases;
      releases = data.releases.releases.map(release => ({
        ...release,
        hover: false
      }));
    }
  }

  $: {
    if (data.wants) {
      wants = data.wants.wants.map(want => ({
        ...want,
        hover: false
      }));
    }
  }

  // $: console.log("releases", releases)
  // $: console.log("wants", wants)

  let ready = false

  onMount(() => {
    ready = true
    setTimeout(() => {
      startdelay = 0
    }, 1500)
  });

</script>

<svelte:head>
  <title>Collection</title>
</svelte:head>

{#if ready}
<div class="nav">
  <button class:active={showingRelease} on:click={()=> {dataInView = releases;showingRelease = true; showingWant = false}}>
    Collection
  </button>
  <button class:active={showingWant} on:click={()=> {dataInView = wants;showingRelease = false; showingWant = true}}>
    Wantlist
  </button>
</div>
{#key showingRelease}
<div class="holder">
  <div class="records" in:fade={{duration:250, delay: startdelay}}>
    {#each dataInView as release,i}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="record" 
        class:active={release.hover} 
        on:mouseleave={() => release.hover = false}
        on:click={() => release.hover = !release.hover}
        use:svelteTilt={{
          reverse: true,
          max: 15,
          startX: 0,
          startY: 0,
          perspective: 1000,
          scale: 1.1,
          speed: 100,
          transition: true,
          axis: null,
          reset: true,
          "reset-to-start": true,
          easing: "linear",
          glare: true,
          "max-glare": 0.5,
          "mouse-event-element": null,
          gyroscope: true,
          gyroscopeMinAngleX: -15,
          gyroscopeMaxAngleX: 15,
          gyroscopeMinAngleY: -15,
          gyroscopeMaxAngleY: 15
          }}
        >
        <div 
          class="sleeve" 
          style="background-image:url({release.basic_information.cover_image});"
          >
          {#if release.hover}
          <div class="text" in:fade={{duration:250}} out:fade={{duration:250}}>
            <h3>{release.basic_information.title}</h3>
            <p>
              {#each release.basic_information.artists as artist}
                <span>{artist.name} </span>
              {/each}
            </p>
          </div>
          {/if}
        </div>
        {#if release.basic_information.formats[0].text && release.basic_information.formats[0].text.toLowerCase().includes("orange")}
        <div class="lp orange">
          <div class="label" style="background-image: url({release.basic_information.cover_image});"></div>
          <div class="spindle"></div>
        </div>
        {:else if release.basic_information.formats[0].text && release.basic_information.formats[0].text.toLowerCase().includes("yellow")}
        <div class="lp yellow">
          <div class="label" style="background-image: url({release.basic_information.cover_image});"></div>
          <div class="spindle"></div>
        </div>
        {:else if release.basic_information.formats[0].text && release.basic_information.formats[0].text.toLowerCase().includes("white")}
        <div class="lp white">
          <div class="label" style="background-image: url({release.basic_information.cover_image});"></div>
          <div class="spindle"></div>
        </div>
        {:else if release.basic_information.formats[0].text && release.basic_information.formats[0].text.toLowerCase().includes("green")}
        <div class="lp green">
          <div class="label" style="background-image: url({release.basic_information.cover_image});"></div>
          <div class="spindle"></div>
        </div>
        {:else}
        <div class="lp">
          <div class="label" style="background-image: url({release.basic_information.cover_image});"></div>
          <div class="spindle"></div>
        </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
{/key}
{/if}


<style lang="scss">

  @import '../../../../mixins';

  $size: 300px;

  .holder {
    overflow-x: hidden;
    background-image: repeating-linear-gradient( 0deg, navajowhite 0 15px, bisque 5px 10px, wheat 5px 15px, tan 1px 16px );
    background-color: burlywood;
  }

  :global(.js-tilt-glare) {
    z-index: 200;
    width: 300px !important;
    height: 300px !important;
    left: calc(50% - 150px) !important;
  }

  .records {
    position: relative;
    display: grid;
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    grid-template-columns: repeat(auto-fit,minmax($size,1fr));
    gap: 50px;
    padding: var(--42px) var(--14px);

    @include sm {
      padding: var(--64px); 
    }
    // overflow-x: hidden;
    // background-image: repeating-linear-gradient( 0deg, navajowhite 0 15px, bisque 5px 10px, wheat 5px 15px, tan 1px 16px );
    // background-color: burlywood;
    // box-shadow: -25px 0px 75px 2px grey, -5px 0px 8px 5px grey, 10px 0px 2px burlywood;
    
  }

  .record {
    cursor: pointer;
    position: relative;
    z-index: 10;
    // transition: all 0.2s ease-in-out;

    &:hover {
      // transform: scale3d(1.03,1.03,1.03) rotate(-1deg) translate3d(0,-20px,0);
      z-index: 100;
      // .lp {
      //   transform: translate3d(150px,0,0) rotate(0);
      // }
      
      .sleeve {
        box-shadow: inset 0 0px 1px 1px rgba(255, 255, 255, 0.4), inset 0 0 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.3), 0 20px 20px -4px rgba(0,0,0,0.4);
      }
    }

    &.active {
      // transform: scale3d(1.03,1.03,1.03) rotate(-1deg) translate3d(-60px,-20px,0);
      z-index: 100;
      .lp {
        transform: translate3d(0,-190px,0) rotate(0);
        box-shadow: 0 20px 20px -4px rgba(0,0,0,0.4);

        @include lg {
          transform: translate3d(190px,0,0) rotate(0);
        }
      }
    }
  }

  .sleeve {
    position: relative;
    width: $size;
    height: $size;
    margin: 0 auto;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 4px;
    // overflow: hidden;
    transition: box-shadow 0.2s ease-in-out;
    will-change: box-shadow;
    box-shadow: inset 0 0px 1px 1px rgba(255, 255, 255, 0.4), inset 0 0 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.3), 0 5px 10px 0 rgba(0,0,0,0.3);
    z-index: 100;
  }

  .text {
    user-select: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: var(--16px);
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
    color: #fff;
  }

  h3 {
    line-height: 130%;
  }

  .lp {
    position: absolute;
    z-index: 10;
    left: calc(50% - ($size / 2));
    top: 2px;
    width: calc($size - 4px);
    height: calc($size - 4px);
    border-radius: 100%;
    background: linear-gradient(45deg, #333, black, #555, black, #333);
    transform: translate3d(0,0,0) rotate(-90deg);
    transition: all 0.2s ease-in-out;

    &.orange {
      background: linear-gradient(45deg, #EF8F37, #EE7E37, #EE7E37, #EE7E37, #EF8F37);

      &:before, &:after {
        background: repeating-radial-gradient( circle at center, #EF8F37 3px, transparent 6px );
      }
      &:after {
        background-color: rgba(255,255,255, 0.1);
      }
    }

    &.yellow {
      background: linear-gradient(45deg, #FFFF54, #FAF39D, #FFFF54, #FAF39D);

      &:before, &:after {
        background: repeating-radial-gradient( circle at center, #EAEA3C 3px, transparent 6px );
      }
      &:after {
        background-color: rgba(0,0,0, 0.02);
      }
    }

    &.white {
      background: rgba(255,255,255, 0.1);
      backdrop-filter: blur(20px);

      &:before, &:after {
        background: repeating-radial-gradient( circle at center, #fff 3px, transparent 6px );
      }
      &:after {
        background-color: rgba(255,255,255, 0.02);
      }
    }

    &.green {
      background: rgba(59,87,91, 0.9);
      backdrop-filter: blur(20px);

      &:before, &:after {
        background: repeating-radial-gradient( circle at center, #30474A 3px, transparent 6px );
      }
      &:after {
        background-color: rgba(0,0,0, 0.07);
      }
    }

    &:before, &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background-color: rgba(0, 0, 0, 0);
      background: repeating-radial-gradient( circle at center, black 3px, transparent 6px );
      border-radius: 100%;
    }

    &:after {
      width: 50%;
      margin: auto;
      height: 50%;
      background-color: rgba(0,0,0, 0.4);
      z-index: 1;
    }

    .label {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 35%;
      height: 35%;
      padding: 1px;
      background-position: center top;
      background-color: black;
      background-size: cover;
      text-align: center;
      border-radius: 100%;
      z-index: 2;
    }

    .spindle {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 6px;
      height: 6px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.4);
      z-index: 3;
    }

  }

  .nav {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 20px 0;
    gap: 5px;

    button {
      background: transparent;
      border: none;
      border-radius: 20px;
      background: rgba(255,255,255,0.3);
      color: #333;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      backdrop-filter: blur(10px);
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      &.active {
        background: #222;
        color: #fff;
      }
    }

  }

</style>