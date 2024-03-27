<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let transition = quartOut
  let email = '';
  let firstName = '';
  let emailError = false
  let firstNameError = false

  function handleSubmit() {
    if (email.trim() === '') {
      emailError = true
    }

    if (firstName.trim() === '') {
      firstNameError = true
    }

    if (emailError || firstNameError) {
      return;
    }
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
      <h2>Newsletter sign up</h2>
      <p>
        Sign up and stay informed about stories from recipients, exclusive event invites, and research updates.
      </p>
    </div>
    <form on:submit|preventDefault={handleSubmit} class="form">
      <div class="input-holder">
        <input bind:value={email} type="text" class="input" class:error={emailError} placeholder="Email address*">
        {#if emailError}
          <p class="error-text" in:fade={{duration:250}}>Please enter a valid email address</p>
        {/if}
      </div>
      <div class="input-holder">
      <input bind:value={firstName} type="text" class="input" class:error={firstNameError} placeholder="First Name*">
      {#if firstNameError}
        <p class="error-text" in:fade={{duration:250}}>Please enter your first name</p>
      {/if}
      </div>
      <button class="button">Sign Up</button>
    </form>
  </div>
  

</Center>

<style lang="scss">

  @import "../../../../donor";
  @import "../../../../mixins";

  $height: 48px;
  $radius: 8px;

  .holder {
    max-width: 880px;
    width: 100%;
    margin: 0 auto;
    padding: var(--96px) var(--16px) 0;
  }

  h2 {
    text-align: center;
    color: var(--text);
    margin-bottom: var(--16px);
    font-size: var(--32px);
  }

  p {
    text-align: center;
    color: var(--text-muted);
    margin-bottom: var(--32px);
  }

  .error-text {
    text-align: left;
    font-size: var(--font-sm);
    color: var(--red-600);
    padding: 4px 0 0;
    margin: 0;
  }

  form {
    display: flex;
    gap: calc(var(--16px) / 2);
    flex-direction: column;

    @include md {
      flex-direction: row;
    }
  }

  .input-holder {
    width: 100%;
    flex: 1;
    position: relative;
  }

  input {
    width: 100%;
    flex: 1;
    height: $height;
    border-radius: $radius;
    border: 1px solid var(--border-tertiary);
    background: var(--bg);
    color: var(--text);
    padding: 0 var(--16px);
    font-size: var(--16px);
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
      border-color: var(--border-active);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
    }

    &.error {
      border: 1px solid var(--red-600);
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $height;
    background: var(--bg-brand);
    color: var(--text-onbrand);
    font-weight: 600;
    font-size: var(--16px);
    border: 0;
    border-radius: $radius;
    padding: 0 var(--32px);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:active {
      transform: translateY(2px);
    }
  }

  input {
    &:focus-visible {
      border-color: transparent;
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

  button {
    &:focus-visible {
      // box-shadow: none;
      // outline: 2px solid var(--border-brand);
      outline: 0;
      box-shadow: 0 0 0 1px var(--bg), 0 0 0 3px var(--bg-brand);
      // outline-offset: 2px;
      // border-radius: 6px;
    }
    &:active {
      // outline: 0;
    }
  }


</style>