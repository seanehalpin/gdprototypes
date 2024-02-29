<script lang="ts">
  export let image = "", name = "", quote = ""
</script>

<div class="story">
  <div class="top">
    <img src={image} alt={name} />
  </div>
  <div class="bottom">
    <p>
      {quote}
    </p>
    <span>
      {name}
    </span>
  </div>
</div>


<style lang="scss">

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