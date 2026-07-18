import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  originalText?: string;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  // 1. Paragraphs ke liye custom word splitter (Free Version)
  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    
    // Purani animation clean karo
    if (para.anim) para.anim.progress(1).kill();
    
    // Original text backup rakho taaki rerender par text multiply na ho
    if (!para.originalText) para.originalText = para.innerText;
    
    // Text ko words mein split karke span tags lagao
    para.innerHTML = para.originalText
      .split(" ")
      .map(word => `<span class="split-word" style="display: inline-block; white-space: nowrap;">${word}</span>`)
      .join(" ");

    const words = para.querySelectorAll(".split-word");

    para.anim = gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  // 2. Titles ke liye custom character splitter (Free Version)
  titles.forEach((title: ParaElement) => {
    if (title.anim) title.anim.progress(1).kill();
    if (!title.originalText) title.originalText = title.innerText;

    // Text ko individual letters/characters mein split karke span tags lagao
    title.innerHTML = title.originalText
      .split("")
      .map(char => {
        if (char === " ") return " ";
        return `<span class="split-char" style="display: inline-block;">${char}</span>`;
      })
      .join("");

    const chars = title.querySelectorAll(".split-char");

    title.anim = gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });
}