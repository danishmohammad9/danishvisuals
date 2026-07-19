import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import { gsap } from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current!;
    
    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    let hover = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hover) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Event delegation for mouseover/mouseout to handle dynamic mounts cleanly
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement;
      if (!target) return;

      const rect = target.getBoundingClientRect();

      if (target.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        hover = true;
        gsap.to(cursor, {
          x: rect.left,
          y: rect.top,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto"
        });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
      }
      if (target.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      // Find if we are moving to a target inside the same data-cursor element
      const related = e.relatedTarget as HTMLElement;
      const currentTarget = (e.target as HTMLElement).closest("[data-cursor]");
      const newTarget = related ? related.closest("[data-cursor]") : null;

      if (currentTarget && currentTarget === newTarget) {
        return; // Still inside the same element, ignore
      }

      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
