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
  let pauseLength = 1
  let exitModal = false

  const donationCancel = () => {
    showPaymentDropdown = false
    showModal = true
  }

  const paymentExit = () => {
    exitModal = true
  }

  const selectPauseLength = (number: number) => {
    pauseLength = number
  }

  const donationConfirmPause = () => {
    showModal = false
    showPauseModal = false
    notyText = `Your monthly recurring donation has been paused`
    showNoty = true
    donationPaused = true

    setTimeout(() => {
      showNoty = false
    }, 5000);
  }

  let bigDonation = false

  const donationCancelConfirm = () => {
    bigDonation = true
    showModal = false
    paymentSet = false
    donationPaused = false
    notyText = "Your monthly recurring donation has been cancelled"
    showNoty = true
    currentActiveAmount = "$60"
    customDonationAmount = 60
    donationNum = 1

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

  let showAvatarDropdown = false

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

  let showPauseModal = false
  let donationPaused = false

  let pauseOption = [
    {id: 1, length: 1, name: "Pause for 1 month", sub: "until September 1, 2024", checked: true},
    {id: 2, length: 2, name: "Pause for 3 months", sub: "until November 1, 2024", checked: false},
    {id: 3, length: 6, name: "Pause for 6 months", sub: "until February 1, 2025", checked: false},
  ]

  let selectedPauseIndex = pauseOption.findIndex(option => option.checked);

  const donationResume = () => {
    donationPaused = false
    notyText = `Your monthly donation of ${currentActiveAmount} has been reactivated`
    showNoty = true

    setTimeout(() => {
      showNoty = false
    }, 5000);
  }

  const donationPause = () => {
    showPauseModal = true
    showPaymentDropdown = false
  }

  const updateDonationAmount = () => {
    paymentChanged = true;
    showPaymentDropdown = false;
    currentActiveAmount = "$" + customDonationAmountPicker;
    notyText = `Your monthly donation has been updated to ${currentActiveAmount}`
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
    showPauseModal = false
    exitModal = false
    customDonationAmountPicker = Number(currentActiveAmount.replace('$', ''))
    // console.log('close modal')
  }

  let showPaytypeDropdown = false

  let paymentOption = [ 
    {id: 1, name: "PayPal", checked: false},
    {id: 2, name: "Card", checked: true},
    // {id: 3, name: "U.S. Bank Account", checked: false},
    // {id: 4, name: "Crypto", checked: false},
  ]

  let selectedPaymentIndex = paymentOption.findIndex(option => option.checked);
  let selectedPaymentOption = paymentOption[selectedPaymentIndex].name;
  let visiblePaymentOption = "PayPal"

  $: if (selectedPaymentIndex == 1) {
      selectedPaymentOption = "Card"
    } else if (selectedPaymentIndex == 2) {
      selectedPaymentOption = "U.S. Bank Account"
    } else if (selectedPaymentIndex == 3) {
      selectedPaymentOption = "Crypto"
    } else {
      selectedPaymentOption = "PayPal"
    }

  const updatePaymentMethod = () => {
    paymentOption = paymentOption.map((option, index) => {
      option.checked = index === selectedPaymentIndex;
      return option;
    })

    visiblePaymentOption = selectedPaymentOption
    showPaytypeDropdown = false
    showNoty = true
    notyText = `Your payment method has been updated to ${selectedPaymentOption}`
    setTimeout(() => {
      showNoty = false
    }, 5000);
  }

  let showSettingsDropdown = false

  let selectedReason = 0

  $: console.log(selectedReason)

  let cancelReason = [
    {detail: "Please select a cancellation reason"},
    {detail: "My financial situation has changed"},
    {detail: "I decided to give to other charities"},
    {detail: "I'm still giving to GiveDirectly but through other channels"},
    {detail: "I didn't mean to start a monthly donation"},
    {detail: "I had a negative experience with GiveDirectly"},
    {detail: "My donation is not tax-effective in my country"},
    {detail: "Other"}
  ]
  let donationNum = 1


  const addtoDonation = () => {
    if (donationNum < 6) {
      donationNum += 1;
    }
  }

  const subtractfromDonation = () => {
    if (donationNum > 1) {
      donationNum -= 1;
    }
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

  let showStory = false
  let ready = false
  onMount(() => {
    ready = true
  })

  let showDm = false

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
--background="var(--bg)" 
--gap="var(--24px)" 
--justify-content="flex-start"
>
{#if !bigDonation}
<div class="toggle-holder">
  <button class="toggle" on:click={() => subtractfromDonation()}>Remove</button>
  <button class="toggle" on:click={() => addtoDonation()}>Add</button>
</div>
{/if}
{#if showModal}
<div class="modal" in:fade={{duration:150}} out:fade={{duration:150}}>
    <div class="modal-box" in:scale={{start:0.95, duration:250, delay: 150, easing: backOut}} out:scale={{start: 0.95, duration:250, easing: backOut}}>
      <div class="modal-title">
        Cancel your monthly donation
      </div>
      <div class="modal-body">
        <p>Thank you for giving monthly to people in poverty. Please confirm your cancellation of <span class="selected-option">{currentActiveAmount} a month to Poverty relief - Africa</span></p>
        <div class="reason-select-holder">
          <select bind:value={selectedReason}>
            {#each cancelReason as reason, i}
            <option value={i}>
              {reason.detail}
            </option>
            {/each}
          </select>

          <!-- {#if selectedReason == 7} -->
          <div class="reason-input-holder">
            <label for="reason">We'd appreciate your feedback about why you're cancelling</label>
            <textarea id="reason"></textarea>
          </div>
          <!-- {/if} -->
        </div>
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
{#if showPauseModal}
<div class="modal" in:fade={{duration:150}} out:fade={{duration:150}}>
  <div class="modal-box" in:scale={{start:0.95, duration:250, delay: 150, easing: backOut}} out:scale={{start: 0.95, duration:250, easing: backOut}}>
    <div class="modal-title">
      Pause your monthly donation
    </div>
    <div class="modal-body">
      <!-- <p>You can pause your donation instead of cancelling</p> -->
      <div class="pause-options">
        {#each pauseOption as option, index (index)}
        <div class="payment-radio-holder-item">
          <label for={index}>
            <input type="radio" id={index} bind:group={selectedPauseIndex} name="payment" value={index} checked={option.checked} on:change={() => selectedPauseIndex = index}>
            <span class="payment-radio-label-holder">
              <span>{option.name}</span>
              <span>{option.sub}</span>
            </span>
          </label>
        </div>
        {/each}
      </div>
    </div>
    <div class="modal-footer">
      <div class="modal-buttons">
        <button class="back" on:click={()=> closeModal()}>Go back</button>
        <button class="confirm" on:click={()=> donationConfirmPause()}>Confirm pause</button>
      </div>
    </div>
  </div>
  <div class="modal-backdrop" on:click={()=> closeModal()}></div>
</div>
{/if}

{#if exitModal}
<div class="modal" in:fade={{duration:150}} out:fade={{duration:150}}>
    <div class="modal-box" in:scale={{start:0.95, duration:250, delay: 150, easing: backOut}} out:scale={{start: 0.95, duration:250, easing: backOut}}>
      <div class="modal-title">
        Update your details
      </div>
      <div class="modal-body">
        <p>You will be redirected to PayPal's website to update your PayPal payment details.</p>
      </div>
      <div class="modal-footer large">
        <div class="modal-buttons">
          <button class="back" on:click={()=> closeModal()}>Go back</button>
          <button class="confirm" on:click={()=> closeModal()}>Open PayPal</button>
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
    <div class="avatar-button-holder">
      <button class="avatar-button" on:click={()=> {showAvatarDropdown = !showAvatarDropdown}}>
        <span class="avatar">
          W
        </span>
        <span class="name">Walid H</span>
        <svg width="16" height="16" fill="var(--bg-brand)" focusable="false" viewBox="0 0 24 24"><path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z"></path></svg>
        </button>

        {#if showAvatarDropdown}
        <div class="settings-dropdown" in:fly={{y:-10,duration:250}} out:fly={{y:-5,duration:250}}>
          <div class="avatar-info">
            <div class="name">Walid H.</div>
            <div class="email">walidh@email.com</div>
          </div>
          <button class="settings-dropdown-button" on:click={()=> {showAvatarDropdown = false}}>
              <span>Sign out</span> 
          </button>
        </div>
        {/if}

    </div>
  </div>
  
  <div class="main">

    <div class="title">
      <h1>Donations</h1>
    </div>

    <div class="monthly">
      <div class="story">

      </div>
      <div class="donate-holder">
      {#if paymentSet}
        <div class="donate">
          <div class="settings-holder" in:fade={{duration:250}}>
            <button class="settings-button" on:click={() => {showSettingsDropdown = !showSettingsDropdown;showPaymentDropdown = false; showPaytypeDropdown = false}}>
              <span>Manage</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.61663 8.79194C5.65137 8.82837 5.69314 8.85738 5.73941 8.87719C5.78568 8.89701 5.8355 8.90723 5.88584 8.90723C5.93617 8.90723 5.98599 8.89701 6.03226 8.87719C6.07853 8.85738 6.1203 8.82837 6.15504 8.79194L10.0006 4.94637L9.4622 4.40796L5.88584 7.98433L2.30902 4.40796L1.77061 4.94637L5.61663 8.79194Z" fill="var(--icon)"/>
              </svg>
            </button>
            {#if showSettingsDropdown}
            <div class="settings-dropdown" in:fly={{y:-10,duration:250}} out:fly={{y:-5,duration:250}}>
              {#if !donationPaused}
              <button class="settings-dropdown-button" on:click={() => { showSettingsDropdown = false; donationPause()}}>
                Pause donation
              </button>
              {:else}
              <button class="settings-dropdown-button" on:click={() => { showSettingsDropdown = false; donationPause()}}>
                Extend pause
              </button>
              <button class="settings-dropdown-button" on:click={() => { showSettingsDropdown = false; donationResume()}}>
                Reactivate donation
              </button>
              {/if}
              <button class="settings-dropdown-button cancel" on:click={() => {showSettingsDropdown = false; donationCancel()}}>
                Cancel donation
              </button>
            </div>
            {/if}
          </div>
          {#if !donationPaused}
            <div class="payment-text" in:fade={{duration:250}}>
              <div class="payment-text-desc">
                You are donating 
              </div>
              <div class="payment-text-desc">
                <div class="payment-text-button-holder">

                  {#if showPaymentDropdown}
                    <div class="button-dropdown" in:fly={{y:-10,duration:250}} out:fly={{y:-5,duration:250}}>
                      <form class="button-dropdown-inner">
                        <div class="options">
                          <div class="custom-donation">
                            <div class="input-holder" in:fade={{duration:150}}>
                              <input type="number" placeholder="" bind:this={customDonationInputPicker} bind:value={customDonationAmountPicker} />
                            </div>
                          </div>
                        </div>
                        <div class="confirm">
                          {#if customDonationAmountPicker >= 1 || customDonationAmountPicker == null}
                          <button class:active={customDonationButtonPickerActive} on:click={() => updateDonationAmount()}>Update amount</button>
                          {#if customDonationAmountPicker !== null}
                          <button class="pause" on:click>
                            ${customDonationAmountPicker} is 2 months' income for someone in poverty
                          </button>
                          {/if}
                          {:else}
                          
                          <button class="cancel" on:click={()=> donationCancel()}>
                            Cancel donation
                          </button>
                          <button class="pause" on:click={()=> donationPause()}>
                            or pause your donations for 3 months
                          </button>
                          {/if}
                        </div>
                        <div class="disclaimer">
                          Your updated payment will be on September 23
                        </div>
                      </form>
                    </div>
                  {/if}
                  {#key currentActiveAmount}
                  <button class="payment-text-button" in:fade={{duration:250}} on:click={() => {showPaymentDropdown = !showPaymentDropdown; showPaytypeDropdown = false; showSettingsDropdown = false; openDropdownPicker()}}>{currentActiveAmount} a month</button>
                  {/key}
                </div>
                <span>to Poverty relief - Africa</span>
              </div>
            </div>
            <div class="payment-text">
              <div class="payment-text-desc equal">
                <span>Your next donation is Feb 5, via </span>
                <div class="payment-text-button-holder">
                  {#key visiblePaymentOption}
                  <button class="payment-text-button" in:fade={{duration:250}} on:click={() => {showPaymentDropdown = false; showSettingsDropdown = false;paymentExit();}}>{visiblePaymentOption}</button>
                  {/key}
                  <!-- {#if visiblePaymentOption === "Card"}
                    ending in 8134
                  {/if} -->
                  
                </div>
              </div>
            </div>

          {:else}
          <div class="payment-text" in:fade={{duration: 250}}>
            <div class="payment-text-desc balanced">
              Your monthly donation of {currentActiveAmount} is currently paused until September 23, 2024
            </div>
            <div class="payment-text-reactivate">
              <button class="payment-text-reactivate-button paused" on:click={() => { showSettingsDropdown = false; donationPause()}}>
                Extend pause
              </button>
              <button class="payment-text-reactivate-button" on:click={() => { showSettingsDropdown = false; donationResume()}}>
                Reactivate donation
              </button>
            </div>
          </div>
          {/if}
      </div>
      {/if}

      {#each Array.from({ length: donationNum }) as _, index}
      {#key bigDonation}
      <div class="donate" class:big={bigDonation} in:fade={{duration:250}}>
        <div class="settings-holder" in:fade={{duration:250}}>
          <button class="settings-button">
            <span>Manage</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.61663 8.79194C5.65137 8.82837 5.69314 8.85738 5.73941 8.87719C5.78568 8.89701 5.8355 8.90723 5.88584 8.90723C5.93617 8.90723 5.98599 8.89701 6.03226 8.87719C6.07853 8.85738 6.1203 8.82837 6.15504 8.79194L10.0006 4.94637L9.4622 4.40796L5.88584 7.98433L2.30902 4.40796L1.77061 4.94637L5.61663 8.79194Z" fill="var(--icon)"/>
            </svg>
          </button>
        </div>
        <div class="payment-text" in:fade={{duration:250}}>

          {#if bigDonation}
          <div class="payment-text-icon">
            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.75 4C20.1688 4 17.9088 5.11 16.5 6.98625C15.0912 5.11 12.8313 4 10.25 4C8.19528 4.00232 6.22539 4.81958 4.77248 6.27248C3.31958 7.72539 2.50232 9.69528 2.5 11.75C2.5 20.5 15.4738 27.5825 16.0262 27.875C16.1719 27.9533 16.3346 27.9943 16.5 27.9943C16.6654 27.9943 16.8281 27.9533 16.9737 27.875C17.5262 27.5825 30.5 20.5 30.5 11.75C30.4977 9.69528 29.6804 7.72539 28.2275 6.27248C26.7746 4.81958 24.8047 4.00232 22.75 4ZM16.5 25.85C14.2175 24.52 4.5 18.4613 4.5 11.75C4.50198 10.2256 5.10842 8.76423 6.18633 7.68633C7.26423 6.60842 8.72561 6.00198 10.25 6C12.6812 6 14.7225 7.295 15.575 9.375C15.6503 9.55841 15.7785 9.71528 15.9432 9.82569C16.1079 9.93609 16.3017 9.99503 16.5 9.99503C16.6983 9.99503 16.8921 9.93609 17.0568 9.82569C17.2215 9.71528 17.3497 9.55841 17.425 9.375C18.2775 7.29125 20.3188 6 22.75 6C24.2744 6.00198 25.7358 6.60842 26.8137 7.68633C27.8916 8.76423 28.498 10.2256 28.5 11.75C28.5 18.4513 18.78 24.5188 16.5 25.85Z" fill="var(--bg-accent-red)"/>
            </svg>
          </div>
          {/if}

          <div class="payment-text-desc">
            You are donating 
          </div>
          <div class="payment-text-desc">
            <div class="payment-text-button-holder">
              <button class="payment-text-button" in:fade={{duration:250}}>$100 a month</button>
            </div>
            <span>to Emergency relief</span>
          </div>
        </div>
        <div class="payment-text">
          <div class="payment-text-desc equal">
            <span>Your next donation is Feb 10, via </span>
            <div class="payment-text-button-holder">
              <button class="payment-text-button" in:fade={{duration:250}}>Card</button>
            </div>
          </div>
        </div>
      </div>
      {/key}
      {/each}
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

      &:focus-visible {
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
      width: var(--s2);
      height: var(--s2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: var(--s-12);
      overflow: hidden;
      color: var(--text-muted);
      background: var(--bg);

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
      padding: var(--s-12) var(--s2);
      cursor: pointer;
      color: var(--text-muted);
      font-size: var(--s-12);

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
    padding-bottom: var(--s6);

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
      max-height: calc(var(--s0) * 25);
    }

    .donate-holder {
      display: flex;
      flex-direction: column;
      gap: var(--s0);
      // padding-bottom: var(--s6);
    }

    .donate {
      // width: 100%;
      border-radius: var(--s0);
      background: var(--bg-secondary);
      padding: var(--s3) var(--s2);
      display: flex;
      flex-direction: column;
      gap: var(--s1);
      align-items: center;
      justify-content: center;
      text-align: center;
      // height: 368px;
      position: relative;
      
      &.big {
        padding: var(--s5) var(--s2);
        flex-basis: 0;
        flex-grow: 999;
        min-inline-size: 60%;
        .payment-text-desc {
          font-size: var(--s1) !important;
        }
      }

      .title {
        font-size: var(--s1);
        font-weight: 600;
        line-height: 140%;
        color: var(--text);

        &.balanced {
          text-wrap: balance;
        }
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

            &:focus-visible {
              outline: 0;
              border-color: var(--border-brand);
              box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
            }
          }

          &:focus-visible {
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
          
          border-radius: var(--s3);
          padding: var(--s-2) var(--s2);
          background: var(--bg-brand);
          color: var(--text-onbrand);
          font-weight: 600;
          border: 0;
          cursor: pointer;
          pointer-events: none;
          opacity: 0.5;
          transition: var(--transition);
          font-size: var(--s-12);
          // font-size: var(--14px);

          &.active {
            opacity: 1;
            pointer-events: all;
          }

          &.pause {
            opacity: 1;
            pointer-events: all;
            background: transparent;
            color: var(--text);
            box-shadow: none;
            font-size: var(--s-1);
            height: var(--32px);
            margin-top: var(--s-3);
            padding: 0;

            &:focus-visible {
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

            // &:focus-visible {
            //   outline: 0;
            //   border-color: var(--bg-accent-red);
            //   box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-accent-red);
            // }

          }

          &.custom {
            background: var(--bg-accent-purple);
            color: var(--text);
          }

          &:focus-visible {
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
          // padding: 0 12px;
          padding: 0 var(--s2);
        }

        .input-holder {
          width: 100%;
          position: relative;

          &:before {
            content: "$";
            position: absolute;
            left: 0;
            top: 11px;
            font-size: var(--s-12);
            z-index: 100;
            // height: var(--48px);
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
          // height: var(--48px);
          border-radius: var(--48px);
          background: var(--bg-dropdown);
          padding: var(--s-2) var(--s0) var(--s-2) var(--s2);
          border: 1px solid var(--border-tertiary);
          font-size: var(--s-12);
          position: relative;
          z-index: 10;
          color: var(--text);
          transition: all 0.2s ease-in-out;
          
          &:focus-visible {
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

      &.payment {
        width: calc(var(--s0) * 20);
        left: auto;
        right: 0;
      }

      .button-dropdown-inner {
        display: flex;
        flex-direction: column;
        gap: var(--s-1);
        width: 100%;
        background: var(--bg-dropdown);
        border-radius: var(--s-3);
        padding: var(--s1);
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.10), 0px 24px 48px 0px rgba(18, 18, 23, 0.03), 0px 10px 18px 0px rgba(18, 18, 23, 0.03), 0px 5px 8px 0px rgba(18, 18, 23, 0.04), 0px 2px 4px 0px rgba(18, 18, 23, 0.04);

        &.radio-list {
          gap: 0;
        }
        
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
      font-size: var(--s0);
      color: var(--text);
      font-weight: 600;

      &.balanced {
        text-wrap: balance;
        padding: 0 var(--s2);
      }

      &.equal {
        text-wrap: balance;
        // padding: 0 var(--s2);
      }
    }

    .payment-text-reactivate {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--s1) 0 0;
      gap: var(--s0)
    }
    
    .payment-text-reactivate-button {
      // height: var(--s3);
      border-radius: var(--s3);
      padding: var(--s-2) var(--s1);
      background: var(--bg-brand);
      color: var(--text-onbrand);
      font-weight: 600;
      border: 0;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      font-size: var(--s-12);

      &.paused {
        background: var(--bg-secondary);
        color: var(--text-muted);
        transition: all 0.2s ease-in-out;
        box-shadow: inset 0 0 0 0 var(--bg), 0px 0px 0px 1px var(--border-tertiary), 0px 0px 0 0 var(--focus);

        &:focus-visible {
          outline: 0;
          border-color: var(--border-brand);
          box-shadow: inset 0 0 0 1px var(--bg), 0px 0px 0px 1px var(--bg-brand), 0px 0px 0px 4px var(--focus);
        }
      }

      &:focus-visible {
        outline: 0;
        border-color: var(--border-brand);
        box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
      }
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

      &:focus-visible {
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

    //   &:focus-visible {
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


      &:focus-visible {
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
      max-width: calc(var(--s0) * 34);
      width: 100%;
      border-radius: var(--s0);
      padding: var(--s2) var(--s3);
    }

    .modal-title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0 var(--s-12) 0;
      font-size: var(--s0);
      font-weight: 500;
      color: var(--text);
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
      padding: var(--s0) 0 0;
      gap: var(--s-3);

      &.large {
        padding: var(--s2) 0 0;
      }

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

        &:focus-visible {
          outline: 0;
          border-color: var(--border-brand);
          box-shadow: inset 0px 0px 0px 1px var(--bg), 0 0 0 1px var(--border-brand), 0px 0px 0px 4px var(--focus);
        }


        &.confirm {
          // border: 1px solid var(--border-brand);
          background: var(--bg-brand);
          color: var(--text-onbrand);

          &:focus-visible {
            outline: 0;
            border-color: var(--border-brand);
            box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 3px var(--bg-brand);
          }
        }
      }

    }

  }

  .payment-radio-holder {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .payment-radio-label-holder {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      &:nth-child(2) {
        font-size: var(--s-12);
        color: var(--text-muted);
        font-weight: 400;
      }
    }
  }

  .pause-options {
    margin-top: var(--s-12);
  }

  .payment-radio-holder-item {

    &:last-child {
      margin-bottom: var(--s0);
    }
    
    label {
      display: flex;
      align-items: center;
      gap: var(--s0);
      padding: var(--s-3) var(--s0);
      cursor: pointer;
      border-radius: var(--s-3);
      transition: all 0.2s ease-in-out;
      font-size: var(--s-12);
      
      &:hover {
        background: var(--bg-secondary);
      }
    }

    input {
      margin: 0;
      padding: 0;
      display: flex;
      line-height: 1;
    }

  }

  .settings-holder {
    position: absolute;
    right: var(--s0);
    top: var(--s0);


    .settings-button {
      font-size: var(--s-1);
      border: 0;
      background: transparent;
      border-radius: var(--s3);
      color: var(--text);
      font-weight: 600;
      box-shadow: 0 0 0 1px var(--border-tertiary);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--s-6);
      padding: var(--s-6) var(--s-1);
      cursor: pointer;
      transition: all 0.2s ease-in-out;

    
      &:focus-visible {
        outline: 0;
        box-shadow: 0px 0px 0px 1px var(--bg), 0px 0px 0px 2px var(--border-brand), 0px 0px 0px 5px var(--focus);
      }

    }

  }

  .settings-dropdown {
      position: absolute;
      z-index: var(--zindex-overlay);
      top: calc(100% + var(--s-3));
      right: 0;
      width: calc(var(--s0)* 16);
      font-size: var(--s0);
      background: var(--bg-dropdown);
      border-radius: var(--s-3);
      padding: var(--s-5) var(--s-6);
      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 24px 48px 0px rgba(18, 18, 23, 0.03), 0px 10px 18px 0px rgba(18, 18, 23, 0.03), 0px 5px 8px 0px rgba(18, 18, 23, 0.04), 0px 2px 4px 0px rgba(18, 18, 23, 0.04);
    }

    .settings-dropdown-button {
      width: 100%;
      text-align: left;
      padding: var(--s-3) var(--s-1);
      font-size: var(--s-12);
      border: 0;
      background: transparent;
      border-radius: var(--s-3);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      color: var(--text);

      &.cancel {
        color: var(--red-600);
      }

      &:hover {
        background: var(--bg-secondary);
      }
    }

  .selected-option {
    // padding: var(--s-12) 0 var(--s1);
  }

  .avatar-button-holder {
    position: relative;


    .settings-dropdown {
      position: absolute;
      z-index: var(--zindex-overlay);
      top: calc(100% + var(--s-4));
      right: 0;
      width: calc(var(--s0)* 16);
      padding: 0;
      font-size: var(--s0);
      background: var(--bg-dropdown);
      border-radius: var(--s-3);
      padding: var(--s-5) var(--s-6);
      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 24px 48px 0px rgba(18, 18, 23, 0.03), 0px 10px 18px 0px rgba(18, 18, 23, 0.03), 0px 5px 8px 0px rgba(18, 18, 23, 0.04), 0px 2px 4px 0px rgba(18, 18, 23, 0.04);
    }

    .settings-dropdown-button {
      width: 100%;
      text-align: left;
      padding: var(--s-3) var(--s-1);
      font-size: var(--s-12);
      border: 0;
      background: transparent;
      border-radius: var(--s-3);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      justify-content: flex-start;
      color: var(--text);

      &.cancel {
        color: var(--red-600);
      }

      &:hover {
        background: var(--bg-secondary);
      }
    }

  }

  .avatar-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: var(--s-4) var(--s-12) var(--s-1);
    border-bottom: 1px solid var(--border-tertiary);
    margin-bottom: var(--s-4);

    .name {
      font-weight: 500;
      font-size: var(--s-12);
      color: var(--text);
    }

    .email {
      font-size: var(--s-12);
      color: var(--text-muted);
    }
  }

  .toggle-holder {
    position: fixed;
    z-index: 10000;
    bottom: var(--s3);
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    display: flex;
    gap: var(--s0);

    .toggle {
      background: repeating-linear-gradient(
        45deg,
        #606dbc,
        #606dbc 10px,
        #465298 10px,
        #465298 20px
      );
      border: 0;
      color: var(--text-onbrand);
      border-radius: var(--s-2);
      font-weight: 500;
      padding: var(--s-2) var(--s1);
      cursor: pointer;
    }
  }

  

  .reason-select-holder {
    width: 100%;
    padding: var(--s0) 0;

    select {
      width: 100%;
      border: 1px solid var(--bg-tertiary);
      border-radius: var(--s-1);
      padding: var(--s-1) var(--s0);
      transition: all 0.2s ease-in-out;
      background-color: var(--bg);
      background-image: url("data:image/svg+xml,%3Csvg width='9' height='5' viewBox='0 0 9 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.61663 4.79194C4.65137 4.82837 4.69314 4.85738 4.73941 4.87719C4.78568 4.89701 4.8355 4.90723 4.88584 4.90723C4.93617 4.90723 4.98599 4.89701 5.03226 4.87719C5.07853 4.85738 5.1203 4.82837 5.15504 4.79194L9.00061 0.946368L8.4622 0.407961L4.88584 3.98433L1.30902 0.407961L0.770611 0.946368L4.61663 4.79194Z' fill='%23757575'/%3E%3C/svg%3E%0A");
      background-position: calc(100% - 15px) 17px;
      background-size: 12px 12px;
      background-repeat: no-repeat;
      appearance: none;

      &:focus-visible {
        outline: 0;
        box-shadow: 0px 0px 0px 1px var(--bg), 0px 0px 0px 2px var(--border-brand), 0px 0px 0px 5px var(--focus);
      }
    }
  }

  .reason-input-holder {
    padding: var(--s-6) 0 0;

    label {
      font-size: var(--s-12);
      color: var(--text-muted);
      width: 100%;
      display: block;
      text-align: left;
      padding: var(--s-1) 0 var(--s-3);
    }
    
    textarea {
      width: 100%;
      min-height: var(--s5);
      border: 0;
      box-shadow: 0 0 0 1px var(--border-tertiary);
      border-radius: var(--s-3);
      resize: vertical;
      padding: var(--s0);
      color: var(--text);
      font-size: var(--s-12);
      transition: all 0.2s ease-in-out;

      &:focus-visible {
        outline: 0;
        box-shadow: 0px 0px 0px 1px var(--bg), 0px 0px 0px 2px var(--border-brand), 0px 0px 0px 5px var(--focus);
      }

    }
  }


</style>