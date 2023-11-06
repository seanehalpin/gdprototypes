<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let transition = quartOut

  let links = [
    {title: "About", chevron: true, active: false},
    {title: "Programs", chevron: true, active: false},
    {title: "Evidence", chevron: true, active: false},
    {title: "Recipients", chevron: false, active: false},
    {title: "Blog", chevron: false, active: false},
    {title: "How to Help", chevron: true, active: false},
  ]


  let aboutActive = false;

  const hoverLink = (clicked: string) => {
    
    // when link is clicked set clicked liked to true and all others to false
    links = links.map(link => {
      if (link.title === clicked) {
        return {...link, active: true}
      } else {
        return {...link, active: false}
      }
    })
    links = links

    if(clicked === "About") {
      aboutActive = true;
    } else {
      aboutActive = false;
    }

  }

</script>


<svelte:head>
  <title>GD: Menu exploration</title>
</svelte:head>

<Center>
  <div class="menu">
    <div class="links">
      {#each links as link}
      <button class="link" class:chevron={link.chevron} class:active={link.active} on:mouseenter={() => hoverLink(link.title)}>
        {link.title}
      </button>
      {/each}
    </div>

    {#if aboutActive}
      <div class="mega" in:fly|local={{y: 10, duration:250, easing: transition}} out:fly|local={{y: 10, duration:250, easing: transition}}>
        <div class="column">
          <div class="title">Our Work</div>
          <a href="#" class="sub-link">What we do</a>
          <a href="#" class="sub-link">Financials</a>
          <a href="#" class="sub-link">FAQ</a>
        </div>
        <div class="column">
          <div class="title">Our Team</div>
          <a href="#" class="sub-link">People</a>
          <a href="#" class="sub-link">Values</a>
          <a href="#" class="sub-link">Funders and Partners</a>
          <a href="#" class="sub-link">Careers</a>
        </div>

        <div class="column divider"></div>

        <div class="column last">
          <div class="title">Why Poverty?</div>
          <a href="#" class="sub-link image">
            <span>No one should live on $2.15 per day</span>
            <img src="/mega/why-poverty.png" alt="">

            <div class="learn">
              Learn more
            </div>
          </a>
        </div>
      </div>
    {/if}
  </div>
</Center>

<style lang="scss">

  $active: #F8F8F8;
  $mega: #f2f2f2;
  // $hover: darken($active, 3%);
  $hover: #fff;

  .menu {
    position: relative;
  }

  .links {
    display: flex;
    gap: 20px;
    position: relative;
  }

  .link {
    font-size: var(--16px);
    font-weight: 500;
    border: 0;
    background: none;
    color: var(--color-text);
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    height: 40px;
    padding: 0 var(--14px);
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.25s ease-in-out;

    &.chevron {
      padding: 0 var(--24px) 0 var(--14px);

      &:before {
        content: "";
        position: absolute;
        right: 14px;
        top: 51%;
        width: 5px;
        height: 2px;
        background: var(--grey-300);
        transform: rotate(45deg) translateY(-50%);
      }
      &:after {
        content: "";
        position: absolute;
        right: 10px;
        top: 51%;
        width: 5px;
        height: 2px;
        background: var(--grey-300);
        transform: rotate(-45deg) translateY(-50%);
      }
    }

    &.active {
      background: $active;
      color: var(--green-600);
    }

    &:hover {
      background: $active;
    }
  }

  .mega {
    position: absolute;
    top: calc(100% + 4px);
    border-radius: 8px;
    left: 0;
    // width: 500px;
    // height: 300px;
    background: $active;
    // box-shadow: 0 4px 8px rgba(0,0,0,.05);
    padding: var(--20px);
    display: flex;
    gap: 20px;
  }

  .column {
    display: flex;
    flex-direction: column;
    font-size: var(--16px);

    &.last {
      flex: 1;
    }
  }

  .divider {
    width: 1px;
    background: var(--grey-100);
    margin-left: var(--16px);
  }

  .title {
    padding: 0 var(--16px);
    font-weight: 500;
    margin-bottom: 8px;
  }

  .sub-link {
    padding: 0 var(--16px);
    height: 40px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--grey-500);
    border-radius: 8px;
    transition: all 0.25s ease-in-out;
    min-width: 140px;
    text-wrap: nowrap;
    position: relative;
  
    &.image {
      align-items: flex-start;
      height: auto;
      flex-direction: column;
      gap: var(--16px);
      font-size: var(--font-md);
      padding: calc(var(--16px) / 2) var(--16px) var(--16px);
      
      &:hover {
        background: none;

        .learn {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      img {
        border-radius: 8px;
        // margin-top: var(--16px);
      }

      .learn {
        transition: all 0.25s ease-in-out;
        opacity: 0;
        transform: translate3d(0, 10px, 0);
        position: absolute;
        left: 24px;
        font-weight: 500;
        bottom: 24px;
        color: var(--green-600);
        z-index: 100;
        background: var(--white);
        padding: 0 calc(var(--16px) / 2);
        height: 30px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

    }

    &:hover {
      background: $hover;
      color: var(--green-600);
    }
  }


</style>