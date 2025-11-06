import { Images } from './Images';

export interface ServiceFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  heroImage?: string;
  overview: string;
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  process: ProcessStep[];
  faqs: ServiceFAQ[];
  cta: {
    title: string;
    description: string;
  };
}

export const servicesData: ServiceDetail[] = [
  {
    slug: 'website-app-development',
    title: 'Website & App Development',
    shortTitle: 'Web & App Dev',
    description: 'We design and develop high-performing websites and mobile apps that build trust and help you grow your customer base.',
    icon: Images.webDevIcon,
    overview: 'Transform your digital presence with custom-built websites and mobile applications that not only look stunning but deliver exceptional user experiences. Our development approach combines cutting-edge technology with user-centric design to create platforms that drive engagement and conversions.',
    features: [
      {
        title: 'Responsive Design',
        description: 'Mobile-first approach ensuring your site looks perfect on all devices, from smartphones to large desktop displays.',
      },
      {
        title: 'Fast Performance',
        description: 'Optimized code and modern frameworks deliver lightning-fast load times and smooth interactions.',
      },
      {
        title: 'SEO Optimized',
        description: 'Built-in SEO best practices help your site rank higher in search results and attract more organic traffic.',
      },
      {
        title: 'Secure & Scalable',
        description: 'Enterprise-grade security measures and scalable architecture that grows with your business.',
      },
      {
        title: 'Custom CMS',
        description: 'Easy-to-use content management systems that let you update your site without technical knowledge.',
      },
      {
        title: 'API Integration',
        description: 'Seamless integration with third-party services, payment gateways, and business tools.',
      },
    ],
    benefits: [
      {
        title: 'Increase Customer Trust',
        description: 'A professional, modern website builds credibility and makes a strong first impression.',
      },
      {
        title: 'Drive More Conversions',
        description: 'Strategic design and clear calls-to-action guide visitors toward becoming customers.',
      },
      {
        title: 'Save Time & Resources',
        description: 'Automated workflows and efficient systems reduce manual work and operational costs.',
      },
      {
        title: 'Stay Competitive',
        description: 'Stand out from competitors with a unique digital presence that showcases your value.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Planning',
        description: 'We start by understanding your business goals, target audience, and technical requirements to create a comprehensive project roadmap.',
      },
      {
        step: 2,
        title: 'Design & Prototyping',
        description: 'Our designers create wireframes and high-fidelity mockups that reflect your brand and prioritize user experience.',
      },
      {
        step: 3,
        title: 'Development',
        description: 'Our development team builds your platform using modern technologies, following best practices for performance and security.',
      },
      {
        step: 4,
        title: 'Testing & Quality Assurance',
        description: 'Rigorous testing across devices and browsers ensures everything works flawlessly before launch.',
      },
      {
        step: 5,
        title: 'Launch & Support',
        description: 'We handle the deployment and provide ongoing support to keep your platform running smoothly.',
      },
    ],
    faqs: [
      {
        question: 'How long does it take to build a website or app?',
        answer: 'Timeline varies based on complexity. A basic website typically takes 4-6 weeks, while a custom web application or mobile app can take 3-6 months. We provide detailed timelines during the planning phase.',
      },
      {
        question: 'Do you build both iOS and Android apps?',
        answer: 'Yes! We develop native apps for both platforms or use cross-platform technologies like React Native for faster deployment across both iOS and Android.',
      },
      {
        question: 'Can you redesign my existing website?',
        answer: 'Absolutely! We can refresh your current site with a modern design, improve performance, and add new features while preserving your existing content and SEO rankings.',
      },
      {
        question: 'Will I be able to update the content myself?',
        answer: 'Yes, we build sites with user-friendly content management systems (CMS) and provide training so you can easily update text, images, and pages without coding knowledge.',
      },
      {
        question: 'Do you provide hosting and maintenance?',
        answer: 'Yes, we offer hosting solutions and ongoing maintenance packages to keep your site secure, updated, and running smoothly. We also provide analytics and performance monitoring.',
      },
    ],
    cta: {
      title: 'Ready to Build Your Digital Presence?',
      description: 'Let\'s discuss your project and create a custom solution that drives results for your business.',
    },
  },
  {
    slug: 'automation-ai-assistants',
    title: 'Automation & AI Assistants',
    shortTitle: 'Automation & AI',
    description: 'Simplify your operations with smart automation and AI tools that handle the repetitive tasks, so you and your team can focus on the work that actually grows your business.',
    icon: Images.automationIcon,
    overview: 'Unlock the power of artificial intelligence and automation to streamline your business operations. From intelligent chatbots to custom workflow automation, we help you reduce costs, improve efficiency, and deliver better customer experiences.',
    features: [
      {
        title: 'AI Chatbots',
        description: 'Intelligent conversational agents that handle customer inquiries 24/7, improving response times and satisfaction.',
      },
      {
        title: 'Workflow Automation',
        description: 'Automate repetitive tasks and business processes to save time and reduce human error.',
      },
      {
        title: 'Email Automation',
        description: 'Smart email sequences that nurture leads and engage customers at the right time with personalized messages.',
      },
      {
        title: 'Data Processing',
        description: 'Automatically collect, process, and analyze data from multiple sources for actionable insights.',
      },
      {
        title: 'Integration & API',
        description: 'Connect your tools and systems for seamless data flow and automated workflows across platforms.',
      },
      {
        title: 'Custom AI Models',
        description: 'Train and deploy custom AI models tailored to your specific business needs and use cases.',
      },
    ],
    benefits: [
      {
        title: 'Reduce Operating Costs',
        description: 'Automation handles repetitive tasks at a fraction of the cost of manual labor, freeing up resources.',
      },
      {
        title: 'Improve Accuracy',
        description: 'Eliminate human error in data entry, calculations, and routine processes with automated systems.',
      },
      {
        title: 'Scale Effortlessly',
        description: 'Handle increased workload without proportionally increasing staff, allowing your business to grow efficiently.',
      },
      {
        title: 'Enhanced Customer Experience',
        description: 'Provide instant responses and personalized interactions that keep customers happy and engaged.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Process Analysis',
        description: 'We analyze your current workflows and identify opportunities for automation and AI integration.',
      },
      {
        step: 2,
        title: 'Solution Design',
        description: 'Design custom automation workflows and AI solutions that align with your business objectives.',
      },
      {
        step: 3,
        title: 'Development & Training',
        description: 'Build and train AI models, develop automation scripts, and integrate with your existing systems.',
      },
      {
        step: 4,
        title: 'Testing & Optimization',
        description: 'Test thoroughly to ensure accuracy and reliability, then optimize for maximum efficiency.',
      },
      {
        step: 5,
        title: 'Deployment & Monitoring',
        description: 'Deploy solutions and continuously monitor performance, making adjustments as needed.',
      },
    ],
    faqs: [
      {
        question: 'What types of tasks can be automated?',
        answer: 'Almost any repetitive task can be automated, including data entry, email responses, report generation, social media posting, invoice processing, customer onboarding, and much more.',
      },
      {
        question: 'How intelligent are AI chatbots?',
        answer: 'Modern AI chatbots use natural language processing to understand context and intent. They can handle complex conversations, learn from interactions, and escalate to humans when needed.',
      },
      {
        question: 'Will automation replace my team?',
        answer: 'No, automation complements your team by handling repetitive tasks, allowing your staff to focus on higher-value work that requires creativity, strategy, and human judgment.',
      },
      {
        question: 'How do you ensure AI systems are accurate?',
        answer: 'We use proven AI models, train them on quality data, implement thorough testing protocols, and continuously monitor performance to maintain high accuracy levels.',
      },
      {
        question: 'Can automation integrate with my current tools?',
        answer: 'Yes! We specialize in integrating automation solutions with popular platforms like CRMs, email marketing tools, accounting software, and custom systems via APIs.',
      },
    ],
    cta: {
      title: 'Ready to Automate Your Business?',
      description: 'Let\'s identify opportunities to save time and reduce costs with intelligent automation.',
    },
  },
  {
    slug: 'saas-platform-development',
    title: 'SaaS Platform Development',
    shortTitle: 'SaaS Development',
    description: 'We turn your software idea into a powerful, scalable product, ready for users, growth, and launch.',
    icon: Images.saasIcon,
    overview: 'Transform your software vision into a market-ready SaaS platform. We handle everything from architecture design to deployment, creating scalable, secure, and user-friendly platforms that grow with your business and delight your customers.',
    features: [
      {
        title: 'Multi-Tenant Architecture',
        description: 'Secure, isolated environments for each customer while maintaining efficient resource utilization.',
      },
      {
        title: 'Subscription Management',
        description: 'Built-in billing, subscription tiers, payment processing, and automated invoicing systems.',
      },
      {
        title: 'User Management',
        description: 'Comprehensive authentication, role-based access control, and team collaboration features.',
      },
      {
        title: 'Analytics Dashboard',
        description: 'Real-time insights into user behavior, platform performance, and business metrics.',
      },
      {
        title: 'API & Integrations',
        description: 'RESTful APIs and webhooks for seamless integration with third-party services.',
      },
      {
        title: 'Cloud Infrastructure',
        description: 'Scalable cloud deployment with automatic scaling, backups, and disaster recovery.',
      },
    ],
    benefits: [
      {
        title: 'Recurring Revenue Model',
        description: 'Subscription-based pricing creates predictable, recurring revenue streams for sustainable growth.',
      },
      {
        title: 'Rapid Market Entry',
        description: 'Get to market faster with proven development frameworks and best practices.',
      },
      {
        title: 'Scalable from Day One',
        description: 'Architecture designed to handle growth from 10 to 10,000+ users without major refactoring.',
      },
      {
        title: 'Lower Customer Acquisition Cost',
        description: 'Self-service onboarding and automated processes reduce the cost of acquiring new customers.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Product Discovery',
        description: 'Define your target market, core features, pricing strategy, and competitive positioning.',
      },
      {
        step: 2,
        title: 'Architecture & Planning',
        description: 'Design scalable system architecture, data models, and technical infrastructure.',
      },
      {
        step: 3,
        title: 'MVP Development',
        description: 'Build a minimum viable product with core features to validate your concept with real users.',
      },
      {
        step: 4,
        title: 'Beta Testing & Feedback',
        description: 'Launch to early adopters, gather feedback, and iterate based on real-world usage.',
      },
      {
        step: 5,
        title: 'Full Launch & Scale',
        description: 'Public launch with marketing support, ongoing feature development, and infrastructure scaling.',
      },
    ],
    faqs: [
      {
        question: 'How long does it take to build a SaaS platform?',
        answer: 'An MVP typically takes 3-6 months, while a full-featured platform can take 6-12 months. Timeline depends on complexity, features, and your specific requirements.',
      },
      {
        question: 'What technology stack do you use?',
        answer: 'We select the best tech stack for your needs, commonly using React/Next.js for frontend, Node.js/Python for backend, PostgreSQL for database, and AWS/Google Cloud for hosting.',
      },
      {
        question: 'How do you handle security and data privacy?',
        answer: 'We implement industry-standard security measures including encryption, secure authentication, regular security audits, and compliance with GDPR, CCPA, and other regulations.',
      },
      {
        question: 'Can you help with pricing strategy?',
        answer: 'Yes! We provide guidance on pricing models (freemium, tiered, usage-based) based on market research and your target customers.',
      },
      {
        question: 'Do you provide post-launch support?',
        answer: 'Absolutely. We offer maintenance packages including bug fixes, feature updates, performance monitoring, and scaling support as your user base grows.',
      },
    ],
    cta: {
      title: 'Ready to Launch Your SaaS?',
      description: 'Let\'s turn your software idea into a successful product that customers love.',
    },
  },
  {
    slug: 'data-analytics-insights',
    title: 'Data Analytics & Insights',
    shortTitle: 'Data Analytics',
    description: 'We help you choose the right tools, map better workflows, and scale smarter, with clarity and confidence.',
    icon: Images.analyticsIcon,
    overview: 'Turn your data into actionable insights that drive better business decisions. We help you collect, analyze, and visualize data from across your organization, revealing patterns and opportunities that fuel growth and competitive advantage.',
    features: [
      {
        title: 'Custom Dashboards',
        description: 'Interactive dashboards that display key metrics and KPIs in real-time for quick decision-making.',
      },
      {
        title: 'Data Visualization',
        description: 'Transform complex data into easy-to-understand charts, graphs, and reports.',
      },
      {
        title: 'Predictive Analytics',
        description: 'Use machine learning to forecast trends, identify opportunities, and anticipate challenges.',
      },
      {
        title: 'Data Integration',
        description: 'Consolidate data from multiple sources into a unified view for comprehensive analysis.',
      },
      {
        title: 'Automated Reporting',
        description: 'Schedule automated reports delivered to stakeholders on a regular basis.',
      },
      {
        title: 'Performance Metrics',
        description: 'Track business performance against goals with custom KPIs and benchmarks.',
      },
    ],
    benefits: [
      {
        title: 'Make Informed Decisions',
        description: 'Data-driven insights eliminate guesswork and help you make confident strategic decisions.',
      },
      {
        title: 'Identify Growth Opportunities',
        description: 'Discover trends, patterns, and opportunities hidden in your data that drive revenue growth.',
      },
      {
        title: 'Improve Efficiency',
        description: 'Identify bottlenecks and inefficiencies in operations, then optimize for better performance.',
      },
      {
        title: 'Stay Ahead of Competition',
        description: 'Real-time insights and predictive analytics help you anticipate market changes and stay competitive.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Data Assessment',
        description: 'Evaluate your current data sources, quality, and infrastructure to understand what you have and what you need.',
      },
      {
        step: 2,
        title: 'Strategy Development',
        description: 'Define key questions you want to answer, metrics to track, and goals for your analytics initiative.',
      },
      {
        step: 3,
        title: 'Data Pipeline Setup',
        description: 'Build secure, automated data pipelines to collect, clean, and store data from all relevant sources.',
      },
      {
        step: 4,
        title: 'Analysis & Visualization',
        description: 'Create dashboards, reports, and visualizations that make insights accessible to your team.',
      },
      {
        step: 5,
        title: 'Continuous Improvement',
        description: 'Regularly review analytics, refine metrics, and expand capabilities as your needs evolve.',
      },
    ],
    faqs: [
      {
        question: 'What types of data can you analyze?',
        answer: 'We work with all types of business data including sales, marketing, customer behavior, financial, operational, and more. We can integrate data from CRMs, databases, spreadsheets, and third-party APIs.',
      },
      {
        question: 'Do I need a data scientist on staff?',
        answer: 'No, we design analytics solutions that are user-friendly and accessible to non-technical users. We provide training and documentation so your team can leverage insights independently.',
      },
      {
        question: 'How do you ensure data accuracy?',
        answer: 'We implement data validation, cleaning processes, and quality checks throughout the pipeline. We also establish clear data governance policies and regular audits.',
      },
      {
        question: 'Can you work with our existing tools?',
        answer: 'Yes! We integrate with popular platforms like Google Analytics, Salesforce, HubSpot, and custom databases. We can also recommend tools if you\'re starting from scratch.',
      },
      {
        question: 'What\'s the ROI of data analytics?',
        answer: 'ROI varies by use case, but clients typically see improved efficiency, increased revenue, reduced costs, and better customer retention through data-driven decision making.',
      },
    ],
    cta: {
      title: 'Ready to Unlock Your Data\'s Potential?',
      description: 'Let\'s build an analytics solution that gives you clarity and drives better decisions.',
    },
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find(service => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map(service => service.slug);
}
