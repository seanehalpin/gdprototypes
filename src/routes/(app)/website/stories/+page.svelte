<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, scale, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import ImageLoader from '$lib/util/image/Loader.svelte'
  import type { PageData } from './$types';
  export let data: PageData;

  let transition = quartOut

  let direction = ""

  let stories = [
    {
      title: "Dweh built a home for his family of 6",
      text: `“My wife, Balla, and I have four children. I have been stressed and unhappy with the work that I am doing because it is tedious but the money I earn is insufficient to take care of the family… The new things we’ve invested our transfers into are; three bundles of metal roof sheets at the cost of $233, sticks for the house for $38 and another $38 for transporting the materials from Giabo to here.”`,
      location: "Liberia",
      image: "dweh.jpg"
    },
    {
      title: "Emma is going back to school",
      text: `“Today, there is a new dawn. I am so happy after GiveDirectly enrolled me in the program where I will be getting about $550. I will surely be going back to secondary school. I plan to use the money to buy goats which will keep me in school. I do not want to just use the money, I want to invest it. I can sell the goats every term for my school fees.”`,
      location: "Malawi",
      image: "emma.jpg"
    },
    {
      title: "Rabeca wants to open a business selling vegetables",
      text: `“I thank God for bringing GiveDirectly and USAID to my family because they have significantly changed Nhampoca. Today, our community is developing. We are building brick houses, our children are in school, and we have light in our homes, which makes us stop thinking about our problems and start thinking about the future. For example, with my next transfer, I want to open a business selling vegetables to guarantee our livelihood even after the project is finished. Selling vegetables is a business that makes a lot of money in our community. Having my stall with tomatoes, onions, carrots, cabbage, and other vegetables will make a profit that can help with my household expenses.”`,
      location: "Mozambique",
      image: "rabeca.jpg"
    }
  ]

  let currentStory = stories[0]
  let secondaryImage = stories[1].image

  function nextStory() {
    direction = ""
    const currentIndex = stories.indexOf(currentStory);
    const nextIndex = (currentIndex + 1) % stories.length;
    currentStory = nextIndex === 0 ? stories[0] : stories[nextIndex];
    
    secondaryImage = stories[(stories.indexOf(currentStory) + 1) % stories.length].image;
    

  }

  function previousStory() {
    direction = "-"
    const currentIndex = stories.indexOf(currentStory);
    const previousIndex = (currentIndex - 1 + stories.length) % stories.length;
    currentStory = previousIndex === stories.length - 1 ? stories[stories.length - 1] : stories[previousIndex];

    const secondaryIndex = (previousIndex - 1 + stories.length) % stories.length;
    secondaryImage = stories[secondaryIndex].image;

  }

</script>


<svelte:head>
  <title>GD: FAQ</title>
</svelte:head>

<Center
--flex-direction="column" 
  --background="var(--bg)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
>
  <div class="holder">
    <div class="title">
      <h2>People use cash to meet short-term needs and unlock future plans.</h2>
      <p>
        Sign up and stay informed about stories from recipients, exclusive event invites, and research updates.
      </p>
    </div>
    
      <div class="stories">
        <div class="recipient">
          <div class="controls">
            <button on:click={()=> previousStory()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.21938 11.4693L9.96937 4.71932C10.1101 4.57859 10.301 4.49953 10.5 4.49953C10.699 4.49953 10.8899 4.57859 11.0306 4.71932C11.1714 4.86005 11.2504 5.05093 11.2504 5.24995C11.2504 5.44897 11.1714 5.63984 11.0306 5.78057L5.56031 11.2499L20.25 11.2499C20.4489 11.2499 20.6397 11.329 20.7803 11.4696C20.921 11.6103 21 11.801 21 11.9999C21 12.1989 20.921 12.3896 20.7803 12.5303C20.6397 12.6709 20.4489 12.7499 20.25 12.7499L5.56031 12.7499L11.0306 18.2193C11.1714 18.3601 11.2504 18.5509 11.2504 18.7499C11.2504 18.949 11.1714 19.1398 11.0306 19.2806C10.8899 19.4213 10.699 19.5004 10.5 19.5004C10.301 19.5004 10.1101 19.4213 9.96937 19.2806L3.21938 12.5306C3.14964 12.4609 3.09432 12.3782 3.05658 12.2872C3.01884 12.1961 2.99941 12.0985 2.99941 11.9999C2.99941 11.9014 3.01884 11.8038 3.05658 11.7127C3.09432 11.6217 3.14964 11.539 3.21938 11.4693Z" />
                </svg>
            </button>
            <button on:click={()=> nextStory()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7806 12.5307L14.0306 19.2807C13.8899 19.4214 13.699 19.5005 13.5 19.5005C13.301 19.5005 13.1101 19.4214 12.9694 19.2807C12.8286 19.1399 12.7496 18.9491 12.7496 18.7501C12.7496 18.551 12.8286 18.3602 12.9694 18.2194L18.4397 12.7501H3.75C3.55109 12.7501 3.36032 12.671 3.21967 12.5304C3.07902 12.3897 3 12.199 3 12.0001C3 11.8011 3.07902 11.6104 3.21967 11.4697C3.36032 11.3291 3.55109 11.2501 3.75 11.2501H18.4397L12.9694 5.78068C12.8286 5.63995 12.7496 5.44907 12.7496 5.25005C12.7496 5.05103 12.8286 4.86016 12.9694 4.71943C13.1101 4.5787 13.301 4.49963 13.5 4.49963C13.699 4.49963 13.8899 4.5787 14.0306 4.71943L20.7806 11.4694C20.8504 11.5391 20.9057 11.6218 20.9434 11.7128C20.9812 11.8039 21.0006 11.9015 21.0006 12.0001C21.0006 12.0986 20.9812 12.1962 20.9434 12.2873C20.9057 12.3783 20.8504 12.461 20.7806 12.5307Z" />
                </svg>
            </button>
          </div>
          {#key currentStory}
          <h3 in:fade={{duration:400, delay:200}}>{currentStory.title}</h3>
          <p in:fade={{duration:400, delay:400}}>{currentStory.text}</p>
          <div class="location" in:fade={{duration:400, delay:600}}>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.54041C6.71442 1.54041 5.45772 1.92162 4.3888 2.63585C3.31988 3.35008 2.48676 4.36524 1.99479 5.55296C1.50282 6.74068 1.37409 8.04762 1.6249 9.30849C1.8757 10.5694 2.49477 11.7276 3.40381 12.6366C4.31285 13.5456 5.47104 14.1647 6.73192 14.4155C7.99279 14.6663 9.29973 14.5376 10.4874 14.0456C11.6752 13.5537 12.6903 12.7205 13.4046 11.6516C14.1188 10.5827 14.5 9.32598 14.5 8.04041C14.4982 6.31706 13.8128 4.66481 12.5942 3.44622C11.3756 2.22763 9.72335 1.54223 8 1.54041ZM8 2.54041C9.0656 2.53927 10.1083 2.84948 11 3.43291V4.66541L9.61438 6.27416L7.6475 6.54041L7.62813 6.52666L6.39875 5.72291C6.28976 5.64613 6.16651 5.59192 6.03626 5.56347C5.90601 5.53502 5.77138 5.53291 5.6403 5.55725C5.50922 5.58159 5.38432 5.6319 5.27297 5.70521C5.16161 5.77852 5.06604 5.87337 4.99188 5.98416L3.68313 7.94041C3.5741 8.10343 3.51542 8.29491 3.51438 8.49103L3.5 10.7554L3.29563 10.8898C2.79039 10.0556 2.51603 9.10211 2.50068 8.12699C2.48532 7.15187 2.72953 6.1902 3.20826 5.34055C3.68699 4.49089 4.38303 3.78381 5.22504 3.29176C6.06706 2.79971 7.02476 2.5404 8 2.54041ZM3.89313 11.6948L4.05063 11.5917C4.18816 11.5009 4.30115 11.3776 4.37955 11.2327C4.45794 11.0878 4.49932 10.9258 4.5 10.761L4.51313 8.49666L5.82313 6.54041C5.82954 6.54534 5.83622 6.54993 5.84313 6.55416L7.0725 7.35853C7.27853 7.50394 7.53203 7.56581 7.78188 7.53166L9.75 7.26478C9.99271 7.23239 10.2151 7.11208 10.375 6.92666L11.7606 5.31666C11.9156 5.1351 12.0005 4.9041 12 4.66541V4.26978C12.6763 4.98528 13.1478 5.86942 13.3652 6.82965C13.5826 7.78989 13.5378 8.7909 13.2356 9.72791L12.2269 8.80541C12.0866 8.67668 11.9126 8.59066 11.7251 8.55745C11.5377 8.52423 11.3447 8.54521 11.1688 8.61791L9.265 9.40853C9.10582 9.47535 8.96653 9.58204 8.86056 9.71833C8.75459 9.85462 8.68552 10.0159 8.66 10.1867L8.51063 11.1985C8.47473 11.4421 8.52993 11.6903 8.66566 11.8957C8.80139 12.1011 9.00812 12.2492 9.24625 12.3117L10.5875 12.6654L10.735 12.8135C9.63975 13.4419 8.36143 13.6738 7.11526 13.47C5.86908 13.2662 4.73118 12.6393 3.89313 11.6948ZM11.5625 12.2279L11.2938 11.9585C11.1684 11.8327 11.0118 11.7425 10.84 11.6973L9.5 11.3435L9.64938 10.3317L11.5525 9.54041L12.8125 10.6954C12.4914 11.2772 12.0679 11.7964 11.5625 12.2279Z" fill="var(--icon)"/>
              </svg>
              <span>{currentStory.location}</span>
          </div>
          {/key}
        </div>
        
        <div class="photo-holder">
          {#key currentStory}
          <div class="photo" in:fade={{duration:300}}>
            <ImageLoader 
            src="/website/stories/{currentStory.image}" 
            alt=""
            skeleton={false} 
            fit={false} 
            skip={false}
            fullwidth={false} 
            width="368" 
            height="537"
            --radius="8px"
            --shadow="0 0 0 1px rgba(0,0,0,0.4), 0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)"
          ></ImageLoader>
          </div>
          {/key}
          <!-- {#key secondaryImage} -->
          <div class="secondary-photo">
            <ImageLoader 
            src="/website/stories/{secondaryImage}" 
            alt=""
            skeleton={false} 
            fit={false} 
            skip={false}
            fullwidth={false} 
            width="368" 
            height="537"
            --radius="8px"
          ></ImageLoader>
          </div>
          <!-- {/key} -->
        </div>
        
      </div>
    
  </div>
    
  

</Center>

<style lang="scss">

  @import "../../../../donor";

  $height: 48px;
  $radius: 8px;

  .holder {
    max-width: 880px;
    width: 100%;
    margin: 0 auto;
    padding: var(--42px) 0 calc(var(--96px) * 2);
  }

  .title {
    max-width: 550px;
    margin: 0 auto;

    h2 {
      text-align: center;
      color: var(--text);
      margin-bottom: var(--16px);
      font-size: var(--32px);
      line-height: 1.2;
    }

    p {
      text-align: center;
      color: var(--text-muted);
      font-size: var(--16px);
      margin-bottom: var(--32px);
    }
  }

  .stories {
    display: flex;
    gap: var(--24px);
    border-radius: $radius;;
  }

  .photo-holder {
    position: relative;
    border-radius: 8px;

    .photo {
      min-width: 368px;
      position: relative;
      border-radius: 8px;
      z-index: 100;
      transition: all 0.2s ease-in-out;

      // &:hover {
      //   transform-origin: center  center;
      //   transform: translate3d(20px, 30px, 0) rotate(3deg);
      // }
    }

    .secondary-photo {
      position: absolute;
      z-index: 1;
      opacity: 0.5;
      left: 0;
      top: 0;
      transform: rotate(3deg);
      display: none;
    }
  }

  .recipient {
    background: var(--bg-secondary);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 0 var(--48px);
    gap: var(--16px);
    border-radius: $radius;
    position: relative;

    h3 {
      color: var(--text);
      font-size: var(--22px);
      line-height: 1.2;
      // text-wrap: pretty;
      text-wrap: balance;
    }

    p {
      color: var(--text-muted);
      font-size: var(--16px);
      text-wrap: pretty;
    }

    .location {
      display: flex;
      gap: 6px;
      color: var(--text-muted);
      font-size: var(--14px);
      font-weight: 500;
      align-items: center;

      svg {
        display: flex;
      }
    }

    .controls {
      position: absolute;
      right: var(--32px);
      bottom: var(--32px);
      display: flex;
      gap: 8px;

      button {
        background: var(--bg-secondary);
        border: 1px solid var(--border-tertiary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease-in-out;
        height: var(--42px);
        width: var(--42px);
        cursor: pointer;

        svg {
          fill: var(--icon);
        }

        &:hover {
          border-color: var(--border-active);
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);

          svg {
            fill: var(--icon-active);
          }
        }

        &:focus-visible {
          border-color: transparent;
          box-shadow: 0 0 0 1px var(--border-brand), 0 0 0 4px var(--focus);
          outline: 0;
          // outline: 4px solid var(--focus);
          // outline-offset: 0px;
          // border-radius: 6px;
        }
        &:active {
          background: var(--bg-tertiary);
          box-shadow: none;
        }

      }
    }

  }


</style>