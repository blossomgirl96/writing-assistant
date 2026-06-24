## 1 
CHI wrapped up a couple of weeks ago, (the biggest yearly conference in Human Computer Interaction )and I spent some time going through the proceedings to understand the latest AI interaction research and trends .Some insights -

- Lot of research interest in Human-AI Collaboration (esp. in education tools, studying trust formation in human AI interactions) and Human-AI Co-creativity tools. Compared to past years, research in explainability fairness etc has gone down. Needless to say, HCI research is very very genAI pilled this year.

- Google and MS still dominate industry research and I was a bit sad to see the frontier AI labs like OpenAI and Anthropic didn’t want to share anything.

- CMU, Tsingua, University of Washington, University of Michigan dominate the academic publication space.


My biggest learning however came from putting this together. Given the proceedings were 300 pages long, I used Claude code & Cowork to help sift the first pass. However both tools, when given nearly identical prompts, produced meaningfully different outputs. Even basic counts (e.g., number of papers by company) didn’t line up. So I went down a rabbit hole of counting papers and tagging them myself until I realised I wasn’t getting any closer to my original goal. After much unnecessary grunt work, I leaned more on the less wrong one, Cowork output.

*Sigh*

These AI tools are incredibly useful for getting to a first draft of understanding, but I’m convinced that they’re still far from being reliable aggregators of truth. There’s something paradoxical about them that they make it easy to feel like you’re making rapid progress, while increasing the need for careful validation.

Anyway I’m happy to share my compilation in the comments. For anyone curious to do their own slicing, the SIGCHI website shares a json of the conference proceedings.

## 2
Interesting take on the use of AI in user research. Its not a should we question, but 'where' should we question.

## 3
I made an app for busy parents to plan weekend activities for kids without the fuzz of frequent deliberation :) Check it out ^_^
It started out as a weekend project to fiddle with Google's AI tools but the more I played around, I realized parents truly need a pat on their back for juggling chores, errands, office work, helping elderly parents etc etc and also trying to create memorable moments for their kids.


The app helps you quickly input info and get a weekend plan for kids activities. Link in the comments. Let me know if you have any feedback for my prototype 🌻

## 4
Amazing, yet unsurprising! Something about the evergreens, the winter mist, and the lavender laden hills brings out the poet in you at Berkeley.

## 5
I recently read an HBR article that put words to something I’ve felt about AI workplace productivity tools: A lot of the time it doesn’t reduce your time, but a lot more intense with a lot of multi-tasking, and it's a question mark whether you actually saved time in the process.

Instead of doing less, I’ve spent a lot of time context switching. A lot of parallel threads, and tweaking and wondering if this is even the right thing to be generating? But without having a solid understanding of the underlying process, you go into the task with a false sense of aptitude, and the intensity adds up in ways that are hard to see until you’re already tired.

As a PM, I’ve experienced this a lot trying to put on the designer hat with vibe coding tools. You might be trying to sense whether something feels on-brand without having a strong mental model of the specific design language and the branding guide apt for that setting. So you circle around “what good looks like,” learning in motion, spending a lot of time correcting courses without fully knowing why. Most of the time you end up regressing around the mean. But a designer using the same tool would probably have a vastly different experience having a better grasp of the tooling language and hence better ability to steer the model.

That’s the pattern I keep coming back to: AI amplifies expertise more than it replaces it. To actually unlock productivity, you need clarity on the domain, what the right inputs are, what the outputs should mean, and where things tend to go wrong so you can control for it. It also explains why we’re seeing so many experts’ boutique businesses selling prompt libraries, tools, and how-I-AI-in-my-job courses. ChatPRD is a great example because Claire Vo really understands what it means to write a great PRD so she’s abstracted her mental model of a PRD nicely into a repeatable and scalable form in ChatPRD.

For this reason, I’m skeptical of the idea that entire functions will simply be replaced by AI agents anytime soon. Strong professionals can offload the tedious parts of their work and supervise AI effectively, whether they’re an accountant, lawyer or a designer. But without the grounding of knowing what good vs bad output look like, all of the AI powers feel brittle and confusing, and increased 'productivity' risks turning into frustration.

Link to the article in the comments:

## 6
I recently had a bit of a revelation about driving real business success in AI pilots. The breakthrough of what makes AI successful doesn’t have to come from it being better AI. It could be as simple as getting the basics of information visualization principles right.

I’ve worked on a bunch of typical enterprise AI use cases and they’ve seldom come down to one core question: How much risk can we safely manage while automating more of the workflow?

That’s where the tension between automation and human-in-the-loop (HITL) shows up. It’s easy to say, “Keep humans in the loop for risky steps.”  But if everything requires review, then where’s the AI leverage?

As you move downstream in the roadmap, the metrics start pointing in one direction:
1. Increase predictability
2. Increase reliability
3. Safely automate more value

Which really means: How do we reduce HITL without increasing risk?

The answer often lies in how information is structured and presented, not just how the model performs. If you can present more complexity with less cognitive load, users can triage faster, spot anomalies quicker, intervene only where it truly matters.

For this problem I went back to a required reading from grad school, The Visual Display of Quantitative Information by Edward Tufte. His principles from the book (originally meant for info viz experts) gives you ideas on taking high quality decisions with less effort - like, how do you maximize signal over noise within minimal space constraints, how to enable fast cognitive comparison between data, how to design to present both overview and detail at the same time. 

Especially when it comes to helping users evaluate the quality of AI’s decision making at a glance, there are a lot of transferable learnings here. As we take on bigger mandates for automation, I think the trick is to know how to design the experience so that human attention is used exactly where it’s needed most.

## 7
I recently took an evals refresher course by Aishwarya Naresh Reganti and Kiriti Badam and it made me reflect on everything on the topic I learned by trial and error :) Some learnings off the top of my mind ➡️ ➡️

Stakeholders need to understand the risk they’re accepting.
Shipping a vertical AI use case means aligning with your user on acceptable probabilistic risk & user experience. You can show false positive rates, accuracy metrics, and sample distributions all day, but that rarely helps business stakeholders provide clear threshold guidance for you to put into the product. It takes creative, concrete communication to help them articulate what “good enough” actually means and where guardrails should sit.

Stakeholder time is scarce and expensive.
Good AI products require deep user involvement, but many experts (lawyers, doctors, etc.) are far more incentivized to do their core job than help build AI. Participation in product conversations is a net cost to them. As a PM, you have to be ruthlessly efficient with their time and extract maximum signal from minimal interaction.

Drift is inevitable, not hypothetical.
You can carefully sample, stratify, and launch with strong offline metrics and still watch performance shift a lot in production. Real-world data is messy and constantly changing, and information comes in all sorts of chaotic ways. Without ongoing monitoring and mechanisms to measure live accuracy, your evaluation story is conveying the wrong story about product success.

Evaluation is part science, part art.
In theory, we want clean rubrics and objective criteria. In practice, many decisions, even in regulated industries happen through human judgment, negotiation, and knowing who to pin accountability for outcomes. AI cannot be fired, sued, or jailed which is why teams end up obsessing over edge cases. The real work becomes defining where AI should be trusted and where to insert human-in-the-loop workflows.

Building a custom benchmark is unglamorous, critical work.
If you’ve ever gotten to the point of building custom benchmarks, you’ll know that it is a real grind: operationalizing fuzzy human concepts into precise definitions, curating representative datasets, capturing edge cases, and ensuring inter-annotator agreement. It’s tedious, invisible labor, but if you get it wrong, the entire benchmark (and everything built on it) becomes meaningless. All the more reason to incorporate expert feedback from the beginning.

Link to the original evals course in the comments.

## 8
Some reflections to guide the new year
Consider this a delayed release. 🌥️⛅️🌤️☀️ I’ve learned that I’m not wired for holiday posts or December 31 reflections :)
At the start of last year, I set a simple goal for myself: learn something new every month. I’ve been reflecting on how it actually turned out. Sharing a few learnings below in no particular order.

1. Writing publicly is complicated.
I wrote consistently on LinkedIn for a while… and then I didn’t. I learned that engagement isn’t always a proxy for value. Thoughtful pieces often went unnoticed, while celebratory updates shot up in engagement. Over time, I realized I didn’t want my motivation to be driven by having to be visible. I’ll continue sharing when I feel I have something authentic and useful to contribute, but not by any kind of pressure.

2. Speaking is rewarding, but depth matters more.
I gave a couple of talks at AI meetups. Mostly because all the cool kids were doing it, and I did meet thoughtful, curious people across disciplines. I enjoyed it but I also felt a strong pull to return to deep work. Real insights take time, and I’ve learned to respect that cadence.

3. I do my best work in groups.
Despite the popular narrative around solo building, my biggest wins this year came from collaboration. I’m not the loudest person in the room, but I’m genuinely energized by working with others, at work and in passion projects alike.

4. Building is hard.
I recruited a team and pursued a long-standing goal of building human-like poetry with AI. It didn’t work out. The team was talented and wonderful but not the right fit for the stage or vision. It was a humbling lesson in team building.

5. Ruthless prioritization isn’t optional.
I stretched myself too thin often and occasionally folded under the weight of my own expectations. Reminder: Protect the white space in your day to day to do nothing.

6. Relationships matter deeply.
My most grounding moments come from time spent with people I cared about, not the intense stretches where I was 'locked in'.

7. You always have more leverage than you think you do
Don’t ever project squishiness, even if it's accidental. It is easy to be noticed and taken advantage of. I delayed action once this year out of misplaced agreeableness. In hindsight, I had more leverage than I allowed myself to believe.

8. Stay close to what genuinely interests you.
I’ve long been drawn to literature. Serendipitously, that interest led me to someone working on an AI writing tool research project who'd just raised funding and I joined the project. Moments like that reinforce a simple belief: sustained curiosity compounds in unexpected ways.

9. Be opinionated on your own terms.
Early this year, I tried things simply because they seemed like the right thing to do, or because everyone else had tried it. In hindsight, I did have strong opinions, I just forced myself through the method of elimination. I'm glad that I am a tad bit closer to clearer conviction.


## 9 
Really enjoyed taking the course on Building Agentic AI applications by Aishwarya Naresh Reganti and Kiriti Badam. Even though I had hesitations about taking a flipped class model course in the beginning, I soon started enjoying the in-person sessions where we dove into the material and the technical discussions. I also really appreciated the thought they put into helping structure our final projects, which was the most enjoyable part for me. I really liked the emphasis on solving actual problems with AI even though it was meant to be a capstone project to finish the course.

Overall, it was a very rewarding experience racing to the finish line with my team mates Mahtab Soin, Manpreet Arora, Ameya Bongale, Faith Morante, Antoaneta Vladimirova, PhD MSc working on some very challenging problems in education. Appreciate the learnings, and the cameraderie formed!

For anyone interested in the course, link in the comments.

## 10
I recently revisited an essay by Alan Kay, one of the pioneers of the Graphical User Interface at Xerox PARC, and it made me think about interface design in the age of AI.

Kay quotes McLuhan’s Understanding Media:
“Anyone who wishes to receive a message embedded in a medium must first have internalized the medium so it can be ‘subtracted’ out to leave the message behind… the medium is the message… you have to become the medium if you use it…. Learning to use tools reshapes us.”

He gives the example of how the printing press didn’t just make books cheaper, it rewired human thought and gave rise to science itself and made it more accessible.

So I’ve been asking myself: What are these new interfaces rewiring us into?
ChatGPT is shaping how we write and think. TikTok is shaping our attention span. Instagram is shaping our sense of self-worth. We are talking to algorithms more than we talk to friends. We are being optimized as much as we are optimizing.

I think it's time we flipped the question and looked more inward to ask: ‘What kind of person do I want to become?’, ‘What kind of world do I want to help create?’, ‘What do I create to achieve that?’

If the printing press taught us to read, we can design AI interfaces that teach us to play, to think, to connect — not just to optimize. I say the most urgent question with AI isn’t “How many hours does it save?” or “How much more can I produce” but “What kind of human do I want this tool to help me become?”

Read the original essay in the comments link below for some inspiration.

## 11
It's great to see more and more consumer-centric products emerging from the woods! Excited to try this one out.

## 12
I had the opportunity to attend the UC Berkeley Agentic AI Summit last weekend — always a joy to be back on campus (though sadly, no Oski sightings this time :(
The event brought together a thoughtful mix of panel discussions with business and technical leaders, hands-on workshops, and research posters from top universities. I found the talk by Ion Stoica on agent evaluation to be the most unbiased and interesting. 
It was also fun (and a bit surprising!) to see agents making their way into blockchain research posters and, of course, the large mob of people escorting Vinod Khosla on the way out with side selfies. 
If you’re curious to explore the content, videos from the summit are live on YouTube. Highly recommend a watch.

## 13
Earlier this month, I had the pleasure of speaking at the July AI Camp meetup on building LLM applications with Emotional intelligence. Big thanks to Bill Liu, Amar Chheda, and Rajesh Daddi for helping make it happen, and to everyone in the audience for such an interactive, thoughtful, and fun session!

Together we unpacked the Q - Why isn’t EQ of LLMs as mainstream as IQ especially when emotional intelligence is so fundamental to the chat-based experiences that define how users interact with AI today?

I shared thoughts on how we can embed empathy at multiple levels of the product, aligning with both user needs and business goals. We also discussed the importance of setting thoughtful guardrails to prevent emotional manipulation and the open challenge of how we might measure EQ in LLMs across diverse cultural and demographic contexts.

If you’re thinking about building products with EQ in mind or are doing any work relevant to this, please reach out! I would love to talk more. 

Pic credits: Sai Subramanian, Lorace Deen
Thanks Docker, Inc and todd densmore for the event sponsorship.
hashtag#LLMs hashtag#AI hashtag#technology

## 14
I’ve always been intrigued by LI influencer content that goes like: “Here’s how you change X in your life with AI.” As much as I’ve wanted to partake in the unbridled optimism, part of me has also been cynical about the incentives behind creating such FOMO-fueled engagement.

So this week, out of curiosity, I followed through with one of the repeat hacks floating around my feed: using an LLM to analyze your LinkedIn connections and uncover life-changing insights.

Per the instructions, I downloaded my LinkedIn usage data and looked at my connection graph to see what “network capital” I’d accumulated over the years. To be honest, I was skeptical going in that LinkedIn would provide such info about their users. The CSV had nothing groundbreaking—just the usual public info: Name, Job Title, Company. 

Anyway, here goes the experiment.
I tested the dataset with both ChatGPT and Claude. ChatGPT was quick to produce answers, while Claude liked to think a bit longer. I even pasted the same prompt from the original post:

"Analyze these CSVs. I'm curious about who I tend to be connected with on LinkedIn, in which industries, and what roles they have, etc. And what % of them are located in SF? What are some questions I could ask you to get the most interesting patterns here?"

Both models did the usual slicing and dicing: top industry (tech—no surprise), top companies, top locations, top job titles, periods of peak activity.
I applaud them, but honestly, this was all fairly obvious since I’d built up my network myself.

When it came to going beyond this knowledge 101, Claude offered higher-quality thoughts. It suggested ways to leverage the data more creatively that I might not have immediately considered, like:
- What’s my network’s collective hiring power?
- What skills and technologies are trending across my connections’ roles?
- Which of my connections are at companies that just raised funding?

But when I probed both models with these questions, the answers turned vague. Since I was already familiar with the ground truth, I even caught ChatGPT making up details—like recommending a new grad as a hiring manager or labeling people as Bay Area residents when they worked for the parent company in India.

A lot of surface-level insights—but without doubling down on thoughtful prompting, I wasn’t getting any closer to the big results the original post promised. And to even come up with those prompts, you’d already need a PRD-like sense of what you’re trying to accomplish - not something you want to force on someone trying to get through a hack. 

Overall, I think the experiment validated my initial hypothesis. The back and forth surfaced some thoughtful questions. But beyond basic network analysis, if you really want meaningful insights, it feels like you’d need a dedicated product.


hashtag#genai hashtag#ai hashtag#technology hashtag#llms

## 15 
Some takeaways from being in failure mode with AI tools: I recently created a website for my poetry using Lovable. And while I love how it turned out, I wish it hadn’t consumed my entire weekend.

Toolstack:
 - Lovable for the site
 - Midjourney for the images

1. Surprisingly good at hard things, bad at easy ones
 I hooked up a database to the site in under 5 minutes. But I spent 30+ minutes trying (and failing) to move a nav bar icon. It just got worse with every prompt until I gave up and checked the code myself. Honestly, stuff a junior dev would fix in seconds still trips up LLMs, which is why I’m not worried about AI replacing devs just yet.

2. Over-explaining can actually backfire
 I started with a detailed PRD inspired by YouTube tutorials. In retrospect, it was a mistake. The LLM got confused and made stubbornly simple errors. When I scrapped it and just said “make a site with a <secret sauce> vibe,” it worked much better. Less was more.

3. Prompting isn’t enough
 I know it’s 2025 and we’ve heard this a million times, but still every tool makes it point to reinforce this - text-only interfaces suck for UI. I spent 20+ hours on this project (partly because I was playing with image models), but it made me miss the drag-and-drop ease of old-school Wix. I can understand why it might be better to push for prompts only (more AI use = more $$), but I’d kill for a hybrid UI : text + visual editor. For transparency, I used 7/100 monthly credits just trying to fix the nav bar glitch. Unforgivable.

Anyway, I’m happy with how the site turned out, it really captured the essence I wanted. A friend called it “ethereal and fairy-like.” I’d love to hear what you think if you have a minute :) Link in the comments. 

hashtag#technology hashtag#ai hashtag#llms

## 16 
Loved reading this no-fluff and honest experience building AI for healthcare. Abridge's valuation story shows AI is ready to help doctors with admin work as part of the caregiving journey. But we're still far from AI making direct contact with the patient experience. It was interesting to read this founder's experience amidst academic papers trying to prove ChatGPT is a better doctor than real humans.

## 17
'm curious to hear how people of color use Image generation models to create images of humans that look like them. For some reason, it's been very hard for me to simply get Midjourney to draw the image of a South Asian Woman without it turning into a Slumdog Millionaire movie poster. 

For some context: 
I started off trying to "create an image of a young woman enjoying the sun at the beach". And there it was, it spat out 4 options with a beautiful woman,....with the most Nordic-looking face. 

Since this was for a personal project, I prompted again, asking for a 'South Asian young woman'. This time the image came out as a woman with a slightly tanned complexion, dark hair and dark brown eyes. But she still retained the facial structure and overall appearance, still very much western looking.

I prompted with more specifics - South Asian young woman with Indian ethic hair, Indian ethnic complexion, Indian ethic appearance. Now it spat out the image of a woman with dirty teeth, tattered clothes, and what I think appeared like a shady background. Huh. 

I gave up prompting and uploaded some stock images from the web and asked it to model off them, and this time it outputted some images with weird facial deformation. Each time it gave me the wrong image, at some psychological level, I was reminded of all the ways I was different, and somehow it felt like a deficiency. To be made aware by a machine that I am not one with silky smooth hair, milky complexion, or a long, tender-looking nose. 

It's one thing to read about AI biases in academic-responsible AI research, but to experience it so viscerally firsthand is, I feel, is when it really hits. 

It's interesting to think that in the AI age, women who look like me are invisible in the catalogue of 'beautiful young woman'. We are only made visible through long context-skilled prompting with descriptions that all of a sudden feel weirdly specific.

## 18
Mary Meeker’s report on AI trends (2025) came out last week and it’s such a high-density high signal info packed into a not-so-compact slide deck. Recommend reading for anyone working on building their strategic thinking chops and keeping up with the AI race. Link in comments!

## 19
Really liked this short read on the role of art in the age of AI. Art isn’t just the sum of human labor that went into its creation.  To acknowledge it is to honor the emotion, perspective, and humanity that no algorithm can replicate.

When tech influencers dismiss the value of artistry, especially with the Ghibli art slop, they miss the point. I remember standing in front of Van Gogh’s Starry Night and Wheatfield with Crows, feeling for a moment like I was experiencing the same struggles as him, struggling to balance hallucinations and reality, and to justify my existence. No AI can induce me to have the same feeling.

## 20
Hi everyone!
I'd love to hear any recommendations on interesting evening tech events (or calendars) in the New York City area. I will be visiting next week and looking forward to discovering interesting work and events in Human-Computer Interaction and Gen AI.

I've been interested in human-AI collaboration, co-creativity, trust, and risk navigation with AI products. If you have similar or adjacent interests, please reach out! I would love to catch up.

## 21
#jobalert - For an ML Engineer 🚀 🚀
Our team at Evident is on the look out for a Senior ML Engineer (5+ yoe preferred) with a background in document extraction technology (OCR). Please reach out if you're interested. JD in the comments. You'll be working closely with me and 3 amazing SWEs on the team!

hashtag#ai hashtag#machinelearning

## 22
Super stoked to say that my hackathon team was a winner at this weekend’s MongoDB Gen AI hackathon in San Francisco! We designed an AI nutrition assistant that allows users to scan the nutritional label information of their food to instantly visualize its impact on their health. 
This was an amazing opportunity to familiarize with applying LLMs and RAG on tabular data (thanks to Upstage and MongoDB for the helpful resources )! 

Also funny that this was the first time I signed up last minute for an event with no team, and yet managed to find an inspiring group of people to ideate with, create something cool, and have fun :D 

Thanks to my amazing teammates - Sander Leung for leading the ideation, Kevin Q Tran, Lucas Ho, Natalie Lunbeck for the hard work on prototyping, and Juliana Chyzhova for sharing her text and image prompting prowess with me!

## 23
Lessons on creating compelling copilot experiences with AI: 

I recently did a project comparing the AI copilot experiences on 2 of my most used applications - Grammarly and Liner Highlights and penned some of my thoughts in the linked article. Here are some snippets - 

💡 Key takeaways: 
At the end of the day, copilots are an added layer of interaction that’s standing between you and getting work done. That means more competition for user attention against all the current UI affordances that are already built-in. 
The ones that succeed, demonstrate immediate value to the user without inhibiting their choice to go back to familiar workflows. Grammarly gets this right when Liner fails. 

 🚩 Liner: 
When to interrupt the user: 
For something that looks like an API wrapper with surface-level plumbing, Liner (a webpage highlighter tool) tries to be very ambitious in becoming a web copilot. It promises to pull out relevant info from web pages and synthesize knowledge for you on the go. But that turns into an annoying user experience when it repeatedly interrupts your flow with unhelpful suggestions and gets in the way of doing work. 

Ideally, a copilot should interrupt you only when it is HIGHLY confident that its way of getting things done is more efficient than manually doing it. Liner is not intelligent in discerning this. 

Taking on-screen real estate:
Copilots also take up real estate on top of your UI, so you've to be careful with its placement. I found it hilarious how in many instances, the copilot widget sat right on top of an important button on a page making me push it away to get something done. 

Understanding context: 
Figuring out context is nuanced when the user is ambiguous about their task. I looked up a timetable on my calendar, and it returned a summary of the different meetings I had taken that month on the side panel. Maybe I would have found it more helpful if it pulled up associated deadlines, documents, meetings, etc... but intelligence lies in predicting that context without making the user clarify everything every time in a long natural language prompt. Moving on...

🌱 Grammarly: 
I loved how Grammarly chose a very specific problem in writing to demo their copilot. It lets you select a sentence or paragraph in your writing and 'improve it' to sound better, or you can ask it explicit suggestions so you can do it yourself ( I really did think the suggestions were helpful). The extension even gives you an option to add constraints to the writing style to make it sound like you. It's simple and yet solves a painful enough problem a large portion of their users face. They also have an in-house team of linguists constantly checking and providing annotations for their model (and I'm a pro-subscriber). Unlike Liner, they seem to realize the value of getting 1 thing consistently right when commercializing a breakthrough technology. 

More info at the link in the comments :)

-Meera 🌻

hashtag#ai hashtag#ux hashtag#productmanagement hashtag#productdesign

## 24 
Some thoughts on improving AI feature design and increasing consumer adoption 💭 💭 
I recently got to demo the new generative AI features for LinkedIn profile generation, and penned some thoughts on it. Also attached are some speculative design mockups in the linked article to reimagine the user experience. 

LinkedIn now lets you create whole sections of your profile with AI - like the Headline and the Summary section, so you do not have to break your head coming up with the perfect (yet professional) joke for your intro. 

If you don’t like a suggestion, you can hit replay until you get what you like or edit the AI-suggested content with your own edits. I believe this new feature is targeted to compete with apps like Jobscan that help users keyword-optimize their LinkedIn profiles; with the end goal that your profile stands on top in both general and recruiter search. 

And yet, for all the AI, I felt like I actually took MORE time editing with AI vs. without AI 😅 

The AI gave me suggestions, stitching together some useful, some random, and some outdated information from my profile that was irrelevant to my current path. Perhaps asking for some user context beforehand would have been helpful. 

It gave me the freedom to edit its responses, but then left me with zero directions on HOW I should edit it to create a good response that satisfies the algorithm gods. That did not feel like a good design practice to me. Competitors like Jobscan excel not because they give text suggestions, but because they EXPLAIN what makes a keyword perform well and what doesn't work, and thus guide the user to the right descriptions. 

Some handholding with inline explanations would have offered me so much more help than me having to go online, figure out how to bend the algorithm, and then come back to edit. 

But zooming out…
What might be the issue here is that the incremental value delivered by implementing explanations and getting the AI feature to perform at basic UX expectations - does not justify the costs required to create or maintain the system at that level(at least for now). So you get a lot of products with AI squeezed in for the sake of it - with subpar performance that users might play with but eventually WILL NOT adopt. 

I toyed around with some of these constraints - user value, inference costs, and explainability to create some speculative prototypes for how it could be made better. From cost-effective explanations to context-rich explanations. 
Link in the comments. Would love to hear any thoughts :) 

- Meera 🌻

hashtag#product hashtag#userexperience hashtag#ai hashtag#productdesign hashtag#hci

## 25 
Some thoughts on designing effective human AI collaboration (and maybe less cringy chat bots along the way?)

Recently I took some time out playing with websites like Character AI where they let you create characters with AI that others users can chat with. It's a fun escape for a little distraction, until you notice the most widely used bots on the platform are psychologist bot and therapy bots (I wonder what that says about us 😅). 
It's amusing seeing 30m people actively seek therapeutic advice from a bot with an anonymous creator. That shock aside, I also learned that creating a 'GOOD' llm chatbot of any type is a ridiculously hard task. 

For someone just starting out with an idea or a goal, there is nothing more terrorizing than a giant black box with a ‘32,000’ character limit asking you to - "describe your character". 

I learnt that you can type a lot , experiment with prompt-whisperer approved prompts and still create mediocre bots that offer lobotomized conversations. The maker guides on the website were suboptimal so I found myself crawling obscure subreddits where successful prompters doled out obscure tips....And then -  found 'some' success. 

But does it really have to be this hard? If a promise of LLM bot creation is that any small business owner can quickly hatch up a bot to answer questions for their site, then for many practical reasons, we're far away from that reality :D

I dug up some more info on human bot interactions and wrote some thoughts - frameworks to think about better human-AI collaboration. Key ideas on working with: 

1️⃣ constraints of technology:
▶ understanding what it can learn, and how it can learn
▶ understanding what it cannot do and how to best work with those cases
▶ what to do when something doesn't work the way you want it to ( how to troubleshoot basically)

2️⃣ constraints of domain: 
▶ Identifying relevant domain knowledge
▶ identifying the best way to teach it to the bot
▶ teaching to deal with nuances and edge-cases

3️⃣ constraints of conversation: 
▶ do you want a personality: is it going to help you or work against you?
▶ how should you design it in that case? - what to emphasize and de-emphasize
▶ Harms to anticipate and how to work with them

There's more info and some prototyping ideas in the write up (in the comment) about dissecting character.AI.  Would love to hear your thoughts!

## 26
What happens when you put LLMs to an EQ Test ? 🤖 

I made a fun little project putting ChatGPT, Bard, Claude and Pi to a EQ test of sorts to test their 'emotional intelligence'. Here's some things I learnt: 

It's surprising given all the LLMs chatbots going around, how there's little benchmarking info about their ability being conversational thought partners. So I made up a crude test to take a stab at this: 

🚩Here are key parts from the article I wrote on it:
[Please check the link in the comments] 

- Defined building blocks of - ‘what makes a good conversation?’
- Evaluated LLMs against 7 core conversational criteria of ‘what makes a great conversation partner?’
- Prompted each LLM to have an empathetic discussion about an emotionally charged situation.
- Scored and aggregated their responses to quantify conversational EQ. 

💬 The results?
ChatGPT's 'take all this info and leave me alone' attitude meant it came in last with an abysmal 20/100 while Pi rocked to the finish line with a 90/100 with its wit and emojis.

Bard (75) packed the most useful information for a given length of text, even though its sense of empathy fell in an uncanny valley of behavior.

For being a general purpose LLM, Claude (70) deserves most applause for displaying sincere care through thoughtful followup questions and empathetic responses.

🌟 Final thoughts: 

1. On the importance of conscious design choices: Both ChatGPT and Pi are designed to be informative, yet they present entirely different personalities. With ChatGPT, I never once caught myself thinking about the agent, whereas with Pi, I was cognitively more engaged with the idea of talking to someone.

What implications do design choices have in building trust in conversations? 
Would someone be more likely to believe something coming from a more personable bot vs. a neutral persona? 

2. Empathy: In the end, it didn’t matter much if the bot gave interesting answers about its hobby, or just said it was an AI model. But it made a big difference when it said it understood me, and  asked relevant questions to probe my thoughts, rather than me having to poke it around. Claude and Pi excelled here. What if more bots prompted the User than us having to take the prompter role? 

3.Building transparency: In a real conversation, feedback is always 2 way, and you come out with a sense of your partner’s understanding of you. But here, I couldn’t help feeling a power imbalance in our dynamic. What patterns were it inferring? What is it that a superhuman AI can psycho-analyze about my personality that wouldn’t happen in a normal conversation.

Companies making companion AIs need to be more transparent around developing user psychographic profiles so people aren't gaslighted by toxic AI conversation partners for profit. 

All in all, this exercise was fun and I realised - It’s only when you have a machine fumbling in front of you, you realize how nuanced human conversation is. 

hashtag#generativeAI hashtag#HCI hashtag#ai

## 27
UX & AI - My Observations from Industry Conferences in the last month [Config’23 and more]

🚀 AI Agents: The Next Big Thing
Reid Hoffman, Kanjun Qui, Mustafa Suleyman, all big names in the genAI VC funded space have been betting big on personal AI agents for an 'equitable future'. Personally I find the idea of a primary care AI physician very appealing, but in addition to all the other technical woes, it seems like getting AI to display overall good enough EQ in conversations is a big UX bottleneck standing in their way of mainstream adoption.

🎨 Empowering Artists with AI
Adobe's focus on artists was evident at the conferences. Loved how they made efforts to train their AI models with licensed images, reassuring creative professionals at every step that they are supported rather than replaced. Definitely setting a good tone for the creative software industry.

👩‍💻 AI in Software Design
Figma showcased "Genius," an AI thought partner, to help create wireframes, colors, and user insights. This tool enhances creativity, speeds up repetitive tasks, and empowers designers while maintaining their creative control. It was pitched as something that helped creatives get over their mental block, offload repetitive work faster, and design faster - giving more creative power to the designer while not questioning their creative control or agency over work.

⚠️ Issues with AI Implementation
I found a recent talk at UC Berkeley about Model collapse very interesting. Ex: Github users were using Chatgpt to upload answers while the model was using the same data for training, hence spiralling into bad quality training loops. It’s interesting to think what happens when humans have no incentives to upload rich data to the web. Is OpenAI going to pay people to use Reddit now?😄 On a positive note, big tech companies are flaunting their ethics and transparency efforts at every event. Figma named training on high quality data as 'vegan' training.

🧠 Embodied AI
Natalya Kosmina, researcher from MIT showcased using thoughts for creative actions. I wondered, what if anyone could prompt LLMs for better outputs if you weren't constrained by your linguistic skills in the dominant language?

🌟 My Takeaways:
1. Even with the hype, the gen AI use cases bucketing big money are still focused on removing repetitive elements, not replacing humans.Sure, the goalpost for what counts as 'repetitive work' has moved up farther though.

2. AI as a thought partner in the workplace shows incredible promise. Although I find the equity claims very much debatable, I cannot help but feel bullish about a world where everybody has a personal know-all, can-do -all AI assistant.

3. Impact on muscle memory: What happens if you forget simple workflows in your work software as your AI takes on those repetitive tasks? How much technical dexterity is needed to manoeuvre AI tools and consistently product high quality output?

That's all for now!
Meera

hashtag#UX hashtag#AI hashtag#generativeai hashtag#design

## 28
Autumn Rains is an amazing builder and colleague from the UC Berkeley School of Information who's on a mission to make living spaces safe for everyone. It was a pleasure working on this idea with her, Michael and Eric ( also from I-school :D) at the Berkeley LLM Hackathon. We built a LLM based tool that makes building safety rules and regulations in the United States available and accessible to anyone. 

With this tool, any homeowner or renter could easily check up basic info around verifying and implementing residential safety bypassing a costly visit from a building inspector. 

We took extra care to get objective and accurate information to fine tune our models, using California Building Safety codes as our ground truth and implementing vector search with Pinecone to provide original references. 

Overall, really happy I got to work on a social impact project. Please reach out to Autumn if you're a builder/investor and are curious to learn more about the project and her next steps! 🌻 🌻 

hashtag#ucberkeley hashtag#llm hashtag#hackathon2023

## 29
Notes from SF Tech week 2023!
 
Last week's tech week turned out to be a great opportunity to meet some amazing folks from around the world, benchmark all the excitement around AI startups, and most importantly meet some very inspiring women in tech!
 
My most surreal experience was watching a very successful product demo by a guy dressed in a bathrobe at an expo. Having watched the Silicon Valley show before arriving here, I couldn’t tell if it was the place mocking the show, or the other way round. I learnt my small town self had 
more to get used to even after being here for 2 years :D
 
The best moments were at the many female engineering/entrepreneurship events. 
1) It was so inspiring to see and hear from so many female founders, investors and 
attendees, many of whom, women of color with immigrant backgrounds sharing lessons from their journey. It brought a sense of quiet calm over my perpetual anxiety about thriving in the workplace that’s in many ways stacked against my gender.
 
2) My past experiences attending star studded female focused networking events somehow made me conclude that it’s important to show up like a fashion expert to get taken seriously. This time, I got to meet some very brilliant and successful women who showed up with confidence in their reserved appearance. 
I wish we’d have more such women among us so young women can learn to detach their professional self esteem from their ability to wear Pinterest inspired outfits.

3) ✅️✅️ Support systems: A solid support crew is an absolute game-changer for women at work -it's all about having each other's backs to crush it in our careers. Take the time, energy and sincerity to cultivate your professional and personal support system, and support other women on the way. 

Overall it was an amazing experience to meet tech enthusiasts from all over the world. I gained so much appreciation for the hustlers who choose to spend their 9-5’s and 5-9s working on their dream projects.
 
100% recommended to attend!🌟

p.s: the last picture is an artist weaving ' ai dreams' from a diffusion model, seen at an AI art showcase. 

hashtag#techweek23 hashtag#tech hashtag#entrepreneurship hashtag#ai hashtag#art

## 30
Here's the synopsis of the capstone projects showcase of my grad school cohort - MIMS'23 students at the UC Berkeley School of Information. ( It's happening today!!!) It's been a year of a lot of personal and professional learning for me and I can't believe we're almost at the finish line. If you're around, please check out SAGE, my team's project helping older job seekers tackle age discrimination while navigating the job market! Eileen Cahill Kedari Lahari N Shai Dhaliwal Catherine Ching-Ju Yu

## 31 
3 useful tips to succeed in STEM grad school applications ✨✨

I've recently had a bunch of prospective grad students reach out for suggestions and advice about grad school applications at UC Berkeley School of Information. Here's a list of things I compiled from those conversations. Hopefully it helps a few of you when applying 🌻🌻

🔺 Do your background research thoroughly: 
This would mean: 
🟩 referring the program website thoroughly
🟩 attending webinars with the student affairs teams 
🟩 emailing the admission committee with follow up questions 

Having these basic questions cleared with desk research means you'll have time for more quality conversations with past/current students to learn about their personal experience with the program, shifting to new cultural experiences, how to make the best of the program etc. Definitely do these calls before sending in applications, to make sure you're not putting your app money in the wrong place.

🔺 Prepare materials diligently: 
Start early to prepare all the materials: Resume, SOP, LORs, and other supporting materials. Give special attention to your Statement of purpose as it is the crux of your application. Make sure to: 
🟩 Start early 
🟩 Revise often 
🟩 Write by yourself: 
I understand the inclination to outsource this step to a firm, esp. when English is not a students first language/they're from the global south. But it can only work against your application in the end, if it's a competitive program. At the end of the day, you know your story the best. 
🟩 Make a clear case: 
Make a logical narrative that connects your past experiences, how they've shaped you professionally, and your future aspirations. Show how this grad program will help you bridge that gap. 
🟩 Also, make sure to mention how you'll contribute to the cohort with your personal and professional experiences in addition to mentioning what you'll take out of it.
🟩 Avoid cliches/being too sentimental
🟩 Get it reviewed by current/former students, esp. if it's on your dream uni list. 
🟩 Do not copy and paste: If you really want to get into a uni, write up a doc that is super tailored to that uni. Simply writing up a generic statement and copying it across different unis might not work for competitive schools. 

🔺 Lastly, FINANCES: 
I've heard many talented candidates talk about worries about financing their education. With rising inflation and unfavourable exchange rates, I totally empathise with concerns about affording grad school, esp. from students in developing economies. 

PLEASE DON'T BE TURNED AWAY JUST BY RAW NUMBERS. 

Make sure to check out the 'financing your education' page, and refer to different options, such as part-time jobs, teaching jobs and scholarships. Those are real life savers for most grad students. So make sure to analyse that info before you make a final decision. 

Hope this is helpful! All the best to everyone applying in this round!!! 

hashtag#ucb hashtag#gradschool hashtag#applications

## 32
Hi everyone!
Here’s a chapbook of my poetry I wrote for my writing class ( English 43B at University of California, Berkeley) 📕🌟 I had to get over a mountain of guilt to squeeze in one ‘fun’ class into my grad school schedule, but it’s been such a rewarding experience. Here are my top takeaways from it! Hope it's useful :) 

✨ It’s an opportunity to meet people with completely different viewpoints and backgrounds.
For me, it was a while since I went to undergrad or took any general classes. I had forgotten what it was like to be around people who didn’t give a duck about Elon Musk or technology in general. Students came from tech, humanities, sciences, social studies and arts. Many times, when somebody said something, I would go, ‘ Wow, that’s so interesting, I could never ever have thought of it that way’.

You really learn to appreciate working in interdisciplinary environments.

✨ You get better at grasping abstract concepts and crafting abstract thoughts
The class required to me to connect unrelated things; experiences, memories, objects, time, position, location and emotions to create powerful imagery. You could just let it flow or take a methodical approach to it. But at some point, I learnt that you could use the same process to unleash creativity even in a very analytical job.

✨ Learning to flex different types of thinking
I learnt that there’s thinking with hyper focus on a particular idea ( closed systems thinking). Then there’s the type of thinking that happens when you’re not trying to think. The process feels somewhat closer to meditation. My way of getting there was trying to be very aware and in touch with my surroundings, but also let your mind wander. I’ve had some very revelatory aha moments following such exercises with a walk in the Berkeley hills.
(I promise you don’t need weed to get there :p )

✨ Getting better at introspection and self reflection
You naturally spend a lot of time looking at things in the 3rd person, including about yourself while writing. After writing something, even if it’s about a cat or a couch, I would feel like I had tapped into a part of me that was otherwise inaccessible to my conscious self, and thereby understood myself a little better which itself made me so happy and tranquil.

That it for now :) I ended up justifying the class as an investment in my mental health, but it's taught me a lot more than that. 

Not entirely sure if I got over my 7th grade poetry level, but at-least it was an opportunity to discover some great poets of America ( I became an Emily Dickinson fan girl overnight). For those still in school, I highly recommend taking at least one creative class to complement your coursework! 

hashtag#technology hashtag#writing hashtag#poetry hashtag#gradschool hashtag#mentalhealth

## 33 
A UX review of patient care experience in tele-health apps👩‍⚕️ 🏥:

I recently had my 1st tele-health call with a doctor. Was super excited that I didn’t have to wait for 2 weeks for my in-person appointment, but I came out of it feeling like I had just talked to an impatient customer service representative.

To mention the good things first,
 🌱 The telehealth appointment reduced the wait-time from 2 weeks ( at the in-person appointment at the school hospital) to 60 mins on the app. 
✅ I got to make a phone call appointment from the convenience of my home. 
✅ Plus the consumer app interface provides a cleaner info-visualisation than my janky school health website.

Coming to the actual call, 

the app provided no context of who I was about to talk to, or any information about the dr.credentials.

After a short description of problem, and 2 clarifying questions, the call ended with a ‘you can pick up your prescription at the pharmacy’,..bubbye. That must've been less than 30 seconds. I came out feeling a bit upset and disoriented.

All in all, It was a very sterile information exchange perfectly optimised for time, labor efficiency and money. There was no setting context, no trust building, no reassurance.

I wondered if I was overthinking it based on my own lived experiences. 
Most of the medical practise is still traditional Where I originally hail from, in the clinic, and you make walk-in appointments at the hospital. There is still some assumed 'sanctity' to that dynamic if you can call it that.

When the app prompted me to rate my experience, I wondered whether I should consider myself lucky for getting the prescription and give it 5 stars ,or if I should go lower for how it actually made me feel. 
But it was certainly not an example of a ‘human centered design’ for an app.

I can see how this modality of treatment wouldn't fly for complex cases, but a lot can still be done to improve the user experience. 

Baking in features that help build trust and credibility to transfer the experience from an in-person consult can go a long way to improve the patient experience.

Perhaps doctor burnout is a factor that I’m being blind to in my evaluation, but that’s a conversation for another time.

It's definitely tempting for a startup to incentivise doctors to minimize call-time, but in the long run, it doesn't help anyone. Especially when tele-health enters emerging markets with different social conventions and expectations, these small things will go a long way in ensuring customer loyalty.

hashtag#userexperience hashtag#humancentereddesign hashtag#healthcare hashtag#patientexperience

## 34
🌻🌻 Some lessons learnt doing hashtag#customerdiscovery for student-led projects (Hope it helps some money-crunched students out there! ) 

I spent the last few weeks trying to figure out how to recruit senior citizens to interview for my capstone project. Living in a college student bubble, it's been hard :( but more on that, later. Last year was somewhat similar too for various other projects. Here are some recruiting lessons I learnt on the way 😇

 ✨ Get comfortable talking to strangers : 
Somebody advised me that having no family here was no excuse to not finding seniors for our project. So I literally tried to recruit people wherever I could; on the metro, from grocery shops and coffee shops. 

Most times, they were very welcoming and graceful, sometimes I got shooed away ( I felt a little bit like a crow). But observations from these experiences gave me first hand glimpse into what it was like navigating life from their POV. You learn as much from a No, as you’d when they say Yes.

Put on your best non-threatening front, take some time to judge if they're in a mood to talk, then just go for it :) 

✨ Empathize:

If you're talking to a subject matter expert, it's easy to get intimidated by the knowledge imbalance between you two. Reframe the situation as an opportunity to meet a new person who'll introduce you to a whole different world view. 
That's helped me a lot! 

Starting with open ended questions and then narrow down to testing your hypothesis, also can help both of you ease into the conversation and make the situation feel a lot less unnatural.

⛅️ Be prepared to sink in time, and a lot of energy

Meeting people, email corresponding with them, setting up time and venue to talk, rescheduling, cancelling, no-shows are all part and parcel of this job. It takes a lot of time, patience and energy, so go in with a lot of caffeine. 
On the other hand, you realise quickly why executives get office assistants to do all of this 🤷‍♀️

⏳ There’s always a time lag

 To do a high quality user interview, it’s always taken me a min of ~ 2 weeks from initial conversation to a (60-90 min) interview. I mean, people have a life, and you’re not on the top of their priority, so it’s nice to plan your interviews accordingly. 

💵 If there’s money involved….

In a previous project, some colleagues and I had scammers turn up for our usability test sessions because they faked their credentials in the sign up sheet in order to get the participation reward. 

So be wary of people who sign up with suspicious emails, always vet people beforehand, ( we started verifying Linkedin profiles after that experience) and be sure to send polite reminder emails.

In the end, when you have a very tight deadline, and little money to 'professionally' recruit, it's highly likely you end up with a biased sample. Check in as a group every now and then, to see what you can do to minimise it! 
That's all for now:) 

hashtag#technology hashtag#userresearch hashtag#customerdiscovery hashtag#productmanagement

## 35
A poem about finding motivation in tough times ✨✨ 🌻🌻 ⛅️ 

I went through some personal crises in the last 2 weeks, and just when I thought it could only get better, I had an interviewer stand me up on my birthday who I had been looking forward to impressing for a couple weeks. 

I was very determined to find reasons to stay motivated, so I made a list of all the little things that I loved about my life and wrote a poem about it. 

Some references: 

Doe is the biggest library at University of California, Berkeley with multiple massive underground floors. Feng Cha is a popular Boba tea shop at Berkeley and Dirty boba is their signature drink, also a favourite of yours truly. 

——

There are few with lives as lucky as mine
To name a few, I have –
Functional knees that let me swim a mile 
Bright lamps and a cozy blanket that await me at home
Creamy Nutella sandwich to grab and walk around 
Windy lanes scented with pretty purple lavenders

On a bad day, Feng Cha’s ready to comfort me
With a Dirty boba and creme brûlée.
If I ever wanted to disappear,
Doe would open under the earth for me.
I can forever loiter around 
Until I find a lonely elevator, 
To wander up and down
And ponder life’s troubles.

Then there are my gregarious housemates 
Who would jump out of their blankets 
And sprint on a midnight mission 
To save me from a drunken brawl.
I wake up in a haze the next morning 
Surprise, Surprise! 
My brain is still able and available 
To go on the next wandering mission 
Up in the hills behind me. 
It was one of those rare days 
I woke up after a long restful sleep
No halos or headaches, 
Just clear and crisp vision ^_^

Yesterday I met a fisherman getting a Phd 
To save Alaskan fish from death machines.

So many people with beautiful minds walk about 
Very real and raw, Inspiration is plenty and abound 
Maybe, today’s just not my day 
But I can’t say I’ll trade this life
for just another comfortable day… 

-----------
It has been a very soul-lifting experience writing this and I hope by sharing it, it will inspire some of you to try it too :) 

- meera
hashtag#inspiration hashtag#motivation hashtag#technology

## 36
What happens when doctors prescribe video games for medical treatment? 💊👩‍⚕️👇
In 2020, EndeavorRX became the first FDA approved doctor prescribed video game to assist treatment of ADHD disorders in kids aged 8-12. It is a single player game supposed to teach children multitask and ignore distractions by navigating courses, collecting targets and avoiding obstacles. So how are players and their parents reacting to it?

🌟🌟 The key innovation being promised here is an adaptive algorithm called the SSME (Selective Stimulus Management Engine) that measures the kid's performance during their app journey and customises their treatment.

Kids would have to play this game 25 mins a day/5days a week for a min of 4 weeks or as prescribed by the doctor. A separate Insights app helps parents track their child's performance.

💭 So far, the market reactions to the product have been interesting.

❌  Resisting prescription for a ‘game’ 
 To a lot of parents, it doesn't make sense that they cannot just buy the video game but have to ask their insurance provider about it. This is problematic because a lot of providers do not cover this treatment and the company is starting to receive flak for being exclusionary to lower income children.

❓Should a game be fun if it’s medicine ?
Some parents are criticising the game design because their kids are giving up on the game; because it gets ‘too hard too soon’ and they cannot keep up with it. For the kid, playing a game doesn't make sense if it isn't fun and addictive. The neurologists and the game developers are defending their design decisions on their website with the tagline, "Remember, it's supposed to be hard".

This case reminds me of the theory of Technological inscription and description we read in class a while ago.

Madeline Akrich, the French tech socioligist says -

“Every technological artefact comes with scripts that embeds the needs and the morality of the designers' projected user. The real user out in the world then de-scribes and redefines the script to suit their needs. This back & forth conversation between the designer and the user is what prods the product to reach its closure form.”

I think for EndeavorRX the big question remains if they should alter their product positioning as a video game. For now, the real world user and their ideal projected user do not share the same assumptions about what a game should be.

💢 Can they actually convince parents that it's worth it to get on the phone with their insurance for a video game?

💢 Will they end up diluting the difficulty of the game design to increase adoption among kids? Or will they succeed in changing user perception of what playing a game should feel like? We'll see.

PS: If you wanted to give the game a try, a trial non prescription version is available on the appstores. Also attached some details about their clinical trials in the comments if you wanted to read up more.

hashtag#technology hashtag#medtech hashtag#productmanagement hashtag#productstrategy

## 37
For the love of squish-mallows 🧸 🐧 🐮…an ode to my favorite tangible product ✨
My first class assignment in the Tangible user-interface design class asked us to pick an inanimate object and write about what makes them so well designed. So I wrote a poem about Squishmallows. 

Here’s a very amateur attempt at untapping my feelings for them 😇

They are cute fluffy things
A cat, a burrito, an avocado
Lifeless, but not nameless
Wendy, Bernardo, and Bambolina
All sitting one next to the other
Waiting on me to finish my homework
Like Beefeaters my mother borrowed
From the queen to keep an eye on me

They get squished and squeezed
Sometimes passed around by drunken kids
I wonder - do they feel, or cry
Or are they just happy and grateful all the time?

A starry sky and empty cans stare at me now
Wendy plays a silent melancholic symphony
Bernado wraps me in his strawberry scented hug
Sometimes I think little squish-mellows are 
All you need to get to another day

-------
Interestingly, during this exercise I also got to learn that this preference for soft surfaces is something we share with other primates. 

In the 80s, behavioural psychologists conducted an experiment pairing up infant rhesus monkeys with a squish toy mother or a wood and wire toy mother. 

The monkeys with the squish toy mothers could integrate back with their group whereas the other monkeys started developing behavioural disorders. When the same monkey was given both the mothers, the monkey spent most of its time with the squishy mother ( even when the wooden mother controlled access to its food). 

My hypothesis is that in both cases of squishmallows and the mother toy the tactile stimulation triggers a feeling of wellbeing very similar to a reaction to maternal nurturing. 

I'm studying how particular surfaces and interactions with them trigger emotional and memory responses as a part of building my capstone project. 

If you have a tangible object that you're particularly fond of, either due to it's physical properties or some other affordances, do let me know, I'd love to check it out! 

hashtag#technology hashtag#interface hashtag#productdesign hashtag#productmanagement hashtag#hci

## 38
👩‍🎓 On being a 'woman in tech', attending hashtag#ghc22 and some(questionable? 😇)advice for other folks on the same path:

I attended my 2nd GHC virtually a week back, and took some time to think about my journey in tech and lessons learnt between GHCI2018 (my 1st one) and vGHC'22. ( thank you UC Berkeley School of Information for sponsoring me!)

Forgive me for the sappy build up, but I think it's going to be worth it:)

In 2018, I attended my 1st one as an early stage start-up employee. Never made it to the actual conference because it was too expensive for my pay-check, but managed to access a 1-day pass to the career fair. Had an overnight journey getting to the venue just in time.

To say it turned out to be a bummer would be an understatement.

I walked into the giant tent, and noticed, how almost everybody; recruiter/applicant, was dressed in tailored clothes, work heels and perfect blowdried hair. You could smell perfume everywhere. 5 mins in, my very plain T-shirt, sneakers and braided hair was poking at my self-consciousness from all directions.

I joined a line of women waiting to talk to a representative at a big-tech booth. After 30 mins, it was my chance. But I hadn't noticed their QR code at the back. The lady politely said we can talk after I had scanned it. I tried to explain for a second, but her answer was final.

I went to the back of the line and wondered who was at bigger fault. Something about the quick conversations at the booths drained all my social energy. I noticed I couldn't network talk.

The more I walked around, the more I felt like I was an observer in a glitzy pageantry where I didn't belong. I felt stupid and terribly small...town. I knew I didn't have to feel this way, but there was no way to shake off these feelings.

Reflecting back, I thought of all the things that had changed between now and then.

This time, I had a fairly workshopped resume. With few years of work-ex on hand, the conventions of speed-conversations with strangers didn’t feel so tiring like before.

Now getting to the advice part because I'm racing to the word limit :D

💢 There is a lot of fan-fare around DEI efforts in tech, but it's inevitable that you have experiences that make you cynical about sincerity in action. Be prepared to march ahead.

💢It's okay to feel like you're not good enough at times, but please don't torture yourself over those feelings. Show yourself grace, and let those emotions take their natural course.

For anyone in a similar boat, some advice that helped me :
⭐️ Work on yourself, have faith in your ability to contribute
⭐️ Surround yourself with people who wish you well and support you on that journey
⭐️ Meet as many diverse people as possible. You will not feel so isolated anymore
⭐️ It might help to dress a certain way or talk a certain way to fit in with the crowd, but none of that has to determine how you value yourself!
⭐️ Circle back to point 1!
hashtag#womeninstem hashtag#ghc22 hashtag#technology hashtag#dei

## 39
What happens when Deep-fakes become the norm to cheat on remote job interviews ? ¯\(ツ)/¯

🕵️‍♂️ In July 2022, the Federal Bureau of Investigation (FBI)'s Internet Crime Complaint center (IC3) reported that scammers are increasingly using Deepfakes made from stolen PII and background check information to fake their way into remote/ work-from-home jobs.

The jobs that have come under most attack in this category are related to computer programming, database, and some other software related job functions. Most complaints are related to voice spoofing - when the facial and lip movements are not in sync with the voice of the person speaking. Interestingly, most of these jobs also involve access to customer PII, financial information, corporate IT databases and other proprietary information that these scammers often steal off the victim companies' platforms.

Open source softwares had already led to the influx of deep-fakes with child pornography and political misinformation, and the job scammers are just another addition to the growing list of notorious deepfake applications.

🤷‍♀️ So how does one tell between a real video and a deepfake? MIT'S Media lab had recently spearheaded a project called Detect fakes to train humans to better differentiate deep fakes from real videos ( Link in the comments). They have mentioned 8 principles as core aspects to look for in detecting fake presence.

These include: unusual facial characteristics (uneven ageing across the face, unnatural shadows, unusual facial characteristics such as irregular shape of lips, eyebrows etc..) You can also follow up that lesson with a brief exam to test your ability to detect a deepfake.

Currently algorithm facilitated detection and some legal measures are in place to control deep-fakes. California, Texas and Virginia have enacted prohibitions that control the creation and distribution of deep-fakes particularly in the category of pornography and political misinformation. Outside of legal measures, authenticating videos using blockchain is also gaining traction. Whether these measures do end up making a difference will have to be seen.

P.S: I’ve linked the MIT Deepfake detection challenge in the comments in case you want to test how good you’re at detecting a deepfake :D 

hashtag#cybersecurity hashtag#technology hashtag#productmanagement

## 40
Why is every major tech company trying to copy TikTok? 

According to a Google study, 40% of users between 18-24 years of age are not using Google search or maps to find a restaurant recommendation. 
Sundar Pichai at Recode'22 talked about Google being in a 'hyper intense' competitive market with Tiktok. How did this come about ? What does this mean for the future of tech? Here are some interesting changes happening in tech:

🕵️‍♀️ 🕵️‍♂️ Evolution of information retrieval: 
When Google came out they were replicating people’s mental model of scouring books in the library or pages in the telephone directory. Young people today don’t find these analogies intuitive because they didn’t grow up native to these experiences.

Instead, growing up on user generated content and influencer culture, what appeals to them is ‘authenticity’, be it in informational or entertaining content. What makes more sense is quick, intuitive, immersive content (aptly provided by Tiktok).

📺 🌐 Evolution of content consumption: 
All popular content apps, be it Facebook, Instagram or Twitter assumed a user's social graph as a reliable proxy for their interests. (because your friends' interests are likely your interests too?)

But Tiktok turned this assumption upside down and proved that algorithm powered curation of content is powerful enough to find engaging content, to keep users hooked to the app.

🤖 🤖 What does this mean for Big-tech?
 User's online behaviours and preferences are changing. The eyeballs are no longer congregating in places where they used to. And what follows the eyeballs....? Ad mONey :D

Soon gen Z will become the generation with the largest purchasing power and brands are determined to be in the right books with them. Those distracting banner ads no longer cut the chase. 

Instead brands are slyly weaving themselves into storylines of appealing tik-tok content, presenting viewers with a very authentic appeal. No more tacky social media promotions.

Big tech certainly recognises this challenge and have been moving towards tiktokifying their platforms to embrace these macro trends. 

After the recent negative revenue reports at Facebook, Zuckerberg reversed his 2018 declaration that friend-recommended content was the best design for the feed. 

Facebook is now set to embrace algorithm moderated content propagation and short form content in the form of Reels as the majority content in user feeds. Google is experimenting with immersive search techniques involving video, and photo search.

Anyways, Tiktok continues to surge ahead with it massively growing user base. They had close to a 150% growth in 2021 with over 1 billion monthly users, 60% of them being gen Z users. It's very clear where the future netizens are flocking to.

But what does it tell when an entire generation of humans are growing up to trust unmoderated user generated content as their source of information? That's a discussion for another time.

hashtag#technology hashtag#productmanagement

## 41
I'm excited to be attending the vGHC 2022! 
The Grace Hopper Conference is an annual event conducted by the Anita Borg Institute to celebrate and strengthen female and non-binary participation in STEM fields.
 It is attended by thousands of women every year, and I'm thankful to the UC Berkeley School of Information for sponsoring my e- attendance this year!!

If you're attending and or interested in PM careers/health-tech, let's connect!! 
hashtag#ghc hashtag#ghc2022 hashtag#ghc22

## 42
Some thoughts on hashtag#BeReal trying to be the new ‘authentic’ social app:

BeReal is all the rage now in my social network, and submitting to peer pressure , I decided to give the “authentic feels” a try. Here are some broad thoughts on this latest attempt at reinventing online social connections.

[For the uninitiated, BeReal users upload a 2 sided snap at a random time every day when notified by the app. The intention is to get everyone to upload an unedited spontaneous snap of their life at the same time so users can connect to their friends authentically through in their daily routine ]

🤳 💭 On the 2-sided-snap and selfie reactions:
 It's an interesting design indeed, but spontaneity is not always the best decision in the moment and doesn't necessarily have to correlate with authenticity. I encountered a teacher snapping selfies with all their students in the rear view unaware of the snap. What about the guy who took a selfie with all the contents of his work laptop in clear view?

🎭 And what about those selfie reactions ? 
I always thought reactions were most authentic when you couldn't see yourself reacting to something or someone. If users have the freedom to re-click and contort their reactions to posts, then are they really being 'authentic'?

🤡 Promoting authenticity 
How do you even start to productise such an abstract concept? It someone feels contradictory to the whole idea of being ‘authentic’. 

For BeReal, it is sharing unedited pictures of yourself and surroundings, within 2 mins of notification. But can you really productise this concept by restricting your medium of communication to one plane (of pictures) ?

Making authentic connections in real life could be having conversations that require those involved to put their guard down, making eye contact, being genuinely interested in the other person's wellbeing. There's so many ways to look at it.

And yet, so many socialmedia apps have tried and failed with all the different modalities of communication, like video, audio, avatars and what not, the fundamental human need of connect and to be understood.

In all these cases, what pays them to exist is not in alignment with the value proposition made to their users.

We see this already in how big social tech recently have been moving away from personal connection based feeds to purely algorithm moderated content feeds. Over time user behaviour gets nudged to favour design that brings in more eyeballs, more time in app, and more profit.

So where does that leave BeReal?

The cynic in me thinks this is a fad but the app has already amassed a 30000% growth between April & August of 2022, so it is still growing strong. But it remains to be seen, if they can sustain this growth, more importantly, sustain themselves financially without compromising the integrity of their value proposition. 

hashtag#technology hashtag#productmanagement hashtag#humancentereddesign

## 43
✨✨Life learnings from my first job in the US ✨✨
August 19 was the last day of my summer internship as a product strategist at PathAI. I came out of the job making product strategy recommendations for a new Algorithm product to aid cancer therapy. Reflecting back, here are some things I learnt on the job:

👩‍🎓How to be an engaged remote employee: 
Go around, set up video calls, meet people if even they aren’t necessarily in your team, as you onboard. Esp. if you are a product person, it helps to understand how different teams have different perspectives on the market space that you’re in.

👩‍🏫How to pick up domain knowledge:
 It’s okay to walk into a domain that feels like latin to you. Develop a framework to grasp the essential things that will help you get the job done. Some things I learnt after shrugging off my imposter syndrome:

⭐️Set up allies to help you throughout the journey. Your manager would be the closest friend as you start this journey.

⭐️Get their help to identify experts in adjacent roles who can give you different perspectives on the project/product. Ex: If you’re a med-tech product manager, it would help to talk to biomedical scientists, scientific program managers, machine learning teams etc to understand their pain points and what matters to them.

⭐️It’s easy to get drowned in onboarding documents and presentations. Getting on these stakeholder calls can help identify the most fundamental things on these slides you need to focus your attention on to get started.

⭐️Don’t try to google-self-learn highly intricate domain material 
If I had to do it again, I would regularly check in with internal experts in different areas and discuss my key hypotheses about the problems and future direction to pursue, before sinking a lot of effort in one direction. These check-in calls can help one quickly course correct and arrive at the right mental model to think about the core issues.

📽 How to succeed with stakeholder buy-in:
 The ability to make killer slides and present effectively can make or break your story and the impact of your efforts. And yet, it’s usually only the business school that offers a full fledged ‘How to make killer presentations’ course :D I think it’s definitely worth it to make a 3 credit investment in learning presentation skills regardless of your work background.

🎭 It’s okay to not feel in ‘form’ all the time:
It’s okay if you feel like you are asking too many questions, or feel like questioning the quality or impact of work. It’s easier said than done, to just have conviction in yourself, but you’re not alone, many folks go through a similar journey and it’s always rewarding in the end to look back at all the cool things you learnt.

That’s all from me:)
Cheers to another year of learning and meeting inspiring people at University of California, Berkeley!!

hashtag#productmanagement hashtag#heathtech hashtag#medtech hashtag#technology

## 44
Here's a poem I wrote about hashtag#Algorithms 🎶😇 

Snippets of code they are 
Crawling all around the ether of the web 
They tell me what to see and what to like
And I do just what they want me to do 
Glued on and on to my screen
Not knowing when to stop 
Waiting for the next best thing 
That I know would never grace my eyes. 

They are by my side faithfully, watching me breathe 
Learning me better than anyone ever did
My hopes and horrors, and my dreams and desires 
They say ‘you need pills to sleep - here’s the one for you :)’
Oh! how cruel, I think - ‘I thought you wanted the best for me’ 
And yet I go back to them, like a needy lover
Never letting go, and trusting them as I go 
To decide what’s best for me. 

They buzz at me from my bedside
They buzz at me over my lunch break
Look!, they say, ‘Here’s a cute bag I found for you’ 
Look! they say, ‘Here’s a cute boy I found for you’
I say - Yes to the bag! Yes to the boy! You know the best!
The bag is pretty, and the boy is prettier 
But when I come down from the frenzy, I think 
Oh, don't be so daft, it was never serendipity
Just boring math behind boxy machines. 

Today, they buzz over my shoulder
This time, it’s the New York Times with a breaking headline
They buzz again, but I resist, they buzz yet again 
This time, it’s about Amanda, vacationing in Spain 
And by the way! Becca’s got a new career going
Stop! Stop! Stop! I say - what am I doing? 
I say enough is enough, I turn them all off 
I walk out the door, onto the busy Bancroft 

The air smelt sweeter, the wind felt cooler 
Destiny was all mine to sail to forever and beyond 
As I walked around with my head full of thoughts
I crossed a boy who possessed the prettiest of hands
So I turned around and said, “Hey! You have pretty hands :)” 
He turned around and gave me a smile 
I smiled back and turned around, and kept to my path. 
Triumph and freedom -that’s all I could think of! 

-Meera 

P.S: This is my first attempt after a long break of more than a decade, so please forgive me for all its technical flaws. Would still love to hear what y'all think of it ❤️😊
---------------------------------------------------------------------
hashtag#technology 
hashtag#leisure 
hashtag#happiness
hashtag#mentalhealth

## 45
Some thoughts on making team work more productive: 

There’s a couple more weeks before going back to school at University of California, Berkeley and I thought this might be a good time to reflect about things I could do better going forward. Based on my experience of being part of 5 team projects in the last year ( all of which sit on different parts of the chaos scale :D) here are some thoughts on making them easier for all involved: 

Setting expectations 👩‍💻🧑‍💻: Everybody goes into a class with different goals in mind. Some are just curious and hoping to learn something different, some might want to build up the learnings into their capstone project. Some could be taking the class as a Pass/Fail subject, while others could be very serious about their grade. I think it’s important to have a conversation about what every member hopes to make of their experience in the class and the project. Everyone being somewhat aligned on course expectations would be super beneficial to maintaining good team dynamics!

Estimating available time⏳: Following from 1), team members could have different priorities such as job hunting, working on a research project, or writing their final thesis. As a team, having some level of transparency into what level of priority everybody assigns to the class can help set realistic ambitions for the scope of work the team can achieve. 

Communication🗣 🎙: This point feels very meta to everything above. Oftentimes, confusion over matters like “do we have a meeting this week?”, “ who’s writing the report”, or “ who’s sending the zoom invite” cause maximum loss of team productivity and create friction points between team members. Having a conversation about team work/ communication norms in the start can go a long way in ensuring a smooth experience for all.


That’s it from me. Would love to hear if you have any additional pointers to add to this !! 😇

-meera 


hashtag#teambuilding hashtag#teamwork hashtag#teamculture hashtag#ucberkeley

## 46
Hello Linkedin family, 

As part of the Lean LaunchPad course at UC Berkeley, my teammates and I are working on an app that helps high school students develop financial literacy. We’re currently reaching out to different stakeholders in this process to validate our hypotheses. It would be amazing if you could please help me connect to any teachers/ educational professionals in your personal or professional network! We are trying our best to create something that teaches healthy financial habits for the future generations, and any lead that helps us validate (or invalidate) our assumptions will take us one step closer to that goal!

## 47
Found a document with interesting stats on Website optimization. If you are setting up a website and trying to make it better on the SEO front, check it out.

## 48
Inspired by 'The social dilemma' doc, I turned off my personal WhatsApp notifications to see how I'd react. Here's what happened.

Saturday: Turned off notifications. Surprised at not seeing notifications icon on my homescreen whenever I opened the phone.
Sunday: Surprised by how soon I’ve forgotten about the app. I also notice I'm spending a longer time between checking my phone.

Monday: Find myself forcefully opening the app more often than the day before. I remind myself that I turned off notifications for a reason and consciously act against my impulse.

Tuesday: Mostly forgot about the app, but check it out 3/4 times for fear of missing a few important messages. Once in a while, when I glance over my phone I feel mildly amused that the screen is empty.

Wednesday: Decided to allot fixed times for checking messages and stick to it.

Learnings: I learnt that the OCD of keeping my homescreen clean is what kept me checking the messages everytime the phone beeped. And saved a lot of procrastination and empty scrolling time in the detox process. From a UX point, it would be great to have an easy toggle-able DND button within the app.

Would highly encourage all readers to try this on your time-killing apps. Truly liberating!
Lemme know what you think about this.

## 49
A summary of the recent book I read,‘GOOD TO GREAT: Why some companies make the leap and others don't.
Aspiring entrepreneurs, check it out!

Be a level-5 leader: Mix professional will & personal humility. Be ambitious first and foremost for your company and its cause, not for yourself.

First-who then-what: It’s more important to get the right people in the company 1st before finding the right problems to solve. 

Confront the brutal facts: In difficult times, retain faith that you will prevail in the end, & at the same time confront the brutal facts of your reality.

Follow the hedgehog concept: Create your product at the junction of what you’re passionate about, what drives your economic engine, & what you can be the best in the world.

A culture of discipline: Sustained great results depend upon building a culture of self-disciplined people who take disciplined action in line with the hedgehog concept. 

Technology accelerators: Use technology as an accelerator of momentum, not the creator of it. Even the most awesome tech cannot resurrect a dead company.

The flywheel effect: Good to great transformations are not overnight successes, but the result of organic,cumulative processes over the years which builds up momentum to soar high at a later point. 



