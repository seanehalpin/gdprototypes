<script lang="ts">
  
  // imports
  import { onMount } from 'svelte'
  import AppNav from '$lib/app/AppNav.svelte'
  import { nav } from '$lib/Nav'
  import '../../reset.scss'
  import '../../app.scss'

  // variables
  let ready = false
  let minimized = false

  // functions
  onMount(() => {
    ready = true 
  })

</script>

{#if ready}
  <div class="grid" class:minimized={minimized}>
    <AppNav bind:minimized groups={$nav} />
    <main>
      <slot />
    </main>
  </div>
{/if}

<style lang="scss">

  .grid {
    display: grid;
    grid-template-columns: var(--proto-width) 1fr;

    &.minimized {
      grid-template-columns: 1fr;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: 100vh;
    position: relative;
    overflow-y: auto;
  }

  .util-center {
    width: 100vw;
    height: 100vh;
    background: var(--proto-bg-primary);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: calc(var(--proto-16px) / 2);
    // padding: var(--proto-64px);
    width: 100%;
    max-width: 400px;
    // border-radius: var(--proto-radius);
    // background: var(--proto-bg-secondary);
    // box-shadow: 0 0 0 1px var(--proto-bg-secondary);

    label {
      font-size: var(--font-sm);
      color: var(--proto-text-primary);
      font-weight: 700;
    }

    .input-password {
      background: var(--proto-bg-primary);
      color: var(--proto-text-primary);
      border: 0;
      border-radius: var(--proto-radius);
      font-size: var(--font-md);
      width: 100%;
      display: flex;
      height: 34px;
      box-shadow: 0 0 0 1px var(--proto-bg-secondary);
      padding: 0 var(--proto-16px);

      &:active, &:focus {
        outline: 0;
        box-shadow: 0 0 0 2px var(--proto-bg-primary), 0 0 0 4px var(--proto-bg-accent);
      }
    }
  }

  button {
    background: var(--proto-bg-accent);
    color: var(--proto-text-active);
    border: 0;
    padding: 0;
    margin: 0;
    border-radius: var(--proto-radius);
    display: flex;
    width: 100%;
    font-weight: 700;
    font-size: var(--font-md);
    align-items: center;
    justify-content: center;
    height: 34px;
    margin-top: calc(var(--proto-16px) / 2);
    cursor: pointer;
  }

</style>
