<script lang="ts">

  export let story = []

</script>

<div class="grid">
{#each story as story}
  <div class="story">
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
{/each}
</div>

<style lang="scss">

  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    // grid-template-columns: repeat(auto-fill, minmax(640px, 1fr));
    gap: 1rem;
    padding: 0.5rem;
  }

  .story {
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    font-family: var(--systemFont);

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