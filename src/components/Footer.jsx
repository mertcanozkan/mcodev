import { Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./icons";
import { scrollToHash } from "@/lib/utils";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
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
  { icon: TwitterIcon, href: "https://x.com/MCODevUK", label: "X / Twitter" },
];

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    scrollToHash(href);
  };

  return (
    <footer
      className="relative border-t border-border/50 bg-surface/30 px-6 py-16"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a
              href="#hero"
              onClick={(e) => scrollTo(e, "#hero")}
              aria-label="MCODev — back to top"
              className="font-display text-xl font-bold tracking-wide text-text-primary"
            >
              MCO<span className="text-accent">Dev</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              Front end developer crafting beautiful, high-performance web
              experiences from London.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
              Connect
            </h3>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-xl border border-border p-2.5 text-text-muted transition-all duration-300 hover:border-accent/40 hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-border/30 pt-8 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} MCODev. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed & built with <Heart size={12} className="text-accent" aria-hidden="true" /> in
            London.
          </p>
        </div>
      </div>
    </footer>
  );
}
