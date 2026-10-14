export const profile = {
  name: "Your Name",
  role: "Full stack web developer",
  tagline: "I build fast, accessible web apps, from the database to the button you click.",
  email: "you@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  about: [
    "I'm a developer who enjoys turning rough ideas into working products. I work across React interfaces, Node.js APIs and MongoDB data models.",
    "I care about clean code, readable commits and interfaces that work on a phone as well as on a desktop. Right now I'm completing industry projects to sharpen my full stack skills.",
  ],
};

export const skills = [
  { group: "Frontend", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Responsive design"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "JWT authentication"] },
  { group: "Data", items: ["MongoDB", "Mongoose", "SQL basics"] },
  { group: "Tools", items: ["Git and GitHub", "Postman", "Vercel", "Render"] },
];

export const projects = [
  {
    title: "Online Course Management System",
    year: "In progress",
    text: "Students enrol in courses and track progress. Admins manage content. Includes auth, search and filters.",
    stack: ["React", "Express", "MongoDB"],
    live: "",
    code: "https://github.com/your-username/cognevance_course-management",
  },
  {
    title: "Enterprise E-Commerce Platform",
    year: "Planned",
    text: "Products, orders, payments and an analytics dashboard with role-based access.",
    stack: ["React", "Node.js", "Stripe", "Cloud storage"],
    live: "",
    code: "https://github.com/your-username/cognevance_ecommerce-platform",
  },
  {
    title: "Responsive Portfolio Website",
    year: "2026",
    text: "This site. A React frontend with a Node API that stores contact messages in MongoDB.",
    stack: ["React", "Express", "MongoDB"],
    live: "",
    code: "https://github.com/your-username/cognevance_portfolio-website",
  },
];
