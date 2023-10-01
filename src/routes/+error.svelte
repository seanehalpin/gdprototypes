<script lang="ts">

</script>

<div class="util-center">
  <div class="block">
    <h1>Whoopsie 404</h1>
    <p>Womp womp, this page doesn't exist.</p>
    <a href="/">Go back</a>
  </div>
</div>

<style lang="scss">

  @import "../mixins";

  .util-center {
    @include dm {
      background: var(--color-green-1);
    }
  }

  .block {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    gap: 10px;

    @include dm {
      color: var(--color-green-7);
    }
  }

  a {
    color: var(--proto-text-active);

    @include dm {
      color: var(--color-green-6);
    }
  }

</style>
