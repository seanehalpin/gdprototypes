<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion'
  import { fade, fly } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"
  import { formatNumber } from '$lib/util'
  import Globev1 from '$lib/components/Globev2.svelte';
  import Logo from '$lib/components/dash/Logo.svelte';
  import Center from '$lib/util/Center.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;

  let name = "Walid"

  import '../../../../scale.scss'

  const buttonChange = (id: number) => {
    buttons = buttons.map(button => {
      if (button.id === id) {
        button.active = true;
      } else {
        button.active = false;
      }
      buttons = buttons
      return button;
    })
  }

  let customDonation = false
  let currentActiveAmount = "$60"
  let customDonationInput 
  let customDonationAmount = 300
  let customDonationButtonActive = false

  $: if (customDonationAmount >= 1) {
    customDonationButtonActive = true
  } else {
    customDonationButtonActive = false
  }

  let donations = [
    {id: 1, amount: "$40", active: false},
    {id: 2, amount: "$60", active: true},
    {id: 3, amount: "$100", active: false},
    {id: 4, amount: "$200", active: false},
    {id: 5, amount: "Other", active: false},
  ]

  const  donationChange = (id: number) => {
    donations = donations.map(donation => {
      if (donation.id === id) {
        donation.active = true;
        currentActiveAmount = donation.amount
        if(donation.amount === "Other") {
          customDonation = true
          setTimeout(() => {
            customDonationInput.focus()
          }, 10);
        } else {
          customDonation = false
        }
      } else {
        donation.active = false;
      }
      donations = donations
      return donation;
    })
  }

  const resetDonation = () => {
    donations = donations.map(donation => {
      donation.active = false;
      donations = donations
      donations[1].active = true
      currentActiveAmount = "$60"
      return donation;
    })
    customDonation = false
  }


  onMount(() => {
    
  })

</script>

<svelte:head>
<title>Impact Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet">
</svelte:head>

<Center
--flex-direction="column" 
--background="var(--white)" 
--gap="var(--24px)" 
--justify-content="flex-start"
>

<div class="dash">
<main>
  <div class="controls">
    <Logo />
    <button class="avatar-button">
      <span class="avatar">
        <img src="/dash/avatar-2.png" alt="" >
      </span>
      <span class="name">Walid H</span>
      <svg width="16" height="16" fill="var(--green-500)" focusable="false" viewBox="0 0 24 24"><path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z"></path></svg>
      </button>
  </div>
  
  <div class="main">
    <div class="title">
      <h1>Donations</h1>
    </div>

    <div class="monthly">
      <div class="story">

      </div>
      <div class="donate">
        <div class="title">
          Join over 110,000 donors in trusting people in poverty to decide what they need most.
        </div>
        <div class="options">
          {#if !customDonation}
          {#each donations as donation}
          <button class:active={donation.active} on:click={() => donationChange(donation.id)}>
            {donation.amount}
          </button>
          {/each}
          {:else}
          <div class="custom-donation">
            <button class="back" on:click={()=> resetDonation()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.21938 11.4694L9.96938 4.71937C10.1101 4.57864 10.301 4.49958 10.5 4.49958C10.699 4.49958 10.8899 4.57864 11.0306 4.71937C11.1714 4.8601 11.2504 5.05097 11.2504 5.24999C11.2504 5.44902 11.1714 5.63989 11.0306 5.78062L5.56031 11.25L20.25 11.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75L5.56031 12.75L11.0306 18.2194C11.1714 18.3601 11.2504 18.551 11.2504 18.75C11.2504 18.949 11.1714 19.1399 11.0306 19.2806C10.8899 19.4213 10.699 19.5004 10.5 19.5004C10.301 19.5004 10.1101 19.4213 9.96938 19.2806L3.21938 12.5306C3.14964 12.461 3.09432 12.3782 3.05658 12.2872C3.01884 12.1962 2.99941 12.0986 2.99941 12C2.99941 11.9014 3.01884 11.8038 3.05658 11.7128C3.09432 11.6217 3.14964 11.539 3.21938 11.4694Z" fill="var(--icon)"/>
                </svg>
                
                
            </button>
            <div class="input-holder" in:fade={{duration:150}}>
              <input type="number" placeholder="Add custom amount" bind:this={customDonationInput} bind:value={customDonationAmount} />
            </div>
          </div>
          {/if}
        </div>
        <div class="confirm">
          {#if !customDonation}
          <button class="active">Donate 
            <span in:fade={{duration:200}}>{currentActiveAmount}</span>
            monthly
          </button>
          {:else}
            {#if customDonationAmount > 999999}
            <button class="active custom">
              Click to contact us about donations over $1M
            </button>
            {:else}
            <button class:active={customDonationButtonActive}>
              Donate {#if customDonationButtonActive}
                ${customDonationAmount} monthly
              {/if}
            </button>
            {/if}
          {/if}
        </div>
      </div>
    </div>

    <!-- <div class="vanity">
      <div class="metric">
        <div class="sub">Member since</div>
        <div class="value">
          2016
        </div>
      </div>
      <div class="metric">
        <div class="sub">Donations</div>
        <div class="value">
          6
        </div>
      </div>
      <div class="metric">
        <div class="sub">Amount donated</div>
        <div class="value">
          $2,500.00
        </div>
      </div>
    </div> -->

  </div>
</main>
</div>

</Center>


<style lang="scss">

  @import "../../../../donor";

  $radius: var(--s0);
  $color-beige: #F9F7F1;
  $color-brand: #265746;
  $color-border-tertiary: #CBC5B8;
  $space: 'Space Mono', monospace;
  $navHeight: 140px;

  .dash {
    width: 100%;
    max-width: calc(1184px + var(--s0) * 2);
    display: flex;
    justify-content: center;
    padding: 0 var(--s0);
    gap: var(--s0);
    font-family: var(--systemFont);
  }

  nav {
    width: 100%;
    max-width: 224px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    align-self: flex-start;

    .donate {
      width: 100%;
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-brand);
      color: var(--text-onbrand);
      font-size: var(--14px);
      font-weight: 600;
      border-radius: var(--42px);
      height: var(--42px);
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        filter: saturate(2);
      }
    }

  }

  .header {
    width: 100%;
    height: $navHeight;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .controls {
    width: 100%;
    height: $navHeight;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      display: flex;
      // height: 56px;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: var(--42px);
      background: var(--bg-secondary);
      gap: var(--s-4);
      padding: var(--s-6) var(--s-2) var(--s-6) var(--s-6);
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:focus-within {
        outline: 0;
        border-color: var(--border-brand);
        box-shadow: inset 0px 0px 0px 1px var(--bg), 0 0 0 1px var(--border-brand), 0px 0px 0px 4px var(--focus);
      }

      .name {
        display: none;
      }

      svg {
        transform: rotate(180deg);
      }
    
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  main {
    width: 100%;
    max-width: 896px;
    // overflow: hidden;
  }


  .links {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: var(--s1) 0;
    gap: var(--s1);

    button {
      display: flex;
      width: 100%;
      background: none;
      border: 0;
      gap: var(--s1);
      align-items: center;
      height: 48px;
      cursor: pointer;
      color: var(--text-muted);
      font-size: var(--s0);

      .link-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }

      svg {
        fill: var(--icon-muted);
      }

      &.active {
        color: var(--text-brand);
        font-weight: 600;
        svg {
          fill: var(--icon-brand);
        }
      }

    }
  }

  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0;

    .title {
      h1 {
        font-size: var(--s2);
        color: var(--text);
        margin-bottom:  var(--s2);
      }
    }
  }

  .monthly {
    display: flex;
    align-items: stretch;
    gap: var(--s0);
    flex-wrap: wrap;

    > :first-child {
      flex-basis: 288px; 
      flex-grow: 1;
    }

    > :last-child {
      flex-basis: 0;
      flex-grow: 999;
      min-inline-size: 60%;
    }

    .story {
      // width: 288px;
      border-radius: var(--s0);
      background: url('/dash/storyv2.jpg') no-repeat;
      background-size: cover;
      // height: 100%;
      position: relative;
    }

    .donate {
      // width: 100%;
      border-radius: var(--s0);
      background: var(--bg-secondary);
      padding: var(--s5) var(--s2);
      display: flex;
      flex-direction: column;
      gap: var(--s1);
      align-items: center;
      justify-content: center;
      text-align: center;
      // height: 368px;
      position: relative;

      .title {
        font-size: var(--s1);
        font-weight: 600;
        line-height: 140%;
        color: var(--text);
      }

      .options {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: var(--s-3);
        width: 100%;
        // padding: 0 var(--s1);

        button {
          // font-size: var(--14px);
          display: flex;
          align-items: center;
          justify-content: center;
          height: var(--48px);
          border-radius: var(--48px);
          padding: 0 var(--s0);
          width: 100%;
          flex: 1;
          border: 0;
          color: var(--text-muted);
          background: var(--bg-secondary);
          border: 1px solid var(--border-tertiary);
          font-weight: 600;
          font-size: var(--s0);
          cursor: pointer;
          transition: var(--transition);

          &:hover {
            border-color: var(--bg-brand);
          }

          &.active {
            color: var(--text-onbrand);
            background: var(--bg-brand);
            border-color: var(--bg-brand);

            &:focus-within {
              outline: 0;
              border-color: var(--border-brand);
              box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
            }
          }

          &:focus-within {
            outline: 0;
            border-color: var(--border-brand);
            box-shadow: inset 0px 0px 0px 1px var(--bg), 0px 0px 0px 3px var(--focus);
          }
        }
      }

      .confirm {
        width: 100%;
        // padding: 0 var(--s1);
        
        button {
          width: 100%;
          height: var(--48px);
          border-radius: var(--s3);
          padding: 0 var(--16px);
          background: var(--bg-brand);
          color: var(--text-onbrand);
          font-weight: 600;
          border: 0;
          cursor: pointer;
          pointer-events: none;
          opacity: 0.5;
          transition: var(--transition);
          font-size: var(--s0);
          // font-size: var(--14px);

          &.active {
            opacity: 1;
            pointer-events: all;
          }

          &.custom {
            background: var(--bg-accent-purple);
            color: var(--text);
          }

          &:focus-within {
            outline: 0;
            border-color: var(--border-brand);
            box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
          }
        }
      }

      .custom-donation {
        width: 100%;
        display: flex;
        gap: var(--s-1);

        .back {
          padding: 0 12px;
        }

        .input-holder {
          width: 100%;
          position: relative;

          &:before {
            content: "$";
            position: absolute;
            left: 0;
            top: 0;
            z-index: 100;
            height: var(--48px);
            width: var(--48px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
            color: var(--text-muted);
          }
        }

        input {
          // font-size: var(--14px);
          width: 100%;
          height: var(--48px);
          border-radius: var(--48px);
          padding: 0 var(--s0) 0 var(--s2);
          border: 1px solid var(--border-tertiary);
          position: relative;
          z-index: 10;
          color: var(--text);
          
          &:focus-within {
            outline: 0;
            border-color: var(--border-brand);
            box-shadow: inset 0px 0px 0px 1px var(--bg), 0px 0px 0px 3px var(--focus);
          }
        }
      }

    }
  }

  .vanity {
    display: flex;
    gap: var(--s0);
    width: 100%;
    margin-top: var(--s0);

    .metric {
      border: 1px solid var(--border);
      border-radius: var(--s0);
      height: var(--96px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      font-family: $space;
    }

    .sub {
      font-size: var(--14px);
      color: var(--text-muted);
    }

    .value {
      font-size: var(--24px);
      color: var(--text);
    }
  }


</style>