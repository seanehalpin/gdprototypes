<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import Qa from '$lib/components/website/Qa.svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let transition = quartOut

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
    <form action="" class="form">
      <input type="text" class="input" placeholder="Email address">
      <input type="text" class="input" placeholder="First Name">
      <button class="button">Sign Up</button>
    </form>
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
    margin-bottom: var(--16px);
    font-size: var(--32px);
  }

  p {
    text-align: center;
    color: var(--text-muted);
    margin-bottom: var(--32px);
  }

  form {
    display: flex;
    gap: calc(var(--16px) / 2);
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
  }

  input {
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