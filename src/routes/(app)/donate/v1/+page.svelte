<script lang="ts">
  import GdLogoSingle from '$lib/svg/GdLogoSingle.svelte';
  import Center from '$lib/util/Center.svelte';
  import type { PageData } from './$types';

  import { onMount, onDestroy } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"
  import Story from '$lib/util/Story.svelte'
  export let data: PageData;

  let ready = false
  let name = "Joseph"
  let formSmall = true

  $: number = 0

  let dots = [
    {id: 0, active: true},
    {id: 1, active: false},
    {id: 2, active: false},
    {id: 3, active: false},
  ]

  let quotes = [
    "I've always had a lot of passion for beekeeping but my financial situation made it impossible for me to grow my business. I opted for casual jobs. I would be lucky to even make $2 a day.", "The money I received from GiveDirectly awakened my desire to restart this project. The happiness I felt can't even be put into words.", "I've already bought 11 locally made beehives using a portion of my first transfer, and I intend to add 5 more. This cost me $130.", "I am anticipating relatively high profits and I plan to use my income to purchase a piece of land and build a new house."
  ]
  $: quote = quotes[number]

  setInterval(() => {
  number = (number + 1) % 4;
  dots.forEach(dot => {
    dot.active = false
    dot.active = dot.id === number;
  });
  dots = dots
  }, 8000);

  $: filteredKey = 1

  const storyKey = (story: number) => filteredKey = story

  const handleStory = (event: { detail: { text: any; }; }) => {
    let story = event.detail.text
    filteredKey = story
  }

  let storys = [
    {id: 1, title: "Donate with story", loom: "182b94f341c64e56951a834248e502a3", description: "", key: 1},
  ]

  let showStory = true

  onMount(() => {
    ready = true
  })

</script>

<svelte:head>
  <title>Donate v1 | GiveDirectly</title>
</svelte:head>

{#if ready}
{#if showStory}
  <Story bind:filteredKey={filteredKey} bind:storys={storys} />
{/if}
<Center
  --flex-direction="column" 
  --background="var(--white)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
>
  <div class="container">
    <div class="nav">
      <GdLogoSingle fill="var(--green-600)"/>
    </div>
    <div class="gallery">
      {#key number}
      <img in:fade|local={{duration:1000}} out:fade={{duration:1200}} src="/donate/joseph/joseph_{number}.png" alt="">
      {/key}
    </div>
    <div class="inner">
      <div class="form">
        <div class="header">
          <h1>Give directly to people like {name} today</h1>
        </div>
        <div class="form-inner">
          {#if formSmall}
          <div class="button-tabs">
            <button class="tab active">Once</button>
            <button class="tab">Monthly</button>
          </div>
          <div class="donation-picker">
            <button class="value">$25</button>
            <button class="value">$50</button>
            <button class="value active">$100</button>
            <button class="value">$500</button>
            <button class="value">$1,000</button>
            <button class="value">$5,000</button>
            <button class="value big">Other</button>
          </div>
          <button class="donate" on:click={() => formSmall = false}>Continue to payment</button>
          <button class="program">Poverty relief - Africa (edit program)</button>
          <button class="international">Giving from outside the U.S.?</button>

          {:else}
          <div class="input">
            <label>First Name</label>
            <input type="text" placeholder="">
          </div>
          <div class="input">
            <label>Last Name</label>
            <input type="text" placeholder="">
          </div>
          <div class="input">
            <label>Email</label>
            <input type="text" placeholder="">
          </div>
          <div class="form-title">
            <span>
            Payment info
          </span>
          </div>
          <div class="input">
            <label>Card Number</label>
            <input type="text" placeholder="">
          </div>
          <div class="input">
            <label>Country</label>
            <input type="text" placeholder="USA">
          </div>
          <div class="radio-card">US bank account</div>
          <div class="radio-card">PayPal</div>
          <div class="radio-card">Check</div>
          <div class="radio-card">Wire</div>
          <div class="radio-card">Stock</div>
          <div class="radio-card">Crypto</div>

          <button class="donate" on:click={() => formSmall = true}>Donate $100</button>
          {/if}
        </div>
      </div>
      <div class="quote">
        <div class="quote-text">
          {#key number}
          <span in:fade={{duration:250}}>
            {quote}
          </span>
          {/key}
        </div>
        <div class="quote-footer" in:fade={{duration:600, delay: 300}}>
          <div class="dots">
            {#each dots as dot}
              <div class="dot" class:active={dot.active} id="dot-{dot.id}"></div>
            {/each}
          </div>
          <div class="attr">
            {name}, Kenya
          </div>
        </div>
      </div>
    </div>
    <div class="inner bottom">
      <footer>
        <div class="footer-col">
          <div class="col">
            <h3>Additonal Info</h3>
            <a href="#" class="link">Contact us</a>
            <a href="#" class="link">Update existing donation</a>
            <a href="#" class="link">Donation FAQ</a>
          </div>
          <div class="col">
            <h3>Offline Payments</h3>
            <a href="#" class="link">Check</a>
            <a href="#" class="link">Wire transfer</a>
            <a href="#" class="link">Donation FAQ</a>
            <a href="#" class="link">Crypto</a>
          </div>
        </div>
        <div class="footer-col">
          <div class="col">
            <h3>Secure donation</h3>
            <div class="cards">
              <img src="/donate/footer/pp.svg" alt="">
              <img src="/donate/footer/disc.svg" alt="">
              <img src="/donate/footer/aex.svg" alt="">
              <img src="/donate/footer/visa.svg" alt="">
              <img src="/donate/footer/mc.svg" alt="">
            </div>
          </div>
        </div>
      </footer>
      <div class="disclaimer">
        <div class="disclaimer-links">
          <a href="#" class="link">Privacy Policy</a>
          <a href="#" class="link">Terms of Use</a>
          <a href="#" class="link">Charity Disclosure</a>
        </div>
        <div class="disclaimer-text">
          &copy; GiveDirectly, Inc., 501(c)(3) Nonprofit
      </div>
    </div>
    <div class="info">
      This site is protected by reCAPTCHA and the Google Privacy Policy and Google Terms of Service apply.
    </div>
  </div>
</Center>
{/if}

<style lang="scss">

  $width: 1280px;
  $inner: 1024px;
  
  .container {
    margin: 0 auto;
    width: 100%;
    max-width: $width;
    height: 100%;
    position: relative;
  }

  .nav {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .gallery {
    position: absolute;
    left: 0;
    top: 70px;
    z-index: 1;
    // background: var(--green-600);
    overflow: hidden;
    width: 100%;
    height: 578px;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }

  .inner {
    width: 100%;
    max-width: $inner;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 100;

    &.bottom {
      flex-direction: column;
      padding-bottom: var(--42px);
    }
  }

  .quote {
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
    margin-top: 94px;
  }

  .form-inner {
    position: relative;
    background: var(--white);
    padding: var(--16px);
    display: flex;
    flex-direction: column;
    gap: 12px;


    .button-tabs {
      display: flex;
      gap: 2px;
      background: var(--grey-50);
      padding: 4px;
      border-radius: 30px;
    }

    .tab {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      color: var(--grey-500);
      border-radius: 30px;
      border: 0;
      background: transparent;
      font-weight: 500;
      font-size: var(--14px);
      cursor: pointer;

      &.active {
        color: var(--green-600);
        background: var(--white);
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
      transition: all 0.2s ease-in-out;

      &:hover {
        box-shadow:  0 0 0 2px var(--green-500);
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
      font-size: var(--16px);
      border-radius: 8px;
      height: 48px;
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
      font-size: var(--16px);
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
    background: var(--white);
    margin-bottom: 10px;
    padding: var(--16px);
  }

  h1 {
    font-size: var(--16px);
    color: var(--green-600);
    font-weight: 700;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  footer {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 100px 0 0;

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
      font-weight: 500;
      color: var(--green-600);
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
    color: var(--grey-500);
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
      color: var(--grey-400);
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

  

</style>