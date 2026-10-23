// Course data stored as JavaScript objects (JSON-style)
const COURSES = [
  {
    id: 1, title: "HTML5 Fundamentals", category: "Web Development", level: "Beginner",
    instructor: "Aarav Sharma", duration: "4 weeks", icon: "🌐",
    description: "Learn semantic HTML5, forms, media and accessibility to build solid web page structures.",
    lessons: ["Intro to HTML", "Text & Links", "Images & Media", "Forms", "Semantic Layout", "Accessibility"]
  },
  {
    id: 2, title: "CSS3 & Responsive Design", category: "Web Development", level: "Beginner",
    instructor: "Priya Verma", duration: "5 weeks", icon: "🎨",
    description: "Master selectors, Flexbox, Grid and media queries to build layouts that work on every screen.",
    lessons: ["Selectors & Box Model", "Flexbox", "CSS Grid", "Media Queries", "Animations", "Mobile-First Design"]
  },
  {
    id: 3, title: "JavaScript Essentials", category: "Programming", level: "Intermediate",
    instructor: "Rohan Gupta", duration: "6 weeks", icon: "⚡",
    description: "Variables, functions, arrays, objects, DOM manipulation and events with hands-on practice.",
    lessons: ["Variables & Types", "Functions", "Arrays & Objects", "DOM Manipulation", "Events", "ES6 Features"]
  },
  {
    id: 4, title: "Git & GitHub Basics", category: "Tools", level: "Beginner",
    instructor: "Neha Singh", duration: "2 weeks", icon: "🔧",
    description: "Version control from scratch: commits, branches, merging, pull requests and collaboration.",
    lessons: ["What is Git", "Commits", "Branches", "Merging", "GitHub & Pull Requests"]
  },
  {
    id: 5, title: "Working with JSON & APIs", category: "Programming", level: "Intermediate",
    instructor: "Karan Mehta", duration: "3 weeks", icon: "🔗",
    description: "Understand JSON, fetch data from APIs and render it dynamically in your web apps.",
    lessons: ["JSON Basics", "Fetch API", "Async/Await", "Error Handling", "Rendering API Data"]
  },
  {
    id: 6, title: "LocalStorage & Browser Storage", category: "Web Development", level: "Intermediate",
    instructor: "Aarav Sharma", duration: "2 weeks", icon: "💾",
    description: "Persist app data in the browser using LocalStorage and SessionStorage the right way.",
    lessons: ["Storage Overview", "LocalStorage CRUD", "Storing Objects", "SessionStorage", "Best Practices"]
  },
  {
    id: 7, title: "UI/UX Design Principles", category: "Design", level: "Beginner",
    instructor: "Simran Kaur", duration: "4 weeks", icon: "✏️",
    description: "Colour, typography, spacing and user-centred thinking to design interfaces people enjoy.",
    lessons: ["Design Basics", "Colour Theory", "Typography", "Layout & Spacing", "Wireframing", "Usability Testing"]
  },
  {
    id: 8, title: "Python for Beginners", category: "Programming", level: "Beginner",
    instructor: "Vikram Joshi", duration: "6 weeks", icon: "🐍",
    description: "Start programming with Python: syntax, loops, functions, files and small projects.",
    lessons: ["Setup & Syntax", "Loops & Conditions", "Functions", "Lists & Dicts", "File Handling", "Mini Project"]
  },
  {
    id: 9, title: "Advanced JavaScript Patterns", category: "Programming", level: "Advanced",
    instructor: "Rohan Gupta", duration: "5 weeks", icon: "🚀",
    description: "Closures, modules, prototypes, reusable components and clean application architecture.",
    lessons: ["Closures", "Modules", "Prototypes & Classes", "Reusable Components", "State Management"]
  },
  {
    id: 10, title: "Figma for Web Designers", category: "Design", level: "Intermediate",
    instructor: "Simran Kaur", duration: "3 weeks", icon: "🖌️",
    description: "Create prototypes and design systems in Figma and hand off cleanly to developers.",
    lessons: ["Figma Interface", "Components", "Auto Layout", "Prototyping", "Handoff"]
  }
];
