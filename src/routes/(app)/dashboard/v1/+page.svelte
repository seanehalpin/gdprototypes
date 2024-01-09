<script lang="ts">
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion'
    import { formatNumber } from '$lib/util'
    import Globev1 from '$lib/components/Globev2.svelte';
    import Logo from '$lib/components/dash/Logo.svelte';
    import Center from '$lib/util/Center.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;

    let name = "Seán"

    const defaults = { duration: 3000 }
    const score1 = tweened(0, defaults)

    let buttons = [
      {id: 1, text: 'Home', svg: "M20.5153 9.7288L13.0153 2.65255C13.0116 2.64935 13.0082 2.6459 13.005 2.64223C12.7289 2.39111 12.369 2.25195 11.9958 2.25195C11.6225 2.25195 11.2627 2.39111 10.9866 2.64223L10.9763 2.65255L3.48469 9.7288C3.33187 9.86932 3.20989 10.04 3.12646 10.2301C3.04303 10.4202 2.99997 10.6256 3 10.8332V19.5004C3 19.8982 3.15804 20.2797 3.43934 20.561C3.72064 20.8423 4.10218 21.0004 4.5 21.0004H19.5C19.8978 21.0004 20.2794 20.8423 20.5607 20.561C20.842 20.2797 21 19.8982 21 19.5004V10.8332C21 10.6256 20.957 10.4202 20.8735 10.2301C20.7901 10.04 20.6681 9.86932 20.5153 9.7288ZM19.5 19.5004H4.5V10.8332L4.51031 10.8238L12 3.75036L19.4906 10.8219L19.5009 10.8313L19.5 19.5004Z", active: true},
      {id: 2, text: 'Donations', svg: "M21 18.75H20.25V3.75C20.25 3.55109 20.171 3.36032 20.0303 3.21967C19.8897 3.07902 19.6989 3 19.5 3H14.25C14.0511 3 13.8603 3.07902 13.7197 3.21967C13.579 3.36032 13.5 3.55109 13.5 3.75V7.5H9C8.80109 7.5 8.61032 7.57902 8.46967 7.71967C8.32902 7.86032 8.25 8.05109 8.25 8.25V12H4.5C4.30109 12 4.11032 12.079 3.96967 12.2197C3.82902 12.3603 3.75 12.5511 3.75 12.75V18.75H3C2.80109 18.75 2.61032 18.829 2.46967 18.9697C2.32902 19.1103 2.25 19.3011 2.25 19.5C2.25 19.6989 2.32902 19.8897 2.46967 20.0303C2.61032 20.171 2.80109 20.25 3 20.25H21C21.1989 20.25 21.3897 20.171 21.5303 20.0303C21.671 19.8897 21.75 19.6989 21.75 19.5C21.75 19.3011 21.671 19.1103 21.5303 18.9697C21.3897 18.829 21.1989 18.75 21 18.75ZM15 4.5H18.75V18.75H15V4.5ZM9.75 9H13.5V18.75H9.75V9ZM5.25 13.5H8.25V18.75H5.25V13.5Z", active: false},
      {id: 3, text: 'Updates', svg: "M22.5 11.2498C22.4988 10.0567 22.0243 8.91287 21.1806 8.06923C20.337 7.22558 19.1931 6.75108 18 6.74984H14.2687C13.9959 6.7339 9.24188 6.39921 4.71469 2.60234C4.49607 2.41873 4.22959 2.30132 3.94656 2.26391C3.66353 2.2265 3.37571 2.27064 3.11689 2.39114C2.85807 2.51163 2.63902 2.70349 2.48546 2.94417C2.3319 3.18484 2.25022 3.46434 2.25 3.74984V18.7498C2.25004 19.0354 2.3316 19.315 2.48508 19.5558C2.63857 19.7967 2.85761 19.9887 3.11646 20.1093C3.37532 20.2299 3.66322 20.2741 3.94633 20.2367C4.22945 20.1994 4.49601 20.0819 4.71469 19.8983C8.25563 16.9283 11.9334 16.077 13.5 15.8389V18.8126C13.4997 19.0598 13.5605 19.3032 13.6769 19.5213C13.7934 19.7393 13.9619 19.9252 14.1675 20.0623L15.1987 20.7495C15.3981 20.8826 15.6264 20.9659 15.8645 20.9926C16.1027 21.0193 16.3438 20.9885 16.5676 20.9028C16.7914 20.8172 16.9914 20.6791 17.151 20.5003C17.3105 20.3214 17.4248 20.107 17.4844 19.8748L18.5878 15.7161C19.6704 15.572 20.6638 15.0398 21.3834 14.2183C22.103 13.3968 22.4998 12.3419 22.5 11.2498ZM3.75 18.7433V3.74984C7.76344 7.1164 11.8716 7.96859 13.5 8.17859V14.3173C11.8734 14.5311 7.76625 15.3814 3.75 18.7433ZM16.0312 19.4933V19.5036L15 18.8164V15.7498H17.025L16.0312 19.4933ZM18 14.2498H15V8.24984H18C18.7956 8.24984 19.5587 8.56591 20.1213 9.12852C20.6839 9.69112 21 10.4542 21 11.2498C21 12.0455 20.6839 12.8085 20.1213 13.3712C19.5587 13.9338 18.7956 14.2498 18 14.2498Z", active: false},
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

    let speed = 400; // Adjust the speed as needed
    let counterElement:any;
    let value:any;
    let dataCount = 0;

    const animate = () => {
      const time = value / speed;
      if (dataCount < value) {
        dataCount = Math.ceil(dataCount + time);
        setTimeout(animate, 1);
      } else {
        dataCount = value;
      }
    };

    $: {

      if (counterElement) {
        value = counterElement.dataset.val;

        setTimeout(() => {
          if (value) {
            animate();
          }
        }, 1200);

        
      }
    }


    onMount(() => {
      setTimeout(() => {
        $score1 = 9240
      }, 1000);
    })

</script>
  
<svelte:head>
  <title>Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Mono&display=swap" rel="stylesheet">
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
          <img src="/dash/avatar.png" alt="" >
        </span>
        <span class="name">Seán Halpin</span>
        <svg width="16" height="16" fill="var(--green-500)" focusable="false" viewBox="0 0 24 24"><path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z"></path></svg>
        </button>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-title">
          Giver's Percentile
        </div>
        <div class="amount">
          Top 2%
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          Lifetime Impact
        </div>
        <div class="amount" >
          ${formatNumber($score1)}
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          People helped
        </div>
        <div class="amount">
          40
        </div>
      </div>
    </div>
    
    <div class="grid">
      <div class="story">
        <div class="story-1">
          <div class="story-controls">
            <div class="left">
              <!-- <div class="subtitle">
                Lives transformed
              </div> -->
              <div class="text">
                Emmanuels story
              </div>
            </div>
            <div class="button">
              <button>View</button>
            </div>
          </div>
          <img src="/dash/story-1.png" alt="">
        </div>
        <!-- <div class="story-2">
          <div class="story-controls">
            <div class="text">
              Leonilles story
            </div>
            <div class="button">
              <button>View</button>
            </div>
          </div>
          <img src="/dash/story-2.png" alt="">
        </div> -->
      </div>
      <div class="globe">
        <div class="title">
          {name}, your donations have helped 40 people in 5 countries.
        </div>
        <Globev1/>
      </div>
    </div>
  </main>
</div>

</Center>


<style lang="scss">

  $radius: var(--16px);
  $color-beige: #F9F7F1;
  $inter: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  $space: 'Space Mono', monospace;
  $green1: #E2ED7D;
  $green2: #93DCCE;
  $green3: #97D275;
  $green-dark: #002921;
  $navHeight: 100px;

  .cards {
    font-family: $space;
    display: flex;
    gap: var(--16px);
    margin-bottom: var(--16px);

    .card {
      background: $color-beige;
      border-radius: $radius;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--24px) 0;
      flex-direction: column;

      &:nth-child(1) {
        background: $green1;
      }

      &:nth-child(2) {
        background: $green2;
      }
      &:nth-child(3) {
        background: $green3;
      }

      .card-title {
        font-size: var(--14px);
        color: rgba(0,0,0,0.7);
      }

      .amount {
        font-size: 38px;
        letter-spacing: -1.5px;
        color: $green-dark;
      }
    }
  }

  .dash {
    width: 100%;
    max-width: calc(1184px + var(--16px) * 2);
    display: flex;
    justify-content: space-between;
    padding: 0 var(--16px);
    gap: var(--16px);
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
      background: var(--green-600);
      color: var(--white);
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
      background: $color-beige;
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

  .globe {
    border-radius: var(--16px);
    background: $color-beige;
  }
  
  .title {
    font-size: var(--24px);
    font-weight: 600;
    color: var(--green-600);
    padding: 32px var(--64px) 0;
    line-height: normal;
    letter-spacing: -0.5px;
    text-align: center;

    span {
      background: $green3;
      display: inline-flex;
      padding: 0 6px;
      font-family: $space;
      border-radius: 4px;
    }
  }


  .grid {
    display: grid;
    overflow: hidden;
    border-radius: $radius;
    gap: var(--16px);

    .story {
      width: 368px;
      height: 100%;
    // width: 100%;
      overflow: hidden;
      // border-radius: var(--16px);
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      // background: var(--green-600);
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--16px);

      img {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        object-fit: cover;
        z-index: 0;
        transition: all 0.3s ease-in-out;
      }

      .story-1, .story-2 {
        height: 100%;
        position: relative;
        border-radius: $radius;
        overflow: hidden;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        min-height: 314px;
        background: $color-beige;

        &:before {
          position: absolute;
          z-index: 1;
          content: "";
          left: 0;
          right: 0;
          bottom: 0;
          height: 130px;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
        }


        &:hover {
          filter: saturate(1.2);
        }

      }

      .story-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        z-index: 100;
        bottom: 0;
        left: 0;
        right: 0;
        padding: var(--24px);
      }

      .subtitle {
        color: var(--white);
        font-family: $space;
        font-size: var(--14px);
      }

      .text {
        color: var(--white);
        font-size: var(--24px);
        font-weight: 600;
        letter-spacing: -0.5px;
      }

      button {
        font-size: var(--14px);
        background: transparent;
        border: 1px solid var(--white);
        border-radius: var(--42px);
        height: 40px;
        padding: 0 var(--24px);
        color: var(--white);
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

    }
    .globe {
      overflow: hidden;
      border-radius: $radius;
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }
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
      color: #57503B;
      font-size: var(--14px);

      .link-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }

      svg {
        fill: #C1BCAE;
      }

      &.active {
        color: var(--green-600);
        font-weight: 600;
        svg {
          fill: var(--green-600);
        }
      }

    }
  }


</style>