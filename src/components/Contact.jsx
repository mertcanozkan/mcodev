import { useState } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./icons";

const CONTACT_WEBHOOK_URL = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL || "";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email.";
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^[\d\s+\-()]{7,20}$/.test(form.phone.trim())) {
      errs.phone = "Please enter a valid phone number.";
    }
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    setSendError(false);

    try {
      const res = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 lg:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="animate-fade-up font-display text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            Let's Build Something{" "}
            <span className="text-gradient">Remarkable</span>
          </h2>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-text-secondary">
            Have a project in mind, a question, or just want to connect? Drop me
            a message and I'll get back to you promptly.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Info column */}
          <div className="animate-fade-up space-y-8 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-accent/10 p-3 text-accent">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary">Email</h3>
                <a
                  href="mailto:hello@mcodev.co.uk"
                  className="text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  hello@mcodev.co.uk
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-accent/10 p-3 text-accent">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary">
                  Location
                </h3>
                <p className="text-sm text-text-secondary">
                  London, United Kingdom
                </p>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
                Connect
              </h3>
              <div className="flex gap-3">
                {[
                  {
                    icon: GithubIcon,
                    href: "https://github.com/mertcanozkan",
                    label: "GitHub",
                  },
                  {
                    icon: LinkedinIcon,
                    href: "https://www.linkedin.com/in/mcodev/",
                    label: "LinkedIn",
                  },
                  {
                    icon: TwitterIcon,
                    href: "https://x.com/MCODevUK",
                    label: "X / Twitter",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-xl border border-border p-3 text-text-muted transition-all duration-300 hover:border-accent/40 hover:text-accent"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="animate-fade-up glass-light space-y-5 rounded-2xl p-8 lg:col-span-3"
          >
            {submitted && (
              <div
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm text-emerald-400"
                role="status"
              >
                Message sent successfully! Check your inbox for a confirmation
                email.
              </div>
            )}
            {sendError && (
              <div
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-400"
                role="alert"
              >
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-text-secondary"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent/60 ${
                  errors.name ? "border-red-500/60" : "border-border"
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-text-secondary"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent/60 ${
                  errors.email ? "border-red-500/60" : "border-border"
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-text-secondary"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+44 7700 900000"
                className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent/60 ${
                  errors.phone ? "border-red-500/60" : "border-border"
                }`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-xs text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-text-secondary"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className={`w-full resize-none rounded-xl border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent/60 ${
                  errors.message ? "border-red-500/60" : "border-border"
                }`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-midnight transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send Message"}
              <Send
                size={16}
                className={`transition-transform duration-300 ${sending ? "animate-pulse" : "group-hover:translate-x-1"}`}
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
