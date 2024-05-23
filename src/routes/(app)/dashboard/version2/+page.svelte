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

  const donationCancelConfirm = () => {
    showModal = false
    paymentSet = false
    donationPaused = false
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

  // $: console.log(selectedReason)

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

  let showReceiptDropdown = false

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

  let table = [
    {date: "Jan 5, 2024	", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
    {date: "Dec 5, 2023", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
    {date: "Nov 5, 2023", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
    {date: "Oct 5, 2023", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
    {date: "Sep 5, 2023", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
    {date: "Aug 5, 2023", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
    {date: "Jul 5, 2023", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
    {date: "Jun 5, 2023", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
    {date: "May 5, 2023", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
    {date: "Apr 5, 2023", program: "Poverty relief - Africa", method: "PayPal", amount: "$60.00"},
  ]

  function calculateTotalAmount() {
    let totalAmount = 0;
    table.forEach((item) => {
      const amount = parseFloat(item.amount.replace('$', ''));
      totalAmount += amount * 3;
    });
    return totalAmount;
  }

  let totalAmount = calculateTotalAmount();
  // console.log('Total Amount:', totalAmount);

</script>

<svelte:head>
<title>Impact Dashboard</title>

{#if showDm}
<style>
  :root {
    --bg: #002921;
    --bg-hover: #002921;
    --bg-accent-green: hsla(98, 51%, 64%, 1);
    --bg-accent-purple: hsla(248, 76%, 77%, 1);
    --bg-accent-red: hsla(16, 71%, 64%, 1);
    --bg-accent-turquoise: hsla(168, 51%, 72%, 1);
    --bg-accent-yellow: hsla(66, 76%, 71%, 1);
    --bg-always-light: hsla(0, 0%, 0%, 1);
    --bg-brand: #fff;
    --bg-brand-hover: #fff;
    --bg-secondary: #18332C;
    --bg-tertiary: #21433A;
    --bg-dropdown: #223f37;
    --bg-tertiary-hover: #21433A;
    --border: hsla(0, 100%, 100%, 0.1);
    --border-always-light: hsla(255, 100%, 100%, 0.1);
    --border-brand: #fff;
    --border-secondary: #18332C;
    --border-tertiary: hsla(255, 100%, 100%, 0.1);
    --border-active: hsla(255, 100%, 100%, 0.1);
    --focus: hsla(255, 100%, 100%, 0.1);
    --icon: hsla(0, 0%, 100%, 1);
    --icon-active: hsla(0, 0%, 100%, 1);
    --icon-always-light: hsla(0, 0%, 100%, 1);
    --icon-brand: hsla(0, 0%, 100%, 1);
    --icon-muted: hsla(0, 0%, 100%, 0.3);
    --icon-onbrand: #095845;
    --overlay: hsla(0, 0%, 0%, 0.6);
    --text: hsla(0, 0%, 100%, 1);
    --text-always-dark: hsla(0, 0%, 0%, 0.6);
    --text-always-light: hsla(0, 0%, 100%, 1);
    --text-brand: #fff;
    --text-muted: hsla(0, 0%, 100%, 0.7);
    --text-onbrand: #095845;
  }
</style>
{/if}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet">
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
  --overflow="scroll"
>
<!-- <button class="dm-toggle" on:click={() => showDm = !showDm}>Dark mode 🚧</button> -->
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
        <p>You will be redirected to PayPal's website to update your payment details.</p>
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
        <svg width="16" height="16" fill="var(--icon)" focusable="false" viewBox="0 0 24 24"><path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z"></path></svg>
        </button>

        {#if showAvatarDropdown}
        <div class="settings-dropdown" in:fly={{y:-10,duration:250}} out:fly={{y:-5,duration:250}}>
          <div class="avatar-info">
            <div class="name">Walid H.</div>
            <div class="email">walidh@email.com</div>
          </div>
          <button class="settings-dropdown-button" on:click={()=> {showAvatarDropdown = false}}>
            <span>Settings</span> 
        </button>
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
      <a class="story" href="https://live.givedirectly.org/" target="_blank">
        <span class="note">View recent stories from recipients</span>
        <span class="person">Leonille, Rwanda</span>

        <span class="icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10.6666V19.333C22 19.5099 21.9298 19.6794 21.8047 19.8044C21.6797 19.9295 21.5102 19.9997 21.3334 19.9997C21.1565 19.9997 20.987 19.9295 20.862 19.8044C20.7369 19.6794 20.6667 19.5099 20.6667 19.333V12.2758L11.1387 21.8046C11.0136 21.9297 10.8439 22 10.667 22C10.4901 22 10.3205 21.9297 10.1954 21.8046C10.0703 21.6795 10 21.5099 10 21.333C10 21.1561 10.0703 20.9864 10.1954 20.8613L19.7242 11.3333H12.667C12.4901 11.3333 12.3206 11.2631 12.1956 11.138C12.0705 11.013 12.0003 10.8435 12.0003 10.6666C12.0003 10.4898 12.0705 10.3203 12.1956 10.1953C12.3206 10.0702 12.4901 10 12.667 10H21.3334C21.5102 10 21.6797 10.0702 21.8047 10.1953C21.9298 10.3203 22 10.4898 22 10.6666Z" fill="#095845"/>
            </svg>
            
        </span>

      </a>
      <div class="donate">
      
        {#if paymentSet}

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

        {:else}

        <div class="title balanced" in:fade={{duration:250}}>
          Join a community of 7,900+ monthly donors who help us plan future programs.
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
              Back
            </button>
            <!-- <button class="back" on:click={()=> resetDonation()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.21938 11.4694L9.96938 4.71937C10.1101 4.57864 10.301 4.49958 10.5 4.49958C10.699 4.49958 10.8899 4.57864 11.0306 4.71937C11.1714 4.8601 11.2504 5.05097 11.2504 5.24999C11.2504 5.44902 11.1714 5.63989 11.0306 5.78062L5.56031 11.25L20.25 11.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75L5.56031 12.75L11.0306 18.2194C11.1714 18.3601 11.2504 18.551 11.2504 18.75C11.2504 18.949 11.1714 19.1399 11.0306 19.2806C10.8899 19.4213 10.699 19.5004 10.5 19.5004C10.301 19.5004 10.1101 19.4213 9.96938 19.2806L3.21938 12.5306C3.14964 12.461 3.09432 12.3782 3.05658 12.2872C3.01884 12.1962 2.99941 12.0986 2.99941 12C2.99941 11.9014 3.01884 11.8038 3.05658 11.7128C3.09432 11.6217 3.14964 11.539 3.21938 11.4694Z" fill="var(--icon)"/>
                </svg>
            </button> -->
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
              Contact us about donations over $1M
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
          30
        </div>
      </div>
      <div class="metric">
        <div class="sub">Amount donated</div>
        <div class="value">
          ${totalAmount}
        </div>
      </div>
    </div> -->

    <div class="table">
      <div class="table-title">
        <h2>Donation history</h2>
        <div class="settings-holder inline">
        <button class="table-title-button" on:click={() => showReceiptDropdown = !showReceiptDropdown}>
          <span>Receipts</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="s-q2FeMkE1vgix"><path d="M5.61663 8.79194C5.65137 8.82837 5.69314 8.85738 5.73941 8.87719C5.78568 8.89701 5.8355 8.90723 5.88584 8.90723C5.93617 8.90723 5.98599 8.89701 6.03226 8.87719C6.07853 8.85738 6.1203 8.82837 6.15504 8.79194L10.0006 4.94637L9.4622 4.40796L5.88584 7.98433L2.30902 4.40796L1.77061 4.94637L5.61663 8.79194Z" fill="var(--icon)" class="s-q2FeMkE1vgix"></path></svg>
        </button>

        {#if showReceiptDropdown}
        <div class="settings-dropdown" in:fly={{y:-10,duration:250}} out:fly={{y:-5,duration:250}}>
          <button class="settings-dropdown-button" on:click>
            All individual receipts
          </button>
          <button class="settings-dropdown-button" on:click>
            2024 cumulative receipt
          </button>
          <button class="settings-dropdown-button" on:click>
            2023 cumulative receipt
          </button>
          <button class="settings-dropdown-button" on:click>
            2022 cumulative receipt
          </button>
        </div>
        {/if}

        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Program</th>
            <th class="full">Method</th>
            <th></th>
            <th>Amount</th>
          </tr>

          {#each table as row}
          <tr>
            <td>{row.date}</td>
            <td>{row.program}</td>
            <td class="full">{row.method}</td>
            <td>
              <a href="#" class="download">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 11.875V16.25C17.5 16.5815 17.3683 16.8995 17.1339 17.1339C16.8995 17.3683 16.5815 17.5 16.25 17.5H3.75C3.41848 17.5 3.10054 17.3683 2.86612 17.1339C2.6317 16.8995 2.5 16.5815 2.5 16.25V11.875C2.5 11.7092 2.56585 11.5503 2.68306 11.4331C2.80027 11.3158 2.95924 11.25 3.125 11.25C3.29076 11.25 3.44973 11.3158 3.56694 11.4331C3.68415 11.5503 3.75 11.7092 3.75 11.875V16.25H16.25V11.875C16.25 11.7092 16.3158 11.5503 16.4331 11.4331C16.5503 11.3158 16.7092 11.25 16.875 11.25C17.0408 11.25 17.1997 11.3158 17.3169 11.4331C17.4342 11.5503 17.5 11.7092 17.5 11.875ZM9.55781 12.3172C9.61586 12.3753 9.68479 12.4214 9.76066 12.4529C9.83654 12.4843 9.91787 12.5005 10 12.5005C10.0821 12.5005 10.1635 12.4843 10.2393 12.4529C10.3152 12.4214 10.3841 12.3753 10.4422 12.3172L13.5672 9.19219C13.6253 9.13412 13.6713 9.06518 13.7027 8.98931C13.7342 8.91344 13.7503 8.83212 13.7503 8.75C13.7503 8.66788 13.7342 8.58656 13.7027 8.51069C13.6713 8.43482 13.6253 8.36588 13.5672 8.30781C13.5091 8.24974 13.4402 8.20368 13.3643 8.17225C13.2884 8.14083 13.2071 8.12465 13.125 8.12465C13.0429 8.12465 12.9616 8.14083 12.8857 8.17225C12.8098 8.20368 12.7409 8.24974 12.6828 8.30781L10.625 10.3664V3.125C10.625 2.95924 10.5592 2.80027 10.4419 2.68306C10.3247 2.56585 10.1658 2.5 10 2.5C9.83424 2.5 9.67527 2.56585 9.55806 2.68306C9.44085 2.80027 9.375 2.95924 9.375 3.125V10.3664L7.31719 8.30781C7.19991 8.19054 7.04085 8.12465 6.875 8.12465C6.70915 8.12465 6.55009 8.19054 6.43281 8.30781C6.31554 8.42509 6.24965 8.58415 6.24965 8.75C6.24965 8.91585 6.31554 9.07491 6.43281 9.19219L9.55781 12.3172Z" fill="var(--icon)"/>
                  </svg>
                <span class="tooltip">Download receipt</span>
              </a>
            </td>
            <td>{row.amount}</td>
          </tr>
          {/each}
      </table>
      <div class="pagination">
        <div class="pagination-details">
          1-10 of 30 donations
        </div>
        <div class="pagination-buttons">
        <button class="icon">
          Prev
        </button>
        <button class="icon">
          Next
        </button>
        </div>
      </div>
    </div>

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


  .pagination {
    display: flex;
    padding: var(--s2) var(--s0);
    gap: var(--s-1);
    font-size: var(--s-12);
    align-items: center;
    justify-content: flex-end;
  }

  .pagination-buttons {
    display: flex;
    gap: var(--s-4);

    button {
      background: var(--bg);
      border: 0;
      border: 1px solid var(--border-tertiary);
      border-radius: var(--s-12);
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--s2);
      color: var(--text-muted);
      padding: 0 var(--s-12);
      font-weight: 500;
      cursor: pointer;
    }
  }


  .table {
    width: 100%;
    margin: var(--s1) 0 0;
    padding-bottom: var(--s6);

    .table-title {
      padding: var(--s0);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .table-title-button {
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
    }

    table {
      width: 100%;
      border-spacing: 0;
      
      th, td {
        text-align: left;
        font-weight: 500;
        font-size: var(--s-12);
        // padding: var(--s0);
        border-bottom: 1px solid var(--border-tertiary);
        white-space: nowrap;

        &.full {
          width: 100%;
        }

        &:last-child {
          text-align: right;
        }

      }

      tr {
        &:hover {
          td {
            background: var(--bg-secondary);
          }
          a {
            opacity: 1;
          
          }
        }
      }

      th {
        padding: var(--s0);
        color: var(--text-muted);
      }

      td {
        transition: background 0.2s ease-in-out;
        padding: var(--s0) var(--s0);
        color: var(--text);
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--icon-muted);
        font-weight: 500;
        font-size: var(--s-12);
        text-decoration: none;
        width: var(--s3);
        height: var(--s3);
        border-radius: 50%;
        // border: 1px solid var(--border-tertiary);
        transition: all 0.2s ease-in-out;
        position: relative;
        // opacity: 0;

        .tooltip {
          visibility: hidden;
          width: 140px;
          background: var(--bg-brand);
          color: var(--text-always-light);
          text-align: center;
          border-radius: 6px;
          padding: 5px 0;
          position: absolute;
          z-index: 10;
          font-size: var(--s-1);
          bottom: calc(100% + 10px);
          transition: all 0.2s ease-in-out;
          opacity: 0;

          &::after {
            content: " ";
            position: absolute;
            top: 100%; /* At the bottom of the tooltip */
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: var(--bg-brand) transparent transparent transparent;
          }
        }

        &:hover {
          background: var(--bg-tertiary);
          // box-shadow: 0 0 0 1px var(--border-tertiary);

          .tooltip {
            opacity: 1;
            visibility: visible;
          }
        }
      
      }

    }

  }

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
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: var(--s0);
      color: var(--text-onbrand);
      gap: var(--s0);
      overflow: hidden;
      text-decoration: none;
      transition: all 0.2s ease-in-out;

      .icon {
        position: absolute;
        right: 16px;
        top: 16px;
        z-index: 100;
        background: var(--bg);
        display: flex;
        border-radius: 50%;
        opacity: 0;
        transition: all 0.2s ease-in-out;
        transform: translate3d(0, 5px, 0);
      }

      &:hover {
        text-decoration: none;

        .icon {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      &:focus-visible {
        outline: 0;
        border-color: var(--border-brand);
        box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 4px var(--bg-brand);
      }
      
      .note {
        font-weight: 600;
        line-height: 1.4;
        position: relative;
        z-index: 100;
        text-wrap: pretty;
        font-size: var(--s0);
      }

      .person {
        opacity: 0.9;
        font-size: var(--s-12);
        position: relative;
        z-index: 100;
      }


      &:after {
        z-index: 1;
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 180px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      }


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
      font-size: var(--s1);
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
      height: var(--s3);
      border-radius: var(--s3);
      padding: 0 var(--s2);
      background: var(--bg-brand);
      color: var(--text-onbrand);
      font-weight: 600;
      border: 0;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      font-size: var(--s0);

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

      p {
        text-wrap: pretty;
      }

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

    &.inline {
      position: relative;
      right: auto;
      top: auto;
    }


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

  .dm-toggle {
    position: fixed;
    z-index: 10000;
    bottom: var(--s3);
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    background: var(--bg-brand);
    border: 0;
    color: var(--text-onbrand);
    border-radius: var(--s-2);
    font-weight: 500;
    padding: var(--s-2) var(--s1);
    cursor: pointer;
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