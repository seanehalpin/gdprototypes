<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import Center from '$lib/util/Center.svelte';

  let ready = false
  let blueprint = false

  onMount(() => {
    ready = true 
  })

</script>

<svelte:head>
  <title>EP-133 K.O. II</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sono:wght@318;456&family=Victor+Mono&display=swap" rel="stylesheet">
</svelte:head>

{#if ready}

<Center 
--background="#F5F5F5"
--flex-direction="column"
--gap="80px"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="ep-133" class:blueprint={blueprint}>
    <!-- <div class="ep-133"> -->
    <div class="ep-133-module" class:active={blueprint}>
    <div class="connection-ports">
      <button class="output">Output</button>
      <button class="input">Input</button>
      <button class="sync">
        <span>Sync</span> <span>Midi</span>
      </button>
      <button class="usb">Usb</button>
      <button class="power">Power</button>
    </div>
    <div class="audio">
      <div class="faceplate">
        <div class="cap top-left"></div>
        <div class="cap top-right"></div>
        <div class="cap bottom-left"></div>
        <div class="cap bottom-right"></div>
        <div class="name">
          <h1>K.O.&nbsp;<span>ii</span></h1>
          <div class="sampler">
            サンプラー
          </div>
        </div>
        <div class="disclosure">
          64 mb sampler composer
        </div>
      </div>
      <div class="speaker">
        {#each Array(168) as _}
          <div class="vent"></div>
        {/each}
      </div>
    </div>
    <div class="dash">
      <div class="shine">
        <div class="shiner"></div>
      </div>
      <div class="dash-grid">
        <div class="dash-item top">
          <div class="battery"></div>
        </div>
        <div class="dash-item">
          
        </div>
        <div class="dash-item">
          <div class="letter red dimmed">A</div>
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item lcd">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="number number-1">
            <div class="number-angle-top-left"></div>
            <div class="number-angle-bottom-left"></div>
            <div class="number-angle-top-right"></div>
            <div class="number-angle-bottom-right"></div>
            <div class="number-small"></div>
            <div class="number-small"></div>
            <div class="number-middle">
              <div class="number-small"></div>
              <div class="number-small"></div>
            </div>
            <div class="number-small"></div>
            <div class="number-small active"></div>
          </div>
          <div class="number number-9">
            <div class="number-angle-top-left active"></div>
            <div class="number-angle-bottom-left"></div>
            <div class="number-angle-top-right active"></div>
            <div class="number-angle-bottom-right active"></div>
            <div class="number-small"></div>
            <div class="number-small active-top"></div>
            <div class="number-middle">
              <div class="number-small"></div>
              <div class="number-small"></div>
            </div>
            <div class="number-small active"></div>
            <div class="number-small"></div>
          </div>
          <div class="number number-3">
            <div class="number-angle-top-left"></div>
            <div class="number-angle-bottom-left"></div>
            <div class="number-angle-top-right active"></div>
            <div class="number-angle-bottom-right active"></div>
            <div class="number-small"></div>
            <div class="number-small"></div>
            <div class="number-middle">
              <div class="number-small"></div>
              <div class="number-small"></div>
            </div>
            <div class="number-small active"></div>
            <div class="number-small"></div>
          </div>

        </div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item no-overflow">
          <div class="simon top-left"></div>
        </div>
        <div class="dash-item no-overflow">
          <div class="simon top-right"></div>
        </div>
        <div class="dash-item"></div>
        <div class="dash-item no-overflow dimmed">
          <div class="simon top-left"></div>
        </div>
        <div class="dash-item no-overflow dimmed">
          <div class="simon top-right"></div>
        </div>
        <div class="dash-item">
          <div class="mute"></div>
        </div>
        <div class="dash-item">

          
        </div>
        <div class="dash-item">
          <div class="letter red dimmed">B</div>
        </div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item">
          
        </div>
        <div class="dash-item no-overflow">
          <div class="simon bottom-left"></div>
        </div>
        <div class="dash-item no-overflow">
          <div class="simon bottom-right"></div>
        </div>
        <div class="dash-item">
          <div class="small-squares red">
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
          </div>
        </div>
        <div class="dash-item no-overflow dimmed">
          <div class="simon bottom-left"></div>
        </div>
        <div class="dash-item no-overflow dimmed">
          <div class="simon bottom-right"></div>
        </div>
        
        <div class="dash-item">
          <div class="keys">
            <div class="key"></div>
            <div class="key"></div>
            <div class="key"></div>
            <div class="key"></div>
            <div class="black-keys">
              <div class="black-key"></div>
              <div class="black-key"></div>
              <div class="black-key"></div>
            </div>
          </div>
        </div>
        <div class="dash-item">
          <div class="mini-grid orange-border">
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
          </div>
          <div class="clipped-square red-fill"></div>
          <div class="clipped-square-shadow"></div>
        </div>
        <div class="dash-item">
          <div class="letter red">C</div>
        </div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item">
          <div class="red-circle"></div>
        </div>
        <div class="dash-item">
          <div class="play"></div>
        </div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item">
          <div class="fader">
            <div class="fader-row">
              <div class="fader-lg"></div>
              <div class="fader-md"></div>
              <div class="fader-md"></div>
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
            </div>
            <div class="fader-row">
              <div class="fader-lg"></div>
              <div class="fader-md"></div>
              <div class="fader-md"></div>
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
            </div>
            <div class="fader-row">
              <div class="fader-lg"></div>
              <div class="fader-md"></div>
              <div class="fader-md"></div>
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
            </div>
          </div>
        </div>
        <div class="dash-item">
          <div class="fx">FX</div>
        </div>
        <div class="dash-item">
          <div class="fader">
            <div class="fader-row">
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
              <div class="fader-md"></div>
              <div class="fader-md"></div>
              <div class="fader-lg"></div>
            </div>
            <div class="fader-row">
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
              <div class="fader-md"></div>
              <div class="fader-md"></div>
              <div class="fader-lg"></div>
            </div>
            <div class="fader-row">
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
              <div class="fader-sm"></div>
              <div class="fader-md"></div>
              <div class="fader-md"></div>
              <div class="fader-lg"></div>
            </div>
          </div>
        </div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item">
          <div class="small-squares blue">
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
          </div>
        </div>
        <div class="dash-item">
          <div class="q"></div>
        </div>
        <div class="dash-item"></div>
        <div class="dash-item"></div>
        <div class="dash-item">
          <div class="mini-grid orange-border">
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
            <div class="mini-item"></div>
          </div>
          <div class="clipped-square blue-fill"></div>
          <div class="clipped-square-shadow"></div>
        </div>
        <div class="dash-item">
          <div class="letter red dimmed">D</div>
        </div>
        <div class="dash-item two-col">
          <div class="sound">Sound</div>
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item two-col">
          <div class="sound red dimmed">Main</div>
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
          <div class="small-squares white">
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
            <div class="small-square"></div>
          </div>
        </div>
        <div class="dash-item">
        </div>
        <div class="dash-item">
        </div>
      </div>
    </div>
    <div class="controls">
      <div class="top-controls">
        <button class="round-button" data-label="Volume"><span>volume</span></button>
        <div class="entry">
          <button class="connected"><span class="button-inside dark-gray">Sound</span></button>
          <div class="button-panel white">Edit</div>
        </div>
        <div class="entry">
          <button class="connected"><span class="button-inside dark-gray">Main</span></button>
          <div class="button-panel orange">Commit</div>
        </div>
        <div class="entry long-handle">
          <button class="connected"><span class="button-inside dark-gray">Tempo</span></button>
          <div class="button-panel grey">Loop</div>
        </div>
        <div class="space"></div>
        <button class="round-button orange" data-label="Bpm"><span>bpm</span></button>
        <button class="round-button dark" data-label="Metronome"><span>metronome</span></button>

        <div class="entry small">
          
        </div>
        <div class="entry small">
          <div class="light"></div>
          
        </div>
        <div class="entry small">
          <div class="light off"></div>
          <span class="light-text">Level</span>
        </div>
        <div class="entry small">
          <div class="light off"></div>
          <span class="light-text">Pitch</span>
        </div>
        <div class="entry small">
          <div class="light"></div>
          <span class="light-text">Time</span>
        </div>
        <div class="entry small center">
          <span class="axis">X</span>
        </div>
        <div class="entry small center">
          <span class="axis dark">Y</span>
        </div>

        <div class="entry">
          <button class="small"><span class="button-inside dark-gray">Keys</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big light-gray">A</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">7</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">8</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">9</span></button>
        </div>
        <div class="entry left-gain">
          <button class="connected"><span class="button-inside">Sample</span></button>
          <div class="button-panel white">Chop</div>
        </div>
        <div class="entry right-swing">
          <button class="connected"><span class="button-inside dark-gray">Timing</span></button>
          <div class="button-panel white">Correct</div>
        </div>
        <div class="entry small">
          <button class="small"><span class="button-inside dark-gray">Fader</span></button>
        </div>
        <div class="entry small">
          <div class="light off"></div>
        </div>
        <div class="entry small">
          <div class="light"></div>
          <span class="light-text">Lpf</span>
        </div>
        <div class="entry small">
          <div class="light"></div>
          <span class="light-text">Hpf</span>
        </div>
        <div class="entry small">
          <div class="light off"></div>
          <span class="light-text">FX</span>
        </div>
        <div class="entry small">
        
        </div>
        <div class="entry small">
        
        </div>
        <div class="entry long">
          <input type="range"/>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big light-gray">B</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">4</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">5</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">6</span></button>
        </div>
        <div class="entry">
          <button class="connected"><span class="button-inside dark-gray">Fx</span></button>
          <div class="button-panel white">Output</div>
        </div>
        <div class="entry">
          <button class="connected"><span class="button-inside white">Erase</span></button>
          <div class="button-panel white">System</div>
        </div>
        <div class="entry small">
          <div class="light off"></div>
        </div>
        <div class="entry small">
          <div class="light off"></div>
          <span class="light-text">Atk</span>
        </div>
        <div class="entry small">
          <div class="light off"></div>
          <span class="light-text">Rel</span>
        </div>
        <div class="entry small">
          <div class="light off"></div>
          <span class="light-text">Pan</span>
        </div>
        <div class="entry small">
        
        </div>
        <div class="entry small">
        
        </div>
        
        
        <div class="entry">
          <button class="big"><span class="button-inside big light-gray">C</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">1</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">2</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">3</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big big-middle white">-</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big big-middle white">+</span></button>
        </div>
  
        <div class="entry small">
          <div class="light off"></div>
        </div>
        <div class="entry small">
          <div class="light off"></div>
          <span class="light-text">Tune</span>
        </div>
        <div class="entry small">
          <div class="light"></div>
          <span class="light-text">Vel</span>
        </div>
        <div class="entry small">
          <div class="light off"></div>
          <span class="light-text">Mod</span>
        </div>
        <div class="entry small">
          <div class="light off"></div>
          <div class="light right"></div>
        </div>
        <div class="entry small">
        
        </div>
        <div class="entry bottom">
          <button class="small"><span class="button-inside light-gray">Shift</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big light-gray">D</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">.</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big dark-gray">0</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big small-text dark-gray">Enter</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big small-text">Record</span></button>
        </div>
        <div class="entry">
          <button class="big"><span class="button-inside big small-text gray">Play</span></button>
        </div>
      </div>
    </div>
    </div>
  </div>

  <div class="ui-control">
    <label class="ui-label">
      <button class="ui-button" type="button" aria-pressed={blueprint} class:active={blueprint} on:click={() => blueprint = !blueprint}>
        <div class="ui-knob" class:active={blueprint}></div>
      </button>
    <div class="ui-text">Blueprint</div>
  </label>
  </div>
</Center>

{/if}

<style lang="scss">

  @font-face {
    font-family: 'techno';
    src: url('/fun/technotype34.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  // see Nicolas Jesenberger wonderful codepen https://codepen.io/nicolasjesenberger/pen/gOqzJed

  $r: 4px;
  $top: 27px;
  $sono: 'Sono', monospace;
  $victor: 'Victor Mono', monospace;
  $techno: 'techno', monospace;

  .ep-133 {
    font-family: $sono;
    width: 600px;
    // background-color: #E4E1DF;
    
    // box-shadow: 0px 25px 20px -15px rgba(0, 0, 0, 0.1), 10px 65px 50px -10px rgba(0, 0, 0, 0.05);
    // box-shadow: 0px 11px 24px 0px rgba(0, 0, 0, 0.14), 0px 43px 43px 0px rgba(0, 0, 0, 0.12), 0px 97px 58px 0px rgba(0, 0, 0, 0.07), 0px 172px 69px 0px rgba(0, 0, 0, 0.02), 0px 269px 75px 0px rgba(0, 0, 0, 0.00);
    border-radius: $r;
    position: relative;
    perspective: 2000px;
    // used for outline purposes

    &.blueprint {
      background: transparent;
      box-shadow: 0px 11px 24px 0px rgba(0, 0, 0, 0), 0px 43px 43px 0px rgba(0, 0, 0, 0), 0px 97px 58px 0px rgba(0, 0, 0, 0), 0px 172px 69px 0px rgba(0, 0, 0, 0), 0px 269px 75px 0px rgba(0, 0, 0, 0);
      transition: all 500ms ease 0s;
      * {
        border: 0 !important;
        background: rgba(54,79,217, 0.3) !important;
        color: #fff !important;
        box-shadow: inset 0 0 0 1px rgba(255,255 ,255, 0.3) !important;
        &:before, &:after {
          display: none !important;
        }
      }
      &:before, &:after {
        display: none !important;
      }
      input[type="range"] {
        display: none !important;
      }
      // .number {
      //   display: none !important;
      // }
      .number {
        .number-small, .number-angle-bottom-right.active, .number-angle-top-right.active, .number-angle-top-left.active {
          background: rgba(54,79,217, 0.3) !important;
          color: #fff !important;
        }
        
      }
    }
    // end of outline

    &:after {
      position: absolute;
      right: 38px;
      top: -12px;
      content: "";
      width: 16px;
      height: 12px;
      border-radius: 2px 2px 0px 0px;
      background: linear-gradient(270deg, #E24331 0%, #FF4F2C 11.1%, #FF7926 38.85%, #FFC386 75.68%, #FEB068 96.88%);
    }


    .ep-133-module {
      overflow: hidden;
      position: relative;
      transition: all 500ms ease 0s;
      
      &.active {
        // transform: translateY(0px) scale(1.15) rotateX(30deg) rotateY(0deg) translateZ(0px);
      }
    }

  }

  .connection-ports {
    height: $top;
    background: #C5C2C1;
    box-shadow: 2px 2px 2px 0px rgba(255, 255, 255, 0.55) inset;
    border-radius: $r $r 0 0;
    position: relative;
    z-index: 10;

    &:before {
      content: "";
      z-index: 1;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      position: absolute;
      background: url(/fun/noise@2x.png) top left;
      background-size: 100px 100px;
    }

    button {
      cursor: pointer;
      z-index: 20;
      position: absolute;
      top: 0;
      height: $top;
      border: 0;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      font-family: $techno;
      font-weight: 500;
      // font-feature-settings: 'liga' off;
      font-size: 11px;
      // font-weight: 318;
      line-height: normal;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      padding: 0 10px;

      &.output {
        left: 27px;
        color: #353535;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.35);
        background: #F4F1EF;
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.20), 9px 8px 7px 0px rgba(0, 0, 0, 0.12), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 25px 22px 9px 0px rgba(0, 0, 0, 0.00), 0px 0.5px 0px 0.5px rgba(0, 0, 0, 0.16);
      }

      &.input {
        left: 142px;
        color: #fff;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.35);
        background: #FF6523;
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.20), 9px 8px 7px 0px rgba(0, 0, 0, 0.22), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 25px 22px 9px 0px rgba(0, 0, 0, 0.00), 0px 0.5px 0px 0.5px #BD4512, 1px 1px 3px -1px rgba(255, 255, 255, 0.92) inset;
        padding: 0 12px;
      }

      &.sync {
        gap: 30px;
        font-weight: 456;
        padding: 0 26px;
        color: #fff;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.35);
        background: #2F2E2E;
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.20), 9px 8px 7px 0px rgba(0, 0, 0, 0.22), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 25px 22px 9px 0px rgba(0, 0, 0, 0.00), 0px 0.5px 0px 0.5px #686564, 1px 1px 3px -1px rgba(255, 255, 255, 0.52) inset, 0px 2px 2px -2px #FFF inset;
        left: 228px;

        span {
          position: relative;

          &:before {
            content: "I";
            font-family: $techno;
            position: absolute;
            left: -5px;
            top: -6px;
            color: #fff;
            font-size: 5px;
          }
          &:after {
            content: "O";
            font-family: $techno;
            position: absolute;
            right: -5px;
            top: -6px;
            color: #fff;
            font-size: 5px;
          }
        }
      }
      
      &.usb {
        left: 440px;
        color: #fff;
        padding: 0 17px;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.35);
        background: #747170;
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.20), 9px 8px 7px 0px rgba(0, 0, 0, 0.32), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 25px 22px 9px 0px rgba(0, 0, 0, 0.00), 0px 0.5px 0px 0.5px #686564, 1px 1px 3px -1px rgba(255, 255, 255, 0.52) inset;
      }

      &.power {
        padding: 0;
        left: 530px;
      }

    }

  }

  .audio {
    height: 164px;
    background-image: linear-gradient(180deg, #FBF9F8 0%, #EDE9E7 100%);
    position: relative;
    z-index: 20;
    display: flex;

    .faceplate {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 10;
      background: #E0DCD9;
      box-shadow: 0px 2px 2px 0px rgba(255, 255, 255, 0.65) inset;

      &:before {
        pointer-events: none;
        content: "";
        z-index: 100;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        background: url(/fun/noise@2x.png) top left;
        background-size: 100px 100px;
      }

      .cap {
        position: absolute;
        width: 16px;
        height: 16px;
        z-index: 90;
        fill: #E2DEDB;
        box-shadow: -0.5px -0.5px 1px 0px #ECECEC inset, 0.5px 0.5px 0.5px 0px rgba(0, 0, 0, 0.20) inset, 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.60);
        border-radius: 50%;

        &.top-left {
          left: 5px;
          top: 5px;
        }
        &.top-right {
          right: 5px;
          top: 5px;
        }
        &.bottom-left {
          left: 5px;
          bottom: 5px;
        }
        &.bottom-right {
          right: 5px;
          bottom: 5px;
        }
      }

      .name {
        position: absolute;
        left: 27px;
        top: 20px;
        z-index: 90;

        h1 {
          font-family: $techno;
          font-size: 36px;
          color: #353535;
          // letter-spacing: -4px;
          position: relative;
          font-weight: 500;
        }

        span {
          font-family: $victor !important;
          font-size: 32px;
          font-weight: 400;
          text-transform: uppercase;
          // font-family: var(--systemFont);
          letter-spacing: -7px;
          position: relative;
          // left: -9px;
        }

        .sampler {
          font-family: $techno;
          font-size: 20px;
          color: #FD6C30;
          font-weight: 500;
          text-shadow: 0.2px 0.2px #C2371E;
          position: relative;
          top: -8px;
        }

      }

      .disclosure {
        position: absolute;
        bottom: 4px;
        left: 27px;
        color: #353535;
        font-family: $techno;
        font-size: 17.5px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.175px;
        text-transform: uppercase;
        z-index: 10;
      }

    }

    .speaker {
      width: 273px;
      height: 100%;
      padding: 5px 5px 0;
      background: #83807E;
      position: relative;
      z-index: 10;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      gap: 3px;

      &:before {
        pointer-events: none;
        content: "";
        z-index: 100;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        background: url(/fun/noise@2x.png) top left;
        background-size: 100px 100px;
        opacity: 0.5;
      }

      .vent {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: flex;
        overflow: hidden;
        flex-shrink: 0;
        background: #5A5857;
        box-shadow: -0.5px -0.5px 1px 0px #adadad inset, 2px 2px 4px 0px rgba(0, 0, 0, 0.70) inset, -0.5px -0.5px 0px #5A5857, 0.5px 0.5px 0px rgba(255, 255, 255, 0.60);

        &:nth-child(1), &:nth-child(2), &:nth-child(13), &:nth-child(14),&:nth-child(15), &:nth-child(16), &:nth-child(27), &:nth-child(28), &:nth-child(141), &:nth-child(142),  &:nth-child(153),  &:nth-child(154),&:nth-child(155), &:nth-child(156), &:nth-child(167), &:nth-child(168) {
          background: #83807E;
          box-shadow: -0.5px -0.5px 0px 0px #adadad inset, 1px 1px 2px 0px rgba(0, 0, 0, 0.60) inset, -0.5px -0.5px 0px #5A5857, 0.5px 0.5px 0px rgba(255, 255, 255, 0.60);
        }
        
      }

    }


  }

  .dash {
    height: 164px;
    background: linear-gradient(180deg, #1F1F1F 0%, #2B2A2A 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.40), 0px 7px 7px 0px rgba(0, 0, 0, 0.34), 0px 16px 10px 0px rgba(0, 0, 0, 0.20), 0px 28px 11px 0px rgba(0, 0, 0, 0.06), 0px 44px 12px 0px rgba(0, 0, 0, 0.01);
    position: relative;
    z-index: 200;
    padding: 30px;
    overflow: hidden;

    &::before, &::after {
      position: absolute;
      width: 1px;
      height: 100%;
      top: 0;
      content: "";
      z-index: 10;
      opacity: 0.5;
      background: #464444;
    }

    &::before {
      left: 10px;
    }
    &::after {
      right: 10px;
    }

    .shine {
      pointer-events: none;
      // display: none;
      position: absolute;
      width: 700px;
      height: 700px;
      top: -440px;
      left: -410px;
      z-index: 100;
      transform: rotate(45deg);
      overflow: hidden;

      .shiner {
        background: #fff;
        filter: blur(50px);
        width: 200px;
        height: 200px;
        position: absolute;
        right: 0;
        top: -40px;
        opacity: 0.6;
      }
    }

    .dash-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(22px, 1fr));
      grid-gap: 5px;
      width: 100%;

      .dash-item {
        // background-color: red;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &.no-overflow {
          overflow: hidden;
        }

        &.top {
          align-items: flex-start;
          // justify-content: flex-start;
        }

        &.two-col {
          grid-column: span 2;
          width: 100%;
        }

        &.lcd {
          grid-row: span 2; 
          grid-column: span 5;
          width: auto;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
          position: relative;
          padding: 0 1px;

          .dot {
            // filter: blur(0.5px);
            position: absolute;
            left: 41px;
            bottom: -1px;
            border-radius: 50%;
            width: 5px;
            height: 5px;
            background: #E1ECF1;
            z-index: 10;

            &:nth-child(2) {
              left: 86px;
            }
          }
        }
      }
    }

    .q {
      --color: #F5F3F2;
      width: 100%;
      height: 100%;
      border: 2px solid var(--color);
      border-radius: 50%;
      position: relative;

      &:before {
        position: absolute;
        content: "";
        width: 10px;
        height: 2px;
        right: -2px;
        bottom: 0;
        transform: rotate(45deg);
        background: var(--color);
      }
    }

    .small-squares {
      --color: #B02F49;
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      gap: 2px;

      &.red {
        --color: #B02F49;
      }

      &.blue {
        --color: #4580B0;
      }
      &.white {
        --color: #E1ECF1;
      }

      .small-square {
        width: 4px;
        height: 4px;
        background: var(--color);
      }
    }

    .fader {
      display: flex;
      flex-direction: column;
      gap: 3px;

      .fader-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2px;
      }
      .fader-sm {
        background: #EC5228;
        height: 3px;
        width: 1px;
      }
      .fader-md {
        background: #EC5228;
        height: 3px;
        width: 5px;
      }
      .fader-lg {
        background: #EC5228;
        height: 3px;
        width: 100%;
      }
    }

    .sound {
      --color: #E3ECF0;
      --text: #1A1919;
      background: var(--color);
      color: var(--text);
      text-transform: uppercase;
      font-family: $techno;
      font-size: 12px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      &.red {
        --color: #EB573A;
        --text: #1A1919;
      }
    }

    .fx {
      color: #fff;
      text-transform: uppercase;
      font-family: $techno;
      font-size: 16px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .simon {
      --fill: #FF4F2C;
      --left: 0;
      --top: 0;
      position: absolute;
      left: var(--left);
      top: var(--top);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 13px solid var(--fill);

      &.top-left {
        --left: 0;
        --top: 0;
      }
      &.top-right {
        --left: -27px;
        --top: 0;
        --fill: #e32656;
      }
      &.bottom-left {
        --left: 0;
        --top: -27px;
        --fill: #ff4000;
      }
      &.bottom-right {
        --left: -27px;
        --top: -27px;
        --fill: #45a2e0;
      }
    }

    .red-circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #FF4F2C;
    }

    .play {
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 18px solid white;
      border-radius: 2px;
    }

    .number {
      // filter: blur(0.5px);
      --active: #E1ECF1;
      display: flex;
      width: 100%;
      height: 100%;
      display: flex;
      gap: 2px;
      overflow: hidden;
      clip-path: polygon(30% 0%, 70% 0%, 100% 20%, 100% 80%, 70% 100%, 30% 100%, 0% 80%, 0% 20%);
      position: relative;

      .active {
        background: var(--active) !important;
      }

      .active-top {
        background: linear-gradient(180deg, var(--active) 0%, var(--active) 46%, #353535 47%, #353535 100%) !important;
      }

      &:after {
        content: "";
        height: 5px;
        width: 18px;
        position: absolute;
        left: 12px;
        top: 0;
        background: #353535;
        box-shadow: 0 2px 0 #222;
        z-index: 20;
      }

      &:before {
        content: "";
        height: 5px;
        width: 18px;
        position: absolute;
        left: 12px;
        bottom: 0;
        background: #353535;
        box-shadow: 0 -2px 0 #222;
        z-index: 20;
      }

      &.number-9, &.number-3 {
        &:after, &:before {
          background: var(--active);
        }
      }

      .number-small {
        width: 5px;
        background: #353535;
        height: 100%;

        &.active {
          background: #E1ECF1;
        }
      }

      .number-middle {
        flex: 1;
        gap: 12px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        z-index: 1;
        padding: 7px 0;

          .number-small {
            position: relative;
            
            &:nth-child(1) {
              clip-path: polygon(0% 0%, 100% 0%, 100% 20%, 100% 80%, 50% 100%, 50% 100%, 0% 80%, 0% 20%);
            }

            &:nth-child(2) {
              clip-path: polygon(50% 0%, 50% 0%, 100% 20%, 100% 80%, 100% 100%, 100% 100%, 0% 100%, 0% 20%);
            }
          }
        
        &:before {
          content: "";
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 10px solid #242424;
          position: absolute;
          left: -7px;
          top: 19px;
        }
        &:after {
          content: "";
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent; 
          border-right: 10px solid #242424; 
          position: absolute;
          right: -7px;
          top: 19px;
        }
      }

      .number-angle-top-left {
        position: absolute;
        left: 8px;
        top: 18px;
        background: #353535;
        width: 14px;
        height: 5px;
        z-index: 200;
        transform: rotate(26deg);
        border-radius: 3px;

        &:before {
          content: "";
          width: 20px;
          height: 2px;
          z-index: 200;
          // background: red;
          background: #242424;
          left: 4px;
          top: 2px;
          position: absolute;
          transform: rotate(-26deg);
          
        }

        &:after {
          content: "";
          width: 12px;
          height: 2px;
          z-index: 200;
          // background: blue;
          background: #242424;
          left: 8px;
          top: 2px;
          position: absolute;
          transform: rotate(64deg);
        }
      }
      .number-angle-bottom-left {
        position: absolute;
        left: 8px;
        bottom: 19px;
        background: #353535;
        width: 14px;
        height: 5px;
        z-index: 60;
        transform: rotate(-26deg);
        border-radius: 3px;
      }
      .number-angle-top-right {
        position: absolute;
        right: 8px;
        top: 18px;
        background: #353535;
        width: 14px;
        height: 5px;
        z-index: 50;
        transform: rotate(-26deg);
        border-radius: 3px;
      }
      .number-angle-bottom-right {
        position: absolute;
        right: 8px;
        bottom: 19px;
        background: #353535;
        width: 14px;
        height: 5px;
        z-index: 50;
        transform: rotate(26deg);
        border-radius: 3px;
      }
    }

    .battery {
      width: 21px;
      height: 11px;
      background: #FF4F2C;
      clip-path: polygon(83% 0, 0 0, 0 95%, 83% 95%, 83% 73%, 100% 73%, 100% 18%, 83% 18%);
    }

    .mute {
      width: 21px;
      height: 20px;
      background-color: #383838;
      clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);

      &:before {
        font-family: $techno;
        text-transform: uppercase;
        content: "Mute";
        position: absolute;
        top: 4px;
        left: 2px;
        color: #1A1A1A;
        font-size: 7px;
      }
    }

    .keys {
      // background-image: repeating-linear-gradient(90deg, #383838, #383838 4px, #232323 3px, #232323 6px);
      // background-size: 100% 6px, 100% 100%, 100% 6px, 6px 100%;
      // background-repeat: repeat, repeat, no-repeat, repeat;
      // background-position: 0 0, 0 0, 0 0, 6px 0;
      width: 22px;
      height: 22px;
      display: flex;
      gap: 1px;

      .key {
        width: 100%;
        background: #383838;
        height: 100%;
      }
    }

    .black-keys {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      z-index: 10;
      gap: 2.5px;

      .black-key {
        height: 13px;
        width: 4px;
        background: #232323;
      }
    }

    .mini-grid {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      gap: 0;
      width: 100%;
      height: 100%;
      align-content: flex-start;
      border: 0.5px solid;
      border-top: 0;
      border-left: 0;
      // box-shadow: inset -0.5px -0.5px 0 0 #EFA160;

      .mini-item {
        width: 3.5px;
        height: 3.5px;
        border: 0.5px solid;
        border-right: 0;
        border-bottom: 0;
      }

    }

    .clipped-square {
      z-index: 10;
      right: -1px;
      position: absolute;
      width: 100%; 
      height: 100%;
      // background-color: #D54066;
      clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 20% 100%, 44% 60%);
    }

    .clipped-square-shadow {
      z-index: 5;
      right: 0px;
      position: absolute;
      width: 100%; 
      height: 100%;
      background-color: #272626;
      clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 20% 100%, 44% 60%);
    }

    .orange-border {
      border-color: #EFA160;

      .mini-item {
        border-color: #EFA160;
      }
    }
    .red-fill {
      background-color: #C73959;
    }
    .blue-fill {
      background-color: #73B2D9;
    }

    .letter {
      width: 18px;
      height: 18px;
      background-color: #FDFDFC;
      padding: 0 0 0 2px;
      font-size: 9px;
      color: #1F1F1F;
      border: 1px solid #1F1F1F;
      border-left: 0;
      border-top: 0;
      position: absolute;
      z-index: 10;
      left: 0;
      top: 0;

      &.red {
        box-shadow: 4px 4px 0 0 #C73959;
        &:before, &:after { 
          border-bottom-color: #C73959;
        }
      }

      &:before {
        content: "";
        position: absolute;
        right: -7px;
        transform: rotate(90deg);
        top: 2px;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid;
      }

      &:after {
        content: "";
        position: absolute;
        left: 0;
        transform: rotate(180deg);
        bottom: -5px;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid;
      }
    }

    .dimmed {
      opacity: 0.05;
    }

  }
  
  .controls {
    position: relative;
    z-index: 1;
    height: 463px;
    background: linear-gradient(180deg, #BDBBB9 59.96%, #A9A6A5 100%);
    border-radius: 0 0 $r $r;
    overflow: hidden;
    padding: 26px;

    .entry {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 55px;

      &.small {
        height: 26px;
      }

      &.center {
        align-items: center;
        justify-content: center;
      }

      &.bottom {
        justify-content: flex-end;
      }

      &.long {
        position: relative;
        grid-row: span 4; 
        grid-column: span 1;
        height: 100%;
      }

      &.long-handle {
        &:before {
          content: "";
          width: 146px;
          height: 10px;
          border: 1px solid #2F2E2E;
          border-bottom: 0;
          border-right: 0;
          position: absolute;
          top: -15px;
          left: 50%;
        }
        &:after {
          content: "";
          width: 28px;
          height: 10px;
          border: 1px solid #2F2E2E;
          border-bottom: 0;
          border-right: 0;
          border-left: 0;
          position: absolute;
          top: -15px;
          left: 209px;
        }
      }

      &.left-gain {
        --main-color: #E96231;
        &:before {
          content: "";
          width: 68px;
          height: 10px;
          border: 1px solid var(--main-color);
          border-bottom: 0;
          position: absolute;
          top: -25px;
          left: -44px;
          transform: rotate(-90deg);
          z-index: 1;
        }
        &:after {
          font-family: $techno;
          color: var(--main-color);
          font-size: 11px;
          letter-spacing: 0.1px;
          background: #BDBBB9;
          content: "Gain";
          position: absolute;
          top: -29px;
          left: -31px;
          transform: rotate(-91deg);
          z-index: 2;
          padding: 0 6px;
        }
      }

      &.right-swing {
        --main-color: #242424;
        &:before {
          content: "";
          width: 68px;
          height: 10px;
          border: 1px solid var(--main-color);
          border-bottom: 0;
          position: absolute;
          top: -25px;
          right: -44px;
          transform: rotate(90deg);
          z-index: 1;
        }
        &:after {
          font-family: $techno;
          color: var(--main-color);
          font-size: 11px;
          letter-spacing: 0.1px;
          background: #bdbcba;
          content: "Swing";
          position: absolute;
          top: -29px;
          right: -36px;
          transform: rotate(-90deg);
          z-index: 2;
          padding: 0 6px;
        }
      }

    }

    .axis {
      --background: linear-gradient(180deg, #FE4A17 35.19%, #F83A0A 100%);
      --dark-shadow: #AA311C;
      box-shadow: 0.5px 0 0 0 var(--dark-shadow);
      // height: 10px;
      width: 15px;
      color: #BAB8B7;
      display: flex;
      background: var(--background);
      align-items: center;
      justify-content: center;
      font-family: $techno;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1px;
      border-radius: 4px;

      &.dark {
        --background: linear-gradient(180deg, #101010 35%, #141414 100%);
        --dark-shadow: #000;
      }
    }

    .light-text {
      font-family: $techno;
      position: absolute;
      left: 25px;
      top: 5px;
      color: #0E0D0D;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1px;
    }

    .light {
      --background-color: linear-gradient(180deg, #FE4A17 35.19%, #F83A0A 100%);
      --light-shadow-color: rgba(255, 255, 255, 0.2);
      --medium-shadow-color: rgba(255, 255, 255, 0.5);
      --fuzz: #d72d12;
      --dark-shadow-color: rgba(0,0,0,0.3);

      position: absolute;
      left: 9px;
      top: 8px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--background-color);
      box-shadow: inset 0 0 0 0.5px var(--dark-shadow-color), 
                  inset 0.5px 0.5px 0 0 var(--light-shadow-color), 
                  0 0.5px 0 0 var(--medium-shadow-color),
                  0.5px 0.5px 0 0 var(--light-shadow-color),
                  0 0 3px 0 var(--fuzz);
      
      &.off {
        --background-color: linear-gradient(145deg, #403F3F 35%, #646260 100%);
        --light-shadow-color: rgba(255, 255, 255, 0.2);
        --medium-shadow-color: rgba(255, 255, 255, 0.7);
        --fuzz: transparent;
      }

      &.right {
        left: auto;
        right: 8px;
      }
    }

    input[type="range"] {
      position: absolute;
      top: 92px;
      left: -34px;
      transform: rotate(270deg);
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
      width: 120px;

      &:before {
        content: "";
        position: absolute;
        z-index: -1;
        height: 50px;
        width: 1px;
        left: 50%;
        top: -21px;
        background-color: #050404;
      }
    }
    input[type="range"]::-webkit-slider-runnable-track {
      background: #0D0C0C;
      height: 8px;
      border-radius: 50px;
    }
    input[type="range"]::-moz-range-track {
      background: #0D0C0C;
      height: 8px;
      border-radius: 50px;
    }

    input[type="range"]::-webkit-slider-thumb {
      --background-color: #676767;
      --light-shadow-color: rgba(255, 255, 255, 0.8);
      --dark-shadow-color: #383838;
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      margin-top: -10px; /* Centers thumb on the track */
      background-color: var(--background-color);
      border: 0;
      border-radius: 50%;
      transform: rotate(90deg);
      box-shadow:
        inset 0.5px 1px 1px var(--light-shadow-color),
        inset -1px -1px 1px var(--dark-shadow-color),
        1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.2), 9px 8px 7px 0px rgba(0, 0, 0, 0.22), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 25px 22px 9px 0px rgba(0, 0, 0, 0);
      height: 27px;
      width: 27px;
    }

    input[type="range"]::-moz-range-thumb {
      border: none; /*Removes extra border that FF applies*/
      border-radius: 0; /*Removes default border-radius that FF applies*/
      --background-color: #676767;
      --light-shadow-color: rgba(255, 255, 255, 0.8);
      --dark-shadow-color: #383838;
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      margin-top: -10px; /* Centers thumb on the track */
      background-color: var(--background-color);
      border: 0;
      border-radius: 50%;
      transform: rotate(90deg);
      box-shadow:
        inset 0.5px 1px 1px var(--light-shadow-color),
        inset -1px -1px 1px var(--dark-shadow-color),
        1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.2), 9px 8px 7px 0px rgba(0, 0, 0, 0.22), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 25px 22px 9px 0px rgba(0, 0, 0, 0);
      height: 27px;
      width: 27px;
    }

    button {
      cursor: pointer;
      display: flex;
      border: 2px solid transparent;
      border-radius: 2px;
      background-color: #010101;
      box-shadow: 1px 1px 1px rgb(255 255 255 / .6);
      width: 100%;
      padding: 0px;
      margin: 0;
      height: calc(55px / 2);
      // transition: all 10s ease-in-out;

      &.big {
        height: 100%;
  
        &:active {
          .button-inside {
            transform: scale(0.99);
            box-shadow: inset 0 0 0.25em rgba(0,0,0,1), inset 0.5px 0.5px 0.5px transparent, inset -0.5px -0.5px 0.5px transparent, 1px 1px 3px 0px transparent, 4px 4px 5px 0px transparent, 9px 8px 7px 0px transparent, 16px 14px 9px 0px transparent, 25px 22px 9px 0px transparent;
          }
        }
      }

      &.connected {
        border-radius: 2px 2px 0 0;
        &:active {
          .button-inside {
            transform: scale(0.99);
            box-shadow: inset 0 0 0.25em rgba(0,0,0,1), inset 0.5px 0.5px 0.5px transparent, inset -0.5px -0.5px 0.5px transparent, 1px 1px 3px 0px transparent, 4px 4px 5px 0px transparent, 9px 8px 7px 0px transparent, 16px 14px 9px 0px transparent, 25px 22px 9px 0px transparent;
          }
        }
      }

      &.small {
        &:active {
          .button-inside {
            transform: scale(0.99);
            box-shadow: inset 0 0 0.25em rgba(0,0,0,1), inset 0.5px 0.5px 0.5px transparent, inset -0.5px -0.5px 0.5px transparent, 1px 1px 3px 0px transparent, 4px 4px 5px 0px transparent, 9px 8px 7px 0px transparent, 16px 14px 9px 0px transparent, 25px 22px 9px 0px transparent;
          }
        }
      }
    }

    .button-panel {
      --background-color: linear-gradient(180deg, #FE4A17 35.19%, #F83A0A 100%);
      --light-shadow-color: rgba(255, 255, 255, 0.4);
      --dark-shadow-color: #d72d12;
      --text-color: #fff;
      flex: 1;
      font-family: $techno;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--text-color);
      background: var(--background-color);
      font-size: 10px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.2px;
      border-radius: 0 0 2px 2px;
      box-shadow: inset 0 0 0 0.5px var(--dark-shadow-color), inset 1px 1px 0 0 var(--light-shadow-color), 0 0.5px 0 0 var(--light-shadow-color);

      &.grey {
        --background-color: #8D8C8B;
        --light-shadow-color: rgba(255, 255, 255, 0.4);
        --dark-shadow-color: #504E4D;
        --text-color: #fff;
      }
      &.white {
        --background-color: #E3DFDD;
        --light-shadow-color: rgba(255, 255, 255, 0.7);
        --dark-shadow-color: #c0bbb9;
        --text-color: #050404;
        box-shadow: inset 0 0 0 0.5px var(--dark-shadow-color), inset 1px 1px 0 0 var(--light-shadow-color);
      }

    }

    .button-inside {
      font-family: $techno;
      --background-color: linear-gradient(180deg, #FE4A17 35.19%, #F83A0A 100%);
      --light-shadow-color: #ffb147;
      --dark-shadow-color: #d72d12;
      --text-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: 4px;
      width: 100%;
      height: 100%;
      font-size: 10px;
      background: var(--background-color);
      box-shadow:
        inset 0 0 0.25em rgba(0,0,0,0),
        inset 0.5px 0.5px 0.5px var(--light-shadow-color),
        inset -0.5px -0.5px 0.5px var(--dark-shadow-color),
        1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.2), 9px 8px 7px 0px rgba(0, 0, 0, 0.22), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 25px 22px 9px 0px rgba(0, 0, 0, 0);
      text-align: center;
      text-transform: uppercase;
      color: var(--text-color);
      letter-spacing: 0.2px;
      transition: all 0.2s ease-in-out;

      &.big {
        border-radius: 6px;
        padding: 2px 0 0 6px;
        font-size: 16px;
        align-items: flex-start;
        justify-content: flex-start;
        box-shadow:
        inset 0.5px 1px 1px var(--light-shadow-color),
        inset -1px -1px 1px var(--dark-shadow-color),
        1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.2), 9px 8px 7px 0px rgba(0, 0, 0, 0.22), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 25px 22px 9px 0px rgba(0, 0, 0, 0);
      }

      &.big-middle {
        padding: 0;
        font-size: 22px;
        align-items: center;
        justify-content: center;
      }

      &.small-text {
        padding: 6px 0 0 0;
        font-size: 10px;
        align-items: flex-start;
        justify-content: center;
      }
      
      &.dark-gray {
        --background-color: #2f2e2e;
        --background-color-active: #313030;
        --light-shadow-color: #a7a7a7;
        --dark-shadow-color: #1c1c1c;
      }

      &.white {
        --background-color: #cfcbca;
        --light-shadow-color: #fafafa;
        --dark-shadow-color: #646464;
        --text-color: #010101;
      }
      
      &.light-gray {
        --background-color: #bcbcbc;
        --light-shadow-color: #f7f7f7;
        --dark-shadow-color: #646464;
      }
      
      &.gray {
        --background-color: #676767;
        --light-shadow-color: #b8b7b5;
        --dark-shadow-color: #383838;
      }
    }

    &:before {
      pointer-events: none;
      content: "";
      z-index: 100;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      position: absolute;
      background: url(/fun/noise@2x.png) top left;
      background-size: 100px 100px;
      opacity: 0.6;
    }

    .top-controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(55px, 1fr));
      grid-template-rows: 55px 26px;
      // gap: 26px;
      gap: 0;
      grid-column-gap: 26px;
      width: 100%;
      position: relative;
      z-index: 120;
    }

    .round-button {
      position: relative;
      z-index: 50;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
      position: relative;
      background: linear-gradient(180deg, #F2EEEC 35.19%, #CECCCB 100%);
      box-shadow: 0px 1px 0px 0px #FFF inset, 0px 1px 4px 0px #FFF inset, -0.5px -0.5px 1px 0px #B5AEAB inset, 1px 1px 3px rgba(0, 0, 0, 0.23), 4px 4px 5px rgba(0, 0, 0, 0.20), 9px 8px 7px rgba(0, 0, 0, 0.12), 16px 14px 9px rgba(0, 0, 0, 0.03), 0px 0.5px 0px rgba(0, 0, 0, 0.06), -1px -1px 4px rgba(255, 255, 255, 0.35);

      &:after {
        content: "";
        position: absolute;
        z-index: 10;
        width: 27px;
        height: 27px;
        border-radius: 50%;
        left: 14px;
        top: 14px;
        background: linear-gradient(180deg, #F2EEEC 35.19%, #CECCCB 100%);
        box-shadow: 0px 1px 0px 0px #FFF inset, 0px 1px 4px 0px #FFF inset, -0.5px -0.5px 1px 0px #B5AEAB inset, 1px 1px 3px rgba(0, 0, 0, 0.23), 4px 4px 5px rgba(0, 0, 0, 0.20), 9px 8px 7px rgba(0, 0, 0, 0.12), 16px 14px 9px rgba(0, 0, 0, 0.03), 0px 0.5px 0px rgba(0, 0, 0, 0.06), -1px -1px 4px rgba(255, 255, 255, 0.35);
      }

      &:before {
        width: 65px;
        text-align: center;
        content: attr(data-label);
        position: absolute;
        top: -20px;
        left: -5px;
        color: #0E0D0D;
        font-family: $techno;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.1px;
      }

      &.orange {
        background: linear-gradient(180deg, #FE4612 35.19%, #F73809 100%);
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.20), 9px 8px 7px 0px rgba(0, 0, 0, 0.12), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 0px 0.5px 0px 0.5px rgba(0, 0, 0, 0.06), 0.5px 0.5px 0px 0px #FEAB63 inset, 0.5px 0.5px 3px 0px rgba(255, 255, 255, 0.7) inset, -1px -1px 1px 0px #EA2B07 inset;

        &:after {
          background: linear-gradient(180deg, #FE4A17 35.19%, #F83A0A 100%);
          box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.20), 9px 8px 7px 0px rgba(0, 0, 0, 0.12), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 0px 0.5px 0px 0.5px rgba(0, 0, 0, 0.06), 0.5px 0.5px 0px 0px #FEAB63 inset, 0px 1px 4px 0px rgba(255, 255, 255, 0.3) inset, -1px -1px 1px 0px #EA2B07 inset;
        }
      }

      &.dark {
        background: linear-gradient(180deg, #1F1E1E 35.19%, #1C1C1C 100%);
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.20), 9px 8px 7px 0px rgba(0, 0, 0, 0.12), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 0px 0.5px 0px 0.5px rgba(0, 0, 0, 0.06), 0.5px 0.5px 0px 0px rgba(255, 255, 255, 0.70) inset, -1px -1px 2px 0px #0D0C0C inset, -0.5px -0.5px 0.5px 0px rgba(255, 255, 255, 0.10) inset, -2px -2px 3px 0px rgba(255, 255, 255, 0.14);

        &:after {
          background: linear-gradient(180deg, #1F1E1E 35.19%, #1C1C1C 100%);
          box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.23), 4px 4px 5px 0px rgba(0, 0, 0, 0.20), 9px 8px 7px 0px rgba(0, 0, 0, 0.12), 16px 14px 9px 0px rgba(0, 0, 0, 0.03), 0px 0.5px 0px 0.5px rgba(0, 0, 0, 0.06), 0.5px 0.5px 0px 0px rgba(255, 255, 255, 0.70) inset, -1px -1px 2px 0px #0D0C0C inset, -0.5px -0.5px 0.5px 0px rgba(255, 255, 255, 0.10) inset, -2px -2px 3px 0px rgba(255, 255, 255, 0.14);
        }
      }


      span {
        display: none;
      }

    }

  }

  .ui-control {
    $val: 6px;
    --color: rgba(54, 79, 217, 1);
    --accent: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;

    .ui-label {
      align-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      box-shadow: 0 0 0 1px var(--color);
      padding: 10px 20px;
      cursor: pointer;
      gap: 8px;
      transition: all 0.2s ease-in-out;

      &:hover {
        box-shadow: 0 0 0 1px var(--color), 0 0 0 6px lighten(rgba(54, 79, 217, 1), 40%);
      }
    }

    .ui-button {
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
      width: 30px;
      position: relative;
      cursor: pointer;

      &:before {
        content: "";
        position: absolute;
        z-index: 0;
        inset: -2px;
      }

      &:after {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0px;
        left: 3px;
        right: 3px;
        bottom: 0px;
        margin: auto;
        height: 3px;
        background: lighten(rgba(54, 79, 217, 1), 30%);
        border-radius: 10px;
      }

    }
    .ui-knob {
      position: relative;
      z-index: 2;
      background: #fff;
      border: 1px solid var(--color);
      width: calc(20px - $val);
      height: calc(20px - $val);
      border-radius: 50%;
      outline: 2px solid var(--accent);
      transition: all 0.2s ease-in-out;

      &.active {
        background: var(--color);
        transform: translate3d(100%,0,0);
      }
    }
    .ui-text {
      color: var(--color);
      font-weight: 500;
      font-size: var(--14px);
    }
  }

</style>