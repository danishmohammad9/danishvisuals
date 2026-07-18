import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

// Sirf standard open-source ScrollTrigger ko register karenge
gsap.registerPlugin(ScrollTrigger);

// Is export ko dummy object bana rahe hain taaki baaki files crash na hon (jaise initialFX.ts)
export let smoother: any = {
  scrollTop: () => 0,
  paused: () => false,
  scrollTo: (section: string) => {
    const el = document.querySelector(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  useEffect(() => {
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let elem = e.currentTarget as HTMLAnchorElement;
        let section = elem.getAttribute("data-href");
        if (section) {
          const targetSection = document.querySelector(section);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          DANISH VISUALS
        </a>
        <a
          href="mailto:work.danishvisuals@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          work.danishvisuals@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;