<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion'
  import { fade, fly, scale } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"
  import Logo from '$lib/components/dash/Logo.svelte';
  import Center from '$lib/util/Center.svelte';
  import type { PageData } from './$types';
  import Story from '$lib/util/Story.svelte'
  
  export let data: PageData;

  let name = "Walid"

  import '../../../../scale.scss'

  let customDonation = false
  let currentActiveAmount = "$60"
  let customDonationInput 
  let customDonationInputPicker
  let customDonationAmount = 300
  let customDonationAmountPicker = 60
  let customDonationButtonActive = false
  let customDonationButtonPickerActive = false

  $: if (customDonationAmount >= 1) {
    customDonationButtonActive = true
  } else {
    customDonationButtonActive = false
  }

  $: if (customDonationAmountPicker >= 1) {
    customDonationButtonPickerActive = true
  } else {
    customDonationButtonPickerActive = false
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
            customDonationInput.focus();
            customDonationInput.select();
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

  const openDropdownPicker = () => {
    // showPaymentDropdown = !showPaymentDropdown
    if (showPaymentDropdown) {
      setTimeout(() => {
        customDonationInputPicker.focus();
        customDonationInputPicker.select();
      }, 10);
    }
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

  let paymentSet = true
  let showPaymentDropdown = false
  let paymentChanged = false

  const donationCancel = () => {
    showPaymentDropdown = false
    showModal = true
  }

  const donationCancelConfirm = () => {
    showModal = false
    paymentSet = false
    notyText = "Your monthly recurring donation has been cancelled"
    showNoty = true
    currentActiveAmount = "$60"
    customDonationAmount = 60

    donations = donations.map(donation => {
      if (donation.id === 2) {
        donation.active = true;
        currentActiveAmount = donation.amount;
      } else {
        donation.active = false;
      }
      return donation;
    });

    setTimeout(() => {
      showNoty = false
    }, 5000);
  }


  const donationSetup = () => {
    showPaymentDropdown = false
    notyText = `A monthly recurring donation of ${currentActiveAmount} has been created`
    showNoty = true
    paymentSet = true
    customDonationAmountPicker = Number(currentActiveAmount.replace('$', ''))
    setTimeout(() => {
      showNoty = false
    }, 5000);

  }

  const donationPause = () => {

  }

  const updateDonationAmount = () => {
    paymentChanged = true;
    showPaymentDropdown = false;
    currentActiveAmount = "$" + customDonationAmountPicker;
    notyText = `Your monthly recurring donation has been updated to ${currentActiveAmount}`
    showNoty = true

    setTimeout(() => {
      showNoty = false
    }, 5000);
  }

  let showNoty = false
  let notyText = "Your monthly recurring donation has been cancelled"

  const dismissNoty = () => {
    showNoty = false
  }

  let showModal = false


  const closeModal = () => {
    showModal = false
    customDonationAmountPicker = Number(currentActiveAmount.replace('$', ''))
    // console.log('close modal')
  }

  $: filteredKey = 1

  const storyKey = (story: number) => filteredKey = story

  const handleStory = (event: { detail: { text: any; }; }) => {
    let story = event.detail.text
    filteredKey = story
  }

  let storys = [
    {id: 1, title: "Donation management", loom: "b036694884f94c67a103450ddef96edd", description: "", key: 1},
  ]

  let showStory = true
  let ready = false
  onMount(() => {
    ready = true
  })

</script>

<svelte:head>
<title>Impact Dashboard</title>
<!-- <link rel="preconnect" href="https://fonts.googleapis.com"> -->
<!-- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> -->
<!-- <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet"> -->
</svelte:head>

{#if ready}
  {#if showStory}
    <Story bind:filteredKey={filteredKey} bind:storys={storys} />
  {/if}
{/if}
<Center
--flex-direction="column" 
--background="var(--white)" 
--gap="var(--24px)" 
--justify-content="flex-start"
>
{#if showModal}
<div class="modal" in:fade={{duration:250}} out:fade={{duration:250}}>
    <div class="modal-box" in:scale={{start:0.95, duration:450, delay: 200, easing: backOut}} out:scale={{start: 0.95, duration:300, easing: backOut}}>
      <div class="modal-title">
        Cancel your monthly donation
      </div>
      <div class="modal-body">
        <p>Thank you for giving monthly to people in poverty for the last 10 months. Please confirm your cancellation of:</p>
        <span>{currentActiveAmount} a month to Poverty relief - Africa</span>
      </div>
      <div class="modal-footer">
        <div class="modal-buttons">
          <button class="back" on:click={()=> closeModal()}>Go back</button>
          <button class="confirm" on:click={()=> donationCancelConfirm()}>Confirm cancellation</button>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" on:click={()=> closeModal()}></div>
</div>
{/if}
{#if showNoty}
<div class="noty" in:fly={{y:-30,duration:250}} out:fly={{y:-30,duration:250}}>
  <div class="noty-content">
    <span>{notyText}</span>
    <button class="noty-button" on:click={() => dismissNoty()}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.09467 7.09467C7.38756 6.80178 7.86244 6.80178 8.15533 7.09467L12 10.9393L15.8447 7.09467C16.1376 6.80178 16.6124 6.80178 16.9053 7.09467C17.1982 7.38756 17.1982 7.86244 16.9053 8.15533L13.0607 12L16.9053 15.8447C17.1982 16.1376 17.1982 16.6124 16.9053 16.9053C16.6124 17.1982 16.1376 17.1982 15.8447 16.9053L12 13.0607L8.15533 16.9053C7.86244 17.1982 7.38756 17.1982 7.09467 16.9053C6.80178 16.6124 6.80178 16.1376 7.09467 15.8447L10.9393 12L7.09467 8.15533C6.80178 7.86244 6.80178 7.38756 7.09467 7.09467Z" fill="var(--icon-onbrand)"/>
        </svg>
    </button>
  </div>
</div>
{/if}
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
        {#if paymentSet}
        
          <div class="payment-text" in:fade={{duration:250}}>

            <div class="payment-text-icon">
              <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.75 4C20.1688 4 17.9088 5.11 16.5 6.98625C15.0912 5.11 12.8313 4 10.25 4C8.19528 4.00232 6.22539 4.81958 4.77248 6.27248C3.31958 7.72539 2.50232 9.69528 2.5 11.75C2.5 20.5 15.4738 27.5825 16.0262 27.875C16.1719 27.9533 16.3346 27.9943 16.5 27.9943C16.6654 27.9943 16.8281 27.9533 16.9737 27.875C17.5262 27.5825 30.5 20.5 30.5 11.75C30.4977 9.69528 29.6804 7.72539 28.2275 6.27248C26.7746 4.81958 24.8047 4.00232 22.75 4ZM16.5 25.85C14.2175 24.52 4.5 18.4613 4.5 11.75C4.50198 10.2256 5.10842 8.76423 6.18633 7.68633C7.26423 6.60842 8.72561 6.00198 10.25 6C12.6812 6 14.7225 7.295 15.575 9.375C15.6503 9.55841 15.7785 9.71528 15.9432 9.82569C16.1079 9.93609 16.3017 9.99503 16.5 9.99503C16.6983 9.99503 16.8921 9.93609 17.0568 9.82569C17.2215 9.71528 17.3497 9.55841 17.425 9.375C18.2775 7.29125 20.3188 6 22.75 6C24.2744 6.00198 25.7358 6.60842 26.8137 7.68633C27.8916 8.76423 28.498 10.2256 28.5 11.75C28.5 18.4513 18.78 24.5188 16.5 25.85Z" fill="var(--bg-accent-red)"/>
              </svg>
            </div>

            <div class="payment-text-desc">
              You are donating 
            </div>
            <div class="payment-text-desc">
              <div class="payment-text-button-holder">

                {#if showPaymentDropdown}
                  <div class="button-dropdown" in:fly={{y:-10,duration:250}} out:fly={{y:-5,duration:250}}>
                    <form class="button-dropdown-inner">
                      <div class="options">
                        <!-- {#if !customDonation}
                        {#each donations as donation}
                        <button class:active={donation.active} on:click={() => donationChange(donation.id)}>
                          {donation.amount}
                        </button>
                        {/each}
                        {:else} -->
                        <div class="custom-donation">
                          <!-- <button class="back" on:click={()=> resetDonation()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.21938 11.4694L9.96938 4.71937C10.1101 4.57864 10.301 4.49958 10.5 4.49958C10.699 4.49958 10.8899 4.57864 11.0306 4.71937C11.1714 4.8601 11.2504 5.05097 11.2504 5.24999C11.2504 5.44902 11.1714 5.63989 11.0306 5.78062L5.56031 11.25L20.25 11.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75L5.56031 12.75L11.0306 18.2194C11.1714 18.3601 11.2504 18.551 11.2504 18.75C11.2504 18.949 11.1714 19.1399 11.0306 19.2806C10.8899 19.4213 10.699 19.5004 10.5 19.5004C10.301 19.5004 10.1101 19.4213 9.96938 19.2806L3.21938 12.5306C3.14964 12.461 3.09432 12.3782 3.05658 12.2872C3.01884 12.1962 2.99941 12.0986 2.99941 12C2.99941 11.9014 3.01884 11.8038 3.05658 11.7128C3.09432 11.6217 3.14964 11.539 3.21938 11.4694Z" fill="var(--icon)"/>
                              </svg>
                          </button> -->
                          <div class="input-holder" in:fade={{duration:150}}>
                            <input type="number" placeholder="" bind:this={customDonationInputPicker} bind:value={customDonationAmountPicker} />
                          </div>
                        </div>
                        <!-- {/if} -->
                      </div>
                      <div class="confirm">
                        <!-- {#if !customDonation}
                        <button class="active" on:click={() => {
                        paymentChanged = true;
                        showPaymentDropdown = false;
                        }}>Update amount</button>
                        {:else} -->
                        {#if customDonationAmountPicker >= 1 || customDonationAmountPicker == null}
                        <button class:active={customDonationButtonPickerActive} on:click={() => updateDonationAmount()}>Update amount</button>
                        {#if customDonationAmountPicker !== null}
                        <button class="pause" on:click>
                          ${customDonationAmountPicker} lifts 2 people out of poverty
                        </button>
                        {/if}
                        {:else}
                        
                        <button class="cancel" on:click={()=> donationCancel()}>
                          Cancel donation
                        </button>
                        <button class="pause" on:click={()=> donationPause()}>
                          pause your donations for 3 months
                        </button>
                        {/if}
                      </div>
                      <div class="disclaimer">
                        Your updated payment will be on April 23
                      </div>
                    </form>
                  </div>
                {/if}
                {#key currentActiveAmount}
                <button class="payment-text-button" in:fade={{duration:250}} on:click={() => {showPaymentDropdown = !showPaymentDropdown; openDropdownPicker()}}>{currentActiveAmount} a month</button>
                {/key}
              </div>
              <span>to Poverty relief - Africa</span>
            </div>
          </div>
          <div class="payment-text">
            <div class="payment-text-desc">
              <span>Your next donation is Feb 5, via </span>
              <button class="payment-text-button">PayPal</button>
            </div>
          </div>

        {:else}

        <div class="title" in:fade={{duration:250}}>
          Join over 110,000 donors in trusting people in poverty to decide what they need most.
        </div>
        <div class="options" in:fade={{duration:250}}>
          {#if !customDonation}
          {#each donations as donation}
          <button class:active={donation.active} on:click={() => donationChange(donation.id)} in:fade={{duration:250}}>
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
        <div class="confirm" in:fade={{duration:250}}>
          {#if !customDonation}
          <button class="active" on:click={() => donationSetup()}>Donate 
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
        {/if}
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
      position: relative;
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
      min-height: calc(var(--s0) * 25);
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
        display: flex;
        flex-direction: column;
        gap: var(--s-4);
        
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

          &.pause {
            opacity: 1;
            pointer-events: all;
            background: var(--bg);
            color: var(--text);
            box-shadow: none;
            font-size: var(--s-12);
            height: var(--32px);
            margin-top: var(--s-3);

            &:focus-within {
              outline: 0;
              border-color: var(--border-brand);
              box-shadow: 0px 0px 0px 1px var(--bg-brand), 0px 0px 0px 4px var(--focus);
            }
          }

          &.cancel {
            color: var(--text);
            background: var(--bg-accent-red);
            opacity: 1;
            pointer-events: all;

            // &:focus-within {
            //   outline: 0;
            //   border-color: var(--bg-accent-red);
            //   box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-accent-red);
            // }

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
            pointer-events: none;
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
          transition: all 0.2s ease-in-out;
          
          &:focus-within {
            outline: 0;
            border-color: var(--border-brand);
            box-shadow: inset 0px 0px 0px 1px var(--bg), 0px 0px 0px 3px var(--focus);
          }
        }
      }

    }
  }

  .disclaimer {
    display: none;
    color: var(--text-muted);
    font-size: var(--s-1);
    padding: var(--s-6) 0;
  }

  .button-dropdown {
      position: absolute;
      z-index: var(--zindex-overlay);
      // top: 170px;
      // top: 215px;
      top: calc(100% + var(--s-1));
      left: 0;
      // width: 100%;
      width: calc(var(--s0) * 24);
      padding: 0;
      font-size: var(--s0);

      .button-dropdown-inner {
        display: flex;
        flex-direction: column;
        gap: var(--s-1);
        width: 100%;
        background: var(--bg);
        border-radius: var(--s-3);
        padding: var(--s1);
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.10), 0px 24px 48px 0px rgba(18, 18, 23, 0.03), 0px 10px 18px 0px rgba(18, 18, 23, 0.03), 0px 5px 8px 0px rgba(18, 18, 23, 0.04), 0px 2px 4px 0px rgba(18, 18, 23, 0.04);
        
      }

    }

  .payment-text {
    position: relative;

    .payment-text-icon {
      position: absolute;
      left: 50%;
      top: calc(var(--s4) * -1);
      transform: translateX(-50%);
    }

    .payment-text-desc {
      font-size: var(--s1);
      color: var(--text);
      font-weight: 600;
    }

    .payment-text-button-holder {
      display: inline;
      position: relative;
    }

    .payment-text-button {
      background: transparent;
      border: 0;
      color: var(--text-brand);
      cursor: pointer;
      padding: var(--s-6);
      transition: all 0.2s ease-in-out;
      border-radius: 0;
      box-shadow: 0 2px 0 var(--bg-brand), inset 0px 0px 0px 0px var(--bg-brand), inset 0px 0px 0px 0 var(--bg), 0px 0px 0px 0 var(--focus);

      &:hover {
        background: var(--bg);
      }

      &:focus-within {
        outline: 0;
        background: var(--bg);
        // box-shadow: 0 0 0 var(--bg-brand), inset 0px 0px 0px 1px var(--bg-brand), inset 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--focus);
      }
    }

    // .payment-text-button {
    //   background: var(--bg-tertiary);
    //   border: 1px solid var(--border-tertiary);
    //   color: var(--text-brand);
    //   cursor: pointer;
    //   padding: var(--s-6) var(--s0);
    //   transition: all 0.2s ease-in-out;
    //   border-radius: var(--s3);
    //   box-shadow: inset 0px 0px 0px 0px var(--bg-brand), inset 0px 0px 0px 0 var(--bg), 0px 0px 0px 0 var(--focus);

    //   &:hover {
    //     background: var(--bg);
    //   }

    //   &:focus-within {
    //     outline: 0;
    //     background: var(--bg);
    //     box-shadow: inset 0px 0px 0px 1px var(--bg-brand), inset 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--focus);
    //   }
    // }

  }

  .noty {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: var(--s0) var(--s0);
    background: var(--bg-brand);
    color: var(--text-onbrand);
    font-size: var(--s0);
    font-weight: 500;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    .noty-content {
      width: 100%;
      max-width: 896px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .noty-button {
      border-radius: var(--s-3);
      border: 0;
      background: transparent;
      display: flex;
      margin: 0;
      padding: 0;
      width: var(--s2);
      height: var(--s2);
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      svg {
        display: flex;
      }


      &:focus-within {
        outline: 0;
        background: transparent;
        box-shadow: 0px 0px 0px 1px var(--bg-always-light);
      }

    }

  }

  .modal-backdrop {
    position: fixed;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    // backdrop-filter: blur(10px);
  }

  .modal {
    position: fixed;
    z-index: 10000;
    width: 100%;
    left: 0;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--overlay);
    padding: 0 var(--s1);
    backdrop-filter: blur(5px);

    .modal-box {
      position: relative;
      z-index: 1000;
      background: var(--bg);
      max-width: 600px;
      border-radius: var(--s0);
      padding: var(--s2) var(--s3);
    }

    .modal-title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0 var(--s0) 0;
      font-size: var(--s0);
      font-weight: 500;
    }

    .modal-body {
      color: var(--text-muted);
      font-size: var(--s-12);
      display: flex;
      flex-direction: column;
      gap: var(--s0);
      text-align: center;
      // padding: 0 var(--s0) var(--s1);

      span {
        color: var(--text);
        font-weight: 500;
      }
    }

    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--s2) 0 0;
      gap: var(--s-3);

      .modal-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--s-3);
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        // height: var(--48px);
        border-radius: var(--48px);
        padding: var(--s-2) var(--s2);
        border: 0;
        color: var(--text-muted);
        background: var(--bg);
        // border: 1px solid var(--border-tertiary);
        font-weight: 500;
        font-size: var(--s-12);
        cursor: pointer;
        transition: var(--transition);

        &:focus-within {
          outline: 0;
          border-color: var(--border-brand);
          box-shadow: inset 0px 0px 0px 1px var(--bg), 0 0 0 1px var(--border-brand), 0px 0px 0px 4px var(--focus);
        }


        &.confirm {
          // border: 1px solid var(--border-brand);
          background: var(--bg-brand);
          color: var(--text-onbrand);

          &:focus-within {
            outline: 0;
            border-color: var(--border-brand);
            box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
          }
        }
      }

    }

  }


</style>