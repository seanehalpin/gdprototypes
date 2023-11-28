<script lang="ts">

  import { onMount } from 'svelte'
  import confetti from 'canvas-confetti'
  import { fade } from 'svelte/transition'
  import ProtoMark from '$lib/svg/ProtoMark.svelte';

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
  <div class="button" on:click={() => fire()} in:fade|local={{duration:250}}>
    <ProtoMark />
  </div>
</div>

{/if}

<style lang="scss">

  @import "../../../mixins";

    .ok {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;
      z-index: 100;
      background: var(--proto-bg-primary);

      &:after {
        background: url("/misc/grid.svg") center center;
        z-index: 1;
        opacity: 0.1;
        position: absolute;
        // content: "";
        width: 100%;
        height: 100%;
        top: -5px;
        left: -5px;
      }

      &:before {
        position: absolute;
        // content: "";
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 2;
        background: radial-gradient(circle,rgba(255,255,255,0) 0,var(--app-color-white) 100%);
      }

      @include dm {
        // background: var(--proto-bg-primary);

        &:before {
          background: radial-gradient(circle,rgba(0,0,0,0) 0,var(--proto-bg-primary) 50%);
        }

        &:after {
          filter: invert(1);
        }

      }
    }

    .button {
      // width: 100px;
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
      // box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
      // border-radius: 22px;

      // @include dm {
      //   background: var(--proto-bg-secondary);
      // }

      &:hover {
        // transform: scale3d(1.6,1.6,1.6) ;
        transform: translate3d(0,-8px,0);
        // box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

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


    @keyframes jumbo {
    from {
      background-position: 50% 50%, 50% 50%;
    }
    to {
      background-position: 350% 50%, 350% 50%;
    }
}

  .jumbo-holder {
    overflow: hidden;
    inset: 0;
    position: absolute;
    z-index: 5;
  }

  .jumbo {
    opacity: 0.4;
    inset: 0px;
    position: absolute;
    --stripes: repeating-linear-gradient(
        100deg,
        #fff 0%,
        #fff 7%,
        transparent 10%,
        transparent 12%,
        #fff 16%
    );
    --stripesDark: repeating-linear-gradient(
        100deg,
        #000 0%,
        #000 7%,
        transparent 10%,
        transparent 12%,
        #000 16%
    );
    --rainbow: repeating-linear-gradient(
        100deg,
        #60a5fa 10%,
        #e879f9 15%,
        #60a5fa 20%,
        #5eead4 25%,
        #60a5fa 30%
    );
    background-image: var(--stripes), var(--rainbow);
    background-size: 500%, 45%;
    background-position: 50% 50%, 50% 50%;
    filter: blur(10px) invert(100%);
    mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
    pointer-events: none;

    @include dm {
      opacity: 0.4;
      background-image: var(--stripesDark), var(--rainbow);
      filter: blur(10px) opacity(50%) saturate(200%);
    }
  }

  .jumbo::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--stripes), var(--rainbow);
    background-size: 250%, 45%;
    animation: jumbo 60s linear infinite;
    background-attachment: fixed;
    mix-blend-mode: difference;

    @include dm {
      background-image: var(--stripesDark), var(--rainbow);
      animation: jumbo 160s linear infinite;
    }
  }

  .overlay {
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
    pointer-events: none;

    @include dm {
      background: linear-gradient(180deg, rgba(5, 54, 43,0) 0%, rgba(5, 54, 43,1) 70%);
    }
  }

  .bg {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: var(--proto-bg-primary);
  }

</style>
