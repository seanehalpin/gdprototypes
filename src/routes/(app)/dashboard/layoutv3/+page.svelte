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

  const notyShower = () => {
    showNoty = true

    setTimeout(() => {
      showNoty = false
    }, 5000);

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

  let isError = true


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
<!-- <button class="dm-toggle" on:click={() => showDm = !showDm}>Dark mode 🚧</button> -->
{#if showModal}
<div class="modal" in:fade={{duration:150}} out:fade={{duration:150}}>
    <div class="modal-box" in:scale={{start:0.95, duration:250, delay: 150, easing: backOut}} out:scale={{start: 0.95, duration:250, easing: backOut}}>
      <div class="modal-title">
        Update your payment details
      </div>
      <div class="modal-body">
        <p>Card details yada yada yada</p>
      </div>
      <div class="modal-footer">
        <div class="modal-buttons">
          <button class="back" on:click={()=> closeModal()}>Go back</button>
          <button class="confirm" on:click={()=> {closeModal(); notyText = "Your card details have been updated"; notyShower(); isError = false}}>Confirm</button>
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
      <div class="donate" class:warning={isError}>
      
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
              <div></div>
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
              {#if isError}
              <div class="payment-text-icon">
                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.6013 23.5113L18.6701 4.52758C18.3969 4.06249 18.007 3.67686 17.5388 3.40891C17.0707 3.14096 16.5407 3 16.0013 3C15.462 3 14.9319 3.14096 14.4638 3.40891C13.9957 3.67686 13.6058 4.06249 13.3326 4.52758L2.40134 23.5113C2.13851 23.9612 2 24.4728 2 24.9938C2 25.5148 2.13851 26.0265 2.40134 26.4763C2.671 26.9442 3.0603 27.332 3.52929 27.5997C3.99828 27.8675 4.53007 28.0057 5.07009 28.0001H26.9326C27.4722 28.0052 28.0035 27.8669 28.472 27.5991C28.9405 27.3314 29.3294 26.9439 29.5988 26.4763C29.8621 26.0267 30.001 25.5152 30.0014 24.9942C30.0019 24.4732 29.8638 23.9614 29.6013 23.5113ZM15.0013 13.0001C15.0013 12.7349 15.1067 12.4805 15.2942 12.293C15.4818 12.1054 15.7361 12.0001 16.0013 12.0001C16.2666 12.0001 16.5209 12.1054 16.7084 12.293C16.896 12.4805 17.0013 12.7349 17.0013 13.0001V18.0001C17.0013 18.2653 16.896 18.5197 16.7084 18.7072C16.5209 18.8947 16.2666 19.0001 16.0013 19.0001C15.7361 19.0001 15.4818 18.8947 15.2942 18.7072C15.1067 18.5197 15.0013 18.2653 15.0013 18.0001V13.0001ZM16.0013 24.0001C15.7047 24.0001 15.4147 23.9121 15.168 23.7473C14.9213 23.5825 14.7291 23.3482 14.6155 23.0741C14.502 22.8 14.4723 22.4984 14.5302 22.2074C14.588 21.9165 14.7309 21.6492 14.9407 21.4394C15.1505 21.2296 15.4177 21.0868 15.7087 21.0289C15.9997 20.971 16.3013 21.0007 16.5754 21.1143C16.8495 21.2278 17.0837 21.4201 17.2485 21.6667C17.4134 21.9134 17.5013 22.2034 17.5013 22.5001C17.5013 22.8979 17.3433 23.2794 17.062 23.5607C16.7807 23.842 16.3992 24.0001 16.0013 24.0001Z" fill="var(--red-600)"/>
                  </svg>
                  <div class="payment-text-icon-text error">Action required</div>
              </div>
              {:else}
              <div class="payment-text-icon">
                <!-- <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27 12C27 11.7033 27.088 11.4133 27.2528 11.1666C27.4176 10.92 27.6519 10.7277 27.926 10.6142C28.2001 10.5006 28.5017 10.4709 28.7926 10.5288C29.0836 10.5867 29.3509 10.7296 29.5607 10.9393C29.7704 11.1491 29.9133 11.4164 29.9712 11.7074C30.0291 11.9983 29.9994 12.2999 29.8858 12.574C29.7723 12.8481 29.58 13.0824 29.3334 13.2472C29.0867 13.412 28.7967 13.5 28.5 13.5C28.1022 13.5 27.7206 13.342 27.4393 13.0607C27.158 12.7794 27 12.3978 27 12ZM25.5 8.99999C25.7967 8.99999 26.0867 8.91202 26.3334 8.7472C26.58 8.58238 26.7723 8.34811 26.8858 8.07402C26.9994 7.79993 27.0291 7.49833 26.9712 7.20736C26.9133 6.91639 26.7704 6.64911 26.5607 6.43933C26.3509 6.22956 26.0836 6.08669 25.7926 6.02882C25.5017 5.97094 25.2001 6.00064 24.926 6.11418C24.6519 6.22771 24.4176 6.41997 24.2528 6.66664C24.088 6.91331 24 7.20332 24 7.49999C24 7.89782 24.158 8.27935 24.4393 8.56066C24.7206 8.84196 25.1022 8.99999 25.5 8.99999ZM29.0825 16C28.8183 15.9782 28.5563 16.0622 28.354 16.2336C28.1517 16.4049 28.0257 16.6496 28.0038 16.9137C27.8248 19.0043 27.0525 21.0003 25.7776 22.6668C24.5028 24.3333 22.7785 25.6011 20.8076 26.3209C18.8367 27.0406 16.7012 27.1825 14.6524 26.7298C12.6036 26.2771 10.7267 25.2487 9.24256 23.7655C7.75843 22.2823 6.7288 20.4061 6.27481 18.3575C5.82083 16.309 5.96138 14.1735 6.67993 12.2021C7.39847 10.2308 8.66512 8.50565 10.3308 7.22976C11.9966 5.95386 13.992 5.18027 16.0825 4.99999C16.2138 4.98916 16.3417 4.95257 16.4589 4.8923C16.5761 4.83204 16.6802 4.74928 16.7654 4.64877C16.8506 4.54825 16.9152 4.43193 16.9555 4.30646C16.9957 4.18099 17.0108 4.04882 17 3.91749C16.9892 3.78617 16.9526 3.65827 16.8923 3.54109C16.832 3.42391 16.7493 3.31975 16.6488 3.23455C16.5483 3.14935 16.4319 3.08479 16.3065 3.04454C16.181 3.0043 16.0488 2.98916 15.9175 2.99999C13.4475 3.21245 11.0896 4.12592 9.12118 5.63294C7.15273 7.13996 5.65564 9.17782 4.80604 11.5068C3.95644 13.8357 3.78968 16.3589 4.32537 18.7794C4.86105 21.2 6.07691 23.4171 7.82989 25.1701C9.58287 26.9231 11.8 28.1389 14.2206 28.6746C16.6411 29.2103 19.1643 29.0436 21.4932 28.194C23.8222 27.3444 25.86 25.8473 27.3671 23.8788C28.8741 21.9104 29.7875 19.5525 30 17.0825C30.0113 16.9511 29.9965 16.8187 29.9564 16.6931C29.9163 16.5674 29.8518 16.4509 29.7665 16.3503C29.6812 16.2497 29.5769 16.1669 29.4595 16.1068C29.3421 16.0467 29.214 16.0104 29.0825 16ZM17 6.99999C18.78 6.99999 20.5201 7.52784 22.0001 8.51677C23.4802 9.5057 24.6337 10.9113 25.3149 12.5558C25.9961 14.2004 26.1743 16.01 25.8271 17.7558C25.4798 19.5016 24.6226 21.1053 23.364 22.364C22.1053 23.6226 20.5016 24.4798 18.7558 24.8271C17.01 25.1743 15.2004 24.9961 13.5559 24.3149C11.9113 23.6337 10.5057 22.4802 9.51678 21.0001C8.52784 19.5201 8 17.78 8 16C8.00265 13.6139 8.95171 11.3262 10.639 9.63896C12.3262 7.9517 14.6139 7.00264 17 6.99999ZM16 16C16 16.2652 16.1054 16.5196 16.2929 16.7071C16.4804 16.8946 16.7348 17 17 17H23C23.2652 17 23.5196 16.8946 23.7071 16.7071C23.8946 16.5196 24 16.2652 24 16C24 15.7348 23.8946 15.4804 23.7071 15.2929C23.5196 15.1054 23.2652 15 23 15H18V9.99999C18 9.73478 17.8946 9.48042 17.7071 9.29289C17.5196 9.10535 17.2652 8.99999 17 8.99999C16.7348 8.99999 16.4804 9.10535 16.2929 9.29289C16.1054 9.48042 16 9.73478 16 9.99999V16ZM21 5.99999C21.2967 5.99999 21.5867 5.91202 21.8334 5.7472C22.08 5.58238 22.2723 5.34811 22.3858 5.07402C22.4994 4.79993 22.5291 4.49833 22.4712 4.20736C22.4133 3.91639 22.2704 3.64911 22.0607 3.43933C21.8509 3.22956 21.5836 3.08669 21.2926 3.02882C21.0017 2.97094 20.7001 3.00064 20.426 3.11418C20.1519 3.22771 19.9176 3.41997 19.7528 3.66664C19.588 3.91331 19.5 4.20332 19.5 4.49999C19.5 4.89782 19.658 5.27935 19.9393 5.56066C20.2206 5.84196 20.6022 5.99999 21 5.99999Z" fill="var(--icon)"/>
                  </svg> -->

                  <svg class="spin" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 5.75937V11.7594C28 12.0246 27.8946 12.2789 27.7071 12.4665C27.5196 12.654 27.2652 12.7594 27 12.7594H21C20.7348 12.7594 20.4804 12.654 20.2929 12.4665C20.1054 12.2789 20 12.0246 20 11.7594C20 11.4942 20.1054 11.2398 20.2929 11.0523C20.4804 10.8647 20.7348 10.7594 21 10.7594H24.5863L22.7575 8.93062C20.899 7.06363 18.3756 6.01031 15.7413 6.00187H15.685C13.0727 5.99575 10.563 7.01821 8.69875 8.84812C8.50778 9.0264 8.25462 9.12286 7.99343 9.11687C7.73224 9.11087 7.48377 9.00291 7.30118 8.81606C7.11858 8.62922 7.01635 8.37833 7.01636 8.11707C7.01638 7.85582 7.11863 7.60495 7.30125 7.41812C9.56066 5.20986 12.5998 3.98172 15.759 4.00021C18.9183 4.01869 21.9428 5.28232 24.1763 7.51687L26 9.34562V5.75937C26 5.49415 26.1054 5.2398 26.2929 5.05226C26.4804 4.86473 26.7348 4.75937 27 4.75937C27.2652 4.75937 27.5196 4.86473 27.7071 5.05226C27.8946 5.2398 28 5.49415 28 5.75937ZM23.3013 22.6706C21.4185 24.5097 18.8867 25.5324 16.2549 25.5169C13.6231 25.5015 11.1035 24.4491 9.2425 22.5881L7.41375 20.7594H11C11.2652 20.7594 11.5196 20.654 11.7071 20.4665C11.8946 20.2789 12 20.0246 12 19.7594C12 19.4942 11.8946 19.2398 11.7071 19.0523C11.5196 18.8647 11.2652 18.7594 11 18.7594H5C4.73478 18.7594 4.48043 18.8647 4.29289 19.0523C4.10536 19.2398 4 19.4942 4 19.7594V25.7594C4 26.0246 4.10536 26.2789 4.29289 26.4665C4.48043 26.654 4.73478 26.7594 5 26.7594C5.26522 26.7594 5.51957 26.654 5.70711 26.4665C5.89464 26.2789 6 26.0246 6 25.7594V22.1731L7.82875 24.0019C10.059 26.2434 13.088 27.5076 16.25 27.5169H16.3162C19.4514 27.5249 22.4634 26.2976 24.7 24.1006C24.8826 23.9138 24.9849 23.6629 24.9849 23.4017C24.9849 23.1404 24.8827 22.8895 24.7001 22.7027C24.5175 22.5158 24.269 22.4079 24.0078 22.4019C23.7466 22.3959 23.4935 22.4923 23.3025 22.6706H23.3013Z" fill="#ED7E18"/>
                    </svg>
                    
                    
                  <div class="payment-text-icon-text">Resolving card details</div>
                  
              </div>
              {/if}

              <div class="payment-text-desc error">
                <!-- {#if isError}
                Your donation of $60 a month to Poverty relief - Africa is paused due to an issue with your card 
                {:else}
                Your donation of $60 a month to Poverty relief - Africa is paused while we resolve an issue with your card
                {/if} -->
                Your donation of $60 a month to Poverty relief - Africa is paused due to an issue with your card 
              </div>

              <!-- {#if isError} -->
              <div class="payment-text-reactivate">
                <button class="payment-text-reactivate-button" class:loading={!isError} on:click={() => showModal = true}> 
                  Update your card
                </button>
              </div>
              <!-- {/if} -->
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

      &.warning {
        box-shadow: 0 0 0 1px var(--red-500);
        // background: #FEF9F0;
        // background: var(--red-100);
        // overflow: hidden;

        // &:before, &:after {
        //   position: absolute;
        //   content: "";
        //   width: 100%;
        //   height: 10px;
        //   z-index: 100;
        //   left: 0;
        //   opacity: 0.3;
        //   background: repeating-linear-gradient(-45deg, transparent, transparent 10px, #F7D998 10px, #F7D998 20px);
        // }

        &:before {
          top : 0;
        }

        &:after {
          bottom: 0;
        }

        // background: repeating-linear-gradient(
        //   -55deg,
        //   #FEF9F0,
        //   #FEF9F0 10px,
        //   #fff 10px,
        //   #fff 20px
        // );
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
      display: flex;
      align-items: center;
      gap: 10px;
      position: absolute;
      left: 50%;
      top: calc(var(--s4) * -1);
      transform: translateX(-50%);
    }

    .payment-text-icon-text {
      color: #ED7E18;
      
      font-weight: 600;

      &.error {
        color: var(--red-600);
      }
    }

    .payment-text-desc {
      font-size: var(--s1);
      color: var(--text);
      font-weight: 600;
      text-wrap: balance;

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


      &.loading {
        cursor: not-allowed;
        opacity: 0.5;
      }

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

  .error {
    // color: var(--red-600) !important;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .spin {
    animation: spin 1.2s linear infinite;
  }


</style>