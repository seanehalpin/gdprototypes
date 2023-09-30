<script lang="ts">

  import { onMount } from 'svelte'
  import confetti from 'canvas-confetti'
  import { fade } from 'svelte/transition'

  const fire = () => {

    confetti({
      particleCount: 30,
      startVelocity: 30,
      spread: 300,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
  }

  let ready = false
  onMount(() => {
    ready = true 
  })

  // function to get a number between one and eight

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let imageNum = getRandomInt(0)

</script>

<svelte:head><title>Prototypes</title></svelte:head>

{#if ready}
<div class="ok">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="button" on:click={() => fire()} in:fade|local={{duration:250}}>
    <!-- <img src="/misc/pop.svg" alt=""> -->
    <img class="blueprint" src="/misc/blueprint/blueprint_{imageNum}.png" alt="">
    <!-- 🎉 -->
  </div>
</div>
{/if}

<style lang="scss">

  @import "../../mixins";

    .ok {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;

      &:after {
        background: url("/misc/grid.svg") center center;
        z-index: 1;
        opacity: 0.1;
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        top: -5px;
        left: -5px;
      }

      &:before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 2;
        background: radial-gradient(circle,rgba(255,255,255,0) 0,var(--app-color-white) 30%);
      }

      @include dm {
        background: var(--proto-bg-primary);

        &:before {
          background: radial-gradient(circle,rgba(0,0,0,0) 0,var(--proto-bg-primary) 30%);
        }

        &:after {
          filter: invert(1);
        }

      }
    }

    .button {
      width: 100px;
      // height: 80px;
      // border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: none;
      position: relative;
      z-index: 1000;
      transition: all 0.2s ease-in-out;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
      border-radius: 22px;

      @include dm {
        background: var(--proto-bg-secondary);
      }

      &:hover {
        // transform: scale3d(1.6,1.6,1.6) ;
        transform: translate3d(0,-8px,0);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

      }
      &:active {
        // transform: scale3d(1.1,1.1,1.1) ;
        transform: translate3d(0,0,0);
      }
    }

    .blueprint {
      width: 100%;
      height: auto;
    }

</style>
