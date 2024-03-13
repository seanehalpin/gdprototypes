<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import Qa from '$lib/components/website/Qa.svelte';
  import type { PageData } from './$types';
  import ImageLoader from '$lib/util/image/Loader.svelte'
    import { active } from 'd3';
  export let data: PageData;

  let transition = quartOut

  let cards = [
    {
      image: "/times.png",
      content: "The future of not working, UBI in Kenya",
      link: "#",
      active: false,
    },
    {
      image: "/npr.png",
      content: "Charity To Amp Up Direct Aid Mission In Impoverished East Africa",
      link: "#",
      active: false,
    },
    {
      image: "/canva.png",
      content: "Uplifting people from extreme poverty: the next step in our journey with GiveDirectly",
      link: "#",
      active: false,
    },
    {
      image: "/slate.png",
      content: "What If We Just Gave Poor People a Basic Income for Life?",
      link: "#",
      active: false,
    },
    {
      image: "/vox.png",
      content: "How a basic income experiment helped these Kenyans weather the Covid-19 crisis",
      link: "#",
      active: false,
    }
  ]

  function handleHover(index:any) {
    console.log("fired")
    cards = cards.map((card, i) => {
      if (i === index) {
        return { ...card, active: true };
      } 
      else {
        return { ...card, active: false };
      }
    });
  }
  function resetActive() {
    cards = cards.map(card => ({ ...card, active: false }));
  }

</script>


<svelte:head>
  <title>GD: FAQ</title>
</svelte:head>

<Center
--flex-direction="column" 
  --background="var(--bg-secondary)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
>
  <div class="holder">
    <div class="title">
      <h2>News</h2>
    </div>
    <div class="cards">
      {#each cards as card, index}
      <a class="card" class:active={card.active} href={card.link} on:mouseenter={() => handleHover(index)} on:mouseleave={() => resetActive()} on:focusin={() => handleHover(index)} on:focusout={() => resetActive()}>
        <div class="image">
          <ImageLoader 
          src="/website/news/{card.image}" 
          alt=""
          skeleton={false} 
          fit={false} 
          skip={false}
          fullwidth={false} 
          width="50" 
          height="50"
        ></ImageLoader>
        </div>
        <p>{card.content}</p>

      <div class="tooltip" class:active={card.active}>
        <span>
          Read
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0.555538V7.77754C10 7.92487 9.94147 8.06618 9.83729 8.17036C9.7331 8.27455 9.5918 8.33308 9.44446 8.33308C9.29712 8.33308 9.15582 8.27455 9.05164 8.17036C8.94745 8.06618 8.88892 7.92487 8.88892 7.77754V1.89647L0.948891 9.8372C0.844649 9.94144 0.703267 10 0.555847 10C0.408427 10 0.267045 9.94144 0.162804 9.8372C0.0585623 9.73295 0 9.59157 0 9.44415C0 9.29673 0.0585623 9.15535 0.162804 9.05111L8.10353 1.11108H2.22246C2.07512 1.11108 1.93382 1.05255 1.82964 0.948363C1.72545 0.84418 1.66692 0.702876 1.66692 0.555538C1.66692 0.4082 1.72545 0.266897 1.82964 0.162714C1.93382 0.0585299 2.07512 0 2.22246 0H9.44446C9.5918 0 9.7331 0.0585299 9.83729 0.162714C9.94147 0.266897 10 0.4082 10 0.555538Z" fill="var(--icon-brand)"/>
          </svg>
      </div>

      </a>
      {/each}
    </div>
  </div>
  

</Center>

<style lang="scss">

  $height: 48px;
  $radius: 8px;

  .holder {
    max-width: 880px;
    width: 100%;
    margin: 0 auto;
    padding-top: 100px;
    
  }

  h2 {
    text-align: center;
    color: var(--text);
    margin-bottom: var(--32px);
    font-size: var(--32px);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: calc(var(--16px) / 2);
  }

  .card {
    background: var(--bg);
    border: 1px solid var(--border-tertiary);
    border-radius: 8px;
    padding: var(--16px) var(--16px) var(--48px);
    display: flex;
    flex-direction: column;
    gap: var(--24px);
    justify-content: flex-start;
    position: relative;
    text-decoration: none;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
      border-color: var(--border-active);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);

      // .tooltip {
      //   opacity: 1;
      //   transform: translate3d(0, 0, 0);
      // }
    }

    .image {
      width: 50px;
    }

    p {
      color: var(--text-muted);
      text-decoration: none;
      text-wrap: pretty;
    }


    .tooltip {
      transform: translate3d(0, 4px, 0);
      transition: all 0.2s ease-in-out;
      opacity: 0;
      font-size: var(--14px);
      color: var(--text-brand);
      background: var(--bg-secondary);
      display: flex;
      position: absolute;
      right: 12px;
      bottom: 12px;
      padding: 0 12px;
      font-weight: 500;
      height: var(--32px);
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 8px;

      &.active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    // &:focus-visible {
    //   outline: 2px solid var(--bg-brand);
    //   outline-offset: 1px;
    //   border-radius: 6px;
    // }
    // &:active {
    //   outline: 0;
    // }

    &:focus-visible {
      box-shadow: 0 0 0 1px var(--border-brand), 0 0 0 4px var(--focus);
      outline: 0;
      // outline: 4px solid var(--focus);
      // outline-offset: 0px;
      // border-radius: 6px;
    }
    &:active {
      // outline: 0;
    }

  }


  

  

</style>