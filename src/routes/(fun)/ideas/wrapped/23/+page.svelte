<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { fade, fly } from 'svelte/transition'
    import { backOut, quartOut, quintIn } from "svelte/easing"
    import Story from '$lib/util/Story.svelte'
    import Center from '$lib/util/Center.svelte';
    import confetti from 'canvas-confetti'

    import type { PageData } from './$types';
    export let data: PageData;

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

</script>

<svelte:head>
    <title>Wrapped: 2023</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Mono&display=swap" rel="stylesheet">
</svelte:head>

<Center --background="#001f18" --flex-direction="column" --gap="16px">

  <div class="bento">
    <div class="large box middle">
      <img src="/wrapped/email.png" alt="" class="fixed mail">
      <div class="text">
        <span>
          5,297
      </div>
      <div class="info">
        Unique users visiting by email
      </div>
    </div>
    <div class="large box left">
      <img src="/wrapped/chart.png" alt="" class="fixed chart">
      <div class="text">
        <span>
          229,000
        </span>
      </div>
      <div class="info">
        Organic SEO unique users
      </div>
    </div>
    <div class="small box middle">
      <img src="/wrapped/sunglasses.png" alt="" class="fixed sun">
      <div class="text">
        <span>
          July
        </span>
      </div>
      <div class="info">
        Longest visits
      </div>
    </div>
  </div>
  <div class="bento">
    <div class="large box middle">
      <img src="/wrapped/dollar2.png" alt="" class="fixed dollar-alt">
      <div class="text">
        <span>
          $1,200,000
        </span>
      </div>
      <div class="info">
        Raised on Giving Tuesday
      </div>
    </div>
    <div class="small box gd" on:click={() => fire()}>
      <div class="logo">
        <svg width="50" height="29" viewBox="0 0 50 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.7839 13.3102H12.8227V17.8182H17.767V22.1445C17.0176 22.6177 16.2032 22.979 15.3494 23.2169C14.3815 23.4633 13.3851 23.5794 12.3865 23.5623C10.0113 23.5618 8.29656 22.7802 7.24227 21.2174C6.18798 19.6546 5.66084 17.4309 5.66084 14.5463C5.66084 11.6868 6.18192 9.46921 7.22409 7.89338C8.26626 6.31801 9.84164 5.53032 11.9502 5.53032C12.6868 5.51233 13.422 5.60423 14.1315 5.80298C14.6687 5.9604 15.1651 6.23337 15.5857 6.60278C15.9736 6.95536 16.2779 7.39006 16.4764 7.8752C16.7013 8.43462 16.8777 9.01237 17.0035 9.60205L22.384 8.91131C22.1751 7.82395 21.8141 6.77144 21.3116 5.7848C20.8149 4.81584 20.136 3.95178 19.3121 3.23997C18.4142 2.47826 17.3771 1.89798 16.2583 1.53129C14.8658 1.09053 13.4104 0.881734 11.9502 0.91326C10.2551 0.889532 8.57282 1.21114 7.00596 1.85848C5.55891 2.46622 4.27136 3.39923 3.24324 4.58509C2.17342 5.84337 1.36403 7.30151 0.862004 8.87496C0.280016 10.7081 -0.00233303 12.6232 0.0258444 14.5463C0.00515631 16.4338 0.262396 18.3141 0.789295 20.1268C1.24242 21.7074 2.02274 23.1752 3.07965 24.4348C4.12492 25.6426 5.43845 26.5888 6.91508 27.1978C8.63011 27.8854 10.4664 28.2193 12.3138 28.1794C14.2617 28.1818 16.1945 27.8371 18.0215 27.1614C19.7843 26.5307 21.4035 25.5542 22.7839 24.2894V13.3102Z" fill="#63D86A"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M36.9797 1.56738H27.2729V27.5247H36.0708C37.9939 27.5529 39.909 27.2705 41.7421 26.6885C43.3299 26.1813 44.7834 25.324 45.9957 24.1801C47.1833 23.0285 48.0965 21.6245 48.6677 20.072C49.3187 18.2535 49.6328 16.3317 49.5948 14.4006C49.5951 10.1592 48.4862 6.96001 46.2683 4.80296C44.0504 2.64591 40.9542 1.56738 36.9797 1.56738ZM39.779 22.3078C38.6284 22.7349 37.4068 22.9385 36.1799 22.9076H32.6898V6.18444H36.9797C38.0927 6.15273 39.2003 6.35074 40.2334 6.76612C41.0786 7.12435 41.8217 7.68642 42.3965 8.40208C42.9851 9.17065 43.4005 10.0574 43.6144 11.0014C43.8798 12.127 44.0079 13.2806 43.9961 14.437C44.0106 15.6088 43.8638 16.777 43.5599 17.9089C43.2968 18.8849 42.8324 19.7951 42.1966 20.5809C41.5504 21.3525 40.7184 21.9468 39.779 22.3078Z" fill="#63D86A"/>
          </svg>
      </div>
      <div class="title-desc">
        <span>GiveDirectly</span>
      </div>
      <div class="title-desc">
        <span>Wrapped</span>
      </div>
      <div class="year">
        2023
      </div>
    </div>
    <div class="large box middle">
      <img src="/wrapped/dollar.png" alt="" class="fixed dollar">
      <div class="text">
        <span>
          $115,000,000
        </span>
      </div>
      <div class="info">
        Raised through November
      </div>
    </div>
    
  </div>

  <div class="jumbo-holder">
    <div class="jumbo"></div>
  </div>
  <div class="overlay"></div>
  <div class="bg"></div>

</Center>



<style lang="scss">

  @import "../../../../../mixins";

  :root {
    --gradient-colors: 
      rgba(255 255 255 / 0.9) 0, 
      rgba(255 255 255 / 0.0) 180px;
    --x: 50%;
    --y: -20%;
    --border-radius: 30px;
    --opacity-duration: 500ms;
  }

  $radius: 16px;
  $inter: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  $space: 'Space Mono', monospace;


  .bento {
    font-family: $inter;
    display: grid;
    grid-template-columns: repeat(22, 1fr);
    gap: 16px;
    max-width: 1200px;
    width: 100%;
    position: relative;
    z-index: 100;

    .large {
      grid-column: span 9;
    }

    .small {
      grid-column: span 4;
    }

    .box {
      cursor: pointer;
      position: relative;
      height: 256px;
      border-radius: $radius;
      background: linear-gradient(180deg, rgba(0, 255, 196, 0) 0%, rgba(0, 255, 196, 0) 50%), rgba(14, 139, 109, 0.20);
      box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.10) inset;
      overflow: hidden;
      transition: all 0.2s ease-in-out;

      &:before {
        left: 0;
        top: 0;
        content: "";
        background: radial-gradient(
          circle at top var(--y) left var(--x), 
          var(--gradient-colors)
        );
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all 0.2s ease-in-out;
        opacity: 0.1;
      }

      &:hover {
        transform: scale(1.01);

        &:before {
          opacity: 0.2;
          transform: scale(1.3);
        }
      }

      &:active {
        transform: scale(1) rotate(1deg);
        &:before {
          opacity: 0.1;
          transform: scale(1);
        }
      }


      // &:before {
      //   content: "";
      //   z-index: 1;
      //   width: 224px;
      //   height: 224px;
      //   border-radius: 50%;
      //   filter: blur(80px);
      //   background: #fff;
      //   opacity: 0.5;
      //   position: absolute;
      //   left: 50%;
      //   transform: translate3d(-50%, 0, 0);
      //   top: -120px;
      //   mix-blend-mode: soft-light;
      //   transition: all 0.2s ease-in-out;
      // }

      .text {
        position: relative;
        z-index: 100;
        text-align: center;
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.8px;

        span {
          background: linear-gradient(270deg, rgba(255, 255, 255, 0) -10%, #FFF 50%, rgba(255, 255, 255, 0) 110%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      &.gd {
        background: transparent;
        border: 1px solid #63D86A;
        box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.10) inset;
      }


      &.middle {
        padding-top: 150px;

        
      }

      &.left {
        padding-top: 80px;
        .text, .info {
          text-align: left;
          padding-left: 36px;
        }
      }

      .info {
        margin-top: 10px;
        color: #FFF;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.1px;
        opacity: 0.6;
      }

    }
  }


  .logo {
    height: 112px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .title-desc {
    text-align: center;
    font-size: 21px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.42px;
    user-select: none;


    span {
      background: linear-gradient(270deg, rgba(255, 255, 255, 0) -10%, #FFF 50%, rgba(255, 255, 255, 0) 110%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

  }

  .year {
    user-select: none;
    color: #FFF;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.28px;
    opacity: 0.6;
    margin-top: 40px;
  }


  img {
    user-select: none;
    height: auto;

    &.fixed {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }

    &.dollar {
      width: 350px;
      left: 50%;
      top: 14px;
      transform: translate3d(-50%, 0, 0);
    }

    &.dollar-alt {
      width: 308px;
      left: 50%;
      top: 18px;
      transform: translate3d(-50%, 0, 0);
    }

    &.mail {
      width: 500px;
      left: 0;
      top: 0;
    }

    &.sun {
      width: 96px;
      left: 50%;
      top: 27px;
      transform: translate3d(-50%, 0,0);
    }

    &.chart {
      right: 0;
      bottom: 0;
      width: 480px;
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
    background-size: 500%, 45%;
    background-position: 50% 50%, 50% 50%;
    mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
    pointer-events: none;

    opacity: 0.3;
      background-image: var(--stripesDark), var(--rainbow);
      filter: blur(10px) opacity(50%) saturate(200%);
  }

  .jumbo::after {
    content: "";
    position: absolute;
    inset: 0;
    // background-image: var(--stripes), var(--rainbow);
    background-size: 250%, 45%;
    animation: jumbo 60s linear infinite;
    background-attachment: fixed;
    mix-blend-mode: difference;

    background-image: var(--stripesDark), var(--rainbow);
      animation: jumbo 160s linear infinite;
  }

  .overlay {
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(5, 54, 43,0) 0%, #001f18 70%);
    pointer-events: none;
  }

  .bg {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    // background: var(--proto-bg-primary);
  }

  // @keyframes jumbo {
  //   from {
  //     background-position: 50% 50%, 50% 50%;
  //   }
  //   to {
  //     background-position: 350% 50%, 350% 50%;
  //   }
  // }


</style>