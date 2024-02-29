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

  let buttons = [
    {id: 2, text: 'Donations', svg: "M21 18.75H20.25V3.75C20.25 3.55109 20.171 3.36032 20.0303 3.21967C19.8897 3.07902 19.6989 3 19.5 3H14.25C14.0511 3 13.8603 3.07902 13.7197 3.21967C13.579 3.36032 13.5 3.55109 13.5 3.75V7.5H9C8.80109 7.5 8.61032 7.57902 8.46967 7.71967C8.32902 7.86032 8.25 8.05109 8.25 8.25V12H4.5C4.30109 12 4.11032 12.079 3.96967 12.2197C3.82902 12.3603 3.75 12.5511 3.75 12.75V18.75H3C2.80109 18.75 2.61032 18.829 2.46967 18.9697C2.32902 19.1103 2.25 19.3011 2.25 19.5C2.25 19.6989 2.32902 19.8897 2.46967 20.0303C2.61032 20.171 2.80109 20.25 3 20.25H21C21.1989 20.25 21.3897 20.171 21.5303 20.0303C21.671 19.8897 21.75 19.6989 21.75 19.5C21.75 19.3011 21.671 19.1103 21.5303 18.9697C21.3897 18.829 21.1989 18.75 21 18.75ZM15 4.5H18.75V18.75H15V4.5ZM9.75 9H13.5V18.75H9.75V9ZM5.25 13.5H8.25V18.75H5.25V13.5Z", active: true},
    {id: 4, text: 'Settings', svg: "M11.9997 7.49998C11.1097 7.49998 10.2396 7.7639 9.49962 8.25837C8.7596 8.75284 8.18283 9.45564 7.84223 10.2779C7.50164 11.1002 7.41252 12.005 7.58616 12.8779C7.75979 13.7508 8.18837 14.5526 8.81771 15.182C9.44705 15.8113 10.2489 16.2399 11.1218 16.4135C11.9947 16.5871 12.8995 16.498 13.7218 16.1574C14.544 15.8168 15.2468 15.2401 15.7413 14.5C16.2358 13.76 16.4997 12.89 16.4997 12C16.4984 10.8069 16.0239 9.66302 15.1803 8.81937C14.3367 7.97573 13.1928 7.50122 11.9997 7.49998ZM11.9997 15C11.4063 15 10.8263 14.824 10.333 14.4944C9.83963 14.1647 9.45511 13.6962 9.22805 13.148C9.00099 12.5999 8.94158 11.9967 9.05733 11.4147C9.17309 10.8328 9.45881 10.2982 9.87837 9.87866C10.2979 9.4591 10.8325 9.17338 11.4144 9.05763C11.9964 8.94187 12.5996 9.00128 13.1477 9.22834C13.6959 9.45541 14.1645 9.83992 14.4941 10.3333C14.8237 10.8266 14.9997 11.4066 14.9997 12C14.9997 12.7956 14.6836 13.5587 14.121 14.1213C13.5584 14.6839 12.7953 15 11.9997 15ZM22.3066 10.0509C22.2857 9.94531 22.2423 9.84543 22.1794 9.75807C22.1164 9.67072 22.0354 9.59793 21.9419 9.54467L19.1453 7.95092L19.1341 4.79904C19.1337 4.6905 19.1098 4.58331 19.064 4.4849C19.0182 4.38649 18.9516 4.29919 18.8688 4.22904C17.8543 3.37095 16.6861 2.71336 15.4263 2.29123C15.327 2.25765 15.2219 2.24522 15.1176 2.25475C15.0133 2.26428 14.9121 2.29555 14.8206 2.34654L11.9997 3.92342L9.17594 2.34373C9.0844 2.29245 8.98311 2.26094 8.87863 2.25125C8.77414 2.24156 8.66879 2.2539 8.56938 2.28748C7.31045 2.71269 6.14359 3.37279 5.13063 4.23279C5.04791 4.30284 4.98136 4.38999 4.93556 4.48823C4.88975 4.58647 4.86579 4.69347 4.86532 4.80186L4.85125 7.95654L2.05469 9.55029C1.96113 9.60356 1.88013 9.67634 1.8172 9.7637C1.75428 9.85105 1.71089 9.95093 1.69 10.0565C1.43406 11.3427 1.43406 12.6667 1.69 13.9528C1.71089 14.0584 1.75428 14.1583 1.8172 14.2456C1.88013 14.333 1.96113 14.4058 2.05469 14.459L4.85125 16.0528L4.8625 19.2047C4.86284 19.3132 4.88674 19.4204 4.93255 19.5188C4.97835 19.6172 5.04498 19.7045 5.12782 19.7747C6.14226 20.6328 7.31046 21.2904 8.57031 21.7125C8.66953 21.7461 8.77468 21.7585 8.87899 21.749C8.98329 21.7394 9.08445 21.7082 9.17594 21.6572L11.9997 20.0765L14.8234 21.6562C14.9352 21.7185 15.0611 21.7508 15.1891 21.75C15.271 21.75 15.3523 21.7367 15.43 21.7106C16.6888 21.286 17.8556 20.6265 18.8688 19.7672C18.9515 19.6971 19.018 19.61 19.0638 19.5117C19.1096 19.4135 19.1336 19.3065 19.1341 19.1981L19.1481 16.0434L21.9447 14.4497C22.0383 14.3964 22.1192 14.3236 22.1822 14.2363C22.2451 14.1489 22.2885 14.049 22.3094 13.9434C22.5639 12.6583 22.5629 11.3357 22.3066 10.0509ZM20.9003 13.3237L18.2219 14.8472C18.1045 14.9139 18.0074 15.0111 17.9406 15.1284C17.8863 15.2222 17.8291 15.3215 17.7709 15.4153C17.6965 15.5335 17.6569 15.6703 17.6566 15.81L17.6425 18.8334C16.9226 19.3988 16.1205 19.8509 15.2641 20.174L12.5622 18.6684C12.45 18.6064 12.3238 18.5741 12.1956 18.5747H12.1778C12.0644 18.5747 11.95 18.5747 11.8366 18.5747C11.7024 18.5713 11.5697 18.6037 11.4522 18.6684L8.74844 20.1778C7.89017 19.8571 7.0859 19.4072 6.36344 18.8437L6.35313 15.825C6.35266 15.685 6.31305 15.548 6.23875 15.4294C6.18063 15.3356 6.12344 15.2419 6.07 15.1425C6.00374 15.0233 5.90659 14.9242 5.78875 14.8556L3.1075 13.3284C2.96875 12.4507 2.96875 11.5567 3.1075 10.679L5.78125 9.15279C5.89861 9.08607 5.99577 8.9889 6.0625 8.87154C6.11688 8.77779 6.17407 8.67842 6.23219 8.58467C6.30659 8.46644 6.34623 8.32967 6.34656 8.18998L6.36063 5.16654C7.08056 4.60118 7.88262 4.14909 8.73907 3.82592L11.4372 5.33154C11.5546 5.39663 11.6874 5.42901 11.8216 5.42529C11.935 5.42529 12.0494 5.42529 12.1628 5.42529C12.297 5.42865 12.4296 5.39629 12.5472 5.33154L15.2509 3.82217C16.1092 4.14286 16.9135 4.59274 17.6359 5.15623L17.6463 8.17498C17.6467 8.31495 17.6863 8.45199 17.7606 8.57061C17.8188 8.66436 17.8759 8.75811 17.9294 8.85748C17.9956 8.97665 18.0928 9.07575 18.2106 9.14436L20.8919 10.6715C21.0325 11.5499 21.0341 12.4449 20.8966 13.3237H20.9003Z", active: false},
  ]

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
<title>Dashboard</title>
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
<nav>
  <div class="header">
    <Logo />
  </div>
  <button class="donate">
    Donate now
  </button>

  <div class="links">
    {#each buttons as button}
    <button data-id={button.id} on:click={() => buttonChange(button.id)} class:active={button.active}>
      <span class="link-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d={button.svg}/>
          </svg>
      </span>
      <span class="link-text">
        {button.text}
      </span>
    </button>
    {/each}
  </div>
</nav>

<main>
  <div class="controls">
    <button>
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

    <div class="vanity">
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
    </div>

  </div>
</main>
</div>

</Center>


<style lang="scss">

  @import "../../../../donor";

  $radius: var(--16px);
  $color-beige: #F9F7F1;
  $color-brand: #265746;
  $color-border-tertiary: #CBC5B8;
  $space: 'Space Mono', monospace;
  $navHeight: 140px;

  .dash {
    width: 100%;
    max-width: calc(1184px + var(--16px) * 2);
    display: flex;
    justify-content: space-between;
    padding: 0 var(--16px);
    gap: var(--16px);
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
    justify-content: flex-end;

    button {
      display: flex;
      // height: 56px;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: var(--42px);
      background: var(--bg-secondary);
      gap: 8px;
      padding: 4px 8px 4px 4px;
      cursor: pointer;

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
    overflow: hidden;
  }


  .links {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 32px 0;
    gap: var(--16px);

    button {
      display: flex;
      width: 100%;
      background: none;
      border: 0;
      gap: var(--16px);
      align-items: center;
      height: 48px;
      cursor: pointer;
      color: var(--text-muted);
      font-size: var(--14px);

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
        color: var(--text);
        margin-bottom:  var(--32px);
      }
    }
  }

  .monthly {
    display: flex;
    align-items: stretch;
    gap: var(--16px);

    .story {
      width: 288px;
      border-radius: var(--16px);
      background: url('/dash/storyv2.jpg') no-repeat;
      background-size: cover;
      // height: 100%;
      position: relative;
    }

    .donate {
      width: 100%;
      border-radius: var(--16px);
      flex: 1 0 0;
      background: var(--bg-secondary);
      padding: var(--16px);
      display: flex;
      flex-direction: column;
      gap: var(--24px);
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 368px;
      position: relative;

      .title {
        font-size: var(--24px);
        font-weight: 600;
        line-height: 140%;
        color: var(--text);
      }

      .options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--8px);
        width: 100%;
        padding: 0 var(--24px);

        button {
          // font-size: var(--14px);
          display: flex;
          align-items: center;
          justify-content: center;
          height: var(--48px);
          border-radius: var(--48px);
          padding: 0 var(--16px);
          width: 100%;
          flex: 1;
          border: 0;
          color: var(--text-muted);
          background: var(--bg-secondary);
          border: 1px solid var(--border-tertiary);
          font-weight: 600;
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
        padding: 0 var(--24px);
        
        button {
          width: 100%;
          height: var(--48px);
          border-radius: var(--48px);
          padding: 0 var(--16px);
          background: var(--bg-brand);
          color: var(--text-onbrand);
          font-weight: 600;
          border: 0;
          cursor: pointer;
          pointer-events: none;
          opacity: 0.5;
          transition: var(--transition);
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
        gap: var(--8px);

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
          padding: 0 var(--16px) 0 var(--32px);
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
    gap: var(--16px);
    width: 100%;
    margin-top: var(--16px);

    .metric {
      border: 1px solid var(--border);
      border-radius: var(--16px);
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