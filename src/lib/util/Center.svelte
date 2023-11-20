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
    background: var(--proto-bg-secondary);
    --_flex-direction: var(--flex-direction, row);
    flex-direction: var(--_flex-direction);
    --_background: var(--background, transparent);
    background: var(--_background);
    --_gap: var(--gap, 0);
    gap: var(--_gap);
  }

</style>