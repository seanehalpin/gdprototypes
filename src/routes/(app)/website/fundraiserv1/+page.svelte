<script lang="ts">
  import GdLogoSingle from '$lib/svg/GdLogoSingle.svelte';
  import Center from '$lib/util/Center.svelte';
  import type { PageData } from '../fundraiser/$types';

  import { onMount, onDestroy } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"
  import Story from '$lib/util/Story.svelte'
  import GdlogoOld from '$lib/svg/GdlogoOld.svelte' 
  export let data: PageData;

  let ready = false
  let name = "Joseph"
  let formSmall = true
  let activeDollarAmount = 60

  let paymentInterval = [
    {id: 1, interval: "Once", active: false},
    {id: 2, interval: "Monthly", active: true}
  ]

  let amounts = [
    {id: 1, amount: "40", active: false, class: ""},
    {id: 2, amount: "60", active: true, class: ""},
    {id: 3, amount: "100", active: false, class: ""},
    {id: 7, amount: "Other", active: false, class: ""}
  ]

  onMount(() => {
    ready = true
  })

  
</script>

<svelte:head>
  <title>Fundraiser | GiveDirectly</title>
</svelte:head>

{#if ready}
<!-- {#if showStory}
  <Story bind:filteredKey={filteredKey} bind:storys={storys} />
{/if} -->
<Center
  --flex-direction="column" 
  --background="var(--white)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
  --overflow="scroll"
>


  <div class="container">
    <div class="nav">
      <GdlogoOld />
      <button class="nav-button">Donate</button>
    </div>
    
    <div class="inner top">

      <div class="inner-inner">
        <div class="text-block">
          <h1>Send money directly to people who need it most.</h1>
          <p>Your donation empowers families in poverty to choose how best to improve their lives. </p>
        </div>

        <div class="form">

          <div class="form-inner">
            <div class="button-tabs">
              {#each paymentInterval as interval}
                <button class="tab {interval.active ? 'active' : ''}">
                {interval.interval}
                </button>
              {/each}
            </div>

            <div class="donation-picker">
              {#each amounts as amount}
                <button class="value {amount.class}" class:active={amount.active} >
                {#if amount.amount == "Other"}
                {amount.amount}
                {:else}
                ${amount.amount}
                {/if}
                </button>
              {/each}
            </div>

            <button class="donate" >Give ${activeDollarAmount} monthly</button>
            <button class="program">Poverty relief - Africa (edit program)</button>
            <button class="international">Giving from outside the U.S.?</button>
          </div>
        </div>
      </div>
    </div>

    <div class="social-proof">

    </div>

    <div class="giving">
      <img src="/website/giving.png" alt="">
    </div>

  </div>

  <div class="fundraiser" in:fly|global={{duration:400, y: 100, delay: 1000}}>
    <div class="fundraiser-inner">
      <div class="fundraiser-large">
        <div class="fundraiser-desc">
          <div class="fundraiser-desc-left">
            <span>$5,000 raised for Cash Relief for Morocco Earthquake Survivors</span>
            <a href="#">Learn more</a>
          </div>
          <div class="fundraiser-desc-right">
            $45,000 to go
          </div>
        </div>
        <div class="fundraiser-thermo">
          <div class="fundraiser-temp">
            <div class="shine"></div>
          </div>
        </div>
      </div>
      <div class="fundraiser-small">
        <div class="fundraiser-list">
          <span>10 days left</span>
          <span>•</span>
          <span>1,235 donations</span>
        </div>
        <button class="fundraiser-button">
          Donate now
        </button>
      </div>
    </div>
  </div>
  

</Center>
{/if}

<style lang="scss">

  @import "../../../../mixins";

  $width: 1280px;
  $inner: 1400px;


  .fundraiser {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: var(--24px);
    width: 100%;
    z-index: 99999;
    display: flex;
    justify-content: center;

    .fundraiser-inner {
      max-width: calc($inner - 80px);
      background: var(--red-200);
      border-radius: var(--8px);
      padding: var(--24px);
      display: flex;
      width: 100%;
      gap: var(--24px);
    }

    .fundraiser-large {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    .fundraiser-desc {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      color: var(--grey-600);
      font-size: var(--font-sm);
      font-weight: 500;
    }

    .fundraiser-desc-left {
      display: flex;
      align-items: center;
      gap: var(--8px);

      a {
        color: var(--red-600);
      }
    }

    .fundraiser-thermo {
      width: 100%;
      height: 18px;
      background: var(--white);
      border-radius: 20px;
      overflow: hidden;
    }

    .fundraiser-temp {
      width: 40%;
      height: 100%;
      background: var(--red-600);
      border-radius: var(--24px);
      overflow: hidden;
      position: relative;
    }

    .fundraiser-small {
      background: var(--white);
      border-radius: var(--42px);
      display: flex;
      align-items: center;
    }

    .fundraiser-list {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-sm);
      padding: 0 var(--16px) 0 var(--24px);
      gap: var(--8px);
      font-weight: 500;
    }

    .fundraiser-button {
      border-radius: var(--24px);
      background: var(--red-600);
      color: var(--white);
      font-weight: 500;
      font-size: var(--font-lg);
      padding: 0 var(--24px);
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;
    }
    

  }

  .shine {
    position: absolute;
    background: #fff;
    opacity: 1;
    width: 60px;
    height: 100%;
    left: -60px;
    top: 0;
    filter: blur(20px);
    z-index: 5;
    animation: shiner 5s linear infinite;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
  }

  @keyframes shiner {
    0% {
      transform: translate3d(-100px,0,0) skew(-15deg);
    }
    20% {
      transform: translate3d(500px,0,0) skew(-15deg);
    }
    100% {
      transform: translate3d(500px,0,0) skew(-15deg);
    }
  }

  @-webkit-keyframes shiner {
    0% {
      transform: translate3d(-100px,0,0) skew(-15deg);
    }
    20% {
      transform: translate3d(500px,0,0) skew(-15deg);
    }
    100% {
      transform: translate3d(500px,0,0) skew(-15deg);
    }
  }

  
  .container {
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: relative;
  }

  .nav {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: $inner;
    margin: 0 auto;
    padding: 0 40px;

    .nav-button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background: var(--green-600);
      color: var(--white);
      font-weight: 500;
      font-size: var(--16px);
      padding: 0 var(--42px);
      border-radius: 8px;
      height: 48px;
      cursor: pointer;
    }
  }


  .inner {
    width: 100%;
    // max-width: $inner;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 100;
    padding: 0 0 200px 0;
    background: #E6EEEC url(/donate/home/sample.webp) no-repeat center center;
    background-size: cover;

    &.top {
      flex-direction: column;
    }

    &.bottom {
      flex-direction: column;
      padding-bottom: var(--42px);
      margin-top: 100px;
    }
  }

  .inner-inner {
    width: 100%;
    max-width: $inner;
    margin: 0 auto;
    padding: 0 40px;
  }

  .quote {
    display: none;
    margin-top: 450px;
    max-width: 512px;
    width: 100%;
    padding: 32px 48px;
    background: var(--white);

    .quote-text {
      color: var(--grey-600);
      font-size: var(--18px);
      min-height: 110px;
    }
  }

  .quote-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;

    .attr {
      font-size: var(--14px);
      color: var(--grey-400);
      font-weight: 500;
    }

    .dots {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      
      gap: 10px;

      .dot {
        width: 10px;
        height: 10px;
        background: var(--grey-50);
        border-radius: 50%;
        transition: all 0.2s ease-in-out;

        &.active {
          background: var(--green-600);
        }
      }
    }
  }

  .form {
    position: relative;
    z-index: 100;
    width: 100%;
    max-width: 384px;
    margin-top: 40px;
  }

  .form-inner {
    position: relative;
    background: var(--white);
    padding: var(--16px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 4px;


    .button-tabs {
      display: flex;
      gap: 2px;
      background: var(--white);
      // padding: 4px;
      border-radius: 30px;
      box-shadow: inset 0 0 0 2px var(--grey-50);
    }

    .tab {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      color: var(--grey-500);
      border-radius: 30px;
      border: 0;
      background: transparent;
      font-weight: 500;
      font-size: var(--14px);
      cursor: pointer;

      &.active {
        color: var(--green-600);
        background: var(--green-100);
        box-shadow: inset 0 0 0 2px var(--green-500);
      }
    }

    .donation-picker {
      gap: 12px;
      display: grid;
      grid-template-columns: repeat(4,minmax(0,1fr));
    }

    .value {

      border: 0;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--white);
      box-shadow: 0 0 0 2px var(--grey-50);
      border-radius: 8px;
      font-size: var(--14px);
      font-weight: 500;
      color: var(--grey-600);
      cursor: pointer;
      // transition: all 0.2s ease-in-out;

      &:hover {
        box-shadow:  0 0 0 2px var(--grey-100);
      }

      &.active {
        box-shadow:  0 0 0 2px var(--green-500);
        color: var(--green-600);
        background: var(--green-100);
      }

      &.big {
        grid-column-end: span 2;
        grid-column-start: span 2;
      }
    }

    .donate {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background: var(--green-600);
      color: var(--white);
      font-weight: 500;
      font-size: var(--14px);
      border-radius: 8px;
      height: 48px;
      font-weight: 600;
      cursor: pointer;
    }

    .program {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background: transparent;
      border-radius: 8px;
      height: 30px;
      cursor: pointer;
      color: var(--grey-500);
      font-size: var(--14px);
      text-decoration: underline;
    }

    .international {
      font-size: var(--14px);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background: transparent;
      border-radius: 8px;
      height: 30px;
      cursor: pointer;
      color: var(--grey-500);
      font-size: var(--14px);
      text-decoration: none;
    }
    
  }

  .header {
    background: var(--grey-50);
    margin-bottom: 0;
    // border-bottom: 1px solid var(--grey-50);
    padding: var(--16px);
    position: absolute;
    bottom: 100%;
    width: 100%;
    border-radius: 4px 4px 0 0;

  }

  h1 {
    font-size: var(--14px);
    color: var(--grey-600);
    font-weight: 600;
    margin: 0;
    padding: 0;
    text-align: center;
    text-wrap: pretty;

    span {
      font-weight: 400;
    }
  }

  footer {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 300px 0 0;

    .footer-col {
      display: flex;
      gap: var(--24px);
    }

    .col {
      display: flex;
      flex-direction: column;
      min-width: 254px;
    }

    h3 {
      font-size: var(--14px);
      font-weight: 600;
      color: var(--grey-500);
      margin-bottom: var(--24px);
      padding: 0;
    }

    .cards {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

  }

  .link {
    font-size: var(--14px);
    text-decoration: none;
    color: var(--green-600);
    padding: 4px 0;
  }

  .disclaimer {
    width: 100%;
    margin-top: 30px;
    border-top: 1px solid var(--grey-50);
    padding: 30px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .disclaimer-links {
    display: flex;
    align-items: center;
    gap: 10px;

    .link {
      color: var(--green-600);
    }
  }

  .disclaimer-text {
    font-size: var(--14px);
    text-decoration: none;
    color: var(--grey-400);
  }

  .info {
    width: 100%;
    margin-top: 10px;
    font-size: var(--14px);
    text-decoration: none;
    color: var(--grey-400);

    a {
      color: var(--green-600);
      text-decoration: none;
    }

  }
  
  .input {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    position: relative;

    label {
      font-size: var(--14px);
      color: var(--grey-600);
    }
    input {
      height: 42px;
      border: 0;
      box-shadow: 0 0 0 1px var(--grey-100);
      border-radius: 6px;
      padding: 0 12px;
    }

  }

  .form-title {
    text-align: center;
    font-size: var(--16px);
    font-weight: 500;
    color: var(--grey-600);
    position: relative;
    padding: 10px 0;

    span {
      background: var(--white);
      padding: 0 15px;
      position: relative;
      z-index: 100;
    }

    &:before {
      content: "";
      width: 100%;
      height: 1px;
      background: var(--grey-50);
      position: absolute;
      left: 0;
      top: 50%;
    }

  }

  .radio-card {
    height: 55px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 0 1px var(--grey-100);
    border-radius: 6px;
    font-size: var(--14px);
    color: var(--grey-500);
    padding: 0 0 0 50px;
    position: relative;
    font-weight: 500;

    &:before {
      content: "";
      left: 17px;
      top: 20px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      box-shadow: 0 0 0 1px var(--grey-100);
      position: absolute;
    }
  }

  .text-block {
    margin-top: 70px;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 480px;

    h1, p {
      color: var(--white);
      text-align: left;
      
    }

    h1 {
      font-size: 40px;
      font-weight: 700;
      text-shadow: 0 4px 4px rgba(0, 0, 0, .5);
      line-height: 1.2;
    }

    p {
      margin-top: 30px;
      text-wrap: balance;
    }

  }

  .social-proof {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 180px;
    background: var(--grey-50);
    width: 100%;
  }


  .giving {
    max-width: $inner;
    width: 100%;
    margin: 0 auto;
    padding: 50px 0;

    img {
      width: 100%;
      height: auto;
    }
  }

  
  

</style>