<script lang="ts">

  import { fade, fly, slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let name = "GiveDirectly"

  export let qa = [
    {
      id: 0, 
      question: `How can I donate?`, 
      answer: `Donations made through this page will be directed to “Poverty relief – Africa”, which can fund any cash transfer program in Africa. In 2023, 85% of this funding was allocated to large transfer programs. The remainder helped fund basic income and emergency relief programs in Africa. 
      <br/><br/>
      If you’d like to restrict your donation to our large transfer programs, you can email us.
      <br/><br/>
      You can explore and support our other cash programs here.`, 
      open: false
    },
    {
      id: 1, 
      question: `What is ${name}?`, 
      answer: `GiveDirectly is a nonprofit that lets donors send money directly to the world’s poorest, no-strings-attached. We have delivered cash aid to 1.5M people across 13 countries, including crises and natural disaster responses.`, 
      open: false
    },
    {
      id: 2, 
      question: `Is my gift tax-deductible?`, 
      answer: `Yes, donations are tax-deductible in the United States – you can give through one of our international partners to receive tax benefits outside the U.S.. GiveDirectly is a registered 501(c)(3), and our U.S. federal EIN is 27-1661997.
      <br/><br/>
      We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, ACH, checks, wires, stocks, cryptocurrencies, and more. Reach out to us at info@givedirectly.org for more information on ways to give.`, 
      open: false
    },
  ]

  function toggle(id: number) {
    qa = qa.map(q => {
      if(q.id === id) {
        q.open = !q.open
      }
      return q
    })
  }

  let ready = false

  onMount(() => {
    ready = true
  })

</script>

{#if ready}
<div class="qa-title">
  <h2>Frequently Asked Questions</h2>
</div>
<div class="qa-list">
  {#each qa as qa, i}
  <div class="qa">
    <div class="question is-open-{qa.open}" role="button" on:click={() => toggle(qa.id)} tabindex="-1" on:keypress={() => toggle(qa.id)}>
      {qa.question}
      <button class="question-icon is-open-{qa.open}" aria-label="Expand answer" on:click={() => toggle(qa.id)}></button>
    </div>
    {#if qa.open}
      <div class="answer" role="button" in:slide|local={{duration:250}} out:slide|local={{duration:250}}>
        <div in:fade|local={{duration:250, delay: 200}} out:fade|local={{duration:200}}>
          {@html qa.answer}
        </div>
      </div>
    {/if}
  </div>
  {/each}
</div>
{/if}

<style lang="scss">
  @import "../../../donor";
  @import "../../../mixins";

  .qa-title {

    h2 {
      font-size: var(--32px);
      text-align: center;
      margin-bottom: var(--32px);
    }
  }

  .qa-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .qa {
    border-bottom: 1px solid var(--border-tertiary);
    // padding: var(--24px) 0;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &:last-child {
      border-bottom: 0;
    }
  }

  .question {
    position: relative;
    // height: 40px;
    display: flex;
    align-items: center;
    font-size: var(--16px);
    font-weight: 500;
    font-family: var(--boldFont);
    color: var(--text);
    width: 100%;
    cursor: pointer;
    padding: var(--24px);
    transition: all 0.2s ease-in-out;
    max-width: var(--767px);
    font-weight: 600;

    &:hover {
      color: var(--text);
    }

    &.is-open-true {
      color: var(--text);
    }
  }

  .answer {
    padding: 0 var(--24px) var(--24px);
    font-size: var(--16px);
    color: var(--text-muted);
    width: 100%;
    max-width: var(--767px);

  }

  :global(.answer a) {
    text-decoration: underline;
    color: var(--text-brand);
  }

  .question-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: 0;
    border: 0;
    position: absolute;
    right: 20px;
    top: 22px;
    transition: all 0.2s ease-in-out;
    border-radius: 8px;
    width: 30px;
    height: 30px;
    pointer-events: none;

    &:before {
      content: "";
      width: 2px;
      height: 15px;
      position: absolute;
      left: calc(50% - 1px);
      top: calc(50% - 8.5px);
      background: var(--icon);
      transition: all 0.2s ease-in-out;
      pointer-events: none;
    }

    &:after {
      content: "";
      width: 15px;
      height: 2px;
      position: absolute;
      left: calc(50% - 7.5px);
      top: calc(50% - 2px);
      background: var(--icon);
      transition: all 0.2s ease-in-out;
      pointer-events: none;
    }


    &.is-open-true {
      // transform: rotate(45deg);

      &:after {
        transform: rotate(180deg);
        background: var(--icon-brand);
      }

      &:before {
        transform: rotate(90deg);
        background: var(--icon-brand);
      }
    }
    
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