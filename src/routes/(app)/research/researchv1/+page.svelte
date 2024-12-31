<script lang="ts">
  import { onMount } from 'svelte'
  import { spring } from "svelte/motion";
  import { tweened } from 'svelte/motion';

  import { fade, fly, scale, blur } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"
  import Center from '$lib/util/Center.svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let research = [
  {
    title: "The impact of unconditional cash transfers on poor households in rural Kenya",
    Researchers: "Johannes Haushofer (Princeton) and Jeremy Shapiro (Princeton) with measurement by Innovations for Poverty Action",
    Location: "Siaya County, Kenya",
    Overview: "The study documented large, positive impacts of cash transfers averaging ~$500 across a wide range of outcomes including assets, earnings, food security, psychological well-being, and domestic violence, an average four months after transfers ended.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Benchmarking a traditional nutrition and WASH program to cash",
    Researchers: "Craig McIntosh (UCSD), Andrew Zeitlin (Georgetown) with measurement by Innovations for Poverty Action",
    Location: "Kayonza and Nyabihu districts, Rwanda",
    Overview: "The study explored the cost-effectiveness (impact per dollar) of unconditional cash transfers and of Gikuriro, an integrated nutrition program.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Transfers to coffee-farming communities",
    Researchers: "IDinsight and GiveDirectly",
    Location: "Iganga district, Uganda",
    Overview: "The study evaluated the impact of $1,000 cash transfers to Ugandan communities where coffee-farming is common.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Using cash transfers to benchmark the cost-effectiveness of a youth workforce readiness program",
    Researchers: "Craig McIntosh (UCSD), Andrew Zeitlin (Georgetown), with measurement by Innovations for Poverty Action",
    Location: "Rwanda",
    Overview: "This study benchmarked the impact of a youth employment education intervention to cash transfers in the Rwandan context.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "How do cash transfers impact local economies?",
    Researchers: "Dennis Egger (UC Berkeley), Johannes Haushofer (Princeton), Ted Miguel (UC Berkeley), Paul Niehaus (UCSD), and Michael Walker (UC Berkeley), with measurement by Innovations for Poverty Action",
    Location: "Siaya County, Kenya",
    Overview: "This study found that the consumption expenditure and income increased for both people who received cash, and those who did not.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Universal Basic Income (UBI)",
    Researchers: "Abhijit Banerjee (MIT), Tavneet Suri, (MIT), Alan Krueger (Princeton), Paul Niehaus (UCSD), and Michael Faye (GiveDirectly), with measurement by Innovations for Poverty Action",
    Location: "Siaya and Bomet counties, Kenya",
    Overview: "The largest study of UBI to date will explore the impact of a long term basic income (12 years of monthly payments equivalent to $0.75 per day), a short term basic income (2 years at $0.75 per day) and a lump sum equivalent to the total value short term basic income.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Randomized controlled trials in progress: Can a psychological intervention amplify the impact of cash transfers?",
    Researchers: "Kate Orkin (Oxford), Rob Garlick (Duke), Stefan Dercon (Oxford), Richard Sedlmayr (Oxford), Mahreen Mahmud (Oxford) and Johannes Haushofer (Princeton)",
    Location: "Siaya and Homa Bay counties, Kenya",
    Overview: "This study examines whether short, low-cost motivational interventions drawing on social psychology affect psychological outcomes and economic behaviour.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Evaluating alternative cash transfer designs in Kenya using behavioral economics",
    Researchers: "Anandi Mani (Warwick), Sendhil Mullainathan (Harvard), Paul Niehaus (UCSD), and Anuj Shah (Chicago) in partnership with ideas42 and measurement by GiveDirectly",
    Location: "Siaya County, Kenya",
    Overview: "This study is measuring the impact of different cash transfer designs, including giving recipients control over timing and giving them information on the performance of investments made by past recipients.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Benchmarking the impact of cash transfers in Liberia",
    Researchers: "Jonathan Robinson (UCSC), Alan Spearot (UCSC), Jenny Aker (Tufts), and Shilpa Aggrawal (Indian School of Business), with measurement by Innovations for Poverty Action",
    Location: "Bong and Nimba counties, Liberia",
    Overview: "This study will evaluate the impact of different cash transfers sizes ($250 to $750) on a broad range of outcome measures for a broad range of recipients.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Benchmarking the impact of cash transfers in Malawi",
    Researchers: "Jonathan Robinson (UCSC), Alan Spearot (UCSC), Jenny Aker (Tufts), and Shilpa Aggrawal (Indian School of Business), with measurement by Innovations for Poverty Action",
    Location: "Machinga and Chiradzulu districts, Malawi",
    Overview: "This study will evaluate the impact of different cash transfers sizes ($250 to $750) on a broad range of outcome measures for a broad range of recipients.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Benchmarking the impact of cash transfers in DRC delivered to urban youth",
    Researchers: "Jeremy Magruder (UC Berkeley) and Benjamin Krausse (UC Berkeley) with measurement by Marakuja Kivu Research",
    Location: "Goma, Democratic Republic of the Congo",
    Overview: "This study will evaluate the impact of different cash transfers sizes to young people living in an urban environment on a broad range of outcome measures.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Do cash transfers enhance the impact of youth employment training in rural DRC?",
    Researchers: "Jeremy Magruder (UC Berkeley) and Benjamin Krausse (UC Berkeley) with measurement by Marakuja Kivu Research",
    Location: "Walungu, Democratic Republic of the Congo",
    Overview: "This study will evaluate the effects of delivering cash transfers to young people living in rural areas.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Evaluating the impact of large cash transfers to refugees and host nationals",
    Researchers: "IDinsight (including measurement)",
    Location: "Kiryandongo, Uganda",
    Overview: "This study will explore the impact of $1,000 cash transfers on refugee households and their host communities.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  },
  {
    title: "Evaluating one-time cash transfers to U.S. households during the COVID-19 pandemic",
    Researchers: "Brian Jacob (University of Michigan), Natasha Pilkauskas (U-M), Elizabeth Rhodes (OpenResearch), Katherine Richard (U-M), H. Luke Shaefer (U-M)",
    Location: "United States",
    Overview: "This study evaluates the impact of $1,000 cash transfers provided to low-income families across the U.S. during the COVID-19 pandemic.",
    active: false,
    links: "Washington Post, The Economist, NPR, Vox, World Economic Forum, CBS Bay Area, GiveDirectly, The Life You Can Save, Behavioral Scientist, Michael Walker (taxation findings), Econimate",
    peer: "Peer-reviewed paper (Econometrica, 2022). Working paper on taxation impacts released in 2018."
  }
];

  const showActiveStudy = (index: number) => {
    research = research.map((item, i) => ({
      ...item,
      active: i === index
    }));
  };

  const hideActiveStudy = (index: number) => {
    research = research.map((item, i) => ({
      ...item,
      active: false
    }));
    height.set(200);
  };


 let height = spring(0, {
    stiffness: 0.1,
    damping: 0.5
  });

  // Action
 function animationElement(node: HTMLElement) {
    const expand = () => height.set(node.scrollHeight + 24);
    const collapse = () => height.set(0);

    node.addEventListener('mouseenter', expand);
    node.addEventListener('mouseleave', collapse);

    return {
      destroy() {
        node.removeEventListener('mouseenter', expand);
        node.removeEventListener('mouseleave', collapse);
      }
    };
  }

</script>

<svelte:head>
  <title>Research</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

</svelte:head>

<Center
  --flex-direction="column"
  --justify-content="flex-start"
  --background="var(--ui-bg-muted)" 
  --padding="var(--ui-s5) 0 var(--ui-s8)"
  --height="auto"
>

  <div class="research">
    {#each research as research, i}
    <div class="unit" class:active={research.active}>
      <div class="block" class:hidden={research.active}>
        <div class="block-inner">
          <h2>{research.title}</h2>
          <p>{research.Overview} 
            <!-- <button class="inline" on:click={()=> showActiveStudy(i)}>...study details</button> -->
          </p>
          <div class="buttons">
            <button class="details" on:click={()=> showActiveStudy(i)}>
              <span>Study details</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0155 4.76531L6.26552 8.51531C6.23069 8.55017 6.18934 8.57783 6.14381 8.5967C6.09829 8.61558 6.04949 8.62529 6.00021 8.62529C5.95093 8.62529 5.90213 8.61558 5.85661 8.5967C5.81108 8.57783 5.76972 8.55017 5.7349 8.51531L1.9849 4.76531C1.91453 4.69494 1.875 4.59951 1.875 4.49999C1.875 4.40048 1.91453 4.30505 1.9849 4.23468C2.05526 4.16432 2.1507 4.12479 2.25021 4.12479C2.34972 4.12479 2.44516 4.16432 2.51552 4.23468L6.00021 7.71984L9.4849 4.23468C9.51974 4.19984 9.5611 4.1722 9.60662 4.15335C9.65214 4.13449 9.70094 4.12479 9.75021 4.12479C9.79948 4.12479 9.84827 4.13449 9.8938 4.15335C9.93932 4.1722 9.98068 4.19984 10.0155 4.23468C10.0504 4.26952 10.078 4.31089 10.0969 4.35641C10.1157 4.40193 10.1254 4.45072 10.1254 4.49999C10.1254 4.54927 10.1157 4.59806 10.0969 4.64358C10.078 4.6891 10.0504 4.73047 10.0155 4.76531Z" fill="#095845"/>
                </svg>
                
            </button>
            <button class="read">Read study</button>
          </div>
          
          
        </div>
        <div class="location">
          {research.Location}
        </div>
        
        
      </div>
      {#if research.active}
      <div class="active" use:animationElement
      style="height: {$height}px; overflow: hidden;" >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- <div class="block" on:mouseleave={()=> hideActiveStudy(i)} use:animationElement style="height:{$height}px;"> -->
          <div class="block" on:mouseleave={()=> hideActiveStudy(i)}>
          <div class="block-inner" >
            <h2>{research.title}</h2>
            <p >{research.Overview}</p>
            <div class="buttons">
              <button class="details" on:click={()=> {hideActiveStudy(i)}}>
                <span>Study details</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.98448 7.23469L5.73448 3.48469C5.76931 3.44983 5.81066 3.42217 5.85619 3.4033C5.90171 3.38442 5.95051 3.37471 5.99979 3.37471C6.04907 3.37471 6.09787 3.38442 6.14339 3.4033C6.18892 3.42217 6.23028 3.44983 6.2651 3.48469L10.0151 7.23469C10.0855 7.30506 10.125 7.40049 10.125 7.50001C10.125 7.59952 10.0855 7.69495 10.0151 7.76532C9.94474 7.83568 9.8493 7.87521 9.74979 7.87521C9.65028 7.87521 9.55484 7.83568 9.48448 7.76532L5.99979 4.28016L2.5151 7.76532C2.48026 7.80016 2.4389 7.8278 2.39338 7.84665C2.34786 7.86551 2.29906 7.87521 2.24979 7.87521C2.20052 7.87521 2.15173 7.86551 2.1062 7.84665C2.06068 7.8278 2.01932 7.80016 1.98448 7.76532C1.94964 7.73048 1.922 7.68911 1.90314 7.64359C1.88429 7.59807 1.87458 7.54928 1.87458 7.50001C1.87458 7.45073 1.88429 7.40194 1.90314 7.35642C1.922 7.3109 1.94964 7.26953 1.98448 7.23469Z" fill="var(--ui-icon)"/>
                  </svg>
              </button>
              <button class="read">Read study</button>
            </div>
            

            <div class="info" in:fade={{delay:200,duration:300}}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.32791 9.86994C7.99804 9.4238 8.5068 8.77386 8.77897 8.01622C9.05115 7.25857 9.07227 6.43345 8.83923 5.66287C8.60619 4.89229 8.13135 4.21717 7.48493 3.73733C6.83851 3.25749 6.05483 2.99841 5.24979 2.99841C4.44474 2.99841 3.66106 3.25749 3.01464 3.73733C2.36823 4.21717 1.89339 4.89229 1.66034 5.66287C1.4273 6.43345 1.44843 7.25857 1.7206 8.01622C1.99277 8.77386 2.50153 9.4238 3.17166 9.86994C1.95947 10.3167 0.924228 11.1435 0.220412 12.2268C0.183422 12.2818 0.157728 12.3436 0.144825 12.4086C0.131922 12.4736 0.132066 12.5405 0.14525 12.6054C0.158434 12.6703 0.184394 12.732 0.221621 12.7868C0.258848 12.8416 0.3066 12.8885 0.362101 12.9247C0.417602 12.9609 0.479744 12.9857 0.544917 12.9977C0.610089 13.0097 0.676991 13.0086 0.741734 12.9945C0.806477 12.9803 0.867769 12.9535 0.922048 12.9155C0.976327 12.8775 1.02251 12.8291 1.05791 12.7731C1.51191 12.0748 2.13313 11.501 2.86518 11.1038C3.59723 10.7066 4.41691 10.4985 5.24979 10.4985C6.08266 10.4985 6.90234 10.7066 7.63439 11.1038C8.36644 11.501 8.98767 12.0748 9.44166 12.7731C9.515 12.8821 9.62828 12.9578 9.75702 12.9839C9.88576 13.0101 10.0196 12.9845 10.1297 12.9127C10.2397 12.841 10.3171 12.7288 10.345 12.6004C10.373 12.4721 10.3493 12.3379 10.2792 12.2268C9.57534 11.1435 8.5401 10.3167 7.32791 9.86994ZM2.49979 6.74994C2.49979 6.20604 2.66107 5.67435 2.96324 5.22212C3.26542 4.76988 3.69491 4.41741 4.19741 4.20927C4.6999 4.00113 5.25284 3.94667 5.78628 4.05278C6.31973 4.15888 6.80973 4.4208 7.19433 4.80539C7.57892 5.18999 7.84084 5.67999 7.94694 6.21344C8.05305 6.74688 7.99859 7.29982 7.79045 7.80231C7.58231 8.30481 7.22984 8.7343 6.7776 9.03648C6.32537 9.33865 5.79368 9.49994 5.24979 9.49994C4.52069 9.49911 3.8217 9.20911 3.30616 8.69357C2.79061 8.17802 2.50061 7.47903 2.49979 6.74994ZM15.6335 12.9187C15.5225 12.9911 15.3872 13.0165 15.2574 12.9891C15.1277 12.9618 15.0141 12.8841 14.9417 12.7731C14.4882 12.0744 13.8671 11.5003 13.1349 11.1033C12.4027 10.7062 11.5827 10.4988 10.7498 10.4999C10.6172 10.4999 10.49 10.4473 10.3962 10.3535C10.3025 10.2597 10.2498 10.1325 10.2498 9.99994C10.2498 9.86733 10.3025 9.74015 10.3962 9.64638C10.49 9.55261 10.6172 9.49994 10.7498 9.49994C11.1548 9.49955 11.5547 9.40973 11.9209 9.23688C12.2871 9.06403 12.6107 8.81243 12.8684 8.50004C13.1262 8.18766 13.3117 7.82221 13.4118 7.4298C13.5119 7.03739 13.5242 6.62771 13.4476 6.23003C13.371 5.83235 13.2076 5.45649 12.9689 5.12931C12.7303 4.80212 12.4223 4.53169 12.067 4.33733C11.7117 4.14297 11.3178 4.02948 10.9136 4.00498C10.5094 3.98047 10.1047 4.04555 9.72854 4.19556C9.6672 4.22207 9.60118 4.23603 9.53436 4.23659C9.46754 4.23715 9.40129 4.22432 9.33952 4.19885C9.27774 4.17337 9.2217 4.13578 9.17471 4.08828C9.12771 4.04078 9.09071 3.98434 9.0659 3.9223C9.04108 3.86026 9.02895 3.79388 9.03022 3.72707C9.0315 3.66026 9.04615 3.59439 9.07332 3.53334C9.10048 3.47229 9.1396 3.41731 9.18838 3.37164C9.23715 3.32597 9.29459 3.29053 9.35729 3.26743C10.2182 2.92409 11.1758 2.91174 12.0452 3.23275C12.9147 3.55377 13.6345 4.18541 14.0658 5.00582C14.497 5.82623 14.6092 6.77729 14.3806 7.67551C14.152 8.57373 13.5989 9.35548 12.8279 9.86994C14.0401 10.3167 15.0753 11.1435 15.7792 12.2268C15.8516 12.3379 15.8769 12.4732 15.8496 12.6029C15.8223 12.7327 15.7446 12.8462 15.6335 12.9187Z" fill="var(--ui-brand)"/>
                </svg>
                <div class="text">
                  <p class="small" >{research.Researchers}</p>
                </div>
            </div>
            <div class="info" in:fade={{delay:200,duration:300}}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.498 6.2767 13.8126 4.62455 12.594 3.406C11.3754 2.18744 9.7233 1.50198 8 1.5ZM13.5 8C13.5004 8.50723 13.4304 9.01205 13.2919 9.5H10.885C11.0383 8.50588 11.0383 7.49412 10.885 6.5H13.2919C13.4304 6.98795 13.5004 7.49277 13.5 8ZM6.375 10.5H9.625C9.30482 11.5491 8.74899 12.5111 8 13.3125C7.2513 12.5109 6.69551 11.549 6.375 10.5ZM6.13125 9.5C5.95959 8.50737 5.95959 7.49263 6.13125 6.5H9.87375C10.0454 7.49263 10.0454 8.50737 9.87375 9.5H6.13125ZM2.5 8C2.49957 7.49277 2.56961 6.98795 2.70813 6.5H5.115C4.96167 7.49412 4.96167 8.50588 5.115 9.5H2.70813C2.56961 9.01205 2.49957 8.50723 2.5 8ZM9.625 5.5H6.375C6.69518 4.45088 7.25102 3.48886 8 2.6875C8.74871 3.48908 9.3045 4.45102 9.625 5.5ZM12.8956 5.5H10.6694C10.3888 4.47057 9.91588 3.50355 9.27563 2.65C10.0492 2.83583 10.7734 3.18674 11.3987 3.67866C12.024 4.17058 12.5355 4.79189 12.8981 5.5H12.8956ZM6.72438 2.65C6.08413 3.50355 5.61122 4.47057 5.33063 5.5H3.10188C3.46455 4.79189 3.97605 4.17058 4.60131 3.67866C5.22657 3.18674 5.95081 2.83583 6.72438 2.65ZM3.10188 10.5H5.33063C5.61122 11.5294 6.08413 12.4965 6.72438 13.35C5.95081 13.1642 5.22657 12.8133 4.60131 12.3213C3.97605 11.8294 3.46455 11.2081 3.10188 10.5ZM9.27563 13.35C9.91588 12.4965 10.3888 11.5294 10.6694 10.5H12.8981C12.5355 11.2081 12.024 11.8294 11.3987 12.3213C10.7734 12.8133 10.0492 13.1642 9.27563 13.35Z" fill="var(--ui-brand)" />
                </svg>
                <div class="text">
                  <p class="small">{research.links}</p>
                </div>
            </div>

            <div class="info" in:fade={{delay:200,duration:300}}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.6725 3.12498C2.61871 3.17161 2.5755 3.22918 2.54575 3.29385C2.516 3.35852 2.5004 3.4288 2.5 3.49998V14C2.5 14.1326 2.55268 14.2598 2.64645 14.3535C2.74021 14.4473 2.86739 14.5 3 14.5C3.13261 14.5 3.25979 14.4473 3.35355 14.3535C3.44732 14.2598 3.5 14.1326 3.5 14V11.2356C5.17437 9.91311 6.61687 10.6262 8.27812 11.4487C9.30312 11.9556 10.4069 12.5019 11.5906 12.5019C12.4612 12.5019 13.3744 12.205 14.3294 11.3769C14.3832 11.3302 14.4264 11.2727 14.4561 11.208C14.4859 11.1433 14.5015 11.073 14.5019 11.0019V3.49998C14.5016 3.40401 14.4738 3.31013 14.4217 3.22956C14.3695 3.14898 14.2953 3.08511 14.2079 3.04557C14.1204 3.00603 14.0234 2.99249 13.9285 3.00657C13.8336 3.02066 13.7447 3.06176 13.6725 3.12498C11.9225 4.63936 10.44 3.90561 8.72187 3.05498C6.94187 2.17248 4.92375 1.17436 2.6725 3.12498ZM13.5 10.7656C11.8256 12.0881 10.3831 11.3744 8.72187 10.5525C7.15937 9.78061 5.42125 8.91936 3.5 10.0275V3.73686C5.17437 2.41436 6.61687 3.12748 8.27812 3.94936C9.84062 4.72123 11.5794 5.58248 13.5 4.47436V10.7656Z" fill="var(--ui-brand)"/>
                </svg>
                
                <div class="text">
                  <p class="small">{research.peer}</p>
                </div>
            </div>
          </div>
          <div class="location" in:fade={{delay:100,duration:300}}>
            {research.Location}
          </div>
          
          <!-- <button class="read">Read study</button> -->
        </div>
      </div>
      {/if}

    </div>
      
    {/each}
  </div>

</Center>


<style lang="scss">

  @import "../../../../pathway";
  @import "../../../../mixins";

  .research {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    max-width: 1058px;
    margin: 0 auto;
    font-family: var(--ui-font-base);

    // @include md {
    //   grid-template-columns: repeat(2, 1fr);
    // }

    @include md {
      grid-template-columns: repeat(3, 1fr);
    }

    .block {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--ui-s0);
      height: 100%;
      padding: var(--ui-s1);

      &.hidden {
        transition: none !important;
        opacity: 0;
      }
    }

    .active {
      position: absolute;
      left: 0;
      top: 0;
      min-height: 100%;
      background: var(--ui-bg);
      z-index: 101;
      // box-shadow: 0 0 0 1px var(--ui-border);
      box-shadow:  0 0 0 1px var(--ui-border), 0px 235px 66px 0px rgba(0, 0, 0, 0.00), 0px 150px 60px 0px rgba(0, 0, 0, 0.01), 0px 85px 51px 0px rgba(0, 0, 0, 0.05), 0px 38px 38px 0px rgba(0, 0, 0, 0.09), 0px 9px 21px 0px rgba(0, 0, 0, 0.10);
        z-index: 100;

        &::before {
          display: none;
        }
    }
    
    .unit {
    
      border-left: 1px solid var(--ui-border);
      border-top: 1px solid var(--ui-border);
      position: relative;
      z-index: 1;
      transition: all 0.2s ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--ui-s3);


      &.active {
        transition: none !important;
        box-shadow: none !important;
      }

      &:nth-child(3n) {
        border-right: 1px solid var(--ui-border);
      }

      &:last-child {
        border-right: 1px solid var(--ui-border);
        border-bottom: 1px solid var(--ui-border);
      }
      &:nth-last-child(2) {
        border-bottom: 1px solid var(--ui-border);
      }
      &:nth-last-child(3) {
        border-bottom: 1px solid var(--ui-border);
      }

      &:hover {

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: 0 0 0 1px var(--ui-border);
          pointer-events: none;
        }
        background: var(--ui-bg);
        box-shadow: 0px 235px 66px 0px rgba(0, 0, 0, 0.00), 0px 150px 60px 0px rgba(0, 0, 0, 0.01), 0px 85px 51px 0px rgba(0, 0, 0, 0.05), 0px 38px 38px 0px rgba(0, 0, 0, 0.09), 0px 9px 21px 0px rgba(0, 0, 0, 0.10);
        z-index: 100;

        .read {
          opacity: 1;
        }
        .details {
          opacity: 1;
        }
      }

      h2 {
        font-size: var(--ui-f4);
        letter-spacing: var( --ui-f4-ls);
        line-height: var(--ui-lh-sm);
        margin-bottom: var(--ui-s-1);
        color: var(--ui-brand);
        text-wrap: pretty;
      }

      p {
        font-size: var(--ui-f3);
        letter-spacing: var( --ui-f3-ls);
        line-height: var(--ui-lh);
        color: var(--ui-fg);
        text-wrap: pretty;

        &.small {
          font-size: var(--ui-f2);
          color: var(--ui-brand);
          font-style: italic;
        }
      }
      
      p + p {
        margin-top: var(--ui-s0);
      }

      .location {
        font-size: var(--ui-f2);
        color: var(--ui-fg-muted);
      }

      .details {
        background: transparent;
        color: var(--ui-brand);
        border: 0;
        font-size: var(--ui-f2);
        border-radius: 4px;
        font-weight: 400;
        border: 0;
        margin: 0 var(--ui-s-6) 0 0;
        box-shadow: 0 0 0 1px var(--ui-border);
        padding: var(--ui-s-4) var(--ui-s-2)var(--ui-s-4) var(--ui-s0);
        // transition: all 0.2s ease-in-out;
        cursor: pointer;
        // width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--ui-s-4);
        
        @include md {
          opacity: 0;
        }
      }

      .read {
        // width: 100%;
        // position: absolute;
        // bottom: var(--ui-s1);
        // right: var(--ui-s1);
        background: var(--ui-brand);
        color: var(--ui-fg-onbrand);
        border: 0;
        font-size: var(--ui-f2);
        letter-spacing: var(--ui-f2-ls);
        line-height: var(--ui-lh);
        border-radius: 4px;
        font-weight: 600;
        border: 0;
        padding: var(--ui-s-4) var(--ui-s0);
        
        // transition: all 0.2s ease-in-out;
        cursor: pointer;

        @include md {
          opacity: 0;
        }
      }

    }
  }

  .inline {
    display: inline;
    padding: 0;
    margin: 0;
    background: transparent;
    border: 0;
    font-size: var(--ui-f3);
    color: var(--ui-brand);
    cursor: pointer;
  }

  .info {
    display: flex;
    gap: var(--ui-s-4);

    .text {
      flex: 1;
    }

    & + & {
      margin-top: var(--ui-s0);
    }
  }

  .buttons {
    display: flex;
    gap: var(--ui-s-4);
    padding: var(--ui-s0) 0;
  }

</style>