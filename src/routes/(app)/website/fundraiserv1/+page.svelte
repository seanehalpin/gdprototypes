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
  let showModal = false

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

  let donations = [
    {amount: 25, date: "Just now"},
    {amount: 50, date: "1 minute ago"},
    {amount: 100, date: "5 minutes ago"},
    {amount: 200, date: "10 minutes ago"},
    {amount: 500, date: "15 minutes ago"},
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

  <div class="fundraiser" in:fly|global={{duration:400, y: 100, delay: 1000}} on:mouseenter={() => showModal = true} on:mouseleave={() => showModal = false}>
    {#if showModal}
      <div class="modal" in:fly={{y: 50, duration:250}} out:fade={{duration: 250, delay: 200}}>
        <div class="modal-main">
          <h2>Cash Relief for Morocco Earthquake Survivors</h2>
          <p>On September 8th, the largest earthquake to hit the region in over 100 years struck Morocco's High Atlas Mountains, with 450,000 people surrounding the Marrakech area estimated to be impacted. Communities near the epicenter in Al-Haouz, Chichaoua, and Taroudant were already among the poorest in the country and now struggle to afford food, medicine, safe shelter, and transportation out of impacted areas.
          </p>

          <p>
            <a href="#" class="modal-button">Learn more</a>
          </p>
        </div>
        <div class="modal-aside">

          <!-- {#each donations as donation}
          <div class="modal-donation">
            <div class="modal-donation-main">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="secondary" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="$theme-secondary"/>
                <path class="primary" d="M20.0407 18.5624C18.8508 16.5054 17.0172 15.0304 14.8774 14.3312C15.9358 13.7011 16.7582 12.7409 17.2182 11.5982C17.6781 10.4555 17.7503 9.19337 17.4235 8.00568C17.0968 6.81798 16.3892 5.77039 15.4094 5.02378C14.4296 4.27716 13.2318 3.8728 12 3.8728C10.7682 3.8728 9.57044 4.27716 8.59067 5.02378C7.6109 5.77039 6.90331 6.81798 6.57654 8.00568C6.24978 9.19337 6.32193 10.4555 6.78189 11.5982C7.24186 12.7409 8.06422 13.7011 9.12268 14.3312C6.98284 15.0296 5.14925 16.5046 3.9594 18.5624C3.91577 18.6336 3.88683 18.7127 3.87429 18.7953C3.86174 18.8778 3.86585 18.962 3.88638 19.0429C3.9069 19.1238 3.94341 19.1997 3.99377 19.2663C4.04413 19.3328 4.10731 19.3886 4.17958 19.4304C4.25185 19.4721 4.33175 19.499 4.41457 19.5093C4.49738 19.5197 4.58143 19.5134 4.66176 19.4907C4.74209 19.4681 4.81708 19.4296 4.88228 19.3775C4.94749 19.3254 5.00161 19.2608 5.04143 19.1874C6.51331 16.6437 9.11487 15.1249 12 15.1249C14.8852 15.1249 17.4867 16.6437 18.9586 19.1874C18.9984 19.2608 19.0526 19.3254 19.1178 19.3775C19.183 19.4296 19.258 19.4681 19.3383 19.4907C19.4186 19.5134 19.5027 19.5197 19.5855 19.5093C19.6683 19.499 19.7482 19.4721 19.8205 19.4304C19.8927 19.3886 19.9559 19.3328 20.0063 19.2663C20.0566 19.1997 20.0932 19.1238 20.1137 19.0429C20.1342 18.962 20.1383 18.8778 20.1258 18.7953C20.1132 18.7127 20.0843 18.6336 20.0407 18.5624ZM7.62503 9.49993C7.62503 8.63463 7.88162 7.78877 8.36235 7.06931C8.84308 6.34984 9.52636 5.78909 10.3258 5.45796C11.1252 5.12682 12.0049 5.04018 12.8535 5.20899C13.7022 5.3778 14.4818 5.79448 15.0936 6.40634C15.7055 7.01819 16.1222 7.79774 16.291 8.64641C16.4598 9.49508 16.3731 10.3747 16.042 11.1742C15.7109 11.9736 15.1501 12.6569 14.4306 13.1376C13.7112 13.6183 12.8653 13.8749 12 13.8749C10.8401 13.8737 9.72801 13.4124 8.90781 12.5922C8.0876 11.7719 7.62627 10.6599 7.62503 9.49993Z" />
                </svg>
              <span>Someone gave ${donation.amount}</span>
            </div>
            <div class="modal-donation-time">
              {donation.date}
            </div>
          </div>
          {/each} -->
          <img src="/website/morrocco.png" alt="donation-image">

          
        </div>
      </div>
      {/if}

    <div class="fundraiser-inner">
      
      <div class="fundraiser-large">
        <div class="fundraiser-desc">
          <div class="fundraiser-desc-left">
            <span><span class="hilite">$5,000 of $45,000</span> raised for Cash Relief for Morocco Earthquake Survivors 
              <!-- <a href="#">Learn more</a> -->
            </span>
          </div>
          <!-- <div class="fundraiser-desc-right">
            $45,000 to go
          </div> -->
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
  $fundwidth: 1000px;
  $theme: var(--red-600);
  $theme-secondary: var(--red-200);
  // $theme: var(--green-600);
  // $theme-secondary: var(--green-200);
  // $theme: var(--purple-600);
  // $theme-secondary: var(--purple-200);
  // $theme: var(--blue-600);
  // $theme-secondary: var(--blue-200);

  .modal {
    padding: var(--64px) var(--64px);
    background: var(--white);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: var(--8px);
    position: relative;
    width: 100%;
    max-width: $fundwidth;
    z-index: 50;
    display: flex;
    gap: var(--24px);

    .modal-main {
      flex: 1;
    }

    h2 {
      font-size: var(--20px);
      margin-bottom: 10px;
    }

    p + p {
      margin-top: var(--24px);
    }

    a {
      color: $theme;
    }

    .modal-aside {
      display: flex;
      flex-direction: column;
      gap: var(--24px);
      position: relative;

      img {
        max-width: 400px;
        height: auto;
      }

      &:before {
        // content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
        pointer-events: none;
        
      }
    }

    .modal-donation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--42px);
      font-size: var(--14px);
    }

    .modal-donation-main {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;

      svg {
        path.primary {
          fill: $theme;
        }
        path.secondary {
          fill: $theme-secondary;
        }
      }
    }

    .modal-donation-time {
      font-weight: 400;
      text-align: right;
    }

    .modal-button {
      border-radius: var(--42px);
      background: $theme-secondary;
      color: $theme;
      font-weight: 500;
      font-size: var(--font-lg);
      padding: 10px var(--24px);
      border: 0;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }

  }

  .fundraiser {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: var(--24px);
    width: 100%;
    z-index: 99999;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: var(--8px);

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      pointer-events: none;
      
    }

    .fundraiser-inner {
      max-width: $fundwidth;
      background: $theme-secondary;
      border-radius: var(--8px);
      padding: var(--24px) var(--24px);
      display: flex;
      width: 100%;
      gap: var(--24px);
      position: relative;
      z-index: 100;
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
      align-items: flex-start;
      gap: 10px;
      color: var(--grey-600);
      font-size: var(--font-sm);
      font-weight: 500;
    }

    .fundraiser-desc-left {
      display: flex;
      align-items: center;
      gap: var(--8px);
      flex: 1;

      a {
        color: $theme;
      }
    }

    .fundraiser-desc-right {
      background: var(--red-300);
      border-radius: 7px;
      padding: 2px 8px;
    }

    .hilite {
      background: var(--red-300);
      border-radius: 8px;
      padding: 2px 8px;
      margin-right: 3px;
      font-weight: 600;
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
      background: $theme;
      border-radius: var(--24px);
      overflow: hidden;
      position: relative;
    }

    .fundraiser-small {
      // background: var(--white);
      // border-radius: var(--42px);
      display: flex;
      align-items: center;
      // border-left: 2px solid rgba(0, 0, 0, .1);
      border-left: 2px solid var(--red-300);
    }

    .fundraiser-list {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--16px);
      padding: 0 var(--24px);
      gap: var(--8px);
      font-weight: 500;
    }

    .fundraiser-button {
      border-radius: var(--42px);
      background: $theme;
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
      transition: all 0.2s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
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