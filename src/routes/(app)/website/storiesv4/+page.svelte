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
      image: "grid/dweh-grid.png",
      category: "Housing",
      size: "small",
      hover: false,
      byline: "Dweh, Liberia"
    },
    {
      title: "Emma is going back to school",
      text: `“Today, there is a new dawn. I am so happy after GiveDirectly enrolled me in the program where I will be getting about $550. I will surely be going back to secondary school. I plan to use the money to buy goats which will keep me in school. I do not want to just use the money, I want to invest it. I can sell the goats every term for my school fees.”`,
      location: "Malawi",
      image: "grid/emma-grid.png",
      category: "Education",
      size: "big",
      hover: false,
      byline: "Emma, Malawi"
    },
    {
      title: "Chengo constructed a new house",
      text: `“When I received the cash transfer, my mind opened up to new ideas. I used $300 to construct a new house, which has become a motivation to remarry after nearly a decade of staying divorced. I even bought a few clothes to make sure I dress well and look nice! I also spent $270 as down-payment for a brand new motorcycle. From the $5 I make daily, I use $3 in repaying the lender. This investment together with the 2 goats I also bought for $60 assures me of sustainability. This, to me, means that the program lives on and my future is secured. ”`,
      location: "Kenya",
      image: "grid/chengo-grid.png",
      category: "Housing",
      size: "big",
      hover: false,
      byline: "Chengo, Kenya"
    },
    {
      title: "Rabeca wants to open a business selling vegetables",
      text: `“I want to open a business selling vegetables to guarantee our livelihood even after the project is finished. Selling vegetables is a business that makes a lot of money in our community. Having my stall with tomatoes, onions, carrots, cabbage, and other vegetables will make a profit that can help with my household expenses.”`,
      location: "Mozambique",
      image: "grid/rabeca-grid.png",
      category: "Business",
      size: "small",
      hover: false,
      byline: "Rabeca, Mozambique"

    }
  ]

  function handleHover(index:any) {
    console.log("fired")
    stories = stories.map((story, i) => {
      if (i === index) {
        story.hover = true
      } else {
        story.hover = false
      }
      return story
    })
  }

  function handleLeave() {
    stories = stories.map((story) => {
      story.hover = false
      return story
    })
  }
  


</script>


<svelte:head>
  <title>GD: FAQ</title>
</svelte:head>

<Center
--flex-direction="column" 
  --background="var(--bg-brand)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
>
<div class="wrap">
  <div class="holder">
    <div class="title">
      <h2>People use cash to meet short-term needs and unlock future plans.</h2>
    </div>
    
      <div class="stories">
        {#each stories as story, i}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="story {story.size}" class:active={story.hover} on:mouseenter={() => handleHover(i)} on:mouseleave={() => handleLeave()}>
          {#if story.hover == true}
          <div class="recipient {story.size}" in:fade={{duration:200}} out:fade={{duration:200}}>
            <h3 in:fade={{duration:400, delay:200}}>{story.title}</h3>
            <p in:fade={{duration:400, delay:400}}>{story.text}</p>
            <div class="location" in:fade={{duration:400, delay:600}}>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.54041C6.71442 1.54041 5.45772 1.92162 4.3888 2.63585C3.31988 3.35008 2.48676 4.36524 1.99479 5.55296C1.50282 6.74068 1.37409 8.04762 1.6249 9.30849C1.8757 10.5694 2.49477 11.7276 3.40381 12.6366C4.31285 13.5456 5.47104 14.1647 6.73192 14.4155C7.99279 14.6663 9.29973 14.5376 10.4874 14.0456C11.6752 13.5537 12.6903 12.7205 13.4046 11.6516C14.1188 10.5827 14.5 9.32598 14.5 8.04041C14.4982 6.31706 13.8128 4.66481 12.5942 3.44622C11.3756 2.22763 9.72335 1.54223 8 1.54041ZM8 2.54041C9.0656 2.53927 10.1083 2.84948 11 3.43291V4.66541L9.61438 6.27416L7.6475 6.54041L7.62813 6.52666L6.39875 5.72291C6.28976 5.64613 6.16651 5.59192 6.03626 5.56347C5.90601 5.53502 5.77138 5.53291 5.6403 5.55725C5.50922 5.58159 5.38432 5.6319 5.27297 5.70521C5.16161 5.77852 5.06604 5.87337 4.99188 5.98416L3.68313 7.94041C3.5741 8.10343 3.51542 8.29491 3.51438 8.49103L3.5 10.7554L3.29563 10.8898C2.79039 10.0556 2.51603 9.10211 2.50068 8.12699C2.48532 7.15187 2.72953 6.1902 3.20826 5.34055C3.68699 4.49089 4.38303 3.78381 5.22504 3.29176C6.06706 2.79971 7.02476 2.5404 8 2.54041ZM3.89313 11.6948L4.05063 11.5917C4.18816 11.5009 4.30115 11.3776 4.37955 11.2327C4.45794 11.0878 4.49932 10.9258 4.5 10.761L4.51313 8.49666L5.82313 6.54041C5.82954 6.54534 5.83622 6.54993 5.84313 6.55416L7.0725 7.35853C7.27853 7.50394 7.53203 7.56581 7.78188 7.53166L9.75 7.26478C9.99271 7.23239 10.2151 7.11208 10.375 6.92666L11.7606 5.31666C11.9156 5.1351 12.0005 4.9041 12 4.66541V4.26978C12.6763 4.98528 13.1478 5.86942 13.3652 6.82965C13.5826 7.78989 13.5378 8.7909 13.2356 9.72791L12.2269 8.80541C12.0866 8.67668 11.9126 8.59066 11.7251 8.55745C11.5377 8.52423 11.3447 8.54521 11.1688 8.61791L9.265 9.40853C9.10582 9.47535 8.96653 9.58204 8.86056 9.71833C8.75459 9.85462 8.68552 10.0159 8.66 10.1867L8.51063 11.1985C8.47473 11.4421 8.52993 11.6903 8.66566 11.8957C8.80139 12.1011 9.00812 12.2492 9.24625 12.3117L10.5875 12.6654L10.735 12.8135C9.63975 13.4419 8.36143 13.6738 7.11526 13.47C5.86908 13.2662 4.73118 12.6393 3.89313 11.6948ZM11.5625 12.2279L11.2938 11.9585C11.1684 11.8327 11.0118 11.7425 10.84 11.6973L9.5 11.3435L9.64938 10.3317L11.5525 9.54041L12.8125 10.6954C12.4914 11.2772 12.0679 11.7964 11.5625 12.2279Z" fill="var(--icon-onbrand)"/>
                </svg>
                <span>{story.location}</span>
            </div>
            <a href="#" class="share" in:fade={{duration:250, delay:800}}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7653 5.14052L8.51531 7.39052C8.44495 7.46089 8.34951 7.50042 8.25 7.50042C8.15049 7.50042 8.05505 7.46089 7.98469 7.39052C7.91432 7.32016 7.87479 7.22472 7.87479 7.12521C7.87479 7.0257 7.91432 6.93026 7.98469 6.8599L9.59484 5.25021H7.73438C6.81968 5.24996 5.93085 5.55373 5.20765 6.11376C4.48444 6.67379 3.96789 7.45831 3.73922 8.34396C3.71435 8.44031 3.65223 8.52283 3.56652 8.57338C3.48081 8.62393 3.37854 8.63835 3.28219 8.61349C3.18584 8.58863 3.10331 8.52651 3.05277 8.4408C3.00222 8.35509 2.98779 8.25281 3.01266 8.15646C3.28248 7.10952 3.89286 6.18206 4.74768 5.52013C5.60251 4.85819 6.65323 4.49939 7.73438 4.50021H9.59578L7.98469 2.89052C7.94985 2.85568 7.92221 2.81432 7.90335 2.76879C7.8845 2.72327 7.87479 2.67448 7.87479 2.62521C7.87479 2.57594 7.8845 2.52714 7.90335 2.48162C7.92221 2.4361 7.94985 2.39474 7.98469 2.3599C8.05505 2.28953 8.15049 2.25 8.25 2.25C8.29927 2.25 8.34806 2.25971 8.39359 2.27856C8.43911 2.29742 8.48047 2.32505 8.51531 2.3599L10.7653 4.6099C10.8002 4.64472 10.8278 4.68608 10.8467 4.73161C10.8656 4.77713 10.8753 4.82593 10.8753 4.87521C10.8753 4.92449 10.8656 4.97329 10.8467 5.01881C10.8278 5.06434 10.8002 5.10569 10.7653 5.14052ZM9 9.75021H1.875V4.12521C1.875 4.02575 1.83549 3.93037 1.76517 3.86004C1.69484 3.78972 1.59946 3.75021 1.5 3.75021C1.40054 3.75021 1.30516 3.78972 1.23483 3.86004C1.16451 3.93037 1.125 4.02575 1.125 4.12521V9.75021C1.125 9.94912 1.20402 10.1399 1.34467 10.2805C1.48532 10.4212 1.67609 10.5002 1.875 10.5002H9C9.09946 10.5002 9.19484 10.4607 9.26517 10.3904C9.33549 10.32 9.375 10.2247 9.375 10.1252C9.375 10.0258 9.33549 9.93037 9.26517 9.86004C9.19484 9.78972 9.09946 9.75021 9 9.75021Z" fill="var(--icon-onbrand)"/>
              </svg>
              <span>Share</span>
            </a>
          </div>
          {:else}
          <div class="teaser" in:fade={{duration:200}} out:fade={{duration:150}}>
            {story.byline}
          </div>
          {/if}
          
          <div class="photo-holder">
            <div class="photo" in:fade={{duration:300}}>
              <ImageLoader 
              src="/website/stories/{story.image}" 
              alt=""
              skeleton={true} 
              fit={false} 
              skip={false}
              fullwidth={true} 
              width="100%" 
              height="544"
              --radius="8px"
            ></ImageLoader>
            </div>
          </div>
        </div>
        {/each}
      </div>
    
  </div>
    
  
</div>
</Center>

<style lang="scss">

  @import "../../../../donor";

  $height: 48px;
  $radius: 8px;
  $width: 1040px;
  $width-small: 880px;

  .wrap {
    background: var(--bg-secondary);
    width: 100%;
  }

  .holder {
    max-width: $width;
    width: 100%;
    margin: 0 auto;
    padding: var(--42px) 0 calc(var(--96px) * 2);
  }

  .title {
    max-width: 550px;
    margin: 0 auto;

    h2 {
      text-align: center;
      color: var(--text-brand);
      margin-bottom: var(--48px);
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

  .share {
    position: absolute;
    right: var(--16px);
    top: var(--16px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    height: var(--24px);
    gap: 6px;
    text-align: center;
    justify-content: center;
    border: 1px solid var(--border-tertiary);
    color: var(--text-onbrand);
    border-radius: var(--24px);
    font-size: var(--12px);
    z-index: 999999;
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:focus-visible {
      border-color: transparent;
      box-shadow: 0 0 0 1px var(--border),0 0 0 3px var(--border-brand), 0 0 0 4px var(--border);
      outline: 0;
    }
  }

  .teaser {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: var(--24px);
    color: var(--white);
    width: 100%;
    z-index: 9999999;
    font-weight: 500;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  }

  .stories {
    --gap: var(--24px);
    // display: grid;
    // grid-template-columns: repeat(8, 1fr);
    // gap: var(--16px);
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: var(--gap);

    .big {
      // grid-column: span 5;
      flex: 0 0 calc(66.67% - var(--gap) / 2);
    }

    .small {
      // grid-column: span 3;
      flex: 0 0 calc(33.33% - var(--gap) / 2);
    }
  }

  .photo-holder {
    position: relative;
    // border-radius: 8px;
    overflow: hidden;

    .photo {
      // min-width: 368px;
      position: relative;
      border-radius: 8px;
      z-index: 100;
      transition: all 0.2s ease-in-out;

      // &:hover {
      //   transform-origin: center  center;
      //   transform: translate3d(20px, 30px, 0) rotate(3deg);
      // }
    }
  }

  .story {
    position: relative;
    overflow: hidden;
    transform: translate3d(0,0,0);
    border-radius: 8px;
    backface-visibility: hidden;
    transition: all 0.2s ease-in-out;
    // -webkit-mask-image: -webkit-radial-gradient(white, black);
    // mask-image: radial-gradient(white, black);
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
              0 2px 2px hsl(0deg 0% 0% / 0.075),
              0 4px 4px hsl(0deg 0% 0% / 0.075),
              0 8px 8px hsl(0deg 0% 0% / 0.075),
              0 16px 16px hsl(0deg 0% 0% / 0.075);
    &.active {
      box-shadow: none;
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      mask-image: radial-gradient(white, black);


      .photo-holder {
        filter: saturate(0);
      }

    }
  }

  .story-buttons-holder {
    display: flex;
    justify-content: center;
  }

  

  .recipient {
    // background: hsla(43, 37%, 96%,0.9);
    background: hsla(166, 81%, 19%, 0.95);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 0 var(--48px);
    gap: var(--16px);
    border-radius: $radius;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;

    &.big {
      padding: 0 var(--64px);
    }

    h3 {
      // color: var(--text);
      color: var(--text-onbrand);
      font-size: var(--22px);
      line-height: 1.2;
      text-wrap: pretty;
      text-wrap: balance;
    }

    p {
      // color: var(--text-muted);
      color: var(--text-onbrand);
      opacity: 0.9;
      font-size: var(--16px);
      text-wrap: pretty;
    }

    .location {
      display: flex;
      gap: 6px;
      // color: var(--text-muted);
      color: var(--text-onbrand);
      font-size: var(--14px);
      font-weight: 500;
      align-items: center;

      svg {
        display: flex;
      }
    }

    

  }


</style>