import { useState } from "react";
import { profile, skills, projects } from "./data.js";
import ContactForm from "./ContactForm.jsx";

const links = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

export default function App() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="nav">
        <a className="brand" href="#top" onClick={close}>{profile.name}</a>
        <button className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <nav id="menu" className={open ? "open" : ""}>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={close}>{label}</a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="hero-role">{profile.role}</p>
          <h1 className="hero-name">
            <span>Hi, I'm</span>
            <span>{profile.name}.</span>
          </h1>
          <p className="hero-tag">{profile.tagline}</p>
          <div className="hero-cta">
            <a className="btn" href="#projects">See my projects</a>
            <a className="btn ghost" href="#contact">Get in touch</a>
          </div>
        </section>

        <section id="about" className="section">
          <h2>About</h2>
          <div className="prose">
            {profile.about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

        <section id="skills" className="section">
          <h2>Skills</h2>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <h3>{s.group}</h3>
                <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>
          <ol className="projects">
            {projects.map((p) => (
              <li key={p.title}>
                <div className="p-head">
                  <h3>{p.title}</h3>
                  <span className="p-year">{p.year}</span>
                </div>
                <p>{p.text}</p>
                <p className="p-stack">{p.stack.join(", ")}</p>
                <div className="p-links">
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live site</a>}
                  {p.code && <a href={p.code} target="_blank" rel="noreferrer">Source code</a>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <div className="contact-grid">
            <div className="prose">
              <p>Have a project, an internship or a question? Send a message and I'll reply by email.</p>
              <p>
                <a href={`mailto:${profile.email}`}>{profile.email}</a><br />
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>{" "}
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">&copy; {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
