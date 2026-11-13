export interface ProjectLink {
  url: string;
  label: string;
}

export type ProjectCategory = 'ai' | 'web' | 'games' | 'coursework';

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  ai: 'AI & Bots',
  web: 'Web & Full-Stack',
  games: 'Games & Interactive',
  coursework: 'Coursework & Challenges',
};

export interface Project {
  id: string;
  category: ProjectCategory;
  name: string;
  description: string;
  /** One concise line (≤90 chars) for compact cards and the archive list. */
  blurb: string;
  /** Shown in place of links when a project has none (e.g. closed coursework). */
  note?: string;
  /** Optional call-to-action shown under the note (e.g. request the code). */
  noteHref?: string;
  noteLinkLabel?: string;
  /** Generated card artwork (featured projects); see scripts/generate-project-images.mjs. */
  image?: { src: string; alt: string };
  tech: string[];
  githubUrl?: string;
  demo?: ProjectLink;
  featured?: boolean;
}

export interface ProjectGroup {
  id: string;
  title: string;
  blurb: string;
  projects: Project[];
}

export const projectGroups: ProjectGroup[] = [
  {
    id: 'ongoing',
    title: 'Ongoing Projects',
    blurb: 'Actively maintained and still evolving.',
    projects: [
      {
        id: 'cutiebot',
        category: 'ai',
        name: 'CutieBot (Discord Bot Application)',
        blurb:
          'Multi-purpose Discord bot: music, AI chat, economy, moderation, slash commands.',
        description:
          'A custom, multi-purpose, open-source Discord Bot using Discord.js v14 and MongoDB that can play music, chat with you using OpenAI ChatGPT, manage your Economy, moderate your server, and provide other fun features. Currently supports Discord\u2019s Slash Commands. Written in JavaScript.',
        tech: ['JavaScript', 'Discord.js', 'MongoDB', 'OpenAI'],
        githubUrl: 'https://github.com/Kevin-Kwan/CutieBot',
        image: {
          src: '/projects/cutiebot.webp',
          alt: 'Abstract chat-bot tile artwork for CutieBot, a multi-purpose Discord bot',
        },
        featured: true,
      },
      {
        id: 'portfolio-website',
        category: 'web',
        name: 'Software Engineer Portfolio Website',
        blurb:
          'This website — Next.js, React, and Tailwind, with all content managed as typed data.',
        description:
          'This website — designed and built with TypeScript using Next.js (React) and Tailwind CSS, with all content managed as typed data.',
        tech: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Kevin-Kwan/Kevin-Kwan.github.io',
        image: {
          src: '/projects/portfolio-website.webp',
          alt: 'Voice-waveform artwork for this portfolio website',
        },
        featured: true,
      },
    ],
  },
  {
    id: 'completed',
    title: 'Completed Projects',
    blurb: 'Shipped coursework, hackathon builds, games, and client work.',
    projects: [
      {
        id: 'premid-presence',
        category: 'web',
        name: 'PreMiD Presence Open-Source Contribution',
        blurb:
          'Open-source contribution: a Stake.us presence for the PreMiD Discord app.',
        description:
          'A contribution to the PreMiD Presence project, a Discord Rich Presence application that allows users to show what they are doing in Discord. I added a new presence for the website \u2018Stake.us\u2019 to display various information about the user\u2019s gaming activity on the website.',
        tech: ['TypeScript', 'Discord Rich Presence', 'Open Source'],
        githubUrl: 'https://github.com/PreMiD/Presences/pull/8288',
      },
      {
        id: 'drone-dispatch',
        category: 'web',
        name: 'Drone Dispatch Express Delivery System',
        blurb:
          'Full-stack drone grocery-delivery system coordinating orders, stores, and pilots.',
        note: 'Course project (CS 4400) — code available on request.',
        noteHref: '/contact?project=Drone+Dispatch+Express+Delivery+System',
        noteLinkLabel: 'Request the code',
        description:
          'A full-stack application for a drone-based grocery delivery system (CS 4400: Introduction to Database Systems) made with Next.js (React) and MySQL. Serves as a comprehensive system that coordinates grocery orders, deliveries, and transactions between customers, stores, and drone pilots utilizing self-implemented API routes and MySQL database.',
        tech: ['Next.js', 'React', 'MySQL', 'REST APIs'],
        image: {
          src: '/projects/drone-dispatch.webp',
          alt: 'Delivery-route artwork for the Drone Dispatch Express delivery system',
        },
        featured: true,
      },
      {
        id: 'companion',
        category: 'ai',
        name: 'CompAnIon (Learning Platform POC)',
        blurb:
          'LeetCode-inspired platform teaching developers to use AI coding assistants responsibly.',
        description:
          'Interactive personalized web app inspired by LeetCode to train software developers on responsible integration of AI coding assistants. Provides modules, simulations, guidelines, and gamification to understand AI tool capabilities/risks and maintain code quality, security, and ethics when leveraging AI. Made using Next.js (React), Tailwind CSS, and Firebase.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'Firebase'],
        demo: { url: 'https://companion-training.vercel.app/', label: 'Demo' },
        image: {
          src: '/projects/companion.webp',
          alt: 'Open-book artwork for CompAnIon, a learning platform for AI coding assistants',
        },
        featured: true,
      },
      {
        id: 'careers-portal',
        category: 'web',
        name: 'Company Careers Portal (Paid Client Project)',
        blurb:
          'Full-stack careers portal with job listings, benefits pages, and an application form.',
        description:
          'A full-stack dynamic careers portal website made with Next.js (React), Tailwind CSS, Cloud Firestore, and Firebase Storage for a business allowing for potential candidates to view open positions, learn about company benefits, and apply to jobs through an online form. This project was made for a client, thus, it will remain closed-source.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'Firestore', 'Firebase'],
      },
      {
        id: 'qc-testing',
        category: 'coursework',
        name: 'Quality Control Testing (UCLA CS31 Project)',
        blurb:
          'C++ program that validates QC result strings and tallies tests, passes, and defects.',
        description:
          'My implementation of UCLA\u2019s CS31 Winter 2024 Programming Assignment/Project 3. A Quality Control (QC) Testing application written in C++ that validates and analyzes QC test results. The application checks if a QC result string is valid, calculates the total number of tests, passes, defects, and batches, and handles errors appropriately.',
        tech: ['C++'],
        githubUrl:
          'https://github.com/Kevin-Kwan/UCLA-CS31-Project-3-Winter-2024',
      },
      {
        id: 'sales-tax-calculator',
        category: 'coursework',
        name: 'Sales Tax Calculator (UCLA CS31 Project)',
        blurb:
          'C++ sales tax calculator using purchase state and date, with input error handling.',
        description:
          'My implementation of UCLA\u2019s CS31 Winter 2024 Programming Assignment/Project 2. A Sales Tax Calculator application written in C++ that calculates the total payment for a purchase, including sales tax, based on the state where the purchase is made and the date of the purchase. Includes \u201CError Handling.\u201D',
        tech: ['C++'],
        githubUrl:
          'https://github.com/Kevin-Kwan/UCLA-CS31-Project-2-Winter-2024',
      },
      {
        id: 'fishing-line-physics',
        category: 'games',
        name: 'Fishing Line Physics Implementation (Unity 3D)',
        blurb:
          'Unity proof of concept for fishing-rod casting physics using Verlet integration.',
        description:
          'An unpolished proof-of-concept attempt of implementing the realistic motion, physics, and animation of casting a fishing rod and reeling in a fishing line in Unity 3D using Verlet Physics, Unity\u2019s Line, and other built-in physics elements. Written in C#.',
        tech: ['Unity 3D', 'C#', 'Verlet Physics'],
        githubUrl: 'https://github.com/Kevin-Kwan/Unity3D-FishingRodMotion',
      },
      {
        id: 'dark-ascent',
        category: 'games',
        name: '\u201CDark Ascent\u201D (3D Platformer Game)',
        blurb:
          'Third-person 3D horror platformer built around creative movement mechanics in Unity.',
        description:
          'A complete 3rd-person 3D platformer game with a horror theme focusing on different types of creative movement to traverse dangerous levels developed using Unity 3D. Georgia Tech\u2019s CS4455/CS6457 Video Game Design. Written in C#.',
        tech: ['Unity 3D', 'C#', 'Game Design'],
        githubUrl: 'https://github.com/Kevin-Kwan/Dark-Ascent/',
        demo: {
          url: 'https://github.com/Kevin-Kwan/Dark-Ascent/releases',
          label: 'Releases',
        },
      },
      {
        id: 'eyetracking-hci',
        category: 'ai',
        name: '\u201CEyetracking-Driven Human Computer Interaction\u201D Software',
        blurb:
          'Deep-learning gaze estimation mapping eye direction to screen coordinates with ResNet50.',
        description:
          'Deep Learning Project showcasing Live/Video Footage Eyetracking Gaze estimation using MPIIGaze/MPIIFaceGaze dataset. Modified original demo to include our code to map gaze direction to screen, ResNet50, updates, and error fixes. Used Python, PyTorch, numpy, and OpenCV.',
        tech: ['Python', 'PyTorch', 'NumPy', 'OpenCV', 'ResNet50'],
        githubUrl: 'https://github.com/Kevin-Kwan/fixed_pytorch_mpiigaze_demo/',
        demo: {
          url: 'https://colab.research.google.com/github/Kevin-Kwan/pytorch_mpiigaze_demo/blob/master/demo.ipynb',
          label: 'Colab Demo',
        },
      },
      {
        id: 'currency-converter',
        category: 'web',
        name: 'Currency Converter (Learning React Project)',
        blurb:
          'React currency converter using components, hooks, and a live exchange-rate API.',
        description:
          'A simple currency converter made with React as a team project. This was one of my first React projects, so I learned about components, useState and useEffect, and using external APIs with React. I also deployed our React app to Netlify.',
        tech: ['React', 'JavaScript', 'REST APIs', 'Netlify'],
        githubUrl: 'https://github.com/Kevin-Kwan/currency-converter',
        demo: { url: 'https://moneyconversion.netlify.app/', label: 'Demo' },
      },
      {
        id: 'rps-app',
        category: 'web',
        name: 'Rock, Paper, Scissors (Learning React Project)',
        blurb:
          'Rock, Paper, Scissors in React — an early project for learning components and props.',
        description:
          'A simple Rock, Paper, Scissors game made with React as a team project. An early React project, so I learned about components, useState and useEffect, and props with React. I also deployed our React app to Netlify.',
        tech: ['React', 'JavaScript', 'Netlify'],
        githubUrl: 'https://github.com/Kevin-Kwan/rps-app',
        demo: { url: 'https://reactrps.netlify.app', label: 'Demo' },
      },
      {
        id: 'project-blu',
        category: 'games',
        name: '\u201CProject Blu\u201D (2D Unity Game Suite)',
        blurb:
          'Unity game suite: Blackjack, Chess against an AI, and a Georgia Tech-themed Rogue-like.',
        description:
          'A game suite made for Objects & Design class (CS 2340) during the Summer of 2022 featuring Blackjack, Chess with AI, and a Rogue-like Georgia Tech-themed game. We learned and applied principles of Software Engineering and the best design principles by putting them into practice with this project. Written in C#.',
        tech: ['Unity', 'C#'],
        githubUrl: 'https://github.com/majesityreal/CS2340-Team-7',
        demo: {
          url: 'https://github.com/majesityreal/CS2340-Team-7/releases',
          label: 'Releases',
        },
      },
      {
        id: 'windows-xp-website',
        category: 'web',
        name: 'Windows XP-themed Website/Socials Page',
        blurb:
          'Static socials page styled as a clickable Windows XP desktop, sounds included.',
        description:
          'An easy-to-customize, static front-end website using HTML, CSS, and JavaScript, to display your socials or portfolio in the form of clickable Windows icons on a Windows XP Desktop theme. Sounds included.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        githubUrl: 'https://github.com/Kevin-Kwan/WindowsXPWebsite/',
        demo: { url: 'https://windows-xp-website.vercel.app/', label: 'Demo' },
      },
      {
        id: 'edunft',
        category: 'web',
        name: '\u201CeduNFT\u201D (HackGT 8 2021)',
        blurb:
          'HackGT 8 concept site: a Webflow marketplace for students to mint and sell NFTs.',
        description:
          'A conceptual front-end website using Webflow serving as an online marketplace for students to upload and create their own NFTs and sell them to others. Created during HackGT 8 2021 as a first-year for NCR\u2019s theme.',
        tech: ['Webflow', 'Hackathon'],
        githubUrl: 'https://github.com/Kevin-Kwan/eduNFT/',
        demo: { url: 'https://edu-nft.vercel.app/', label: 'Demo' },
      },
      {
        id: 'evade-and-deceive',
        category: 'games',
        name: '\u201CEvade and Deceive\u201D (Unity 3D Online Multiplayer Racing Game)',
        blurb:
          'Online multiplayer 3D racing game in Unity, built on Photon PUN 2 networking.',
        description:
          'A 3rd-Person driving/racing game with inspiration from Mario Kart made in Unity that has online multiplayer functionality. Utilizes Photon Unity Networking 2 (PUN 2) and licensed music from Monstercat. Written in C#.',
        tech: ['Unity 3D', 'C#', 'Photon PUN 2', 'Multiplayer'],
        githubUrl: 'https://github.com/Kevin-Kwan/Evade-And-Deceive/',
        demo: {
          url: 'https://github.com/Kevin-Kwan/Evade-And-Deceive/releases',
          label: 'Releases',
        },
      },
      {
        id: 'lets-surf',
        category: 'games',
        name: '\u201CLet\u2019s Surf\u201D (Unity 3D Movement Game)',
        blurb:
          'Unity movement demo recreating CS:GO surfing, bunny-hopping, and air strafing.',
        description:
          'A 3D movement/platforming game demo attempting to recreate Counter-Strike/CS:GO \u201Cbunny-hopping\u201D (bhopping), \u201Csurfing\u201D, and \u201Cair strafing\u201D using Source Engine physics and movement ported to Unity 3D. Includes PlayerController. Written in C#.',
        tech: ['Unity 3D', 'C#', 'Source Engine Physics'],
        githubUrl: 'https://github.com/Kevin-Kwan/Lets-Surf/',
        demo: {
          url: 'https://github.com/Kevin-Kwan/Lets-Surf/releases',
          label: 'Releases',
        },
      },
      {
        id: 'noneuclidean-world',
        category: 'games',
        name: 'Non-Euclidean Geometry Implementation (Unity 3D)',
        blurb:
          'Unity exploration of non-Euclidean space: impossible portals and infinite stairs.',
        description:
          'Unity 3D Exploration of non-Euclidean geometry through the implementation of non-Euclidean impossible portals and infinite stairs. Includes an immersive experience where users can traverse through portals that defy our traditional understanding of space and perspective. Written in C#.',
        tech: ['Unity 3D', 'C#', 'Geometry'],
        githubUrl: 'https://github.com/Kevin-Kwan/Noneuclidean-World',
        demo: {
          url: 'https://github.com/Kevin-Kwan/Noneuclidean-World/releases',
          label: 'Releases',
        },
      },
      {
        id: 'arkanoid',
        category: 'games',
        name: 'Arkanoid Game (Unity 2D)',
        blurb:
          'A Unity 2D twist on Arkanoid and Breakout — the first game I ever made.',
        description:
          'The first \u201Cgame\u201D I ever made using Unity 2D with my own personal twist on the games \u201CArkanoid\u201D and \u201CBreakout.\u201D Written in C#.',
        tech: ['Unity 2D', 'C#'],
        githubUrl: 'https://github.com/Kevin-Kwan/Arkanoid',
        demo: {
          url: 'https://github.com/Kevin-Kwan/Arkanoid/releases',
          label: 'Releases',
        },
      },
      {
        id: 'facial-recognition-matlab',
        category: 'ai',
        name: 'Facial Recognition with MATLAB',
        blurb:
          'MATLAB project from a 2019 internship: AlexNet trained for real-time facial recognition.',
        description:
          'A machine learning project that I worked on in Summer 2019 during my internship where I used MATLAB to train AlexNet to perform facial recognition in real-time to identify people. This was my first time using MATLAB.',
        tech: ['MATLAB', 'AlexNet', 'Machine Learning'],
        githubUrl: 'https://github.com/Kevin-Kwan/MATLAB-face-training',
      },
      {
        id: 'triggering-insanity',
        category: 'games',
        name: '\u201CTriggering Insanity\u201D (2D Platformer)',
        blurb:
          'Rage-platformer built with Greenfoot and Java, inspired by I Wanna Be the Guy.',
        description:
          'A difficult 2D platformer made with Greenfoot/Java and object-oriented programming. A rage-platformer inspired by I Wanna Be the Guy and its fan games. This was my first introduction to video game development.',
        tech: ['Java', 'Greenfoot', 'OOP'],
        githubUrl: 'https://github.com/Kevin-Kwan/Triggering-Insanity',
        demo: {
          url: 'https://github.com/Kevin-Kwan/Triggering-Insanity/releases',
          label: 'Releases',
        },
      },
    ],
  },
  {
    id: 'coding-challenges',
    title: 'Coding Challenge Solutions',
    blurb: 'Problem-solving practice, shared openly.',
    projects: [
      {
        id: 'leetcode',
        category: 'coursework',
        name: 'My Personal LeetCode Solutions',
        blurb:
          'My own LeetCode solutions in several languages, shared to help other programmers.',
        description:
          'All of my own solutions to LeetCode\u2019s Coding Practice Problems in different coding languages. I\u2019m still learning and filling up this repository in order to share my knowledge and ideas with other aspiring programmers. There are always more innovative solutions to be found.',
        tech: ['Algorithms', 'Data Structures'],
        githubUrl: 'https://github.com/Kevin-Kwan/leetcode',
        demo: { url: 'https://leetcode.com/kevinkwan/', label: 'Profile' },
      },
      {
        id: 'hackerrank',
        category: 'coursework',
        name: 'My Personal HackerRank Solutions',
        blurb:
          'My own HackerRank solutions in several languages, shared to help other programmers.',
        description:
          'All of my own solutions to HackerRank\u2019s Coding Practice Problems in different coding languages. I\u2019m still learning and filling up this repository in order to share my knowledge and ideas with other aspiring programmers. There are always more innovative solutions to be found.',
        tech: ['Algorithms', 'Data Structures'],
        githubUrl: 'https://github.com/Kevin-Kwan/hackerrank',
        demo: {
          url: 'https://www.hackerrank.com/profile/kevinkwan',
          label: 'Profile',
        },
      },
    ],
  },
];

export const allProjects: Project[] = projectGroups.flatMap(
  (group) => group.projects
);

export const featuredProjects: Project[] = allProjects.filter(
  (project) => project.featured
);
