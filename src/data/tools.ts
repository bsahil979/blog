import { Tool } from '@/types/tool';

export const TOOLS: Tool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    slug: 'cursor',
    tagline: 'The AI-first code editor built on top of VS Code.',
    description:
      'Cursor is an AI-powered code editor forked from VS Code. It combines multi-line tab completions, codebase-wide semantic indexing for contextual queries, and an interactive Composer agent that edits multiple files across your workspace simultaneously.',
    category: 'Coding',
    website: 'https://cursor.com',
    editorialRating: 9.5,
    scores: {
      capability: 9.5,
      developerWorkflow: 9.5,
      reliability: 9.0,
      easeOfUse: 9.0,
      value: 9.0,
    },
    pricing: {
      pricingType: 'Freemium',
      startingPrice: 'Check official site (Free tier available)',
      freeTierAvailable: true,
      plans: [
        {
          name: 'Hobby',
          price: 'Free',
          features: [
            'Basic multi-line completions',
            'Limited fast AI queries',
            'Codebase indexing for personal projects',
          ],
        },
        {
          name: 'Pro',
          price: 'Check official site',
          features: [
            'Higher fast query allowance',
            'Full Composer multi-file editing',
            'Choice of leading frontier models',
            'Background codebase index synchronization',
          ],
        },
        {
          name: 'Business',
          price: 'Check official site',
          features: [
            'Centralized billing & seat management',
            'Zero data retention enforcement mode',
            'Admin usage analytics and SSO',
          ],
        },
      ],
      verificationNote:
        'Pricing plans, query allocations, and model availability change frequently. Always verify current tiers on the official Cursor website.',
    },
    features: [
      'Multi-file editing via Composer',
      'Predictive multi-line autocompletions with cursor jump guidance',
      'Semantic codebase indexing (@codebase, @web, @docs)',
      'Full VS Code extensions, settings, and keybinding parity',
      'Configurable custom system instructions (.cursorrules)',
      'Model selector supporting leading frontier reasoning and coding models',
    ],
    pros: [
      'Seamless transition for existing VS Code users with identical extensions',
      'Composer enables rapid multi-file refactoring without manual copy-pasting',
      'Codebase context retrieval accurately locates symbols across large repositories',
      'Support for project-specific rules via .cursorrules configuration',
    ],
    cons: [
      'Standalone application fork rather than an extension, requiring separate installation',
      'Fast query pool can deplete quickly during intensive multi-file generations',
      'Context indexing requires periodic background re-sync on active branches',
    ],
    bestFor: [
      'Full-stack web and backend development',
      'Rapid multi-file prototyping',
      'Complex refactoring across existing repositories',
      'Developers transitioning from VS Code',
    ],
    alternatives: ['windsurf', 'github-copilot', 'claude-code'],
    overview:
      'Cursor has established itself as a leading AI-first integrated development environment. Forked directly from the open-source core of Visual Studio Code, Cursor retains full compatibility with existing VS Code extensions and settings while engineering the editor experience around modern LLMs. Signature features include multi-file Composer editing, predictive tab completions, and semantic codebase indexing that allows developers to ask architectural questions about their entire repository.',
    whoItIsFor:
      'Software engineers, web developers, and teams looking for an integrated IDE experience where AI assists with completions, multi-file edits, and architectural queries with minimal friction.',
    mainUseCases: [
      'Generating boilerplate and features across client and server files simultaneously',
      'Resolving multi-file TypeScript compilation and lint errors',
      'Understanding complex repositories and microservice boundaries',
      'Generating unit and integration test suites',
    ],
    lastReviewed: '2026-09-01',
    isPopular: true,
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    tagline: 'The industry-standard AI coding companion integrated across major IDEs.',
    description:
      'GitHub Copilot is Microsoft and GitHub’s developer companion. Available as an official extension across VS Code, JetBrains IDEs, Neovim, and Visual Studio, Copilot offers in-line ghost text suggestions, contextual chat, pull request summaries, and workspace indexing.',
    category: 'Coding',
    website: 'https://github.com/features/copilot',
    editorialRating: 9.0,
    scores: {
      capability: 8.5,
      developerWorkflow: 9.0,
      reliability: 9.0,
      easeOfUse: 9.5,
      value: 9.0,
    },
    pricing: {
      pricingType: 'Paid',
      startingPrice: 'Check official site (Free for verified students & OSS)',
      freeTierAvailable: false,
      plans: [
        {
          name: 'Copilot Individual',
          price: 'Check official site',
          features: [
            'Code completion across supported editors',
            'Copilot Chat in IDE and GitHub Mobile',
            'CLI and terminal integration',
          ],
        },
        {
          name: 'Copilot Business',
          price: 'Check official site',
          features: [
            'Policy management and license assignment',
            'Privacy exclusion for public code suggestions',
            'Organization-level telemetry and security auditing',
          ],
        },
        {
          name: 'Copilot Enterprise',
          price: 'Check official site',
          features: [
            'Pull request summarization and review on github.com',
            'Custom fine-tuned organization knowledge bases',
            'Deep GitHub documentation integration',
          ],
        },
      ],
      verificationNote:
        'GitHub Copilot offers free licenses for verified students, educators, and prominent open-source maintainers. Verify current rates and eligibility on GitHub’s website.',
    },
    features: [
      'Extension support for VS Code, IntelliJ, PyCharm, WebStorm, Neovim, and Visual Studio',
      'In-line code suggestions with multi-line completion triggers',
      'GitHub.com web chat and Pull Request description generator',
      '@workspace semantic indexing in Copilot Chat',
      'Agent mode support in supported development environments',
      'Direct integration with GitHub Enterprise repositories and issues',
    ],
    pros: [
      'Native plugin available in virtually every major IDE, including JetBrains and Neovim',
      'Deep enterprise compliance, SSO, audit logs, and IP indemnification',
      'Generous free access for verified students and popular open-source maintainers',
      'Native integration with GitHub.com PR reviews and issue tracking',
    ],
    cons: [
      'Multi-file generation and workspace editing is less fluid than dedicated forks',
      'Completion latency can vary based on network conditions',
      'Less fine-grained model customization for individual users',
    ],
    bestFor: [
      'Teams already standardized on GitHub and JetBrains ecosystems',
      'Enterprise environments requiring strict data governance and compliance',
      'Developers wanting an extension rather than switching their core IDE',
    ],
    alternatives: ['cursor', 'windsurf', 'claude-code'],
    overview:
      'GitHub Copilot pioneered the modern AI pair-programming movement. Backed by Microsoft and integrated directly into the GitHub developer workflow, Copilot remains the standard across large engineering organizations. Its primary strength lies in its wide IDE coverage, supporting JetBrains, Visual Studio, and Neovim alongside VS Code, backed by enterprise compliance guarantees.',
    whoItIsFor:
      'Engineering teams, polyglot developers using multiple IDEs, and enterprise developers who need strict security guarantees and deep GitHub repository integration.',
    mainUseCases: [
      'In-line autocomplete for repetitive boilerplate and standard algorithms',
      'Reviewing PR diffs and drafting release notes on GitHub',
      'Debugging unit test failures directly inside JetBrains or VS Code',
    ],
    lastReviewed: '2026-09-01',
    isPopular: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    slug: 'claude',
    tagline: 'Anthropic’s conversational and reasoning AI with advanced coding capabilities.',
    description:
      'Claude by Anthropic is an advanced LLM suite renowned for nuanced reasoning, high instruction adherence, and precise code generation. Claude features an interactive Artifacts UI that previews rendered React components, SVGs, and web applications in real time.',
    category: 'Research',
    website: 'https://claude.ai',
    editorialRating: 9.5,
    scores: {
      capability: 9.5,
      developerWorkflow: 9.0,
      reliability: 9.5,
      easeOfUse: 9.5,
      value: 9.0,
    },
    pricing: {
      pricingType: 'Freemium',
      startingPrice: 'Check official site (Free tier available)',
      freeTierAvailable: true,
      plans: [
        {
          name: 'Free',
          price: 'Free',
          features: [
            'Access to Claude models with dynamic usage limits',
            'Interactive Artifacts rendering',
            'File uploads (code, PDFs, images)',
          ],
        },
        {
          name: 'Claude Pro',
          price: 'Check official site',
          features: [
            'Significantly higher usage limits',
            'Priority access during peak traffic',
            'Projects feature for organizing repositories and documents',
            'Early access to new reasoning features',
          ],
        },
        {
          name: 'Claude Team',
          price: 'Check official site',
          features: [
            'Higher usage limits than Pro',
            'Team workspace with shared Projects',
            'Centralized billing and admin console',
          ],
        },
      ],
      verificationNote:
        'Message limits on Claude vary depending on conversation length and current server capacity. Check Anthropic’s pricing page for current details.',
    },
    features: [
      'High-accuracy code generation and algorithmic reasoning',
      'Live interactive Artifacts for running React components and HTML/CSS mockups',
      'Projects workspace to upload codebase snapshots, architectural specs, and documentation',
      'Large context window for ingesting multi-file modules',
      'High instruction adherence and clean syntax formatting',
    ],
    pros: [
      'Known for code accuracy, minimal boilerplate, and valid syntax generation',
      'Artifacts provide an instant interactive sandbox for previewing frontend UI code',
      'Projects allow developers to ground conversations in custom documentation and API specs',
      'Writes readable, maintainable, self-documenting code without robotic filler',
    ],
    cons: [
      'Web interface requires copying code back and forth into your local IDE',
      'Rate limits apply during peak usage hours on web plans',
      'No native background IDE indexing on claude.ai web interface',
    ],
    bestFor: [
      'Complex algorithmic and architectural design',
      'Rapid React component prototyping via Artifacts',
      'Refactoring legacy codebases',
      'Deep debugging and stack trace root-cause analysis',
    ],
    alternatives: ['chatgpt', 'gemini', 'perplexity'],
    overview:
      'Anthropic’s Claude has established itself as a premier platform for software engineering reasoning. With interactive Artifacts, developers can not only generate complex logic but immediately preview working interactive UI components side-by-side with chat. Claude’s Projects feature allows teams to upload architectural rules and documentation for context-grounded answers.',
    whoItIsFor:
      'Software engineers, systems architects, and frontend developers needing high-accuracy code synthesis, architectural reviews, and interactive component prototyping.',
    mainUseCases: [
      'Architecting complex state management and full-stack system boundaries',
      'Interactive prototyping of UI components via Artifacts',
      'In-depth explanations of unfamiliar open-source codebases and algorithms',
    ],
    lastReviewed: '2026-09-01',
    isPopular: true,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    slug: 'chatgpt',
    tagline: 'OpenAI’s flagship AI platform with advanced reasoning, Canvas, and code execution.',
    description:
      'ChatGPT by OpenAI is a widely used AI assistant equipped with advanced frontier reasoning models, Canvas for collaborative code editing, integrated Python code execution in a secure sandbox, web browsing, and custom GPTs.',
    category: 'Productivity',
    website: 'https://chatgpt.com',
    editorialRating: 9.0,
    scores: {
      capability: 9.0,
      developerWorkflow: 9.0,
      reliability: 9.0,
      easeOfUse: 9.5,
      value: 9.0,
    },
    pricing: {
      pricingType: 'Freemium',
      startingPrice: 'Check official site (Free tier available)',
      freeTierAvailable: true,
      plans: [
        {
          name: 'Free',
          price: 'Free',
          features: [
            'Access to standard frontier models',
            'Basic web browsing and data analysis',
            'Access to custom GPTs from GPT Store',
          ],
        },
        {
          name: 'Plus',
          price: 'Check official site',
          features: [
            'Expanded access to reasoning and multimodal models',
            'Canvas interactive code and document workspace',
            'Advanced Data Analysis with sandbox Python execution',
            'Voice and image input features',
          ],
        },
        {
          name: 'Pro',
          price: 'Check official site',
          features: [
            'Highest compute tier for compute-intensive research and math',
            'Expanded access to advanced reasoning modes',
          ],
        },
      ],
      verificationNote:
        'OpenAI offers multiple tiers including Plus, Pro, and Team. Verify current quotas and model availability on OpenAI’s official pricing page.',
    },
    features: [
      'Canvas workspace for inline code editing, inline diffing, and code review',
      'Integrated Python sandbox for running scripts and charting data in real time',
      'Frontier reasoning models for complex mathematical and algorithmic problems',
      'Custom GPTs for specialized frameworks, languages, and API documentation',
      'Web search integration for technical research',
    ],
    pros: [
      'Canvas interface makes iterative code adjustments seamless within the chat',
      'Built-in Python environment actually runs scripts and verifies output',
      'Reasoning models solve difficult algorithms that challenge standard LLMs',
      'Massive ecosystem of community Custom GPTs for specific libraries',
    ],
    cons: [
      'Web-based workflow separate from local editor without extensions',
      'Can occasionally over-explain simple syntax requests unless prompted specifically',
      'High-tier reasoning models operate under distinct query quotas',
    ],
    bestFor: [
      'Algorithm optimization and competitive programming problems',
      'Data analysis, scripting, and scientific computing with Python sandbox',
      'Iterative document and code drafting using Canvas',
      'General technical research with live web searching',
    ],
    alternatives: ['claude', 'gemini', 'perplexity'],
    overview:
      'ChatGPT remains a central platform for multimodal AI. For developers, features like Canvas provide a side-by-side editing workspace that allows inline code changes, targeted reviews, and comments. Integrated Python execution allows engineers to verify scripts and chart data directly in the browser.',
    whoItIsFor:
      'Engineers, data scientists, and technical founders needing an all-in-one assistant for coding, data analysis, research, and scripting.',
    mainUseCases: [
      'Analyzing and visualizing data sets using the integrated Python runtime',
      'Tackling algorithmic proofs and architectural trade-offs with reasoning models',
      'Drafting technical specifications and refactoring code blocks in Canvas',
    ],
    lastReviewed: '2026-09-01',
    isPopular: true,
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    slug: 'windsurf',
    tagline: 'The agentic IDE by Codeium built for flow-state developer collaboration.',
    description:
      'Windsurf is an AI-powered IDE built by Codeium. Designed from the ground up to keep developers in the "flow state", Windsurf introduces Cascade—an agentic workspace copilot that understands context across terminals, editor buffers, and project files with proactive execution.',
    category: 'Coding',
    website: 'https://codeium.com/windsurf',
    editorialRating: 9.0,
    scores: {
      capability: 9.0,
      developerWorkflow: 9.5,
      reliability: 8.5,
      easeOfUse: 9.0,
      value: 9.5,
    },
    pricing: {
      pricingType: 'Freemium',
      startingPrice: 'Check official site (Free tier available)',
      freeTierAvailable: true,
      plans: [
        {
          name: 'Free',
          price: 'Free',
          features: [
            'Fast code completions',
            'Cascade agent query allowances',
            'Standard multi-file awareness',
          ],
        },
        {
          name: 'Pro',
          price: 'Check official site',
          features: [
            'Expanded Cascade queries with priority frontier models',
            'Deep codebase indexing across entire repository trees',
            'Zero data retention options for enterprise repositories',
          ],
        },
        {
          name: 'Team',
          price: 'Check official site',
          features: [
            'Centralized seat management',
            'Compliance and SOC2 options',
            'Team metrics and shared workflows',
          ],
        },
      ],
      verificationNote:
        'Codeium frequently updates Windsurf pricing and tier perks. Verify current limits directly on Codeium’s website.',
    },
    features: [
      'Cascade agent with terminal, file, and diff awareness',
      'Supercomplete multi-line tab completions with intent prediction',
      'Context tracking across active editor tabs and recent terminal commands',
      'VS Code extension compatibility and settings import',
      'Integrated multi-model switcher supporting frontier models',
    ],
    pros: [
      'Cascade agent can inspect terminal commands and check build status',
      'Competitive subscription pricing compared to other AI-first IDEs',
      'High-speed code completions powered by Codeium’s optimized infrastructure',
      'Clean UI that minimizes context switching while coding',
    ],
    cons: [
      'Newer platform with an evolving feature set and community plugins',
      'Standalone IDE fork requiring setup outside standard VS Code installation',
      'Agent edits require developer monitoring on complex tasks',
    ],
    bestFor: [
      'Developers seeking an agentic IDE that can execute commands and test code',
      'Engineers wanting low-latency completions at an accessible price point',
      'Full-stack prototyping involving build scripts and terminal commands',
    ],
    alternatives: ['cursor', 'github-copilot', 'claude-code'],
    overview:
      'Windsurf is Codeium’s entry in the AI-first IDE landscape. By coupling fast autocomplete with Cascade, an agent that can read terminal output, inspect files, and propose fixes in real time, Windsurf offers a collaborative pair-programming experience aimed at automating repetitive aspects of development.',
    whoItIsFor:
      'Developers who want an AI agent that actively participates in building, compiling, and testing code directly inside the editor.',
    mainUseCases: [
      'Inspecting compilation and test errors automatically with Cascade reading terminal output',
      'Implementing features across frontend and backend files',
      'Refactoring code with terminal-driven verification',
    ],
    lastReviewed: '2026-09-01',
    isPopular: true,
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    slug: 'claude-code',
    tagline: 'Anthropic’s agentic CLI tool for autonomous terminal-based engineering.',
    description:
      'Claude Code is an agentic command-line tool developed by Anthropic. Operating directly in your terminal, Claude Code searches codebases, edits files across directories, executes terminal commands, runs tests, and creates git commits and pull requests with developer approval.',
    category: 'Coding',
    website: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
    editorialRating: 9.0,
    scores: {
      capability: 9.5,
      developerWorkflow: 9.0,
      reliability: 9.0,
      easeOfUse: 8.0,
      value: 9.0,
    },
    pricing: {
      pricingType: 'Paid',
      startingPrice: 'Check official site (Pay-as-you-go via Anthropic API)',
      freeTierAvailable: false,
      plans: [
        {
          name: 'API Usage Tier',
          price: 'Pay-per-token',
          features: [
            'Billed directly via Anthropic Console API key',
            'Full terminal access with local tool execution',
            'Direct access to Anthropic frontier models',
          ],
        },
      ],
      verificationNote:
        'Claude Code consumes Anthropic API tokens directly. Costs depend on repository size and query volume. Check Anthropic Console pricing.',
    },
    features: [
      'Autonomous terminal agent executing ripgrep, bash commands, and git actions',
      'Multi-file search and codebase navigation without an IDE UI layer',
      'Automated test execution, failure diagnosis, and iterative fix application',
      'Git commit generation and GitHub pull request creation from the CLI',
      'Interactive permission prompt system for command approval',
    ],
    pros: [
      'Works across any editor or environment (Vim, Neovim, Emacs, remote SSH, Docker)',
      'High degree of agency in finding relevant files across large repositories',
      'Leverages Anthropic’s frontier models for complex engineering tasks',
      'Integrates seamlessly with existing terminal workflows and shell scripts',
    ],
    cons: [
      'Terminal-only CLI interface requires comfort with command-line interactions',
      'API token consumption can scale quickly on large codebase exploration passes',
      'Requires explicit permission confirmation for terminal commands',
    ],
    bestFor: [
      'Terminal purists using Neovim, Emacs, or SSH remote dev sessions',
      'Automating complex multi-file refactoring and dependency upgrades',
      'Investigating unfamiliar open-source repos directly from the command line',
    ],
    alternatives: ['cursor', 'windsurf', 'github-copilot'],
    overview:
      'Claude Code brings Anthropic’s reasoning models directly to the command line. Instead of confining AI to an editor sidebar or web chat, Claude Code operates as a terminal companion with read/write access to your local files, shell, and git environment. It can search code, diagnose failing unit tests, edit files, and submit PRs with your permission.',
    whoItIsFor:
      'Developers comfortable in the terminal, DevOps engineers, and developers who work remotely over SSH or prefer modal editors like Neovim and Emacs.',
    mainUseCases: [
      'Running test suites, reading the trace, and fixing broken unit tests',
      'Performing repository-wide refactors and API migrations',
      'Reviewing git diffs and generating commit messages and PR descriptions',
    ],
    lastReviewed: '2026-09-01',
    isPopular: true,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    slug: 'gemini',
    tagline: 'Google’s multimodal frontier AI with large context window architecture.',
    description:
      'Gemini is Google’s frontier AI model suite. Designed natively for multimodality and very large context windows, it allows developers to ingest extensive code repositories, architectural videos, and full API documentation specifications for analysis.',
    category: 'Research',
    website: 'https://gemini.google.com',
    editorialRating: 9.0,
    scores: {
      capability: 9.0,
      developerWorkflow: 8.5,
      reliability: 8.5,
      easeOfUse: 9.5,
      value: 9.0,
    },
    pricing: {
      pricingType: 'Freemium',
      startingPrice: 'Check official site (Free tier available)',
      freeTierAvailable: true,
      plans: [
        {
          name: 'Free',
          price: 'Free',
          features: [
            'Access to standard Gemini models',
            'Integration with Google Workspace apps',
            'Web search grounding via Google Search',
          ],
        },
        {
          name: 'Gemini Advanced',
          price: 'Check official site',
          features: [
            'Access to frontier reasoning and large-context models',
            'Google One cloud storage integration',
            'Early access to new multimodal features',
          ],
        },
      ],
      verificationNote:
        'Gemini Advanced pricing and quotas are packaged with Google One AI subscription tiers. Verify current terms on Google’s official site.',
    },
    features: [
      'Large context window architecture capable of ingesting whole codebases',
      'Native multimodality (code, audio, video, images, PDFs)',
      'Integration with Google Cloud, Firebase, and Google AI Studio',
      'Real-time web grounding powered by Google Search',
      'Code execution environments in Google AI Studio and web app',
    ],
    pros: [
      'Large context window handles extensive documentation archives or legacy repos in one prompt',
      'Strong capabilities when analyzing technical screencasts, UI mockups, and architectural diagrams',
      'Generous developer quotas available via Google AI Studio',
      'Deep integration with Google Cloud ecosystem',
    ],
    cons: [
      'Web interface code editing is less specialized for developer workflows than dedicated IDE forks',
      'Syntax nuance on niche frameworks can occasionally require manual verification',
    ],
    bestFor: [
      'Ingesting and querying large codebases or book-length API documentations',
      'Multimodal analysis of software demo videos, UI mockups, and database diagrams',
      'Developers already integrated into Google Cloud and Google Workspace ecosystems',
    ],
    alternatives: ['chatgpt', 'claude', 'perplexity'],
    overview:
      'Google Gemini stands apart due to its context window scale and native multimodal architecture. Developers can feed extensive code repositories, complete PDF specifications, or screen recordings into Gemini, making it a valuable tool for architectural audits, legacy code ingestion, and video bug report analysis.',
    whoItIsFor:
      'Architects, engineers auditing legacy codebases, and developers who need to digest massive technical specifications or multimodal inputs.',
    mainUseCases: [
      'Analyzing repository archives to understand architecture and identify vulnerabilities',
      'Analyzing video screencasts of UI bugs to locate the failing frontend component',
      'Cross-referencing complex PDF documentation with code implementation',
    ],
    lastReviewed: '2026-09-01',
    isPopular: true,
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    slug: 'perplexity',
    tagline: 'The AI-powered answer engine and documentation search for developers.',
    description:
      'Perplexity AI is a conversational answer engine that synthesizes responses with real-time web citations. For developers, Perplexity provides search focuses that index official documentation, GitHub repositories, and developer discussions.',
    category: 'Research',
    website: 'https://www.perplexity.ai',
    editorialRating: 9.0,
    scores: {
      capability: 8.5,
      developerWorkflow: 9.0,
      reliability: 9.5,
      easeOfUse: 9.5,
      value: 9.5,
    },
    pricing: {
      pricingType: 'Freemium',
      startingPrice: 'Check official site (Free tier available)',
      freeTierAvailable: true,
      plans: [
        {
          name: 'Free',
          price: 'Free',
          features: [
            'Standard search queries with citations',
            'Limited Pro Search queries per day',
          ],
        },
        {
          name: 'Perplexity Pro',
          price: 'Check official site',
          features: [
            'High volume of Pro Search queries with multi-step synthesis',
            'Access to frontier model selector',
            'File and code upload analysis',
            'API access options',
          ],
        },
      ],
      verificationNote:
        'Verify current Pro limits, API credits, and model selector features directly on the official Perplexity website.',
    },
    features: [
      'Pro Search for multi-step reasoning and automated search query refinement',
      'Direct citations to official documentation, RFCs, and GitHub source code',
      'Focus filters including Academic, Writing, and Computational modes',
      'Model toggle allowing users to choose preferred frontier models',
      'Collections for organizing technical research projects and team knowledge',
    ],
    pros: [
      'Reduces hallucinated API methods by anchoring answers in live documentation',
      'Saves developer time compared to navigating search engine result pages',
      'Includes citations for claims so you can verify upstream source code',
      'Access to multiple frontier LLMs under a unified interface',
    ],
    cons: [
      'Not designed for in-IDE autocompletion or direct repository code editing',
      'Occasional citation of older forum posts if official docs are restricted',
    ],
    bestFor: [
      'Researching new frameworks, libraries, and breaking API changes',
      'Finding real-world GitHub code examples for niche SDKs',
      'Supplementing traditional search engines for technical troubleshooting',
    ],
    alternatives: ['chatgpt', 'claude', 'notebooklm'],
    overview:
      'Perplexity has transformed technical information retrieval for engineers. Instead of wading through pages of ad-heavy search results and outdated forum threads, developers use Perplexity to get concise, cited technical answers grounded in real-time documentation and GitHub repositories.',
    whoItIsFor:
      'Developers, DevOps engineers, and researchers seeking verified answers with links to upstream technical sources and official documentation.',
    mainUseCases: [
      'Troubleshooting obscure framework error messages with cited community solutions',
      'Comparing architecture options and database trade-offs with source links',
      'Finding documentation on recently released open-source SDK versions',
    ],
    lastReviewed: '2026-09-01',
    isPopular: true,
  },
  {
    id: 'replit',
    name: 'Replit Agent',
    slug: 'replit',
    tagline: 'Autonomous AI software engineering in a cloud-hosted environment.',
    description:
      'Replit is a collaborative cloud development environment that features the Replit Agent. The Agent can take natural language software prompts, design database schemas, configure cloud infrastructure, write full-stack code, and deploy web applications.',
    category: 'Coding',
    website: 'https://replit.com',
    editorialRating: 8.5,
    scores: {
      capability: 8.5,
      developerWorkflow: 9.0,
      reliability: 8.0,
      easeOfUse: 9.5,
      value: 8.5,
    },
    pricing: {
      pricingType: 'Freemium',
      startingPrice: 'Check official site (Starter free)',
      freeTierAvailable: true,
      plans: [
        {
          name: 'Starter',
          price: 'Free',
          features: [
            'Basic cloud workspace and community access',
            'Limited AI code completions',
          ],
        },
        {
          name: 'Replit Core',
          price: 'Check official site',
          features: [
            'Access to Replit Agent checkpoints and app builder',
            'PostgreSQL database and cloud deployment credits',
            'Private Repls and enhanced compute resources',
          ],
        },
      ],
      verificationNote:
        'Replit Agent usage operates on compute credits that scale with project complexity. Check Replit’s pricing page for current allowance details.',
    },
    features: [
      'Autonomous Replit Agent that builds full-stack apps from natural language specifications',
      'Integrated cloud hosting, domain provisioning, and PostgreSQL databases',
      'Real-time collaborative coding and team pair-programming',
      'Mobile app for inspecting, editing, and deploying apps',
      'Zero-configuration package management and environment setup',
    ],
    pros: [
      'Builds complete end-to-end web apps with databases without local environment setup',
      'Seamless transition from generation to live deployed cloud URL',
      'Great for rapid prototyping, hackathons, and customer validation prototypes',
      'Interactive multiplayer editing allows humans and AI to co-develop in real time',
    ],
    cons: [
      'Less suited for large existing enterprise repositories hosted on premise',
      'Cloud compute credit consumption during heavy agent iteration cycles',
      'Agent edits can require manual architectural adjustments on complex apps',
    ],
    bestFor: [
      'Rapid prototype development and MVP building from scratch',
      'Founders and product managers validating concepts quickly',
      'Educators and students needing zero-config cloud coding',
    ],
    alternatives: ['cursor', 'windsurf', 'claude-code'],
    overview:
      'Replit Agent represents an approach toward autonomous cloud software construction. Rather than simply suggesting snippets inside a local editor, Replit Agent provisions databases, configures server environments, installs dependencies, writes frontend and backend code, and serves the app on a live domain.',
    whoItIsFor:
      'Founders, solo developers, and product teams looking to validate and deploy new web applications quickly without managing local infrastructure.',
    mainUseCases: [
      'Turning an idea into a functional full-stack MVP quickly',
      'Testing tool concepts without setting up local dev environments',
      'Collaborative live coding sessions with teammates and AI simultaneously',
    ],
    lastReviewed: '2026-09-01',
    isPopular: false,
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    slug: 'notebooklm',
    tagline: 'Google’s source-grounded research notebook and Audio Overview generator.',
    description:
      'NotebookLM is Google’s AI research notebook grounded in the sources you provide. Developers use it to upload API documentation, architecture RFCs, engineering blog posts, and technical discussions to synthesize accurate summaries and Audio Overviews.',
    category: 'Research',
    website: 'https://notebooklm.google.com',
    editorialRating: 9.0,
    scores: {
      capability: 8.5,
      developerWorkflow: 9.0,
      reliability: 9.5,
      easeOfUse: 9.5,
      value: 9.5,
    },
    pricing: {
      pricingType: 'Free',
      startingPrice: 'Free (Google Account required; check official site)',
      freeTierAvailable: true,
      plans: [
        {
          name: 'Free Workspace',
          price: 'Free',
          features: [
            'Upload sources per notebook (PDFs, Docs, web links, text)',
            'Source-grounded citations for generated insights',
            'Deep Dive Audio Overview discussion generation',
          ],
        },
      ],
      verificationNote:
        'NotebookLM is offered with a Google Account. Google Workspace enterprise tiers may introduce specific organizational settings.',
    },
    features: [
      'Strict source grounding ensures answers reference uploaded documents',
      'Support for PDFs, Google Docs, web links, markdown, and pasted text',
      'Audio Overview generates two-host conversational audio summaries',
      'Direct citation markers pointing to exact source passages',
      'Custom notebook organization for separate projects or client architectural reviews',
    ],
    pros: [
      'Minimizes hallucinations by restricting answers strictly to your uploaded sources',
      'Audio Overview turns dense architectural RFCs into audio discussions',
      'Free to use with generous source size limits',
      'Clean, distraction-free UI ideal for deep technical reading and synthesis',
    ],
    cons: [
      'Not designed for interactive code execution or in-editor autocomplete',
      'Does not search external web resources outside the explicitly uploaded notebook sources',
    ],
    bestFor: [
      'Auditing complex technical specifications, RFCs, and API documentation',
      'Onboarding new engineers by synthesizing internal wikis and architecture decisions',
      'Listening to Audio Overviews of dense whitepapers',
    ],
    alternatives: ['perplexity', 'claude', 'gemini'],
    overview:
      'NotebookLM by Google provides document-grounded research. Unlike open-ended chatbots that draw from broad training data, NotebookLM focuses exclusively on the sources you upload. For engineering teams, this makes it a practical tool for synthesizing system documentation, compliance standards, and architectural proposals with exact passage citations.',
    whoItIsFor:
      'Software engineers, system architects, and engineering managers who need to synthesize and understand dense internal documentation and research papers.',
    mainUseCases: [
      'Uploading architectural design records (ADRs) to query system design constraints',
      'Generating an Audio Overview of a complex whitepaper',
      'Creating an onboarding knowledge base for new developers joining a project',
    ],
    lastReviewed: '2026-09-01',
    isPopular: false,
  },
];
