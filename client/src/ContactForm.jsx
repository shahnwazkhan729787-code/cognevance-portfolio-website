import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empty = { name: "", email: "", subject: "", message: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus({ type: "loading", text: "Sending..." });
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || {});
        throw new Error(data.message || "Check the highlighted fields.");
      }
      setValues(empty);
      setStatus({ type: "success", text: data.message });
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Network error. Try again." });
    }
  }

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {props.area ? (
        <textarea id={name} name={name} rows="5" value={values[name]} onChange={onChange} aria-invalid={!!errors[name]} />
      ) : (
        <input id={name} name={name} type={props.type || "text"} value={values[name]} onChange={onChange} aria-invalid={!!errors[name]} />
      )}
      {errors[name] && <p className="field-error">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="row">
        {field("name", "Name")}
        {field("email", "Email", { type: "email" })}
      </div>
      {field("subject", "Subject (optional)")}
      {field("message", "Message", { area: true })}
      <button className="btn" type="submit" disabled={status.type === "loading"}>
        {status.type === "loading" ? "Sending..." : "Send message"}
      </button>
      <p className={`status ${status.type}`} role="status">{status.text}</p>
    </form>
  );
}
