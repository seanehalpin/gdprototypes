<script lang="ts">
  import { onMount } from 'svelte'
  import Highlight, { LineNumbers } from "svelte-highlight";
  import css from "svelte-highlight/languages/css";
  import js from "svelte-highlight/languages/typescript";
  import base from "svelte-highlight/styles/atom-one-light";

  export let lang = css
  export let code = `const a = 1;`;

</script>

<svelte:head>
  {@html base}
</svelte:head>

<div class="highlight">

  <Highlight language={lang} {code} langtag let:highlighted>
    <LineNumbers 
    {highlighted} 
    --line-number-color="rgba(255, 255, 255, 0.3)"
    --border-color="rgba(255, 255, 255, 0.1)"
    />
  </Highlight>

</div>

<style lang="scss">

  .highlight {
    width: 100%;
    margin: 0;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.1);
  }

</style>