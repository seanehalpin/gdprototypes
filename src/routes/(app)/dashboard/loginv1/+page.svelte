<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import ImageLoader from '$lib/util/image/Loader.svelte'
  import Logo from '$lib/components/dash/Logo.svelte';
  export let data: PageData;

  let transition = quartOut

  let requested = false
  let email = ""
  let loading = false

  let isValidEmail = false;

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValidEmail = emailRegex.test(email);
  }

  function signIn() {
    // requested = true
    loading = true
    setTimeout(() => {
      requested = true
    }, 2000)
  }

  function reset() {
    requested = false
    email = ""
    loading = false
    isValidEmail = false
  }

</script>

<svelte:head>
  <title>Sign In</title>
</svelte:head>

<Center
--flex-direction="column" 
  --background="var(--bg)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
>
<div class="card-holder">
  <div class="logo">
    <Logo />
  </div>
  <div class="card">
    <div class="col form-col">
      {#if !requested}
      <div class="title" in:fade={{duration:200}}>
        Sign in
      </div>
      <div class="desc" in:fade={{duration:200}}>
        Enter an email to access your Impact Dashboard
      </div>

      <div class="form" in:fade={{duration:200}}>
        <input type="email" placeholder="Email address" bind:value={email} on:input={validateEmail} />
        <button class="form-button" disabled={!isValidEmail} on:click={() => signIn()}>
          {#if loading}
          <span class="loader-docs" in:fade={{duration:200}}></span>
          {:else}
          Send me a magic link
          {/if}
        </button>
        <div class="disclaimer" in:fade={{duration:200}}>
          You acknowledge that you read, and agree to our <a href="#">Terms of Service</a> and our <a href="#">Privacy Policy</a>.
        </div>
      </div>
      {:else}
      <div class="requested" in:fade={{duration:250}}>
        <div class="title">
          Check your inbox
        </div>
        <div class="desc">
          We've sent a magic link to <span>{email}</span>. Please click the link to confirm your address.
        </div>

        <div class="requested-links">
          <a href="#">
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.8754 3.09287L13.9049 2.32145C14.9772 1.50716 16.5215 2.27859 16.5215 3.62859V12.9074C16.5215 13.5074 16.0282 14.0002 15.4276 14.0002H12.8754V7.82859V3.09287Z" fill="var(--icon)"/>
              <path d="M1.59383 14.0002H4.14611V7.8288L0.50211 5.08752L4.14611 7.80738V3.09309L3.11662 2.32166C2.04424 1.52881 0.5 2.30024 0.5 3.62881V12.9074C0.5 13.5074 0.993298 14.0002 1.59383 14.0002Z" fill="var(--icon)"/>
              <path d="M4.14611 7.8288V3.09309L8.52145 6.37134L12.8754 3.09287V7.82859L8.50001 11.0856L4.14611 7.8288Z" fill="var(--icon)"/>
              </svg>
            <span>Open Gmail</span>
          </a>
          <a href="#">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.64654 10.6473C6.26206 10.3667 5.96499 9.9829 5.78981 9.54035L5.79053 9.54181C5.39712 8.51481 5.39919 7.37828 5.79635 6.35271C5.97539 5.9053 6.2781 5.51809 6.66908 5.23636C7.07112 4.95949 7.55055 4.81717 8.03853 4.82981C8.54666 4.80824 9.04669 4.96234 9.45454 5.26618C9.82918 5.56451 10.1091 5.96521 10.2603 6.41963C10.4316 6.92294 10.5162 7.45165 10.5105 7.98326C10.5174 8.50984 10.4274 9.0332 10.2451 9.52725C10.082 9.96965 9.7927 10.3545 9.41309 10.6342C8.99476 10.9243 8.49337 11.0703 7.98472 11.0502C7.50709 11.0622 7.03816 10.921 6.64654 10.6473Z" fill="var(--icon)"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6669 0H1.33309C0.596854 0 0 0.596853 0 1.33309V14.6669C0 15.4031 0.596837 16 1.33309 16H14.6669C15.4032 16 16 15.4032 16 14.6669V1.33309C16 0.596853 15.4032 0 14.6669 0ZM5.68946 3.90909C5.02543 4.30542 4.4951 4.89124 4.16654 5.59127C3.81127 6.36076 3.6345 7.20057 3.64946 8.04797C3.63537 8.85717 3.81542 9.65796 4.17455 10.3832C4.51003 11.0529 5.03112 11.6119 5.67564 11.9934C6.37087 12.3934 7.16257 12.5946 7.96437 12.5753C8.77808 12.5943 9.58146 12.3901 10.2873 11.9847C10.948 11.5914 11.4789 11.0132 11.8146 10.3214C12.1833 9.55024 12.3664 8.70339 12.3491 7.84872C12.3648 7.03091 12.1868 6.221 11.8298 5.48508C11.502 4.81721 10.9874 4.25887 10.3484 3.87781C9.66876 3.48451 8.89413 3.28551 8.1091 3.30254C7.26209 3.2782 6.42482 3.48808 5.68946 3.90909Z" fill="#757575"/>
              </svg>
              
            <span>Open Outlook</span>
          </a>
        </div>
        <div class="disclaimer">
          Can't see the email? Check your spam folder. <br>Wrong email? <button on:click={() => reset()}>Re-enter your email address</button>.
        </div>
      </div>
      {/if}
      <div class="footer">
        <div class="noty">
          <span class="icon">
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2C6.71442 2 5.45772 2.38122 4.3888 3.09545C3.31988 3.80968 2.48676 4.82484 1.99479 6.01256C1.50282 7.20028 1.37409 8.50721 1.6249 9.76809C1.8757 11.029 2.49477 12.1872 3.40381 13.0962C4.31285 14.0052 5.47104 14.6243 6.73192 14.8751C7.99279 15.1259 9.29973 14.9972 10.4874 14.5052C11.6752 14.0132 12.6903 13.1801 13.4046 12.1112C14.1188 11.0423 14.5 9.78558 14.5 8.5C14.4982 6.77665 13.8128 5.12441 12.5942 3.90582C11.3756 2.68722 9.72335 2.00182 8 2ZM8 14C6.91221 14 5.84884 13.6774 4.94437 13.0731C4.0399 12.4687 3.33495 11.6098 2.91867 10.6048C2.50238 9.59977 2.39347 8.4939 2.60568 7.427C2.8179 6.36011 3.34173 5.3801 4.11092 4.61091C4.8801 3.84172 5.86011 3.3179 6.92701 3.10568C7.9939 2.89346 9.09977 3.00238 10.1048 3.41866C11.1098 3.83494 11.9687 4.53989 12.5731 5.44436C13.1774 6.34883 13.5 7.4122 13.5 8.5C13.4983 9.95818 12.9184 11.3562 11.8873 12.3873C10.8562 13.4184 9.45819 13.9983 8 14ZM9 11.5C9 11.6326 8.94732 11.7598 8.85356 11.8536C8.75979 11.9473 8.63261 12 8.5 12C8.23479 12 7.98043 11.8946 7.7929 11.7071C7.60536 11.5196 7.5 11.2652 7.5 11V8.5C7.36739 8.5 7.24022 8.44732 7.14645 8.35355C7.05268 8.25979 7 8.13261 7 8C7 7.86739 7.05268 7.74021 7.14645 7.64645C7.24022 7.55268 7.36739 7.5 7.5 7.5C7.76522 7.5 8.01957 7.60536 8.20711 7.79289C8.39465 7.98043 8.5 8.23478 8.5 8.5V11C8.63261 11 8.75979 11.0527 8.85356 11.1464C8.94732 11.2402 9 11.3674 9 11.5ZM7 5.75C7 5.60166 7.04399 5.45666 7.1264 5.33332C7.20881 5.20999 7.32595 5.11386 7.46299 5.05709C7.60003 5.00032 7.75084 4.98547 7.89632 5.01441C8.04181 5.04335 8.17544 5.11478 8.28033 5.21967C8.38522 5.32456 8.45665 5.4582 8.48559 5.60368C8.51453 5.74917 8.49968 5.89997 8.44291 6.03701C8.38615 6.17406 8.29002 6.29119 8.16668 6.3736C8.04334 6.45601 7.89834 6.5 7.75 6.5C7.55109 6.5 7.36032 6.42098 7.21967 6.28033C7.07902 6.13968 7 5.94891 7 5.75Z" fill="var(--icon)"/>
            </svg>
          </span>
          <span>Dashboards are created after your first donation &ndash; <a href="#">Donate</a></span> 
        </div>
      </div>
    </div>

    <div class="col image-col">
      <div class="quote">
        <div class="text">
          “I spent $100 on necessities for my baby. I bought her clothes and a baby carrier. We used to sleep on a mat, so I bought a mattress and sheets, and now we sleep much better. I'm so happy right now.”
        </div>
        <div class="name">
          Rosine, Rwanda
        </div>
      </div>
      <div class="image">
        <!-- <ImageLoader 
            src="/dash/login/login.png" 
            alt=""
            skeleton={true} 
            fit={false} 
            skip={false}
            fullwidth={false} 
            width="584" 
            height="800"
          ></ImageLoader> -->
      </div>
    </div>

  </div>
</div>

</Center>


<style lang="scss">

  @import "../../../../donor";
  @import "../../../../mixins";

  $height: calc(var(--144px) * 5);

  .card-holder {
    padding: 0 var(--16px);
    max-width: 1200px;
    width: 100%;
    position: relative;
  }

  .logo {
    z-index: 100;
    height: calc(var(--64px) + var(--16px));
    display: flex;
    align-items: center;
    justify-content: center;

    @include md {
      height: var(--128px);
    }
  }

  .card {
    width: 100%;
    
    overflow: hidden;
    background: var(--bg-secondary);
    border-radius: var(--16px);
    display: flex;
    flex-direction: column;

    @include md {
      flex-direction: row;
      height: $height;
    }
  }

  .col {
    width: 100%;
    position: relative;
    display: flex;
    overflow: hidden;

    &.form-col {
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: var(--24px);

      @include md {
        padding: var(--16px);
      }
    }

    &.image-col {
      align-items: flex-end;
    }
  }

  .title {
    font-weight: 600;
    font-size: var(--24px);
    color: var(--text-brand);
  }

  .image {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: url('/dash/login/login.png') no-repeat center center;
    background-size: cover;

    &:after {
      z-index: 100;
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 300px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    }
  }

  .quote {
    display: flex;
    flex-direction: column;
    gap: var(--16px);
    position: relative;
    z-index: 100;
    padding: var(--32px);
    color: var(--text-onbrand);
    height: 400px;
    justify-content: flex-end;

    @include md {
      height: auto;
    }

    .text {
      font-weight: 600;
      font-size: var(--14px);
    }

    .name {
      font-size: var(--14px);
    }
  }

  .desc {
    font-size: var(--14px);
    color: var(--text-muted);
    margin-top: 4px;
    text-align: center;

    span {
      font-weight: 600;
      // color: var(--color-text);
    }
  }

  .form {
    margin-top: var(--24px);
    width: 100%;
    max-width: 350px;

    input {
      font-size: var(--14px);
      width: 100%;
      display: flex;
      height: var(--40px);
      border: 0;
      border-radius: var(--48px);
      padding: 0 var(--16px);
      box-shadow:  0 0 0 1px var(--border-tertiary);
      transition: all 0.2s ease-in-out;

      &:focus-visible {
        border-color: transparent;
        box-shadow: 0 0 0 1px var(--border-brand), 0 0 0 4px var(--focus);
        outline: 0;
      }
    }

    .form-button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-brand);
      border-radius: var(--48px);
      border: 0;
      height: var(--40px);
      font-size: var(--14px);
      margin-top: var(--8px);
      color: var(--text-onbrand);
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: var(--bg-brand-hover);
      }

      &:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 1px var(--bg), 0 0 0 3px var(--bg-brand);
        // outline-offset: 2px;
        // border-radius: 6px;
      }

      &:disabled {
        opacity: 0.6;
        cursor: default;

        &:hover {
          background: var(--bg-brand);
        }
      }
    }
  }

  .disclaimer {
    margin-top: var(--24px);
    font-size: var(--14px);
    color: var(--text-muted);
    text-align: center;
    a {
      color: var(--text-brand);
      text-decoration: none;
    }
    button {
      background: transparent;
      padding: 0;
      border: 0;
      margin: 0;
      color: var(--text-brand);
      cursor: pointer;
    }
  }

  .requested {
    width: 100%;
    max-width: 350px;
    text-align: center;
  }

  .requested-links {
    display: flex;
    gap: var(--8px);
    margin-top: var(--24px);

    a {
      display: flex;
      height: var(--40px);
      width: 100%;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-tertiary);
      border-radius: var(--48px);
      justify-content: center;
      align-items: center;
      gap: 10px;
      font-size: var(--14px);
      text-decoration: none;
      color: var(--text-muted);
      font-weight: 500;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: var(--bg-tertiary-hover);
      }

      &:focus-visible {
        border-color: transparent;
        box-shadow: 0 0 0 1px var(--border-brand), 0 0 0 4px var(--focus);
        outline: 0;
      }
    }

  }

  

  .footer {
    
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: var(--24px);
    padding: 0 0 var(--16px);

    @include md {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 0 var(--16px) var(--32px);
    }

    .noty {
      color: var(--text-muted);
      text-align: center;
      display: inline-flex;
      border-radius: var(--16px);
      background: var(--bg-tertiary);
      font-size: var(--12px);
      padding: 4px 8px;
      gap: 2px;

      @include md {
        padding: 4px var(--16px) 4px 8px;
      }
    }

    a {
      color: var(--text-brand);
      text-decoration: none;
      font-weight: 500;
    }

    span.icon {
      display: none;
      align-items: center;
      justify-content: center;
      padding-right: 2px;

      @include md { 
        display: flex;
      }
    }

  }

  .loader-docs {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: relative;
    animation: rotate 0.7s linear infinite
  }
  .loader-docs::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 2px solid #FFF;
    animation: prixClipFix 2s linear infinite ;
  }

  @keyframes rotate {
    100% {transform: rotate(360deg)}
  }

  @keyframes prixClipFix {
    0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
    25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
    50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
    75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
    100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
  }



</style>