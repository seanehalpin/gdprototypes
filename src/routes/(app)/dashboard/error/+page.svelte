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
--justify-content="center"
>
<!-- <button class="dm-toggle" on:click={() => showDm = !showDm}>Dark mode 🚧</button> -->

<div class="dash">
<main>
  <div class="card">

    <div class="error">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to where you belong.</p>
      <div class="buttons">
        <button class="ghost">Contact us</button>
        <button class="primary">Go to dashboard</button>
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

  

  main {
    width: 100%;
    max-width: 896px;
  }

  .card {
    // margin-top: var(--s6);
    border-radius: var(--s0);
    background: var(--bg-secondary);
    padding: var(--s5);
    display: flex;
    flex-direction: column;
    gap: var(--s1);
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    width: 100%;

    h2 {
      font-size: var(--s1);
    }

    p {
      color: var(--text-muted);
    }

    .error {
      display: flex;
      flex-direction: column;
      gap: var(--s-2);
      width: 100%;
      max-width: calc(var(--s0) * 36);
    }

    .buttons {
      margin-top: var(--s-12);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--s-4);
    }

    button {

      font-size: var(--s-12);
      border: 0;
      cursor: pointer;
      color: var(--text);
      border-radius: var(--s4);
      font-weight: 600;
      font-family: var(--systemFont);
      transition: all 0.2s ease-in-out;

      &.ghost {
        padding: var(--s-2) var(--s2);
        color: var(--text-muted);
        background: transparent;

        &:hover {
          background: var(--bg-tertiary);
        }
      }

      &.primary {
        padding: var(--s-2) var(--s2);
        color: var(--text-onbrand);
        background: var(--bg-brand);
      }
    }

  }
  


</style>