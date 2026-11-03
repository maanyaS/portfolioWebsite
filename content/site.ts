// All of the site's words and links live here. Edit this file to update the site.

export const profile = {
  name: "Maanya Shukla",
  shortName: "Maanya S.",
  location: "New Brunswick, NJ",
  github: "https://github.com/maanyaS",
  githubLabel: "github.com/maanyaS",
  linkedin: "https://www.linkedin.com/in/maanya-shukla",
};

export type Media =
  | { kind: "youtube"; id: string; title: string }
  | { kind: "drive"; id: string; title: string }
  | { kind: "image"; src: string; alt: string; width: number; height: number };

export type Project = {
  name: string;
  badge?: string;
  date: string;
  question: string;
  summary: string;
  focus: string;
  points: string[];
  stats: { value: string; label: string }[];
  stack: string[];
  live?: string;
  media: Media;
};

export const projects: Project[] = [
  {
    name: "Before The Build",
    badge: "HackRU",
    date: "October 2026",
    question: "What should you know before breaking ground?",
    summary:
      "Drop a pin and get one report on the environmental, regulatory, resource, and climate risks of siting a data center there.",
    focus: "Geospatial screening · AI briefs with sources",
    points: [
      "Automated site screening across 21 geospatial layers and 16 permit rules with a parallel, cached FastAPI pipeline.",
      "Built a validator with retry and template fallback so every bullet in a Gemini brief cites a source.",
      "Mapped about 1,700 data centers in React and MapLibre by merging FracTracker, New Jersey, and NYISO grid queue data.",
    ],
    stats: [
      { value: "21", label: "geospatial layers" },
      { value: "16", label: "permit rules" },
      { value: "12+", label: "public data sources" },
    ],
    stack: ["Python", "FastAPI", "Shapely", "MapLibre GL", "Turso", "ElevenLabs"],
    live: "https://www.beforethebuild.tech/",
    media: { kind: "youtube", id: "OmvwJyG3Tto", title: "Before The Build demo" },
  },
  {
    name: "SmartHome Energy IQ",
    badge: "AI4ALL",
    date: "May – August 2026",
    question: "Where is the power actually going?",
    summary:
      "An energy platform that forecasts appliance use, flags abnormal consumption, and estimates cost and CO₂ savings before you change your habits.",
    focus: "Time-series forecasting · Anomaly detection",
    points: [
      "Forecasted appliance energy use from about 4.5 months of 10-minute sensor data with an LSTM model.",
      "Flagged abnormal consumption with an Isolation Forest pipeline over environmental and appliance data.",
      "Shipped forecasting, anomaly detection, and what-if simulation in one end-to-end FastAPI platform.",
    ],
    stats: [
      { value: "57%", label: "lower test error than a Random Forest" },
      { value: "592", label: "anomalies flagged" },
      { value: "5.4x", label: "normal usage in those anomalies" },
    ],
    stack: ["Python", "TensorFlow/Keras", "LSTM", "Isolation Forest", "FastAPI"],
    live: "https://smarthome-energy-iq-production.up.railway.app/",
    media: {
      kind: "image",
      src: "/projects/smarthome.png",
      alt: "SmartHome Energy IQ dashboard showing live usage and an appliance breakdown",
      width: 842,
      height: 692,
    },
  },
  {
    name: "CarpoolAI",
    badge: "1st Place, UHACCS",
    date: "February 2026",
    question: "Who else is heading your way?",
    summary:
      "A carpool platform that matches people by route and departure time to cut redundant vehicle trips.",
    focus: "Route matching · Geospatial mapping",
    points: [
      "Won 1st place with a 4-person team.",
      "Geocoded origins and destinations and drew routes with the Photon API, OpenStreetMap, and Leaflet.js.",
      "Built matching logic that compares route similarity and departure time across users.",
    ],
    stats: [
      { value: "25 kg", label: "CO₂ saved (estimated)" },
      { value: "10", label: "completed trips" },
      { value: "20", label: "pilot users" },
    ],
    stack: ["JavaScript", "Python", "Photon API", "OpenStreetMap", "Leaflet.js"],
    live: "https://carpoolai-podf.onrender.com/dashboard",
    media: {
      kind: "image",
      src: "/projects/carpoolai.svg",
      alt: "Illustration of two separate routes merging into one shared route",
      width: 960,
      height: 540,
    },
  },
  {
    name: "Korean Color Analysis",
    badge: "RUMAD Incubator",
    date: "January – May 2026",
    question: "Which colors are actually yours?",
    summary:
      "Real-time personal color analysis that classifies your season from a photo and recommends clothing and jewelry to match.",
    focus: "Client-side image processing · Recommendations",
    points: [
      "Built a responsive Next.js and React 19 frontend in a 4-person team.",
      "Automated seasonal classification across skin, hair, and eyes with a client-side pipeline using MediaPipe face detection.",
      "Developed a serverless eBay Browse API integration, caching results and OAuth tokens to reduce repeat calls.",
    ],
    stats: [
      { value: "6", label: "photo-quality checks" },
      { value: "Up to 30", label: "personalized recommendations" },
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Supabase", "MediaPipe"],
    media: { kind: "youtube", id: "Ut4l-umxPW4", title: "Korean Color Analysis demo" },
  },
  {
    name: "SignSprites",
    date: "February 2026",
    question: "Can you learn the ASL alphabet by playing?",
    summary:
      "A browser game that teaches the 26-letter ASL alphabet. Correct webcam signs unlock obstacles.",
    focus: "Hand tracking · AI coaching",
    points: [
      "Built 26 custom fingerpose gestures on top of MediaPipe hand tracking.",
      "Reduced false matches from single-frame misreads by majority-voting recent predictions, at up to 5 classifications per second.",
      "Delivered an Express and Gemini API service that coaches finger placement after 2 failed attempts.",
    ],
    stats: [
      { value: "84%", label: "recognition accuracy" },
      { value: "650", label: "test attempts" },
      { value: "5", label: "signers" },
    ],
    stack: ["React", "TypeScript", "MediaPipe", "fingerpose", "Node.js", "Express", "Firebase", "Gemini API"],
    media: { kind: "youtube", id: "VKI4-yTQg3w", title: "SignSprites demo" },
  },
  {
    name: "Seizure Detector",
    date: "April 2026",
    question: "How low can the cost of a seizure alert go?",
    summary:
      "A Raspberry Pi prototype that detects seizure-like motion and escalates an alert, for about $50 in hardware.",
    focus: "Signal processing · Embedded hardware",
    points: [
      "Detected seizure-like motion in the 3–6 Hz range by running MPU6050 accelerometer data through an FFT-based Python pipeline.",
      "Enabled real-time detection and 60-second alert escalation with an LED, a buzzer, and Flask dashboard notifications.",
      "Cut prototype hardware cost by about 80–98% against $250–$2,000 commercial devices.",
    ],
    stats: [
      { value: "3–6 Hz", label: "detection range" },
      { value: "60 s", label: "alert escalation" },
      { value: "~$50", label: "prototype hardware" },
    ],
    stack: ["Raspberry Pi", "MPU6050", "Python", "Flask", "SciPy", "NumPy"],
    media: { kind: "youtube", id: "XK3CNI_y-mU", title: "Seizure Detector demo" },
  },
];

export type Role = {
  org: string;
  title: string;
  dates?: string;
  summary: string;
  points: string[];
  tags: string[];
};

export const leadership: Role[] = [
  {
    org: "USACS",
    title: "Outreach Chair",
    dates: "June 2026 – Present",
    summary: "Corporate partnerships and events for the Rutgers Undergraduate Student Alliance of Computer Scientists.",
    points: [
      "Establish corporate partnerships for 300+ club members, leading outreach with Microsoft, Bloomberg, and JPMorgan Chase.",
      "Secured $650 in company sponsorships, coordinating contracts, room bookings, logistics, and partner communications.",
      "Organize recruiting, technical, and networking programs, driving 80+ attendance at each event.",
    ],
    tags: ["Partnerships", "Sponsorships", "Event planning"],
  },
  {
    org: "IBM Z",
    title: "Student Ambassador",
    summary: "I represent IBM Z and mainframe technology on campus, with a focus on raising awareness among my peers.",
    points: [
      "Earned the IBM Z Concepts badge in mainframe technology.",
      "Organize and lead events such as company tours, hackathons, and workshops.",
      "Promote the Z Xplore platform, signing up fellow students and encouraging them to take part.",
      "Share my experiences and the benefits of IBM Z on social media.",
    ],
    tags: ["Mainframes", "Campus outreach", "Workshops"],
  },
  {
    org: "Honors Peer Mentor Program",
    title: "E-Board Member",
    summary: "One of a 20-member E-Board supporting a 700+ student peer mentorship program.",
    points: [
      "Support matching 350+ first-year mentees with 377 upperclassmen mentors by academic interests, majors, extracurriculars, and personal goals.",
      "Coordinate matching with application data organized in Google Sheets, weighing multiple compatibility factors.",
      "Organize an alumni panel on college and post-graduate life, plus a Resume & LinkedIn Workshop.",
      "Mentor first-year students on academics, research, campus involvement, course selection, and professional development.",
    ],
    tags: ["Mentorship", "Matching", "Community"],
  },
  {
    org: "SheTek Rutgers",
    title: "Web Developer & Social Media Committee Member",
    summary: "Leading web development and UI/UX design with a 2-person team for the chapter's new digital presence.",
    points: [
      "Designed a responsive 6-page site from scratch in Figma across desktop, tablet, and mobile.",
      "Built an interactive events experience in TypeScript with keyword and date filtering, chronological sorting, and expandable details.",
      "Replaced a manually built calendar with an embedded Google Calendar, reducing complexity and keeping events up to date.",
      "Created one place for students to find chapter information, events, leadership, and opportunities for women in technology.",
    ],
    tags: ["Web development", "UI/UX", "Figma"],
  },
];

export const experience = [
  {
    title: "AI4ALL Fellow",
    project: "SmartHome Energy IQ",
    dates: "May – August 2026",
    summary: "Built an end-to-end ML platform for energy forecasting, anomaly detection, and what-if simulation.",
  },
  {
    title: "RUMAD Incubator Fellow",
    project: "Korean Color Analysis App",
    dates: "January – May 2026",
    summary: "Built the frontend and image pipeline for a real-time color analysis app in a 4-person team.",
  },
];

export const education = {
  school: "Rutgers, The State University of New Jersey",
  college: "The Honors College · Douglass Residential College",
  degree: "B.S. in Computer Engineering",
  graduation: "Expected May 2029",
  gpa: "3.83",
  awards: ["Dean's Scholarship", "Dean's List"],
  certifications: [
    "CodePath AI Engineering Certificate",
    "CodePath Web Development Certificate",
    "IBM - Build Your Own ChatBot Certificate",
  ],
};

export const skills = ["Java", "Python", "JavaScript", "Swift", "HTML", "CSS", "React"];

export const performances = [
  { instrument: "Double bass", id: "Vc5VMUEZNSo", title: "Double bass performance" },
  { instrument: "Piano", id: "LyDcJ4sIb_A", title: "Piano performance" },
];
