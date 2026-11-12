export interface ProjectLink {
  url: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
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
        name: 'CutieBot (Discord Bot Application)',
        description:
          'A custom, multi-purpose, open-source Discord Bot using DiscordJS v14 and MongoDB that can play music, chat with you using OpenAI ChatGPT, manage your Economy, moderate your server, and provide other fun features. Currently supports Discord\u2019s Slash Commands. Written in JavaScript.',
        tech: ['JavaScript', 'Discord.js', 'MongoDB', 'OpenAI'],
        githubUrl: 'https://github.com/Kevin-Kwan/CutieBot',
        featured: true,
      },
      {
        id: 'portfolio-website',
        name: 'Software Engineer Portfolio Website',
        description:
          'This website — designed and built with TypeScript using Next.js (React) and Tailwind CSS, with all content managed as typed data.',
        tech: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Kevin-Kwan/Kevin-Kwan.github.io',
        demo: { url: '/', label: 'Demo' },
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
        name: 'PreMiD Presence Open-Source Contribution',
        description:
          'A contribution to the PreMiD Presence project, a Discord Rich Presence application that allows users to show what they are doing in Discord. I added a new presence for the website \u2018Stake.us\u2019 to display various information about the user\u2019s gaming activity on the website.',
        tech: ['TypeScript', 'Discord Rich Presence', 'Open Source'],
        githubUrl: 'https://github.com/PreMiD/Presences/pull/8288',
      },
      {
        id: 'drone-dispatch',
        name: 'Drone Dispatch Express Delivery System',
        description:
          'A full-stack application for a drone-based grocery delivery system (CS4400: Introduction to Database Systems) made with Next.js (React) and MySQL. Serves as a comprehensive system that coordinates grocery orders, deliveries, and transactions between customers, stores, and drone pilots utilizing self-implemented API routes and MySQL database.',
        tech: ['Next.js', 'React', 'MySQL', 'REST APIs'],
        featured: true,
      },
      {
        id: 'companion',
        name: 'CompAnIon (Learning Platform POC)',
        description:
          'Interactive personalized web app inspired by LeetCode to train software developers on responsible integration of AI coding assistants. Provides modules, simulations, guidelines, and gamification to understand AI tool capabilities/risks and maintain code quality, security, and ethics when leveraging AI. Made using Next.js (React), TailwindCSS, and Firebase.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'Firebase'],
        demo: { url: 'https://companion-training.vercel.app/', label: 'Demo' },
        featured: true,
      },
      {
        id: 'careers-portal',
        name: 'Company Careers Portal (Paid Client Project)',
        description:
          'A full-stack dynamic careers portal website made with Next.js (React), TailwindCSS, Cloud Firestore, and Firebase Storage for a business allowing for potential candidates to view open positions, learn about company benefits, and apply to jobs through an online form. This project was made for a client, thus, it will remain closed-source.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'Firestore', 'Firebase'],
      },
      {
        id: 'qc-testing',
        name: 'Quality Control Testing (UCLA CS31 Project)',
        description:
          'My implementation of UCLA\u2019s CS31 Winter 2024 Programming Assignment/Project 3. A Quality Control (QC) Testing application written in C++ that validates and analyzes QC test results. The application checks if a QC result string is valid, calculates the total number of tests, passes, defects, and batches, and handles errors appropriately.',
        tech: ['C++'],
        githubUrl:
          'https://github.com/Kevin-Kwan/UCLA-CS31-Project-3-Winter-2024',
      },
      {
        id: 'sales-tax-calculator',
        name: 'Sales Tax Calculator (UCLA CS31 Project)',
        description:
          'My implementation of UCLA\u2019s CS31 Winter 2024 Programming Assignment/Project 2. A Sales Tax Calculator application written in C++ that calculates the total payment for a purchase, including sales tax, based on the state where the purchase is made and the date of the purchase. Includes \u201CError Handling.\u201D',
        tech: ['C++'],
        githubUrl:
          'https://github.com/Kevin-Kwan/UCLA-CS31-Project-2-Winter-2024',
      },
      {
        id: 'fishing-line-physics',
        name: 'Fishing Line Physics Implementation (Unity 3D)',
        description:
          'An unpolished proof-of-concept attempt of implementing the realistic motion, physics, and animation of casting a fishing rod and reeling in a fishing line in Unity 3D using Verlet Physics, Unity\u2019s Line, and other built-in physics elements. Written in C#.',
        tech: ['Unity 3D', 'C#', 'Verlet Physics'],
        githubUrl: 'https://github.com/Kevin-Kwan/Unity3D-FishingRodMotion',
      },
      {
        id: 'dark-ascent',
        name: '\u201CDark Ascent\u201D (3D Platformer Game)',
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
        name: '\u201CEyetracking-Driven Human Computer Interaction\u201D Software',
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
        name: 'Currency Converter (Learning React Project)',
        description:
          'A simple currency converter made with React as a team project. This was one my first React projects, so I learned about components, useState and useEffect, and using external APIs with React. I also deployed our React app to Netlify.',
        tech: ['React', 'JavaScript', 'REST APIs', 'Netlify'],
        githubUrl: 'https://github.com/Kevin-Kwan/currency-converter',
        demo: { url: 'https://moneyconversion.netlify.app/', label: 'Demo' },
      },
      {
        id: 'rps-app',
        name: 'Rock, Paper, Scissors (Learning React Project)',
        description:
          'A simple Rock, Paper, Scissors game made with React as a team project. This was my first React project, so I learned about components, useState and useEffect, and props with React. I also deployed our React app to Netlify.',
        tech: ['React', 'JavaScript', 'Netlify'],
        githubUrl: 'https://github.com/Kevin-Kwan/rps-app',
        demo: { url: 'https://reactrps.netlify.app', label: 'Demo' },
      },
      {
        id: 'project-blu',
        name: '\u201CProject Blu\u201D (2D Unity Game Suite)',
        description:
          'A game suite made for Objects & Design class (CS 2340) during the Summer of 2022 featuring Blackjack, Chess with AI, and a Rouge-like Georgia Tech-themed game. We learned and applied principles of Software Engineering and the best design principles by putting them into practice with this project. Written in C#.',
        tech: ['Unity', 'C#'],
        githubUrl: 'https://github.com/majesityreal/CS2340-Team-7',
        demo: {
          url: 'https://github.com/majesityreal/CS2340-Team-7/releases',
          label: 'Releases',
        },
      },
      {
        id: 'windows-xp-website',
        name: 'Windows XP-themed Website/Socials Page',
        description:
          'A easy-to-customize, static front-end website using HTML, CSS, and JavaScript, to display your socials or portfolio in the form of clickable Windows icons on a Windows XP Desktop theme. Sounds included.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        githubUrl: 'https://github.com/Kevin-Kwan/WindowsXPWebsite/',
        demo: { url: 'https://windows-xp-website.vercel.app/', label: 'Demo' },
      },
      {
        id: 'edunft',
        name: '\u201CeduNFT\u201D (HackGT 8 2021)',
        description:
          'A conceptual front-end website using Webflow serving as an online marketplace for students to upload and create their own NFTs and sell them to others. Created during HackGT 8 2021 as a first-year for NCR\u2019s theme.',
        tech: ['Webflow', 'Hackathon'],
        githubUrl: 'https://github.com/Kevin-Kwan/eduNFT/',
        demo: { url: 'https://edu-nft.vercel.app/', label: 'Demo' },
      },
      {
        id: 'evade-and-deceive',
        name: '\u201CEvade and Deceive\u201D (Unity 3D Online Multiplayer Racing Game)',
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
        name: '\u201CLet\u2019s Surf\u201D (Unity 3D Movement Game)',
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
        name: 'Non-Euclidean Geometry Implementation (Unity 3D)',
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
        name: 'Arkanoid Game (Unity 2D)',
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
        name: 'Facial Recognition with MATLAB',
        description:
          'A machine learning project that I worked on in Summer 2019 during my internship where I used MATLAB to train AlexNet to perform facial recognition in real-time to identify people. This was my first time using MATLAB.',
        tech: ['MATLAB', 'AlexNet', 'Machine Learning'],
        githubUrl: 'https://github.com/Kevin-Kwan/MATLAB-face-training',
      },
      {
        id: 'triggering-insanity',
        name: '\u201CTriggering Insanity\u201D (2D Platformer)',
        description:
          'A difficult, rage-inducing, 2D-platformer video game made using Greenfoot/Java and Object-Oriented Programming and Greenfoot Documentation. Inspiration of the game theme taken from IWBTG and IWBTB. This was my first introduction to Video Game Development.',
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
        name: 'My Personal LeetCode Solutions',
        description:
          'All of my own solutions to LeetCode\u2019s Coding Practice Problems in different coding languages. I\u2019m still learning and filling up this repository in order to share my knowledge and ideas with other aspiring programmers. There are always more innovative solutions to be found.',
        tech: ['Algorithms', 'Data Structures'],
        githubUrl: 'https://github.com/Kevin-Kwan/leetcode',
        demo: { url: 'https://leetcode.com/kevinkwan/', label: 'Profile' },
      },
      {
        id: 'hackerrank',
        name: 'My Personal HackerRank Solutions',
        description:
          'All of my own solutions to HackerRanks\u2019s Coding Practice Problems in different coding languages. I\u2019m still learning and filling up this repository in order to share my knowledge and ideas with other aspiring programmers. There are always more innovative solutions to be found.',
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
