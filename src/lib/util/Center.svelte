<script lang="ts">

</script>

<div class="center">
<slot></slot>
</div>

<style lang="scss">

  .center {
    width: 100%;
    height: 100%;
    display: flex;
    --_justify-content: var(--justify-content, center);
    justify-content: var(--_justify-content);
    align-items: center;
    --_background: var(--background, var(--proto-bg-secondary));
    background: var(--_background);
    --_flex-direction: var(--flex-direction, row);
    flex-direction: var(--_flex-direction);
    --_background: var(--background, transparent);
    background: var(--_background);
    --_gap: var(--gap, 0);
    gap: var(--_gap);
    --_overflow: var(--overflow, initial);
    overflow: var(--_overflow);
    --_padding: var(--padding, 0);
    padding: var(--_padding);
  }

</style>