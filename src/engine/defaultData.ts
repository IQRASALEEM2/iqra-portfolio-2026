/**
 * Default dummy data used when localStorage is empty.
 * Keep this aligned with the existing UI expectations (same fields/shapes).
 */

export const defaultAgents: any[] = [
  {
    id: 1,
    title: 'Autonomous Sales Agents',
    desc: 'AI that identifies leads, handles initial outreach, and schedules meetings autonomously while maintaining your brand voice.',
    icon: 'Fingerprint',
    type: 'premium',
    price: '149',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    tags: ['GPT-4o', 'Multi-Agent System', 'Lead Gen'],
    longDesc:
      "A complete sales-engine replacement. This agent monitors platforms like LinkedIn or your CRM to identify high-potential leads, researches their background, and crafts hyper-personalized cold emails that feel human.",
    howItWorks:
      "Using a chain of thought process: First, the 'Researcher Agent' gathers data. Second, the 'Copywriter Agent' drafts the message. Third, the 'Scheduler Agent' checks your calendar availability via API to propose meeting times.",
    benefits: [
      '90% reduction in manual prospecting time',
      '3x higher conversion rate via deep personalization',
      'Consistent follow-up without human intervention',
      'Seamless integration with HubSpot/Salesforce',
    ],
    workflowNodes: ['Trigger: New Lead', 'Enrichment: Apollo.io', 'Analysis: LLM Personality', 'Action: Send Gmail', 'Wait: 3 Days', 'Check: Reply Status'],
    mockJson: JSON.stringify({ name: 'sales_outreach_v1', type: 'n8n_workflow', nodes: ['Trigger', 'HTTP Request', 'OpenAI', 'Gmail Send'], connections: {} }, null, 2),
  },
  {
    id: 2,
    title: 'Support Intelligence Swarms',
    desc: "Beyond simple chatbots. These agents access your entire documentation to solve complex customer queries and execute account actions.",
    icon: 'Workflow',
    type: 'free',
    price: '0',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    tags: ['RAG Architecture', 'Vector DB', '24/7 Support'],
    longDesc:
      "Imagine a support agent that has read every line of your technical documentation and knows every past customer ticket. It doesn't just talk; it acts—resetting passwords or upgrading tiers via API.",
    howItWorks:
      'Leveraging Retrieval-Augmented Generation (RAG). When a user asks a question, the agent searches a Pinecone Vector Database for context, synthesizes an answer using GPT-4, and provides verifiable citations.',
    benefits: ['Instant resolution for 80% of common tickets', 'Zero hallucination via grounded vector search', 'Automated ticket escalation to Slack', 'Multi-lingual support across 50+ languages'],
    workflowNodes: ['Webhook: Intercom', 'Search: Pinecone DB', 'Prompt: Contextual Answer', 'Condition: Can Resolve?', 'True: Send Reply', 'False: Create Jira Ticket'],
    mockJson: JSON.stringify({ name: 'support_rag_swarm', type: 'n8n_workflow', nodes: ['Intercom Hook', 'Vector Search', 'LLM Chain', 'Conditional Router'], connections: {} }, null, 2),
  },
  {
    id: 3,
    title: 'Workflow Automation Agents',
    desc: 'Connecting your business tools (Slack, CRM, Gmail) with intelligent logic to automate repetitive manual tasks.',
    icon: 'BrainCircuit',
    type: 'premium',
    price: '299',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'CrewAI', 'LangChain'],
    longDesc:
      "The ultimate glue for your digital infrastructure. This agent acts as a manager that oversees multiple tools, ensuring that data flows exactly where it needs to go based on complex business logic.",
    howItWorks:
      "The agent uses 'Function Calling' to interact with your specific software APIs. It interprets unstructured data (like an email or a Slack message) and converts it into structured tasks in Jira or Trello.",
    benefits: ['Elimination of human error in data entry', 'Real-time sync between marketing and sales ops', "Custom logic that standard automation tools can't handle", 'Scalable execution of complex SOPs'],
    workflowNodes: ['Schedule: Hourly', 'Sync: CRM Data', 'Process: Deduplication', 'AI: Summarization', 'Notify: Slack Channel', 'Update: Airtable'],
    mockJson: JSON.stringify({ name: 'ops_orchestrator', type: 'n8n_workflow', nodes: ['Cron', 'CRM API', 'Custom Python', 'Slack Hook'], connections: {} }, null, 2),
  },
  {
    id: 4,
    title: 'Content Creation Agents',
    desc: 'Hyper-personalized multi-channel content engines that write, design, and schedule posts based on trending topics in your niche.',
    icon: 'Bot',
    type: 'premium',
    price: '199',
    img: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80',
    tags: ['SEO', 'Automated Design', 'Content Strategy'],
    longDesc:
      "A powerhouse for digital marketing teams. This agent monitors real-time trends on platforms like X, LinkedIn, and Google Trends, then synthesizes that data into unique, high-quality blog posts and social media threads that match your exact brand personality.",
    howItWorks:
      "The system triggers on a trend alert. The 'Trend Analyst Agent' selects a topic. The 'Copywriter Agent' generates the draft. The 'Designer Agent' creates a visual via DALL-E or Canva API. Finally, the 'Publisher Agent' schedules it for peak engagement.",
    benefits: ['Consistent daily social presence without human effort', 'Real-time trend exploitation for viral growth', 'Brand-voice consistency across all platforms', '70% reduction in content production costs'],
    workflowNodes: ['Trigger: Trend Detected', 'Analysis: Market Fit', 'Creation: Multi-Format Drafts', 'Review: Brand Compliance', 'Publish: Social/Blog', 'Metrics: Engagement Track'],
    mockJson: JSON.stringify({ name: 'content_forge_v2', type: 'n8n_workflow', nodes: ['Trend Hook', 'OpenAI Vision', 'WordPress API', 'Buffer Hook'], connections: {} }, null, 2),
  },
  {
    id: 5,
    title: 'Customer Sentiment Analysis Agents',
    desc: 'Intelligent listeners that monitor every review, social mention, and support ticket to provide real-time emotional intelligence for your brand.',
    icon: 'BrainCircuit',
    type: 'premium',
    price: '249',
    img: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&w=800&q=80',
    tags: ['NLP', 'Brand Health', 'Data Analytics'],
    longDesc:
      "Understand the 'Why' behind your customer feedback. These agents don't just count mentions; they analyze the emotional tone, identifying potential PR crises before they happen and highlighting what your customers love most about your products.",
    howItWorks:
      'It connects to your feedback streams (Trustpilot, Twitter, Intercom). It uses Natural Language Processing (NLP) to score sentiment on a scale of -1 to 1. If a negative sentiment cluster is detected, it automatically alerts your team and generates a drafted response.',
    benefits: ['Proactive PR crisis management', 'Deeper product development insights', 'Increased customer retention via fast response', 'Automated reporting for stakeholders'],
    workflowNodes: ['Ingest: Social Streams', 'NLP: Sentiment Scoring', 'Cluster: Theme Detection', 'Alert: High Urgency', 'Respond: Draft Generation', 'Report: Dashboard Sync'],
    mockJson: JSON.stringify({ name: 'sentiment_engine', type: 'n8n_workflow', nodes: ['Webhose.io', 'Python Sentiment', 'Slack Alert', 'Airtable'], connections: {} }, null, 2),
  },
  {
    id: 6,
    title: 'Market Trend Prediction Agents',
    desc: 'Strategic forecasters that analyze global market data, competitor moves, and economic indicators to predict your next big business opportunity.',
    icon: 'Workflow',
    type: 'premium',
    price: '499',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Forecasting', 'Big Data', 'Strategic Growth'],
    longDesc:
      "Stop reacting and start predicting. This agent acts as a virtual Chief Strategy Officer, scanning thousands of data points daily to suggest product pivots, price adjustments, or expansion opportunities based on emerging market patterns.",
    howItWorks:
      "The agent utilizes time-series forecasting and regression models. It pulls data from competitor pricing APIs, news outlets, and financial reports. It then runs simulations to find the 'Path of Least Resistance' for your business growth.",
    benefits: ['Identify market gaps before competitors', 'Optimized pricing for maximum margin', 'Data-backed strategic decision making', 'Early warning system for industry shifts'],
    workflowNodes: ['Extract: Competitor Data', 'Aggregate: Macro Trends', 'Predict: Demand Shift', 'Optimize: Strategy Draft', 'Notify: Executive Team', 'Execute: Dynamic Pricing'],
    mockJson: JSON.stringify({ name: 'prediction_oracle', type: 'n8n_workflow', nodes: ['Finance API', 'Trend Analysis', 'Strategy Generator', 'Email Report'], connections: {} }, null, 2),
  },
];

export const defaultProjects: any[] = [
  {
    id: 1,
    title: 'Avanti Wines',
    subtitle: 'High-end UK wine importer e-commerce built on a custom WooCommerce architecture.',
    cat: 'WordPress & E-Commerce',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    tech: ['WordPress', 'WooCommerce', 'Stripe'],
    link: 'https://avanti-wines.co.uk/',
    seo: { title: 'Avanti Wines | Premium Wine E-commerce', description: 'Buy fine wines online.', focusKeyword: 'Wine Shop', canonical: '', ogTitle: '', ogDescription: '', score: 85 },
  },
  {
    id: 2,
    title: 'Roberta Flat',
    subtitle: 'Professional London cleaning service with automated booking and payment flows.',
    cat: 'WordPress & E-Commerce',
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&w=800&q=80',
    tech: ['WordPress', 'Booking Engine', 'Paypal'],
    link: 'https://robertaflat.com/',
    seo: { title: 'Roberta Flat Cleaning London', description: 'Book professional cleaners.', focusKeyword: 'Cleaning London', canonical: '', ogTitle: '', ogDescription: '', score: 92 },
  },
];

export const defaultBlogs: any[] = [
  {
    id: 1,
    title: 'The Rise of Agentic AI in 2026',
    desc: 'Why traditional websites are dying and how autonomous agents are taking over the digital landscape.',
    content:
      "The digital world is shifting from **static interfaces** to **autonomous experiences**. In 2026, we are seeing a massive transition. *Agentic AI* isn't just a chatbot; it is a system that can execute tasks without constant human input.\n\n### Key Takeaways:\n1. Efficiency is king.\n2. User experience is becoming predictive.\n3. Automation is no longer optional.",
    cat: 'AI Innovation',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    date: 'Oct 12, 2025',
    tags: ['AI', 'Future', 'Tech'],
    seo: { title: 'Agentic AI Trends 2026', description: 'Explore AI agents.', focusKeyword: 'AI Agents', canonical: '', ogTitle: '', ogDescription: '', score: 95 },
  },
];

export const defaultReviews: any[] = [
  { id: 1, name: 'Muhammad Furqan', role: 'CEO at Novik Edge', text: 'Iqra is a talented web developer with a sharp eye for detail. Her work in WordPress is top-tier.', avatar: 'MF', rating: 5 },
  { id: 2, name: 'Fatima Khan', role: 'Fashion Blogger', text: 'She nailed the vibe perfectly for my fashion blog. The e-commerce integration is seamless!', avatar: 'FK', rating: 5 },
];

