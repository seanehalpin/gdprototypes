<script lang="ts">
  import { onMount } from 'svelte'
  import { fade, fly, scale } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"
  import ImageLoader from '$lib/util/image/Loader.svelte'
  import Alert from '$lib/svg/pathway/Alert.svelte';
    import LogoSmall from '$lib/svg/pathway/Logo-small.svelte';
    import Dashboard from '$lib/components/pathway/Dashboard.svelte';
    import LogoOld from '$lib/svg/pathway/LogoOld.svelte';
    import LogoNew from '$lib/svg/pathway/LogoNew.svelte';

  let ready = false

  onMount(() => {
    ready = true
  });

  const swatches = [
    {swatch: 'sandstone'},
    {swatch: 'pine'},
    {swatch: 'lime'},
    {swatch: 'cyan'},
    {swatch: 'lemon'},
    {swatch: 'ruby'},
    {swatch: 'orange'},
  ]

  const alert = [
    {color: 'cyan'},
    {color: 'lemon'},
    {color: 'ruby'},
    {color: 'orange'},
  ]

  const buttons = [
    {color: 'pine',copy: 'Donate'},
    {color: 'ruby',copy: 'Error'},
    {color: 'orange',copy: 'Give now'},
  ]

  const scaler = [
    {indicator: 'XXXXL', size: 'var(--ui-f9)'},
    {indicator: 'XXXL', size: 'var(--ui-f8)'},
    {indicator: 'XXL', size: 'var(--ui-f7)'},
    {indicator: 'XL', size: 'var(--ui-f6)'},
    {indicator: 'L', size: 'var(--ui-f5)'},
    {indicator: 'M', size: 'var(--ui-f4)'},
    {indicator: 'R', size: 'var(--ui-f3)'},
    {indicator: 'S', size: 'var(--ui-f2)'},
    {indicator: 'XS', size: 'var(--ui-f1)'},
  ]

  const sizer = [
    {size: 'var(--ui-s-6)', label: '-s6'},
    {size: 'var(--ui-s-5)', label: '-s5'},
    {size: 'var(--ui-s-4)', label: '-s4'},
    {size: 'var(--ui-s-3)' , label: '-s3'},
    {size: 'var(--ui-s-2)' , label: '-s2'},
    {size: 'var(--ui-s-1)' , label: '-s1'},
    {size: 'var(--ui-s0)', label: 's0'},
    {size: 'var(--ui-s1)', label: 's1'},
    {size: 'var(--ui-s2)', label: 's2'},
    {size: 'var(--ui-s3)', label: 's3'},
    {size: 'var(--ui-s4)', label: 's4'},
    {size: 'var(--ui-s5)', label: 's5'},
    {size: 'var(--ui-s6)', label: 's6'},
    {size: 'var(--ui-s7)', label: 's7'},
    {size: 'var(--ui-s8)', label: 's8'},
  ]

  let show = false

  function toggle() {
    show = !show
  }

</script>

<svelte:head>
  <title>Pathway Design System</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

</svelte:head>

{#if ready}
<div class="holder">
  <div class="pathway">
    <div class="title">
      <h1>Pathway <span>Design System</span></h1>
      <div class="logo">
        <LogoSmall />
      </div>
    </div>

    <section>
      <h2 class="padded">Colors</h2>
      <p>
        Pathway is made of several hues, each with a different role and function. The majority of hues contain 5 steps. <em>Pine</em> represents the brand color. Use of P3 colors/OKLCH is encouraged for new browsers.
      </p>
      <div class="swatches">

        <div class="swatch spaced">
          <div class="swatch-name">Base</div>
          <div class="swatch-shade no-border"></div>
          <div class="swatch-shade no-border"></div>
          <div class="swatch-shade no-border"></div>
          <div class="swatch-shade" style="background:var(--base-white)"></div>
          <div class="swatch-shade" style="background:var(--base-black)"></div>
        </div>
        <div class="swatch spaced">
          <div class="swatch-name">Navy</div>
          <div class="swatch-shade no-border"></div>
          <div class="swatch-shade no-border"></div>
          <div class="swatch-shade no-border"></div>
          <div class="swatch-shade" style="background:var(--navy-400)"></div>
          <div class="swatch-shade" style="background:var(--navy-500)"></div>
        </div>
        {#each swatches as swatch}
          <div class="swatch">
            <div class="swatch-name">{swatch.swatch}</div>
            {#each Array(5) as _, i}
              <div class="swatch-shade" style="background: var(--{swatch.swatch}-{i + 1}00);"></div>
            {/each}
          </div>
        {/each}

        <div class="swatch no-gap">
          <div class="swatch-name">Accents</div>

          {#each Array(10) as _, i}
          <div class="swatch-shade no-border accent">
            <div class="accent" style="background: var(--accent-{i + 1}00);"></div>
          </div>
          {/each}
          
        </div>
      </div>
    </section>

    <section>
      <h2>Surfaces</h2>
      <p>
        There are two primary variables for surfaces. <em class="mono">--bg</em> handles the most diverse amount of content. <em class="no-wrap mono">--bg-muted</em> is useful for instances where a distinction between surfaces is preferred.
      </p>

      <div class="bullets">
        <div class="bullet">
          <div class="bullet-swatch bg"></div>
          <div class="bullet-label">--bg</div>
        </div>
        <div class="bullet">
          <div class="bullet-swatch bg-muted"></div>
          <div class="bullet-label">--bg-muted</div>
      </div>

      <div class="surfaces">
        <div class="surface-holder bg">
          <div class="surface bg-muted">background muted</div>
          <div class="surface bg">background</div>
        </div>
        <div class="surface-holder bg-muted">
          <div class="surface bg border">background</div>
          <div class="surface bg-muted">background muted</div>
        </div>
      </div>

      <p>
        The palette allows for most hues to be used as a card surface. Use <em>100</em> for backgrounds, <em>200</em> for hover and active states, <em>300</em> for borders, <em>400</em> for icons, and <em>500</em> for text. When handling buttons, <em>400</em> provides a high contrast background when paired with <em>100</em>.
      </p>

      <p>Color contrast is caculated using <a href="https://www.w3.org/WAI/GL/WCAG3/2021/how-tos/visual-contrast-of-text/#design-button" target="_blank" rel="noopener noreferrer">APCA</a>, a modern method designed for calculating color contrast more accurately. Use it where possible in place of the outdated AA and AAA standards.</p>

      <div class="surfaces">

        <div class="surface-holder">

          {#each alert as alert}
          <div class="alert {alert.color}" style="background: var(--{alert.color}-100); border: 1px solid var(--{alert.color}-300)">
            <div class="alert-icon" style="color: var(--{alert.color}-400)">
              <Alert />
            </div>
            <div class="alert-text" style="color: var(--{alert.color}-500)">
              17 days left
            </div>
          </div>
          {/each}

          
        </div>

        <div class="surface-holder">
          {#each buttons as button}
          <button class="button" style="background: var(--{button.color}-400)" >
            {button.copy}
          </button>
          {/each}
        </div>

      </div>

    </section>

    <section>
      <h2>Composition</h2>
      <p>
        Steps <em>400</em> and <em>500</em> can be combined to create solid color blocks, ideal for presentations and other visual materials. For example, using <em>400</em> for large text, and <em>500</em> for backgrounds will establish a cohesive and professional look. This combination works particularly well in data visualizations, infographics and slide decks, where clarity and contrast are crucial.
      </p>

      <p>
        In addition, there are <em>10 color accents</em> available for data visualizations. These colors are evenly spaced for optimal visual differentiation, making them suitable for distinguishing between multiple data sets or categories in charts and graphs.
      </p>

      <div class="images">
        <div class="image">
          <ImageLoader 
              src="/pathway/graph-1.svg" 
              alt=""
              skeleton={false} 
              fit={false} 
              skip={false}
              fullwidth={false} 
              width="100%" 
              height="auto"
            ></ImageLoader>
        </div>
        <div class="image blank">
          <ImageLoader 
              src="/pathway/slide-3.png" 
              alt=""
              skeleton={false} 
              fit={false} 
              skip={false}
              fullwidth={false} 
              width="100%" 
              height="auto"
            ></ImageLoader>
        </div>
        <div class="image no-border">
          <ImageLoader 
              src="/pathway/slide-2.png" 
              alt=""
              skeleton={false} 
              fit={false} 
              skip={false}
              fullwidth={false} 
              width="100%" 
              height="auto"
            ></ImageLoader>
        </div>
        <div class="image">
          <ImageLoader 
              src="/pathway/graph-2.svg" 
              alt=""
              skeleton={false} 
              fit={false} 
              skip={false}
              fullwidth={false} 
              width="100%" 
              height="auto"
            ></ImageLoader>
        </div>
        <div class="image no-border">
          <ImageLoader 
              src="/pathway/slide-1.png" 
              alt=""
              skeleton={false} 
              fit={false} 
              skip={false}
              fullwidth={false} 
              width="100%" 
              height="auto"
            ></ImageLoader>
        </div>
        
      </div>
    </section>

    <section>
      <h2>Typeface</h2>

      <p>
        We are transitioning from Aktiv Grotesk to <em>Inter</em> across all brand touchpoints. Inter's flexibility and accessibility as a Google font make it a perfect fit for our growing digital and print requirements. To enhance visual consistency, we will also introduce a harmonic text sizing scale, creating a balanced and cohesive typographic hierarchy across our brand materials.
      </p>

      <p>Inter can be paired with <em>IBM Plex Serif</em>, a versatile serif typeface. A second typeface allows us flexibiltiy in how we communicate the GiveDirectly brand.</p>

      <h3>Inter</h3>

      <div class="scale-list">
        {#each scaler as scale}
          <div class="scale">
            <div class="scale-text {scale.indicator.toLowerCase()}">
              How vexingly quick daft zebras jump
            </div>
            <div class="scale-indicator">
              {scale.indicator}
            </div>
          </div>
        {/each}
      </div>

      <h3>IBM Plex Serif</h3>

      <div class="scale-list">
        {#each scaler.slice(0, 7) as scale}
          <div class="scale">
            <div class="scale-text serif {scale.indicator.toLowerCase()}">
              How vexingly quick daft zebras jump
            </div>
            <div class="scale-indicator">
              {scale.indicator}
            </div>
          </div>
        {/each}
      </div>

    </section>

    <section>

      <h2>Sizing</h2>

      <p>
        Pathway uses a modular scale to create a harmonious and consistent visual language. While the scale is rooted in multiples of 8, all sizes are relative to the viewport. This allows for a more flexible and responsive design system, without relying heavily on <a href="https://ntgard.medium.com/magic-numbers-in-css-9e9bb2c70450" target="_blank" rel="noopener noreferrerr">magic numbers</a> and breakpoints.
      </p>

      <button class="toggle" on:click={()=> toggle()}>
        {#if show}
          Hide outline
        {:else}
          Show outline
        {/if}
      </button>

      <div class="dash">
        <Dashboard bind:show />
      </div>

      <div class="sizer">
        {#each sizer as size}
        <div class="size-item">
          <div class="size" style="height: {size.size};"></div>
          <div class="size-text">{size.label}</div>
        </div>
        {/each}
      </div>
    </section>

    <section>
      <h2>Logo</h2>
      <p>
        The existing logo, currently set in Aktiv Grotesk, is proposed to also be updated to Inter. The widespread availabilty of Inter as a Google font makes it an accessible choice. The updated logo includes custom kerning adjustments for improved optical balance.
      </p>

      <div class="logo-compare-holder">
        <div class="logo-compare">
          <div class="badge">Old</div>
          <LogoOld />
        </div>
        <div class="logo-compare">
          <div class="badge">New</div>
          <LogoNew />
        </div>
      </div>
    </section>

    
  </div>
</div>
{/if}

<style lang="scss">

  @import '../../../pathway';

  .holder {
    min-height: 100vh;
    min-width: 100vw;
    background: var(--ui-bg);
    position: relative;
  }

  .pathway {
    margin: 0 auto;
    width: 100%;
    max-width: calc(var(--ui-s6) * 10);
    padding: 0 var(--ui-s2);
    font-family: var(--ui-font-base);
    position: relative;
    color: var(--ui-fg);
  }

  .title {
    padding: var(--ui-s2) 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 0 var(--ui-border);
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    background: var(--ui-bg);

    .logo {
      position: relative;
      z-index: 10;
      color: var(--ui-fg-muted);
    }
    
    h1 {
      position: relative;
      z-index: 10;
      color: var(--ui-fg);
      // letter-spacing: var(--ui-f6-ls);
      letter-spacing: -0.5px;
      font-size: var(--ui-f4);

      span {
        color: var(--ui-brand);
      }
    }
  }

  h2 {
    color: var(--ui-fg);
    font-size: var(--ui-f8);
    margin: var(--ui-s4) 0;
    letter-spacing: var(--ui-f8-ls);
    margin: 0;
    padding: 0 0 var(--ui-s-2);

    &.padded {
      padding-top: var(--ui-s3); 
    }
  }

  p {
    color: var(--ui-fg-muted);
    font-size: var(--ui-f4);
    line-height: var(--ui-lh);
    letter-spacing: var(--ui-f4-ls);
    margin: 0;
    padding: 0 0 var(--ui-s1) 0;
    max-width: 80ch;
    text-wrap: pretty;

    a {
      color: var(--ui-brand);
      font-weight: 500;
      text-decoration: none;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        opacity: 0.4;
        background: var(--ui-brand);
        transition: height 0.2s;
      }
    }
  }

  .no-wrap {
      white-space: nowrap;
  }

  .swatches {
    display: flex;
    flex-direction: column;
    gap: var(--ui-s2);
    padding: var(--ui-s2) 0 0;
  }

  .swatch {
    display: flex;
    gap: var(--ui-s0);
    align-items: center;

    &.spaced {
      justify-content: space-between;
    }

    &.no-gap {
      gap: 0;
    }

    .swatch-name {
      color: var(--ui-fg);
      font-size: var(--ui-f4);
      font-weight: 500;
      width: 100%;
      text-transform: capitalize;
      flex-shrink: 0;
      max-width: var(--ui-s6);
    }

    .swatch-shade {
      width: 100%;
      height: var(--ui-s4);
      border-radius: var(--ui-r3);
      box-shadow: inset 0 0 0 1px var(--ui-border);

      &.accent {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        cursor: copy;
      }

      &.no-border {
        box-shadow: none;

        &:hover {
          cursor: default;
        }
      }

      &.th {
        height: auto;
        box-shadow: none;
        color: var(--ui-fg-muted);
        text-align: center;
        font-size: var(--ui-f2);

        &:hover {
          cursor: default;
        }
      }

      .accent {
        width: var(--ui-s2);
        height: var(--ui-s2);
        border-radius: var(--ui-r50);
        box-shadow: inset 0 0 0 1px var(--ui-border);

        &:hover {
          cursor: copy;
        }
      }

    }

    .swatch-group {
      display: flex;
      gap: var(--ui-s3);
    }

  }

  section {
    padding: var(--ui-s1) 0 var(--ui-s5);
  }

  em {
    font-style: normal;
    font-weight: 600;
    // font-family: var(--ui-font-mono);
    // letter-spacing: -0.2px;

    &.mono {
      font-weight: 500;
      color: var(--ui-fg-muted);
      font-size: var(--ui-f3);
      background: var(--ui-bg);
      box-shadow: inset 0 0 0 1px var(--ui-border);
      border-radius: var(--ui-r3);
      padding: var(--ui-s-5) var(--ui-s-3);
      font-family: var(--ui-font-mono);
    }
  }

  .bullets {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: var(--ui-s2);
    padding: var(--ui-s2) 0 0;

    .bullet {
      display: flex;
      gap: var(--ui-s-1);
      align-items: center;
    }

    .bullet-swatch {
      width: var(--ui-s2);
      height: var(--ui-s2);
      border-radius: var(--ui-r3);
      box-shadow: inset 0 0 0 1px var(--ui-border);

      &.bg {
        background: var(--ui-bg);
      }
      &.bg-muted {
        background: var(--ui-bg-muted);
      }
    }

    .bullet-label {
      color: var(--ui-fg-muted);
      font-size: var(--ui-f4);
    }

  }

  .surfaces {
    display: flex;
    width: 100%;
    margin: var(--ui-s2) 0;
    border: 1px solid var(--ui-border);
    flex-wrap: wrap;

    > div {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 30ch;
    }


    .surface-holder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      width: 100%;
      padding: var(--ui-s3);

      &.bg-muted {
        background: var(--ui-bg-muted);
      }

      // &:first-child {
      //   border-right: 1px solid var(--ui-border);
      // }
    }

    .surface {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ui-s1) var(--ui-s1);
      font-size: var(--ui-f4);
      color: var(--ui-fg-muted);
      border-radius: var(--ui-r3);

      &.bg {
        background: var(--ui-bg);
      }
      &.bg-muted {
        background: var(--ui-bg-muted);
      }
      &.border{
        box-shadow: 0 0 0 1px var(--ui-border);
      }
    }

  }

  .alert {
    display: flex;
    gap: var(--ui-s-3);
    padding: var(--ui-s0);
    justify-content: center;
    align-items: center;
    width: 100%;

    &:not(:last-of-type) {
      margin-bottom: var(--ui-s0);
    }

  }

  .button {
    display: flex;
    color: var(--base-white);
    align-items: center;
    justify-content: center;
    height: var(--ui-s3);
    font-weight: 500;
    border: 0;
    border-radius: var(--ui-r2);
    cursor: pointer;
    padding: 0 var(--ui-s1);

    &:not(:last-of-type) {
      margin-bottom: var(--ui-s0);
    }
  }

  .images {
    display: flex;
    margin-top: var(--ui-s2);
    width: 100%;
    flex-direction: column;
    gap: var(--ui-s2)
  }

  .image {
    box-shadow: inset 0 0 0 1px var(--ui-border);
    background: var(--ui-bg-muted);

    &.no-border {
      box-shadow: none;
    }

    &.blank {
      background: transparent;
      box-shadow: none;
    }

  }

  h3 {
    color: var(--ui-fg-muted);
    font-size: var(--ui-f7);
    letter-spacing: var(--ui-f7-ls);
    margin: var(--ui-s4) 0 0;
  }

  .scale-list {

    display: flex;
    width: 100%;
    gap: 0;
    flex-direction: column;

    .scale {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--ui-s3) 0;
      border-bottom: 1px solid var(--ui-border);
      gap: var(--ui-s0);
    }

    .scale-text {
      position: relative;

      &.serif {
        font-weight: 500 !important;
        font-family: var(--ui-font-serif);
        letter-spacing: -0.03em !important;
      }

      &.xxxxl {
        font-weight: 700;
        font-size: var(--ui-f9);
        letter-spacing: var(--ui-f9-ls);
        line-height: var(--ui-lh-sm);
      }
      &.xxxl {
        font-weight: 700;
        font-size: var(--ui-f8);
        letter-spacing: var(--ui-f8-ls);
        line-height: var(--ui-lh-sm);
      }
      &.xxl {
        font-weight: 700;
        font-size: var(--ui-f7);
        letter-spacing: var(--ui-f7-ls);
        line-height: var(--ui-lh-sm);
      }
      &.xl {
        font-weight: 700;
        font-size: var(--ui-f6);
        letter-spacing: var(--ui-f6-ls);
        line-height: var(--ui-lh-sm);
      }
      &.l {
        font-weight: 600;
        font-size: var(--ui-f5);
        letter-spacing: var(--ui-f5-ls);
        line-height: var(--ui-lh-sm);
      }
      &.m {
        font-weight: 500;
        font-size: var(--ui-f4);
        letter-spacing: var(--ui-f4-ls);
        line-height: var(--ui-lh-sm);
      }
      &.r {
        font-weight: 500;
        font-size: var(--ui-f3);
        letter-spacing: var(--ui-f3-ls);
        line-height: var(--ui-lh-sm);
      }
      &.s {
        font-weight: 500;
        font-size: var(--ui-f2);
        line-height: var(--ui-lh-sm);
      }
      &.xs {
        font-weight: 500;
        font-size: var(--ui-f1);
        line-height: var(--ui-lh-sm);
      }
    }

    .scale-indicator {
      color: var(--ui-brand);
      font-size: var(--ui-f3);
      font-weight: 500;
    }

  }

  .sizer {
    display: flex;
    // gap: var(--ui-s2);
    justify-content: space-between;
    align-items: flex-end;
    margin: var(--ui-s3) 0 0;
    // background: var(--ui-bg-muted);
    // box-shadow: inset 0 0 0 1px var(--ui-border);
    // padding: var(--ui-s4);
    
    .size-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ui-s1);
      justify-content: center;
    }

    .size-text {
      color: var(--ui-fg);
      font-size: var(--ui-f2);
    }

    .size {
      background: var(--ui-brand);
      width: var(--ui-s-4);
    }
  }

  .logo-compare-holder {
    background: var(--ui-bg-muted);
    box-shadow: inset 0 0 0 1px var(--ui-border);
    padding: var(--ui-s5) var(--ui-s4);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: var(--ui-s3) 0;
    position: relative;
    grid-row-gap: var(--ui-s2);
    // gap: var(--ui-s0);
    flex-wrap: wrap;
    // width: 80vw;
    // left: calc(-40vw + 50%);

    .badge {
      position: absolute;
      left: 1px;
      top: 1px;
      padding: var(--ui-s-1);
      font-family: var(--ui-font-serif);
      font-size: var(--ui-f2);
      color: var(--ui-fg-muted);
      line-height: var(--ui-lh-sm);
    }

    .logo-compare {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 30ch;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 0 1px var(--ui-border);
      background: var(--ui-bg);
      padding: var(--ui-s5);
      width: 100%;
      position: relative;

      &:last-child {
        left: -1px;
      }
    }

  }

  .toggle {
    background: var(--ui-bg);
    color: var(--ui-fg-muted);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-r3);
    padding: var(--ui-s-4) var(--ui-s0);
    margin: var(--ui-s0) 0 0;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: var(--ui-bg-muted);
      color: var(--ui-fg);
    }
  }




</style>