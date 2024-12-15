<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion'
  import { fade, fly } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"
  import { formatNumber } from '$lib/util'
  import Globev1 from '$lib/components/Globev2.svelte';
  import Logo from '$lib/components/dash/Logo.svelte';
  import Center from '$lib/util/Center.svelte';
  
  export let show = false

  let name = "Walid"

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

<div class="dash {show}">
  <section>
    <div class="main">
  
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
                  <path d="M3.21938 11.4694L9.96938 4.71937C10.1101 4.57864 10.301 4.49958 10.5 4.49958C10.699 4.49958 10.8899 4.57864 11.0306 4.71937C11.1714 4.8601 11.2504 5.05097 11.2504 5.24999C11.2504 5.44902 11.1714 5.63989 11.0306 5.78062L5.56031 11.25L20.25 11.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75L5.56031 12.75L11.0306 18.2194C11.1714 18.3601 11.2504 18.551 11.2504 18.75C11.2504 18.949 11.1714 19.1399 11.0306 19.2806C10.8899 19.4213 10.699 19.5004 10.5 19.5004C10.301 19.5004 10.1101 19.4213 9.96938 19.2806L3.21938 12.5306C3.14964 12.461 3.09432 12.3782 3.05658 12.2872C3.01884 12.1962 2.99941 12.0986 2.99941 12C2.99941 11.9014 3.01884 11.8038 3.05658 11.7128C3.09432 11.6217 3.14964 11.539 3.21938 11.4694Z" fill="var(--ui-icon)"/>
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

  
    </div>
  </section>
  </div>


  <style lang="scss">

    @import "../../../pathway";

    .show-outline {
      * {
        box-shadow: 0 0 0 1px var(--ruby-400);
      }
    }

    
  
    $radius: var(--ui-s0);
    $color-beige: #F9F7F1;
    $color-brand: #265746;
    $color-border-tertiary: #CBC5B8;
    $navHeight: 140px;
  
    .dash {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: var(--ui-s0);
      font-family: var(--ui-font-base);
      margin: var(--ui-s4) 0;
    }

    section {
      width: 100%;
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
        background: var(--ui-brand);
        color: var(--base-white);
        font-size: var(--ui-f3);
        font-weight: 600;
        border-radius: var(--ui-r50);
        height: var(--ui-s3);
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
        border-radius: var(--ui-s3);
        background: var(--ui-bg-muted);
        gap: var(--ui-s-4);
        padding: 0;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
  
  
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
      margin: var(--ui-s1) 0;
      gap: var(--ui-s1);
  
      button {
        display: flex;
        width: 100%;
        background: none;
        border: 0;
        gap: var(--ui-s1);
        align-items: center;
        height: 48px;
        cursor: pointer;
        color: var(--ui-fg-muted);
        font-size: var(--ui-s0);
  
        .link-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }
  
        svg {
          fill: var(--ui-muted);
        }
  
        &.active {
          color: var(--ui-brand);
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
          font-size: var(--ui-f6);
          color: var(--ui-fg);
          margin-bottom:  var(--ui-s2);
        }
      }
    }
  
    .monthly {
      display: flex;
      align-items: stretch;
      gap: var(--ui-s0);
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
        border-radius: var(--ui-r4);
        background: url('/dash/storyv2.jpg') no-repeat;
        background-size: cover;
        // height: 100%;
        position: relative;
      }
  
      .donate {
        // width: 100%;
        border-radius: var(--ui-r4);
        background: var(--ui-bg-muted);
        padding: var(--ui-s5) var(--ui-s3);
        display: flex;
        flex-direction: column;
        gap: var(--ui-s1);
        align-items: center;
        justify-content: center;
        text-align: center;
        // height: 368px;
        position: relative;
  
        .title {
          font-size: var(--ui-f6);
          font-family: var(--ui-font-serif);
          line-height: var(--ui-lh-sm);
          letter-spacing: var(--ui-f5-ls);
          font-weight: 500;
          color: var(--ui-fg);
          margin-bottom: var(--ui-s-3);
        }
  
        .options {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: var(--ui-s-3);
          width: 100%;
          // padding: 0 var(--s1);
  
          button {
            // font-size: var(--14px);
            display: flex;
            align-items: center;
            justify-content: center;
            height: var(--ui-s3);
            border-radius: var(--ui-r6);
            padding: 0 var(--ui-s0);
            width: 100%;
            flex: 1;
            border: 0;
            color: var(--ui-fg-muted);
            background: var(--bg-muted);
            border: 1px solid var(--ui-border);
            font-weight: 600;
            font-size: var(--ui-f3);
            cursor: pointer;
            transition: all 0.2s ease-in-out;
  
            &:hover {
              border-color: var(--ui-brand);
            }
  
            &.active {
              color: var(--ui-brand-fg);
              background: var(--ui-brand);
              border-color: var(--ui-brand);
            }
          }
        }
  
        .confirm {
          width: 100%;
          // padding: 0 var(--s1);
          
          button {
            width: 100%;
            height: var(--ui-s3);
            border-radius: var(--ui-r6);
            padding: 0 var(--ui-s0);
            background: var(--ui-brand);
            color: var(--ui-brand-fg);
            font-weight: 600;
            border: 0;
            cursor: pointer;
            pointer-events: none;
            opacity: 0.5;
            transition: all 0.2s ease-in-out;
            font-size: var(--ui-f3);
            // font-size: var(--14px);
  
            &.active {
              opacity: 1;
              pointer-events: all;
            }
  
            &.custom {
              background: var(--lemon-400);
              color: var(--ui-fg-dark);
            }
          }
        }
  
        .custom-donation {
          width: 100%;
          display: flex;
          gap: var(--ui-s-1);
  
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
              height: var(--ui-s3);
              width: var(--ui-s3);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 100;
              color: var(--ui-fg-muted);
            }
          }
  
          input {
            // font-size: var(--14px);
            width: 100%;
            height: var(--ui-s3);
            border-radius: var(--ui-s3);
            padding: 0 var(--ui-s0) 0 var(--ui-s2);
            border: 1px solid var(--ui-border);
            position: relative;
            z-index: 10;
            color: var(--ui-fg);
            background: var(--ui-bg);
            
            &:focus-within {
              outline: 0;
              border-color: var(--ui-brand);
              // box-shadow: inset 0px 0px 0px 1px var(--bg), 0px 0px 0px 3px var(--focus);
            }
          }
        }
  
      }
    }

  
  
  </style>