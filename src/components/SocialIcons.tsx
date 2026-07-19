import { useEffect, useRef, useState } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";

interface SocialIconLinkProps {
  href: string;
  children: React.ReactNode;
}

const SocialIconLink = ({ href, children }: SocialIconLinkProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only run floating animation and mouse tracking on desktop (>1024px)
    if (typeof window === "undefined" || window.innerWidth <= 1024) {
      return;
    }

    const container = containerRef.current;
    const link = linkRef.current;
    const glow = glowRef.current;
    if (!container || !link || !glow) return;

    let mouseX = 25; // center coordinates for 50x50 span
    let mouseY = 25;
    let currentX = 25;
    let currentY = 25;
    let animationFrameId: number;

    const updatePosition = () => {
      // Lerp for smooth floating effect
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      link.style.left = `${currentX}px`;
      link.style.top = `${currentY}px`;

      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Restrict mouse tracking to safe area to prevent offsets
      mouseX = Math.max(5, Math.min(rect.width - 5, x));
      mouseY = Math.max(5, Math.min(rect.height - 5, y));
    };

    const onMouseEnter = () => {
      setIsHovered(true);
    };

    const onMouseLeave = () => {
      setIsHovered(false);
      // Return to center
      mouseX = 25;
      mouseY = 25;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    updatePosition();

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <span ref={containerRef} data-cursor="icons">
      <div ref={glowRef} className={`social-icon-glow ${isHovered ? "active" : ""}`} />
      <a
        ref={linkRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </span>
  );
};

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" id="social">
        <SocialIconLink href="https://www.linkedin.com/in/mohammaddanishofficial?utm_source=share_via&utm_content=profile&utm_medium=member_ios">
          <FaLinkedinIn />
        </SocialIconLink>
        <SocialIconLink href="https://x.com/danishvisuals_?s=11">
          <FaXTwitter />
        </SocialIconLink>
        <SocialIconLink href="https://www.instagram.com/danishk.han">
          <FaInstagram />
        </SocialIconLink>
      </div>
    </div>
  );
};

export default SocialIcons;
