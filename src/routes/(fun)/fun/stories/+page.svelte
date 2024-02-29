<script lang="ts">
  import type { PageData } from './$types';
  import {onMount} from 'svelte';
  import QuadrantOne from "$lib/fun/drag/QuadrantOne.svelte";
  import QuadrantTwo from "$lib/fun/drag/QuadrantTwo.svelte";
  import QuadrantThree from "$lib/fun/drag/QuadrantThree.svelte";
  import QuadrantFour from "$lib/fun/drag/QuadrantFour.svelte";
  export let data: PageData;
  import Masonry from '$lib/fun/drag/Masonary.svelte'
  import Story from '$lib/util/Story.svelte';
    import Logo from '$lib/components/dash/Logo.svelte';

  let ready = false
  let width = 3008, height = 1980
  let offset = 50
  let moving = false, x = offset, y = offset
  
  onMount(() => {
      ready = true
  })

  let story = [
    
    {
      name: "Leonille, Rwanda",
      quote: "I am very delighted to receive money from GiveDirectly. With the first lump sum, I was able to buy a small house and renovate it. I also bought a pig. We had entered the spring period, and my children did not have sweaters. I bought clothes and sweaters for my children and I also bought bed covers. For the rest of the money, I will buy arable land for $300 and get rid of working as a farm laborer. A job that was not giving me an income to be able to meet the needs of my family. It was not easy to live in a rented house, where at the end of every month I was liable to pay rent of about $3 per month. Since I started receiving money, I have never run out of money to buy food and I was already able to buy inputs. Nothing makes me more happy when it comes to the end of the month than remembering that I have money to pay rent. It gives me peace of mind.",
      image: "/fun/drag/leonille.jpg"
    },
    {
      intro: true
    },
    {
      name: "Rosine, Rwanda",
      quote: "I spent $100 on necessities for my baby. I bought her clothes and a baby carrier. We used to sleep on a mat, so I bought a mattress and sheets, and now we sleep much better. I'm so happy right now. I bought myself a 'kitenge' (traditional dress) and had a few dollars left over which I set aside to buy a goat. I thought this goat would be a source of money by selling its offspring. My next big project is to set up a food stall. I've already started looking for a location to set it up at. I hope to have a stable job with this business idea, and with the profits I'll be able to give my daughter a better life and a good education.",
      image: "/fun/drag/rosine.jpg"
    },
    // {
    //   name: "Nakee, Uganda",
    //   quote: "I'm so excited to receive the cash transfer from GiveDirectly. Life before GiveDirectly coming to our village was too hard and tough. I was almost losing my family members to hunger and starvation. Thank God GiveDirectly came and rescued us from the pit of death. My younger child became malnourished because I didn't have what to offer as a mother but when I started receiving money from GiveDirectly my child's health improved and she is now healthy because I am able to give her quality food.",
    //   image: "/fun/drag/nakee.jpg"
    // },
    {
      name: "Marceline, Rwanda",
      quote: "Before starting a small donut-selling business with a modest capital of $20, our main source of living was  subsistence farming. Despite our initial capital growing, the generated income proved insufficient to meet our basic needs. Affording quality seeds and acquiring manure for fertilization became ongoing challenges. As a result, our agricultural yield remained little, barely enough to sustain our household.Upon receiving the transfer, we decided to invest in agriculture. We purchased high-quality seeds for Irish potatoes and onions, aiming to improve our yield significantly. Additionally, we acquired a cow for $350, ensuring a sustainable source of manure for fertilization. This investment is expected to transform our harvest from the usual 200 kilos to at least a tonne of Irish potatoes. We anticipate a bountiful onion harvest as well, and both crops are expected to yield significant income in the upcoming harvest season",
      image: "/fun/drag/marceline.jpg"
    },
    {
      name: "Florence, Rwanda",
      quote: "We are looking forward to the GiveDirectly transfers. We plan to buy a plot of land and a cow with the money. With these, we will be able to establish a source of food for our family. Considering the prices of farms and cows, we hope to have some money left, which we plan to use to start a business purchasing and selling crops in our neighborhood. We hope that this will be a great foundation to improve our lives. We will save up until we have enough funds to finance the construction of our own house since we are currently renting",
      image: "/fun/drag/florence.jpg"
    },
    {
      name: "Rachel, Rwanda",
      quote: "Before receiving the support from GiveDirectly, we struggled to get enough to sustain our family of six. This was largely due to the limited size of our cultivation plot, and the scarcity of manure to use as fertilizer. To address the issue of fertilizers, we frequently took on the responsibility of caring for people's livestock to access their manure. When we received the transfer, we allocated the funds to both agriculture and livestock investments. We purchased a new piece of land for cultivation and hired extra help, to ensure early-season cultivation, with the aim of boosting our harvest and timely completion. Additionally, we acquired goats and a pig, which not only contribute valuable manure for fertilizing our crops but also will generate income through the sale of their offspring.",
      image: "/fun/drag/rachel.jpg"
    },
    {
      name: "Niringiyimana, Rwanda",
      quote: "With the first part of the transfer I received, I invested it in a second-hand bicycle for $70. This investment has increased my daily earnings to $3, as I no longer have to rent a bicycle . The remaining has been well saved in my bank account. As I prepare for the second part of the transfer, my plan is to allocate it towards a meaningful investment. I have planned to combine it with my savings to purchase a motorcycle after securing the riding license. This will enable me to engage into the moto taxi business, encouraging further financial growth. Alternatively, I am considering using the funds towards initiating the construction of my own house, given that I am 22 years old and ready to move out of my parents' home.",
      image: "/fun/drag/niringiyimana.jpg"
    },
    {
      name: "Venantie, Rwanda",
      quote: "With the transfer, our main goal is to acquire a piece of land for cultivation. This will enable us to cultivate our own crops, ensuring a sustainable source of food. We also have a plan to invest in livestock, specifically goats. Apart from serving as a potential source of income through the sale of their offspring, these goats will provide valuable manure to improve the fertility of our farm. With the remainder of the transfer, we hope to build a kitchen, since preparing meals from outside has been so challenging, especially during the rain",
      image: "/fun/drag/venantie.jpg"
    },
    {
      name: "Lokol, Uganda",
      quote: "I'm Lokol HellenAsiyo, residing in Nakamistae village, Loreng Sub county, Nakapiripit district , Karamoja region.When I received my first transfer of $284 on 15/05/2023, that was the day I gave birth to Aleper. We immediately agreed with my husband Samuel to name him after GiveDirectly. Therefore, we named him Aleper GiveDirectly.",
      image: "/fun/drag/lokol.jpg"
    },
    {
      name: "Emma, Malawi",
      quote: "My life has not been the same ever since I finished primary school. People tell me that my future is doomed. It hurts me knowing people do not believe I will be able to continue with my education. Like any other little girl, I was so happy when I got selected to a secondary school in 2018. My father sold goats to pay for primary school. However, there were no more goats to sell. I had to drop out. Now I go out looking for casual labor like washing people's clothes or work in their farms. Today, there is a new dawn. I am so happy after GiveDirectly enrolled me in the program where I will be getting about $550. I will surely be going back to secondary school. I plan to use the money to buy goats which will keep me in school. I do not want to just use the money, I want to invest it. I can sell the goats every term for my school fees. I have always wanted to become a bank manager and take care of my parents. I believe GiveDirectly's program will help me achieve all that. I will also spend less time looking for casual labor and more time to concentrate on my studies.",
      image: "/fun/drag/emma.jpg"
    },
    {
      name: "Maonekedwe, Malawi",
      quote: "My name is Maonekedwe Luka. I am 27 years old, married, and live in Chimbwi village. I can not put into words how excited I am today for the text I just received. This is a dream come true. I waited for this day and, finally, it's here. I just got my final $500 transfer from GiveDirectly. I cannot wait to finally put every plan my wife and I talked about into action. I plan on building a new house with Iron sheets, buying food, and also buying some livestock. This is one of the happiest days of my life.",
      image: "/fun/drag/maonekedwe.jpg"
    },
    {
      name: "Nyema, Liberia",
      quote: "My name is Nyema. I am 54 years old. I’m married to Cecelia who is 49 years old. We have nine children; Cecelia-25, Francis-25, Esther-24, Budu-24, Prince-23, Alex-20, Johnson-17, Agatha-8, and Anthony-1. Firstly, I am thankful to GiveDirectly for improving my life! I am planting cassava and sugarcane on the farm. I’ve been into farming for twenty years. The sugarcane production work is tough. My wife, Cecelia, sells granulated cassava. During the entire week, she earns $10. My plan has been to relocate my wife and children to Pleebo while I’m working here on the farm. It would be easier for my three children who are attending school in Pleebo.They are staying with my younger sister, Esther. When GiveDirectly came to the town, they enrolled five of my family members.We combined all our transfers we’ve received and purchased 6 bundles of zinc for $600. WWe used $144 for planks, and $47 for five packs of zinc nails and a 25kg bag of rice. We invested $90 into Agatha, Mary, Sophia, and Alex school fees. I’ve also paid $300 out of $600 towards a plot of land in Pleebo, where we would be building the house. GiveDirectly has done something great for me and my family due to the cash transfers we are receiving!",
      image: "/fun/drag/nyeam.jpg"
    },
  ]
  
  let quadrants = [
    {x: offset, y: offset, content: QuadrantOne, story: story},
    {x: -width + offset, y: offset, content: QuadrantTwo, story: story},
    {x: offset, y: -height + offset, content: QuadrantThree, story: story},
    {x: -width + offset, y: -height + offset, content: QuadrantFour, story: story}
  ]

  function onMouseDown() {
    moving = true;
  }

  function onMouseMove(e:any) {
    if (moving) {
      x += e.movementX;
      y += e.movementY;

      // Loop through each quadrant
      for (let i = 0; i < quadrants.length; i++) {
        // If the quadrant is off-screen, reposition it to the opposite side
        if (x + quadrants[i].x < -width - offset) {
          quadrants[i].x += width * 2;
        } else if (x + quadrants[i].x > width + offset) {
          quadrants[i].x -= width * 2;
        }
        if (y + quadrants[i].y < -height - offset) {
          quadrants[i].y += height * 2;
        } else if (y + quadrants[i].y > height + offset) {
          quadrants[i].y -= height * 2;
        }
      }
    }
  }

  function onMouseUp() {
    moving = false;
  }

</script>
{#if ready}
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
  class="holder" 
  on:mousedown={onMouseDown} 
  >
  <!-- <div class="nav bottom">
    <Logo />
  </div> -->
  <div class="inner move" style="transform: translateX({x}px) translateY({y}px) translateZ(0);">
    <div class="inner-inner">
      {#each quadrants as quadrant (quadrant.content)}
        <div class="quadrant" style="transform: translateX({quadrant.x}px) translateY({quadrant.y}px) translateZ(0); width: {width}px; height: {height}px">
          <!-- <svelte:component this={quadrant.content} story={quadrant.story} /> -->
          <QuadrantOne story={quadrant.story} />
        </div>
      {/each}
    </div>
  </div>
</div>
{/if}
<svelte:head>
  <title>GD Stories</title>
</svelte:head>
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style lang="scss">


  .holder {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transform-origin: top left;
    overflow: hidden;
    background: #F9F7F2;
  }

  .inner {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    will-change: transform;
    z-index: 100;
    // background: blue;
  }

  .inner-inner {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
  }

  .quadrant {
    position: absolute;
    // background: #F9F7F2;

  }


</style>