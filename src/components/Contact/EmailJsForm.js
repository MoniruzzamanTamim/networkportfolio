import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const EmailjsForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-time Network / NOC Job", // Default Option
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setLoading(false);
          setSubmitted(true);
          setFormData({
            name: "",
            email: "",
            subject: "Full-time Network / NOC Job",
            message: ""
          });
          setTimeout(() => setSubmitted(false), 5000);
        },
        (error) => {
          setLoading(false);
          alert("Failed to send message, please try again.");
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-form-column">
      <div className="contact-card">
        <form ref={form} className="contact-form" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="user_name">Full Name</label>
            <input
              className="form-input"
              type="text"
              id="user_name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="user_email">Email Address</label>
            <input
              className="form-input"
              type="email"
              id="user_email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          {/* Subject Dropdown */}
          <div className="form-group">
            <label className="form-label" htmlFor="user_subject">Subject / Purpose</label>
            <select
              className="form-select"
              id="user_subject"
              name="subject" // EmailJS Template-এ {{subject}} হিসেবে ব্যবহার করতে পারবেন
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="Full-time Network / NOC Job">Hiring For Company (Full-time)</option>
              <option value="Freelance Network Project">Freelancing / Contractual Work</option>
              <option value="Network Infrastructure & Security Audit">Network Consultancy & Audit</option>
              <option value="MikroTik & VPN Setup Help">MikroTik & VPN Configuration</option>
              <option value="Linux & Server Administration">Linux & Server Support</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          {/* Message */}
          <div className="form-group">
            <label className="form-label" htmlFor="user_message">Your Message</label>
            <textarea
              className="form-textarea"
              id="user_message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="How can I help you?"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${submitted ? "success" : ""}`}
          >
            <span className="submit-text">
              {loading
                ? "Sending..."
                : submitted
                ? "Message Sent Successfully"
                : "Send Message"}
            </span>

            {!submitted && !loading && (
              <svg className="submit-icon" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailjsForm;