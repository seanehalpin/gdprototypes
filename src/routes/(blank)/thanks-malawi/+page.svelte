<script lang="ts">
    import { onMount } from 'svelte'
    import confetti from 'canvas-confetti'
    import type { PageData } from './$types';
    import ImageLoader from '$lib/util/image/Loader.svelte'
    import Image from '$lib/util/image/Image.svelte';
    export let data: PageData;

    let thanks = [
      {
        person: "Harris Roberts",
        message: `Thank you for being the best hosts (pls don’t tell the other countries I said this) — truly from logistics, to making time out of your busy schedules to speak with us to having SIMs for us on landing it was so worth the long flight. What you don’t have in flight connections you make up for in personal connections and Shaunak’s puns.
        <br/><br/>
        As always it was inspiring to see field operations and wanted to thank the entire team for their professionalism and commitment to recipients first. I look forward to our team continuing to support of your team!
        <br/><br/>
        A few shout outs (I’m sure i’ll miss people)
        <br/><br/>
        <ul class='fancy-list'>
        <li>Freddie for showing up on the weekend to make sure we got in and out on time</li>
        <li>Yvonne for answering all our ops questions and shopping tips!</li>
        <li>Tom for taking extra time friday to speak with us</li>
        <li>Patrick for getting time to speak about field content!</li>
        <li>Christine for blazing the path on community engagement work</li>
        <li>Esnatt for skipping town but giving us all the recs</li>
        <li>Chris for helping with all the logistics</li>
        <li>Shaunak for street meats</li>
        <li>Bhahart for field visit logistics!</li>
        <li>Vincent, Besai, Chris, Benjamin, Richard, Chisomo, Angelina, Tamandani, and everyone else for field trip logistics</li>
        <li>The many others who helped make this happen!</li>
        </ul>
        `,
        image: "harris.png"
      },
      {
        person: "Nsubuga Kasozi",
        message: `Hello Malawi Team,
        <br/><br/>
        Thank you soo much for your time and dedication in hosting us for our annual retreat. It was amazing to talk to and learn from so many people from the field team working directly with the recipients. The field trip on Thursday was insighful, the lunch at the office was out of this world and the team dinner was amazing.
        <br/><br/>
        Thank you so much. May God richly bless you and keep you all. Zikomo kwambiri`,
        image: "kasozi.gif"
      },
      {
        person: "Olivia Chen",
        message: `Team Malawi — thank you for being such welcoming and thoughtful hosts for our team retreat! I'm so glad we got to spend time together in person, and I'm grateful we got to see different stages of your work with recipients in the field.
        <br/><br/>
        Yvonne, Ireen, Tom, Christine: thank you for taking the time to share your expertise with us and helping us learn more about your team's work!
        <br/><br/>
        Shaunak: thank you for taking us out for grilled meats and making time for us in your busy schedule! And I'm still thinking about the food at Bombay Palace...
        <br/><br/>
        Chris and Sarah: thank you for all your help in getting hotel quotes, booking our accommodations, booking office rooms for us, and I'm sure so much more behind the scenes that I didn't see. We loved our stay at Ufulu Gardens and all the logistics were so smooth!
        <br/><br/>
        I can't wait to share more your work with donors so they can see how amazing you are too. Thank you again!!`,
        image: "olivia.gif"
      },
      {
        person: "Julie Gu",
        message: `Hi Malawi Team! 🇲🇼
        <br/><br/>
        Thank you for the incredible hospitality and warmth you extended to us during our retreat. 
        <br/><br/>
        From organizing the field trip to sharing your beautiful culture and ensuring our comfort (and being well-fed!) at every turn, your support has made me feel truly at home.
        <br/><br/>
        The opportunity to connect with the team on the ground, understand the nuances of your work, and witness firsthand the difference we are making in the lives of recipients and communities, has left me genuinely inspired and excited for the work we'll be doing together.
        <br/><br/>
        Hope we can meet again soon. Thank you again for the wonderful experience! ❤`,
        image: "julie.gif"
      },
      {
        person: "Tom Counsell",
        message: "Thank you Team Malawi for organising our retreat with you. I particularly appreciate it given how incredibly busy you all are making life better for our recipients: so many projects, so many  innovations, so much dealing with problems (and another devaluation last week), so much care ❤. It really makes me want to raise more money so you can keep doing more of what you do so well. ",
        image: "tom.jpg"
      },
      {
        person: "Seán Halpin",
        message: `Hi Team Malawi!
        <br/><br/>
        Thank you so much for your hospitality, kindness, and wisdom you gave us during the retreat.
        It was fantastic to meet folks in the office and out in the field - seeing the difference being made filled me with hope.
        <br/><br/>
        I do hope we get to meet again in the future, you're always welcome here in Ireland (if you fancy a pint of Guinness 🍺)`,
        image: "sean.gif"
      },
      {
        person: "Kayla Fishman",
        message: `Thank you all so much for the A+ trip coordination and support, great visit to the field and context on your work, and your company at meals and office hangs! Hope we can return the favor in New York - or better yet, come back to your office for more home-cooked lunches. 😋`,
        image: "kayla.jpg"
      },
      {
        person: "Julia Guerra",
        message: `Malawi Team - Thank you for welcoming us and taking the time to teach us about the work you're doing. It was really special to have the chance to see your busy call center in action, discuss programs with various team members, visit recipients and see multiple steps of the process in real time. Each person on the team I got to speak with showed so much warmth and care for the work. I'm hopeful for the chance to host you here or to visit again.`,
        image: "julia.gif"
      },
    ]

    // var end = Date.now() + (5 * 1000);
    // var scalar = 2;
    // var unicorn = confetti.shapeFromText({ text: '🇲🇼', scalar });

    // var defaults = {
    //   spread: 360,
    //   ticks: 60,
    //   gravity: 0,
    //   decay: 0.96,
    //   startVelocity: 20,
    //   shapes: [unicorn],
    //   scalar
    // };
    
    var end = Date.now() + (2 * 1000);
    var colors = ['#4D8A40', '#C4424A', '#0E0E0E'];


    const fire = () => {

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
      if (Date.now() < end) {
        requestAnimationFrame(fire);
      }
    }

    let ready = false
    onMount(() => {
    ready = true 
    fire()
    })

</script>

<svelte:head>
  <title>Thanks Malawi</title>
</svelte:head>

{#if ready}
<div class="holder">
  <div class="title">
    <h1>
      Thank you from the Growth team! 🇲🇼
    </h1>
  </div>
  <div class="cards">
    {#each thanks as thank}
      <div class="card">
        {#if thank.image}
        <ImageLoader 
        src="/misc/thanks-malawi/{thank.image}" 
        alt=""
        skeleton={true} 
        fit={false} 
        skip={false}
        fullwidth={true} 
        width="100%" 
        height="auto"
        --radius="0"
        --display="block"
      ></ImageLoader>
        {/if}
        <div class="message">{@html thank.message}</div>
        <div class="person">{thank.person}</div>
      </div>
    {/each}
  </div>
</div>
{/if}

<style lang="scss">

  @import "../../../donor";
  @import "../../../mixins";

  .holder {
    margin: 0 auto;
    max-width: 2000px;
    padding: var(--48px) var(--16px);
  }

  .title {
    margin-bottom: var(--48px);

    h1 {
      text-align: center;
      font-size: var(--48px);
      letter-spacing: -1px;
      color: var(--text-brand);
      line-height: 1.2;
      text-wrap: pretty;
    }
  }

  .cards {
    --gap: var(--24px);
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);

    .card {
      width: 100%;
      background: var(--bg-secondary);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border);

      @include md {
        width: calc(50% - var(--gap));
      }

      @include xl {
        // width: calc(50% - var(--gap));
        width: calc(25% - var(--gap));
      }
    }

    .message {
      color: var(--text);
      font-size: var(--16px);
      padding:  var(--24px) var(--24px) 0;
      text-wrap: pretty;

      @include md {
        font-size: var(--18px);
        padding:  var(--48px) var(--48px) 0;
      }
    }

    .person {
      color: var(--text-secondary);
      font-size: var(--14px);
      font-weight: 500;
      padding:  var(--24px);

      @include md {
        font-size: var(--16px);
        padding:  var(--24px) var(--48px) var(--48px);
      }
    }
  }

</style>