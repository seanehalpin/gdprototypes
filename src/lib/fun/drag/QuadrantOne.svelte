<script lang="ts">
  import {onMount} from 'svelte';
  import { fade, fly } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"
    import Logo from './Logo.svelte';
  
  export let story = []

  let ready = false

  onMount(() => {
    ready = true
  })

</script>
{#if ready}
<div class="grid" in:fly|local={{y:50, duration:1000, delay: 400}}>
  {#each story as story, i}
  {#if story.intro}
    <div class="intro">
      <Logo --fill="#fff"/>
      <h1>Together, we can end extreme poverty in our lifetimes.</h1>
      <p>Today, 690 million people are living on less than $2.15/day, and cash transfers are a proven way to accelerate their escape from poverty. By delivering your donations and studying the impact, we aim to demonstrate a path to ending extreme poverty.
      </p>
      <button>Donate now</button>

      <div class="tooltip">
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.1875 6.25008C14.8228 6.24955 14.4638 6.3409 14.1437 6.5157C14.0281 6.15744 13.8219 5.83509 13.5452 5.57984C13.2685 5.32458 12.9306 5.14506 12.5642 5.05864C12.1978 4.97223 11.8153 4.98183 11.4536 5.08654C11.092 5.19124 10.7636 5.3875 10.5 5.65633C10.1959 5.34592 9.80616 5.13313 9.38059 5.0451C8.95502 4.95708 8.51288 4.9978 8.11056 5.16209C7.70823 5.32637 7.36395 5.60676 7.12163 5.96751C6.87931 6.32825 6.74994 6.753 6.75 7.18758V8.75008H5.8125C5.23234 8.75008 4.67594 8.98054 4.2657 9.39078C3.85547 9.80102 3.625 10.3574 3.625 10.9376V11.8751C3.625 13.6984 4.34933 15.4471 5.63864 16.7364C6.92795 18.0257 8.67664 18.7501 10.5 18.7501C12.3234 18.7501 14.072 18.0257 15.3614 16.7364C16.6507 15.4471 17.375 13.6984 17.375 11.8751V8.43758C17.375 7.85741 17.1445 7.30102 16.7343 6.89078C16.3241 6.48054 15.7677 6.25008 15.1875 6.25008ZM16.125 11.8751C16.125 13.3669 15.5324 14.7977 14.4775 15.8526C13.4226 16.9074 11.9918 17.5001 10.5 17.5001C9.00816 17.5001 7.57742 16.9074 6.52252 15.8526C5.46763 14.7977 4.875 13.3669 4.875 11.8751V10.9376C4.875 10.6889 4.97377 10.4505 5.14959 10.2747C5.3254 10.0988 5.56386 10.0001 5.8125 10.0001H6.75V11.8751C6.75 12.0408 6.81585 12.1998 6.93306 12.317C7.05027 12.4342 7.20924 12.5001 7.375 12.5001C7.54076 12.5001 7.69973 12.4342 7.81694 12.317C7.93415 12.1998 8 12.0408 8 11.8751V7.18758C8 6.93894 8.09877 6.70048 8.27459 6.52466C8.4504 6.34885 8.68886 6.25008 8.9375 6.25008C9.18614 6.25008 9.4246 6.34885 9.60041 6.52466C9.77623 6.70048 9.875 6.93894 9.875 7.18758V9.37508C9.875 9.54084 9.94085 9.69981 10.0581 9.81702C10.1753 9.93423 10.3342 10.0001 10.5 10.0001C10.6658 10.0001 10.8247 9.93423 10.9419 9.81702C11.0592 9.69981 11.125 9.54084 11.125 9.37508V7.18758C11.125 6.93894 11.2238 6.70048 11.3996 6.52466C11.5754 6.34885 11.8139 6.25008 12.0625 6.25008C12.3111 6.25008 12.5496 6.34885 12.7254 6.52466C12.9012 6.70048 13 6.93894 13 7.18758V9.37508C13 9.54084 13.0658 9.69981 13.1831 9.81702C13.3003 9.93423 13.4592 10.0001 13.625 10.0001C13.7908 10.0001 13.9497 9.93423 14.0669 9.81702C14.1842 9.69981 14.25 9.54084 14.25 9.37508V8.43758C14.25 8.18894 14.3488 7.95048 14.5246 7.77466C14.7004 7.59885 14.9389 7.50008 15.1875 7.50008C15.4361 7.50008 15.6746 7.59885 15.8504 7.77466C16.0262 7.95048 16.125 8.18894 16.125 8.43758V11.8751Z"/>
          </svg>
          
        <span>
          Move to explore stories
        </span>
        </div>
    </div>
    {:else}
    <div class="story" >
      <div class="top">
        <img src={story.image} alt={story.name} />
      </div>
      <div class="bottom">
        <p>
          {story.quote}
        </p>
        <span>
          {story.name}
        </span>
      </div>
    </div>
    {/if}
  {/each}
</div>
{/if}

<style lang="scss">

  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    padding: 0.5rem;
  }

  .intro {
    border-radius: 16px;
    padding: var(--42px);
    background: var(--green-600);
    position: relative;

    h1 {
      color: #fff;
      line-height: 120%;
      margin: 0;
      padding: var(--96px) 0 var(--20px) 0;
      text-wrap: balance;
      user-select: none;
    }

    p {
      font-size: var(--16px);
      text-wrap: pretty;
      color: #fff;
      opacity: 0.95;
      margin-bottom: var(--32px);
      user-select: none;
    }
    button {
      background: #fff;
      border: 0;
      font-weight: 500;
      // color: #262626;
      color: var(--green-600);
      border-radius: var(--20px);
      height: var(--42px);
      display: flex;
      font-size: var(--16px);
      align-items: center;
      justify-content: center;
      padding: 0 var(--24px);
      cursor: pointer;
    }

    .tooltip {
      position: absolute;
      left: var(--42px);
      bottom: var(--42px);
      font-size: var(--14px);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      user-select: none;
      cursor: grab;
      // margin-top: var(--48px);
      transition: all 0.2s ease-in-out;

      svg {
        fill: #fff;
        animation: bobble 4s ease-in-out infinite;
      }

      @keyframes bobble {
        0% {
          transform: translateY(0);
        }
        70% {
          transform: translateY(0);
        }
        80% {
          transform: translateY(4px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }

  .story {
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    font-family: var(--systemFont);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 3px 4px rgba(0, 0, 0, 0.05);

    img {
      width: 100%;
      height: auto;
      user-select: none;
      pointer-events: none;
      -webkit-user-select: none;
    }

    .bottom {
      padding: var(--48px);
      display: flex;
      width: 100%;
      gap: var(--16px);
      flex-direction: column;

      p {
        font-size: var(--16px);
        color: #262626;
        font-weight: 500;
        user-select: none;
        pointer-events: none;
        -webkit-user-select: none;
      }

      span {
        display: block;
        font-size: var(--14px);
        color: #262626;
        user-select: none;
        pointer-events: none;
        -webkit-user-select: none;
      }
    }
  }

</style>