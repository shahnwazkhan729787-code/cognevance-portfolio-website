const express = require("express");
const Message = require("../models/Message");

const router = express.Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact - save a message from the contact form
router.post("/", async (req, res) => {
  const { name = "", email = "", subject = "", message = "" } = req.body || {};
  const errors = {};

  if (name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!EMAIL_RE.test(email.trim())) errors.email = "Enter a valid email address.";
  if (message.trim().length < 10) errors.message = "Message must be at least 10 characters.";

  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  try {
    await Message.create({ name, email, subject, message });
    res.status(201).json({ ok: true, message: "Message sent. I'll reply soon." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Could not save your message. Try again later." });
  }
});

// GET /api/contact - list messages (owner only, needs x-admin-key header)
router.get("/", async (req, res) => {
  if (!process.env.ADMIN_KEY || req.get("x-admin-key") !== process.env.ADMIN_KEY) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }
  const messages = await Message.find().sort({ createdAt: -1 }).limit(200);
  res.json({ ok: true, count: messages.length, messages });
});

module.exports = router;
