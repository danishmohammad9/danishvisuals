import gsap from "gsap";
import { smoother } from "../Navbar";

function splitElementText(selector: string): HTMLElement[] {
  const elements = document.querySelectorAll(selector);
  const chars: HTMLElement[] = [];
  
  elements.forEach((el) => {
    const text = el.textContent || "";
    el.innerHTML = text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `<span class="split-char" style="display: inline-block; opacity: 0; transform: translateY(80px); filter: blur(5px);">${char}</span>`;
      })
      .join("");
    
    el.querySelectorAll(".split-char").forEach((charEl) => {
      chars.push(charEl as HTMLElement);
    });
  });
  
  return chars;
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (smoother && smoother.paused) {
    smoother.paused(false);
  }
  
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const chars1 = [
    ...splitElementText(".landing-info h3"),
    ...splitElementText(".landing-intro h2"),
    ...splitElementText(".landing-intro h1"),
  ];

  gsap.to(chars1, {
    opacity: 1,
    duration: 1.2,
    filter: "blur(0px)",
    ease: "power3.out",
    y: 0,
    stagger: 0.025,
    delay: 0.3,
  });

  const chars2 = splitElementText(".landing-h2-info");
  
  gsap.to(chars2, {
    opacity: 1,
    duration: 1.2,
    filter: "blur(0px)",
    ease: "power3.out",
    y: 0,
    stagger: 0.025,
    delay: 0.3,
  });

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const chars3 = splitElementText(".landing-h2-info-1");
  const chars4 = splitElementText(".landing-h2-1");
  const chars5 = splitElementText(".landing-h2-2");

  LoopText(chars2, chars3);
  LoopText(chars4, chars5);
}

function LoopText(chars1: HTMLElement[], chars2: HTMLElement[]) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    chars2,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      chars1,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      chars1,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      chars2,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
