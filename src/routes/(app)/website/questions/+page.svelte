<script lang="ts">
  import Center from '$lib/util/Center.svelte';
  import { fade, fly, scale, slide } from 'svelte/transition';
  import { quartOut, backOut, elasticOut, linear} from "svelte/easing"
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let transition = quartOut

  let activeAccordion = null;

  function toggleAccordion(event) {
    const accordionPanel = event.target.nextElementSibling;
    if (accordionPanel.style.display === 'block') {
      accordionPanel.style.display = 'none';
    } else {
      accordionPanel.style.display = 'block';
    }
  }

  function handleAccordionClick(event) {
    const accordionHeader = event.target;
    const accordionPanel = accordionHeader.nextElementSibling;

    if (accordionPanel.style.display === 'block') {
      accordionPanel.style.display = 'none';
      activeAccordion = null;
    } else {
      accordionPanel.style.display = 'block';
      activeAccordion = accordionPanel;
    }
  }

  onMount(() => {
    const accordionHeaders = document.querySelectorAll('.section-accordion h3');
    accordionHeaders.forEach((header) => {
      header.addEventListener('click', handleAccordionClick);
    });
  });


</script>


<svelte:head>
  <title>GD: FAQ Page</title>
</svelte:head>

<Center
--flex-direction="column" 
  --background="var(--bg)" 
  --gap="var(--24px)" 
  --justify-content="flex-start"
>
  <div class="holder">

    <div class="left">

      <!-- <div class="desc">Contents</div> -->

      <ul class="toc">
        <li><a href="#">Commonly asked questions</a></li>
        <li><a href="#">What are the impacts?</a></li>
        <li><a href="#">How can I help?</a></li>
        <li><a href="#">I have a question about my donation</a></li>
        <li><a href="#">About GiveDirectly</a></li>
      </ul>

    </div>

    <div class="middle">

      <div class="section-accordion">
        <h2>Most common questions</h2>
        <h3>Can I sign up to be a recipient?</h3>
        <div class="accordion-panel show">
        <p>In order to be as fair to all as possible, we select recipients using a systematic and proactive set of criteria that vary from country to country, and do not accept inbound applications for our international programs.</p>
        </div>
          <h3>How do you decide to whom to give cash transfers?</h3>
        <div class="accordion-panel show">
        <p>We aim to find the poorest possible recipients while using criteria that are simple, fair, cost-effective, and difficult to game. Currently, our default is to locate extremely poor villages using poverty data from national surveys, and then enroll all households in the village. For programs with specific targeting requirements (e.g. refugees, contactless programs) we use a range of identification methods, including obtaining lists from partners (gov’ts, NGOs, or community-based organizations) or partnering with apps. In the past, we have also selected the poorer households within villages using simple criteria, e.g. enrolling families living in homes with thatched roofs and not those with metal roofs, and also experimented with a wide range of other targeting approaches including community-based methods, points-based systems such as the Progress out of Poverty Index (PPI) and the Multidimensional Poverty Index (MPI); subjective assessments; and various blends of these approaches.</p>
        </div>
          <h3>Do you give money to men, women, or both?</h3>
        <div class="accordion-panel">
        <p>We give money to both men and women. Innovations for Poverty Action’s evaluation of our work included an experimental comparison of transfers to men and women and found some modest differences, but that overall both genders used money responsibly. Given this data, we let households decide on a case-by-case basis which adult to enroll. Their decisions are usually driven by convenience – for example, one parent may already have the official IDs needed to open a mobile money account. Slightly more than half of our recipients to date are women.</p>
        </div>
          <h3>How much do recipients get?</h3>
        <div class="accordion-panel">
        <p>For one-time large grant programs, we typically send each recipient household roughly US$1,000, which is around one year’s expenditure for the average household and around US$200 per family member for the average family of 5. There is nothing magical about this amount, but it reflects a few factors. First, it is fair in the sense that US$1,000 is the amount the average recipient household would need to invest in order to raise its income to the level of its ineligible neighbors. Second, it reflects existing evidence, in the sense that US$1,000 is in the ballpark of the total amounts delivered by other programs that have been studied extensively (with the main difference that these programs transfer money over longer time periods). To put US$1,000 in context, in a typical setting where we work, this would buy you 5.5 years of secondary schooling, 5.2 years of basic food requirements for one adult, 1.2 acres of land, or metal roofs for 4 houses.</p>
        </div>
          <h3>Do recipients need to have a mobile phone to participate?</h3>
        <div class="accordion-panel">
        <p>No. Households need at least a SIM card to participate, and we give SIM cards to households that do not already have one. We also give recipients the option of purchasing a phone from us at bulk rates in order to make it easier to communicate with them. When recipients choose this option we deduct the value of the phone from their transfer. Historically the large majority of recipients in both Kenya and Uganda have chosen to buy a phone.</p>
        </div>
          <h3>Are the transfers one-time or ongoing?</h3>
        <div class="accordion-panel">
        <p>In our default program, we provide a one-time transfer paid in multiple installments. In other programs, such as COVID-19 relief or basic income, we deliver cash as multiple smaller payments. We tell recipients exactly how much they should expect to receive and what the timeline will look like during the enrollment process before transfers are sent.</p>
        <p>We also conduct experimental research comparing the impacts of different transfer timings. In a first study, we found some evidence that recipients are more likely to spend larger lump-sum transfers on physical assets and more likely to spend streams of smaller payments on nutrition. Recipients themselves tend to prefer a small number of large payments; in ongoing work, we are estimating the impact of giving them more control over transfer timing.”</p>
        </div>
          <h3>How exactly is the transfer made?</h3>
        <div class="accordion-panel">
        <p>We send transfers using electronic payments services, such as M-Pesa (operated by Safaricom) in Kenya, MTN mobile money in Uganda, and MTN in Rwanda. In each case, we either collect account information from recipients (if they are already enrolled) or walk them through the process of opening accounts, which may include obtaining appropriate identification documents. When we transmit electronic money to the recipient’s account, they receive a text message notifying them that they have been paid. Recipients can then exchange their mobile money for physical cash anywhere in the payment providers’ network of mobile money agents. Agents are often local shopkeepers, but can also be petrol stations, supermarkets, courier companies, cyber cafes, and even banks. Recipients can also use their money to directly pay merchants who accept it as a form of payment.</p>
        </div>
          <h3>Where does GiveDirectly operate?</h3>
        <div class="accordion-panel">
        <p><span data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJCVUxMRVRFRF9MSVNUJTIyJTJDJTIyaXNWb2lkJTIyJTNBZmFsc2UlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJCVUxMRVRFRF9MSVNUX0lURU0lMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMmJsb2NrJTIyJTJDJTIydHlwZSUyMiUzQSUyMnBhcmFncmFwaCUyMiUyQyUyMmlzVm9pZCUyMiUzQWZhbHNlJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCUyQyUyMm5vZGVzJTIyJTNBJTVCJTdCJTIyb2JqZWN0JTIyJTNBJTIydGV4dCUyMiUyQyUyMmxlYXZlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMmxlYWYlMjIlMkMlMjJ0ZXh0JTIyJTNBJTIyV2UlMjBjdXJyZW50bHklMjBoYXZlJTIwb3BlcmF0aW9ucyUyMGluJTIwRFJDJTJDJTIwS2VueWElMkMlMjBMaWJlcmlhJTJDJTIwTWFsYXdpJTJDJTIwTW96YW1iaXF1ZSUyQyUyME1vcm9jY28lMkMlMjBOaWdlcmlhJTJDJTIwUndhbmRhJTJDJTIwVWdhbmRhJTJDJTIwVVNBJTJDJTIwJTI2JTIwWWVtZW4uJTIyJTJDJTIybWFya3MlMjIlM0ElNUIlNUQlN0QlNUQlN0QlNUQlN0QlNUQlN0QlNUQlN0QlNUQlN0Q=">We currently have operations in 9 African countries: DRC, Kenya, Liberia, Malawi, Mozambique, Morocco, Nigeria, Rwanda, Uganda. We also have operations in Yemen.</span></p>
        <p><span data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJCVUxMRVRFRF9MSVNUJTIyJTJDJTIyaXNWb2lkJTIyJTNBZmFsc2UlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJCVUxMRVRFRF9MSVNUX0lURU0lMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMmJsb2NrJTIyJTJDJTIydHlwZSUyMiUzQSUyMnBhcmFncmFwaCUyMiUyQyUyMmlzVm9pZCUyMiUzQWZhbHNlJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCUyQyUyMm5vZGVzJTIyJTNBJTVCJTdCJTIyb2JqZWN0JTIyJTNBJTIydGV4dCUyMiUyQyUyMmxlYXZlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMmxlYWYlMjIlMkMlMjJ0ZXh0JTIyJTNBJTIyV2UlMjBjdXJyZW50bHklMjBoYXZlJTIwb3BlcmF0aW9ucyUyMGluJTIwRFJDJTJDJTIwS2VueWElMkMlMjBMaWJlcmlhJTJDJTIwTWFsYXdpJTJDJTIwTW96YW1iaXF1ZSUyQyUyME1vcm9jY28lMkMlMjBOaWdlcmlhJTJDJTIwUndhbmRhJTJDJTIwVWdhbmRhJTJDJTIwVVNBJTJDJTIwJTI2JTIwWWVtZW4uJTIyJTJDJTIybWFya3MlMjIlM0ElNUIlNUQlN0QlNUQlN0QlNUQlN0QlNUQlN0QlNUQlN0QlNUQlN0Q="><br>
        </span> We chose to work in these countries because they have large populations that are living in extreme poverty and yet are reachable through electronic payment systems, and we were able to raise funds to work there. We have also delivered disaster <a href="http://givedirectly.org/united-states" rel="internal" target="_self">response programs in the United States</a> and previously launched a <a href="https://www.givedirectly.org/covid-19/" rel="internal" target="_self">U.S. coronavirus response fund</a>. We consider working in additional countries only when there is a strong argument that we can increase our impact by enough to justify the fixed setup costs.</p>
        </div>
          <h3>How do local governments feel about GiveDirectly’s presence?</h3>
        <div class="accordion-panel">
        <p>Typically, very positively. We take our relationships with local government seriously, obtaining the necessary approvals at each level from national governments down to village leaders. We also find that GiveDirectly tends to make voters happy.</p>
        </div>
          <h3>What have we learned so far from the Basic Income pilot village?</h3>
        <div class="accordion-panel">
        <p>It’s been fascinating; we’ve shared some initial thoughts&nbsp;<a href="https://www.givedirectly.org/what-its-like-to-receive-a-basic-income/" rel="internal" target="_self">here</a>, but&nbsp;<a href="https://www.givedirectly.org/email-sign-up/" target="_self" rel="internal">sign up for our emails</a>&nbsp;to receive updates as we learn more.</p>
        </div>
          <h3>How do you prevent corruption?</h3>
        <div class="accordion-panel">
        <p>The two main corruption risks that typically arise in transfer programs involve (a) manipulation of the list of eligible recipients and (b) diversion of transfers sent to eligible recipients. We address the first through a comprehensive audit process, using multiple independent checks to ensure that recipients are eligible and have not been charged bribes to get on the list. These checks include in-person visits by different staff members, in-person audits by senior management, remote data audits, and phone calls with each recipient, all prioritized using modern analytics. We address the second through identity-matching between our records and those of our payment providers, through comprehensive follow-up calls to ensure money is reaching the intended recipients, and in some cases through direct staff monitoring of cash-out points.</p>
        </div>
          <h3>How do I know if a message from/about GiveDirectly is legitimate?</h3>
        <div class="accordion-panel">
        <p><span style="font-weight: 400;">If you aren’t sure whether a message from or piece of information about GiveDirectly is valid, you can ask us for verification by emailing </span><a href="mailto:info@givedirectly.org" rel="internal" target="_self"><span style="font-weight: 400;">info@givedirectly.org</span></a><span style="font-weight: 400;">.</span></p>
        <p><span style="font-weight: 400;">Please also visit our scam prevention page to learn about avoiding scams that target GiveDirectly’s donors and recipients: </span><a href="https://www.givedirectly.org/avoiding-scams/" rel="internal" target="_self"><span style="font-weight: 400;">givedirectly.org/avoiding-scams</span></a><span style="font-weight: 400;">.</span></p>
        </div>
      </div>

      <div class="section-accordion">
        <h2>What are the impacts?</h2>
              <h3>How do recipients use the transfers?</h3>
        <div class="accordion-panel">
          <p>By design, cash transfers let recipients use money for whatever is most important to them. Innovations for Poverty Action’s <a href="https://www.poverty-action.org/publication/household-response-income-changes-evidence-unconditional-cash-transfer-program-kenya" rel="external" target="_blank">evaluation</a> of our transfers in Kenya found increases in expenditure across all categories measured, including food, medical and education expenses, durables, home improvement, and social events. It also found large increases in income and in asset holdings, in particular livestock, furniture, and iron roofs. In addition to this research on GiveDirectly’s transfers, there is <a href="https://www.givedirectly.org/research-on-cash-transfers" rel="internal" target="_self">a large body of research</a> from around the world documenting the impacts of cash transfers on low-income households. See <a href="https://live.givedirectly.org/" rel="internal" target="_self">GDLive</a> for a good idea of how cash is being spent in real time.</p>
        </div>
              <h3>Do recipients spend on alcohol or tobacco?</h3>
        <div class="accordion-panel">
          <p>Innovations for Poverty Action’s evaluation of our work in Kenya found no increase in expenditure on tobacco, alcohol, or gambling. This is consistent with a substantial body of research on the effects of cash transfers, which has found that, if anything, recipients spend less on alcohol and tobacco after receiving cash transfers (<a href="https://www.journals.uchicago.edu/doi/abs/10.1086/689575" rel="external" target="_blank">Evans and Popova, 2016</a>).</p>
        </div>
              <h3>Do transfers create conflict or tension between recipients and non-recipients, or within households?</h3>
        <div class="accordion-panel">
          <p>We ask recipients about tension in the community in follow-up calls after they have received transfers. To date, recipients report relatively low levels of tension related to the transfers: 5% report arguments within their communities and 1% report violence or crime.</p>
      <p>The available evidence on tension&nbsp;<em>within</em>&nbsp;households suggests that transfers actually reduce it substantially. Innovations for Poverty Action’s evaluation of our work found “suggestive evidence that cash transfers reduce domestic violence and increase female empowerment in both recipient households&nbsp;<em>and other households in the same village</em>” (<a href="http://www.iies.su.se/polopoly_fs/1.162160.1389355591!/menu/standard/file/HaushoferJob%20Market%20Paper.pdf" target="_blank" rel="external">Haushofer &amp; Shapiro 2013</a>).</p>
      <p>This is consistent with what our recipients tell us in follow-up calls. It is also in line with earlier studies suggesting that conflict is driven by the hard choices that poverty forces: for example, which child should be allowed to starve. As one woman put it, “there is no peace in the family when there is no food to eat” (<a href="https://www.odi.org/sites/odi.org.uk/files/odi-assets/publications-opinion-files/2574.pdf" target="_blank" rel="external">Slater &amp; Mphale 2008</a>).</p>
        </div>
              <h3>Is giving cash sustainable?</h3>
        <div class="accordion-panel">
          <p>Usually when the word “sustainable” is applied to charity, it means that a gift “keeps on giving” and that donors need not continue to make gifts to the same recipient. Since many GiveDirectly grant recipients use some or all of the money to invest in small enterprises, many of GiveDirectly’s grants are “sustainable.” Indeed, one study of unconditional cash transfers in Mexico found that household incomes increased by between 1.5 and 2.6 times the amount of the transfers due to the returns from increased investment (Sadoulet, Elisabeth and Alain de Janvry, and Benjamin Davis. “Cash Transfer Programs with Income Multipliers: PROCAMPO in Mexico.” World Development 29(6) pp. 1043-1056, 2001), suggesting that cash transfers are more than sustainable. Beyond short-run income changes, investments in adequate food, proper clothing, better health, or more education for children may be “sustainable” in the long run; even though it will require charity until that child is done with school, he or she will grow up much better off and in need of much less assistance than his or her parents.</p>
      <p>Not all recipients will invest the money, however, and it will be gone once it is spent. Donors who prefer to give a gift that is guaranteed to be sustainable in the sense that it will provide a steady income stream to the poor can do so. One easy option is for the donor to invest a gift themselves and donate the annual interest, effectively creating an endowment.</p>
        </div>
              <h3>Why not put conditions on what people have to do to get transfers?</h3>
        <div class="accordion-panel">
          <p>We choose to provide unconditional, rather than conditional, cash transfers for two reasons. First, empowering the poor to make their own decisions advances our core value of respect. Second, imposing conditions requires costly monitoring and enforcement structures be put in place. One detailed estimate put the administrative costs of a conditional cash transfer scheme as high as 63% of the transfers made over the first three years of the program (Caldes, Natalia, and John Maluccio. “The Costs of Conditional Cash Transfers.” Journal of International Development 17 pp. 151-168, 2005). Our read of the existing experimental evidence comparing the impact of conditional to unconditional transfers is that there is little evidence to suggest these added costs produce commensurate benefits.</p>
        </div>
              <h3>Why not make micro-loans?</h3>
        <div class="accordion-panel">
          <p>The&nbsp;<a href="https://www.givedirectly.org/research-on-cash-transfers" rel="internal" target="_self">evidence on the impact of cash transfers is far stronger than that for micro-loans, whose&nbsp;</a><a href="https://www.givedirectly.org/pdf/DFID_microfinance_evidence_review.pdf" rel="internal" target="_blank">impacts have generally been below expectations</a>. We think that micro-loans are likely beneficial for the poor, but given the evidence, see no reason to incur the added costs of administering them.</p>
      <p>We suspect that the disappointing track record of micro-loans may have to do with their structure. These loans often bear high interest rates, reflecting the high costs of administering and monitoring them, which in turn limit their benefit to borrowers. They also tend to have short-term structures and require borrowers to begin making repayments shortly after borrowing. These features make micro-loans less useful for financing the kinds of long-term investments (e.g. education or durable goods) that recipients often make with grants.</p>
        </div>
              <h3>How does GDLive work?</h3>
        <div class="accordion-panel">
          <p>Check out our&nbsp;<a href="https://www.givedirectly.org/announcing-gdlive/" rel="internal" target="_self">write-up on GDLive</a>&nbsp;and the&nbsp;<a href="https://www.givedirectly.org/how-participants-opt-in-to-gdlive/" rel="internal" target="_self">opt-in process for recipients</a>.</p>
        </div>
          </div>

          <div class="section-accordion">
            <h2>How can I help?</h2>
                  <h3>How can I help?</h3>
      <div class="accordion-panel">
        <ol>
<li>Help us spread the word about direct giving and the evidence of its impact. Have conversations with friends and family, consider hosting events in your community, or share our emails and social media posts.</li>
<li><a href="https://www.givedirectly.org/create-fundraiser/" rel="internal" target="_self">Organize a fundraiser</a> (or just an awareness event) via your workplace, school, religious community, etc. If you are interested in organizing a fundraising activity or campaign, we’d love to hear from you.</li>
<li>Stay updated on our work via <a href="https://www.givedirectly.org/email-sign-up/" rel="internal" target="_self">email</a>, <a href="https://www.givedirectly.org/blog/" rel="internal" target="_self">our blog</a>, <a href="https://www.facebook.com/givedirectly" rel="external" target="_blank">Facebook</a>, or <a href="https://twitter.com/GiveDirectly" rel="external" target="_blank">Twitter</a>.</li>
<li>Lastly, you can help by referring <a href="https://www.givedirectly.org/join-us" rel="internal" target="_self">great talent</a>. We’re always looking to meet exceptional people who are excited about our vision.</li>
</ol>
      </div>
            <h3>How can I raise money for GiveDirectly?</h3>
      <div class="accordion-panel">
        <p>Several ways. First, talk to friends about whether they give money directly to those living in poverty. Starting that conversation is a huge step toward. Second, <a href="https://www.givedirectly.org/create-fundraiser/" rel="internal" target="_self">create a fundraiser for GiveDirectly</a> and share it with your network. Alternatively, you can raise funds for GiveDirectly recipients on <a href="https://www.facebook.com/givedirectly" target="_blank" rel="external">Facebook</a> or <a href="https://www.gofundme.com/start/charity-fundraising" target="_blank" rel="external">GoFundMe</a>.</p>
      </div>
            <h3>Can I partner with GiveDirectly?</h3>
      <div class="accordion-panel">
        <p>Potentially. We partner with select organizations to promote cash transfers, deliver transfers to specific target populations, generate new evidence on impacts, etc. Contact us at&nbsp;<a href="mailto:info@givedirectly.org" target="_self" rel="internal">info@givedirectly.org</a>&nbsp;with a description of what you have in mind.</p>
      </div>
            <h3>Can I use GiveDirectly's logos for fundraising?</h3>
      <div class="accordion-panel">
        <p>Please contact us at <a href="mailto:info@givedirectly.org" target="_self" rel="internal">info@givedirectly.org</a>&nbsp;explaining how you’d like to use it, and we’ll evaluate requests on a case-by-case basis.</p>
      </div>
            <h3>How can I stay updated on your work?</h3>
      <div class="accordion-panel">
        <p>Several ways:&nbsp;<a href="https://www.givedirectly.org/email-sign-up/" target="_self" rel="internal">sign up to get occasional updates by email</a>&nbsp;and&nbsp;<a href="https://twitter.com/GiveDirectly" target="_blank" rel="external">follow us on Twitter</a>&nbsp;or&nbsp;<a href="https://www.facebook.com/givedirectly/" target="_blank" rel="external">Facebook.</a></p>
      </div>
            <h3>Can I volunteer at GiveDirectly?</h3>
      <div class="accordion-panel">
        <p>No. We generally do not host volunteers, but encourage you to apply to our&nbsp;<a href="https://boards.greenhouse.io/givedirectly/jobs/4129255005" target="_blank" rel="external">general interest opening</a>&nbsp;so that we have your name on file.</p>
      </div>
            <h3>Are you hiring?</h3>
      <div class="accordion-panel">
        <p>We’re always looking to meet exceptional people who are excited about our vision. Check out our&nbsp;<a href="https://www.givedirectly.org/join-us" rel="internal" target="_self">job listing page</a>&nbsp;to find our current openings.</p>
      </div>
        </div>

        <div class="section-accordion">
          <h2>I have a question about my donation</h2>
                <h3>Can I choose to whom to give?</h3>
    <div class="accordion-panel">
      <p>No; we let donors choose which programs to donate to, but not individual recipients. Practically speaking, if we did the latter we would risk being regulated as a money transfer service and losing our charitable status. Philosophically, we aim to target the poorest possible recipients, and not those with compelling profiles or narratives. Finally, it keeps costs down.</p>
<p>If you’d like to get a better sense of how your donation is impacting recipients&nbsp;<a href="https://live.givedirectly.org/" rel="internal" target="_self">check out GDLive</a>! Create an account and “follow” recipients. That will allow you to see how recipients are using the money as they receive each payment, and how it’s affecting their lives. A lot of our donors have reported that GDLive gives them a feeling of closer connection to the individuals they’re helping.</p>
    </div>
          <h3>How can I direct my donation to a specific program?</h3>
    <div class="accordion-panel">
      <p><span style="font-weight: 400;">Go to the “</span><a href="http://donate.givedirectly.org" rel="internal" target="_self"><span style="font-weight: 400;">Give Now</span></a><span style="font-weight: 400;">” page and click on “edit program” to choose from the list.&nbsp;</span></p>
<p><span style="font-weight: 400;">“Poverty relief – Africa” is the default designation for online donations. If you don’t choose a program when you donate through our website, this is where your donation will go. These donations will be used to deliver cash transfers for any of our programs in Africa. </span><span style="font-weight: 400;"><br>
</span></p>
<p><span style="font-weight: 400;">If you give via check, wire transfer, stock, DAF, or crypto, you can allocate your donation to a specific program by adding it to the memo field or by emailing </span><a href="mailto:info@givedirectly.org" rel="internal" target="_self"><span style="font-weight: 400;">info@givedirectly.org</span></a><span style="font-weight: 400;">.</span></p>
<p><span style="font-weight: 400;">Donations that come through these channels without a program designation will be treated as unrestricted and used where needed most across cash transfers, operations, or <a href="https://www.givedirectly.org/financials/" target="_self" rel="internal">fundraising costs</a>. <span style="font-weight: 400;"></span></span></p>
    </div>
          <h3>How quickly will my donation reach a person in need?</h3>
    <div class="accordion-panel">
      <p>For our standard one-time transfer programs, we enroll the recipient who will receive your donation within a few months of the gift and deliver the money within another few months. For special projects or studies, the lag may be a bit longer depending on coordination with the research team, fundraising needs, or other constraints.</p>
    </div>
          <h3>Is my donation tax deductible? What is GiveDirectly's tax ID #?</h3>
    <div class="accordion-panel">
      <p>Yes, donations are tax-deductible in the United States to the extent allowed by law. Our federal EIN is 27-1661997. Tax advantaged methods of giving directly are also available in a number of other countries;&nbsp;<a href="https://www.givedirectly.org/give-now" rel="internal" target="_self">see our giving page</a>&nbsp;for details.</p>
<p>🇦🇺Australia: via <a href="https://effectivealtruism.org.au/donate/?ref=givedirectly" target="_blank" rel="external">Effective Altruism Australia</a><br>
🇨🇦Canada: via <a href="https://rcforward.org/charity/givedirectly/?ref=givedirectly" target="_blank" rel="external">RC Forward</a><br>
🇨🇿Czech Republic: via <a href="https://effektiv-spenden.org/donate-cz/?ref=givedirectly" target="_blank" rel="external">Effektiv Spenden</a><br>
🇩🇪Germany: via <a href="https://www.effektiv-spenden.org/givedirectly" rel="external" target="_blank">Effektiv Spenden</a><br>
🇳🇱Netherlands: RSIN: 8257 94 948<br>
🇳🇿New Zealand: via <a href="https://effectivealtruism.nz/donate/?ref=givedirectly" target="_blank" rel="external">Effective Altruism New Zealand</a><br>
🇳🇴Norway via <a href="https://www.gieffektivt.no/?ref=givedirectly" rel="external" target="_blank">gieffecktiv.no</a><br>
🇪🇸Spain: via <a href="https://ayudaefectiva.org/dona#/" target="_blank" rel="external">Ayuda Efectiva</a><br>
🇨🇭Switzerland: via <a href="https://www.effektiv-spenden.org/givedirectly" rel="external" target="_blank">Effektiv Spenden</a><br>
🇬🇧United Kingdom: 1167938<br>
🇺🇸United States: EIN is 27-1661997</p>
    </div>
          <h3>How can I find out if my employer will match my donation?</h3>
    <div class="accordion-panel">
      <p><a href="https://doublethedonation.com/givedirectly" target="_blank" rel="external">DoubleTheDonation</a>&nbsp;offers a helpful search to see if your employer will match donations to GiveDirectly. If you can’t find us there, consider making a suggestion at your company.</p>
    </div>
          <h3>How can I update or cancel my monthly donation amount?</h3>
    <div class="accordion-panel">
      <p>To update or cancel your monthly donation,&nbsp;<a href="https://www.givedirectly.org/update-donation/" rel="internal" target="_self">please fill out this form</a>. Once we have completed your request we will send an email confirmation. Please allow 48 hours for requests made outside of business hours.</p>
    </div>
          <h3>How can I update my payment information?</h3>
    <div class="accordion-panel">
      <p>To make changes to your payment method for your monthly donation we will need to cancel your current donation and have you begin a new donation from scratch. It’s quick and easy! If you’d like to proceed,&nbsp;<a href="https://www.givedirectly.org/update-donation/" rel="internal" target="_self">please fill out this form</a>. Once we have completed your request, you’ll receive an email confirmation. (Please allow up to 48 hours for any requests made outside of business hours.)</p>
    </div>
          <h3><a id="crypto" rel="internal">How can I donate stock or mutual fund shares?</a></h3>
    <div class="accordion-panel">
      <p>To make a tax-deductible donation of publicly traded stocks to GiveDirectly, you can transfer the shares to our brokerage account.</p>
<blockquote><p>Account name: Give Direct Inc.<br>
Account number: 220-66222<br>
DTC#: 0352<br>
Bank name: J.P. Morgan Clearing Corp</p></blockquote>
<p>To donate mutual fund shares, please email <a href="mailto:info@givedirectly.org" target="_self" rel="internal">info@givedirectly.org</a> with the following information, which you can find by contacting your brokerage:</p>
<blockquote><p>Delivering Firm Name:<br>
Delivering Acct #:<br>
Delivering Acct Name:<br>
Share Quantity:<br>
Symbol:</p></blockquote>
<p><span style="font-weight: 400;">Allocate or dedicate your donation (ex. to a fundraiser or specific program) by noting it in</span><span style="font-weight: 400;"> the transfer memo or emailing </span><a href="mailto:info@givedirectly.org" rel="internal" target="_self"><span style="font-weight: 400;">info@givedirectly.org</span></a><span style="font-weight: 400;">. Donations without a program designation will be treated as unrestricted and used where needed most across cash transfers, operations, or <a href="https://www.givedirectly.org/financials/" target="_self" rel="internal">fundraising costs</a>.</span></p>
    </div>
          <h3>Can I give via check or wire?</h3>
    <div class="accordion-panel">
      <p>You can give via both check and wire transfer.</p>
<p><strong>Please make your check payable to:</strong><br>
GiveDirectly, Inc.</p>
<p><strong>Send your check to:</strong><br>
GiveDirectly, Inc.<br>
PO Box 3221<br>
New York, NY 10008</p>
<p><mark>Only checks sent through USPS will be delivered to our PO Box; checks sent via FedEx or UPS will be returned to sender.</mark></p>
<p><strong>If sending a check by certified mail or courier:<br>
</strong>JPMorgan Chase Lockbox Processing<br>
Att: GiveDirectly Inc., Box 3221<br>
4 Chase Metrotech, 7th Fl East<br>
Brooklyn, NY 11245</p>
<p><strong>Our bank account details for sending a wire or ACH transfer are as follows:</strong></p>
<p>Account Name: GiveDirectly, Inc.<br>
Account Type: Checking<br>
Account number: 120191050<br>
Routing number: 021000021<br>
Bank Name: Chase Manhattan Bank, 919 3rd Ave., New York, NY, 10022, USA</p>
<p><span style="font-weight: 400;">Allocate or dedicate your donation (ex. to a fundraiser or specific program) by noting it in the check/wire memo or emailing </span><a href="mailto:info@givedirectly.org" rel="internal" target="_self"><span style="font-weight: 400;">info@givedirectly.org</span></a><span style="font-weight: 400;">. Donations without a program designation will be treated as unrestricted and used where needed most across cash transfers, operations, or <a href="https://www.givedirectly.org/financials/" target="_self" rel="internal">fundraising costs</a>.</span></p>
    </div>
          <h3>Can I give directly using cryptocurrencies (e.g. Bitcoin, Ethereum, Doge, etc)?</h3>
    <div class="accordion-panel">
      <p>Yes. You can donate to GiveDirectly in a wide variety of cryptocurrencies. You can see a list of our wallet addresses <a href="https://www.givedirectly.org/crypto/" rel="internal" target="_self">on this page</a>.</p>
<p>We also accept BTC and ETH/ERC20 through <a href="https://donate.givedirectly.org/" rel="internal" target="_self">our donation page.</a></p>
<p><span style="font-weight: 400;">Please </span><span style="font-weight: 400;">email us</span><span style="font-weight: 400;"> if you would like a tax receipt or to dedicate the donation. </span><span style="font-weight: 400;">Donations without a program designation will be treated as unrestricted and used where needed most across cash transfers, operations, or <a href="https://www.givedirectly.org/financials/" target="_self" rel="internal">fundraising costs</a>.</span></p>
    </div>
      </div>


      <div class="section-accordion">
        <h2><a id="segovia" rel="internal">About GiveDirectly</a></h2>
              <h3>When and why was GiveDirectly founded?</h3>
  <div class="accordion-panel">
    <p>GiveDirectly was founded by Michael Faye, Paul Niehaus, Jeremy Shapiro, and Rohit Wanchoo, who were studying economic development at Harvard and MIT at the time and also looking for the most effective way to give their own money to reduce poverty. They found that cash transfers had a strong evidence base, and that the rapid growth of mobile payments technology in emerging markets had opened the door to delivering cash transfers securely and efficiently on an unprecedented scale. They created GiveDirectly as a private giving circle in 2009 and opened it to the public in 2011 after two years of operational testing.</p>
  </div>
        <h3>Do you implement the program yourself or partner with other organizations?</h3>
  <div class="accordion-panel">
    <p>We manage the transfer process from end-to-end ourselves. In the majority of programs, our field team identifies and enrolls recipients. At times, for humanitarian response programs, we work with external partners to quickly identify and reach recipients in need. We partner with research organizations to conduct independent evaluations of the impact of our programs and with a range of organizations to increase awareness about our work.</p>
  </div>
        <h3>What is the relationship between GiveDirectly and Segovia?</h3>
  <div class="accordion-panel">
    <p>Segovia Technology Co. (Segovia) is a financial technology company co-founded by two members of GiveDirectly’s board. GiveDirectly uses Segovia in some programs to issue payments via mobile money networks. The relationship between the two organizations is as follows:</p>
<ul>
<li>Vendor contract decisions are made by independent members of the GiveDirectly team. Contracts between GiveDirectly and Segovia are reviewed and approved by the independent members of GiveDirectly’s board, as required by our policies.</li>
<li>GiveDirectly holds a minority non-voting stake in Segovia, which was donated to GiveDirectly by its founders.</li>
<li>Segovia was formed by two common board members and co-founders of GiveDirectly, Michael Faye and Paul Niehaus. Michael Faye is president of GiveDirectly and serves on the board of Crown Agents Bank which Segovia merged with in 2019 . Paul Niehaus serves on the board of GiveDirectly.</li>
<li>One additional employee, Melissa Harpool, splits her time between the two organizations and is compensated pro rata by each.</li>
</ul>
<p>More information about the relationship can be found in this <a href="https://www.givedirectly.org/givedirectly-and-segovia/" rel="internal" target="_self">blog post</a>.</p>
  </div>
        <h3>How do I report an ethics violation?</h3>
  <div class="accordion-panel">
    <p>If you believe you’ve observed GiveDirectly staff, volunteers, vendors, contractors, or partners engaging in misconduct (including fraud, harassment, discrimination, or any other form of unethical behavior), you may file an ethics report with our third-party reporting hotline <a href="https://www.givedirectlyethicsreporting.com/home.html" rel="external" target="_blank">here</a>.</p>
  </div>
    </div>

    </div> <!-- middle-->
    
  </div>
    
  

</Center>

<style lang="scss">

  @import "../../../../donor";

  $height: 48px;
  $radius: 8px;

  .holder {
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
    padding: var(--42px) 25px;
    display: flex;
    gap: 40px;
  }

  .left {
    width: 280px;
    // position: sticky;
    // left: 0;
  }

  .middle {
    flex: 1;
    padding: 0 var(--24px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .desc {
    font-size: 14px;
    font-weight: 600;
    color: var(--grey-600);
    margin: 10px 0 20px 0;
  }

  .toc {
    margin: 0;
    padding: 10px 0 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: sticky;
    left: 0;
    top: 42px;

    li {
      width: 100%;
    }

    li a {
      color: var(--green-600);
      // display: block;
      padding: 4px 0;
      text-decoration: none;
      border-bottom: 1px solid var(--green-100);
      transition: all 0.25s ease-in-out;
      font-weight: 600;

      &:hover {
        border-bottom-color: var(--green-600);
      }
    }
  }

  .accordion-panel {
    display: none;
    margin-bottom: 30px;

    a {
        color: var(--green-600);
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        color: var(--grey-500);
        // margin-bottom: 30px;
      }

  }

  .section-accordion {
    width: 100%;
    padding-bottom: 30px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--grey-100);
    max-width: 65ch;

    h2 {
      font-weight: 600;
      font-size: 30px;
      margin-bottom: 30px;
      letter-spacing: -0.5px;
      color: var(--grey-600);
    }

    h3 {
      font-weight: 500;
      margin: 15px 0 ;
      font-size: 16px;
      color: var(--grey-600);
      cursor: pointer;
    }
  }
  


</style>