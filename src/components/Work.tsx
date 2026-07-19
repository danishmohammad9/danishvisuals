import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Cinematic Minimal Short / Reel",
    category: "Vertical Narrative & Pacing",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    videoUrl: "https://www.youtube.com/embed/WvHX83zdw0M?autoplay=0&controls=1"
  },
  {
    title: "Cinematic Video Production",
    category: "Pacing & Visual Aesthetics",
    tools: "Adobe Premiere Pro",
    videoUrl: "https://www.youtube.com/embed/HJoRHg1fC6Y?autoplay=0&controls=1"
  },
  {
    title: "Cinematic Brand Film",
    category: "Advanced Composition & Pacing",
    tools: "Adobe Premiere Pro",
    videoUrl: "https://www.youtube.com/embed/WKpHTQXTTjM?autoplay=0&controls=1"
  },
  {
    title: "Minimal Explainer Animation",
    category: "Motion Graphics & Kinetic Structure",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    videoUrl: "https://www.youtube.com/embed/wnEgaxXfBu4?autoplay=0&controls=1"
  },
  {
    title: "2D Explainer Motion Graphics",
    category: "Minimal Layouts & Kinetic Typography",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    videoUrl: "https://www.youtube.com/embed/CQVuYEeB5F4?autoplay=0&controls=1"
  },
  {
    title: "Minimal Motion Graphics",
    category: "Kinetic Shapes & Smooth Pacing",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    videoUrl: "https://www.youtube.com/embed/OvQ055cBm1s?autoplay=0&controls=1"
  },
  {
    title: "Minimal Text Animation",
    category: "Kinetic Typography & Pacing",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    videoUrl: "https://www.youtube.com/embed/Zzu-S6aDOpI?autoplay=0&controls=1"
  },
  {
    title: "Abstract Motion Graphics",
    category: "Vector Shapes & Clean Layouts",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    videoUrl: "https://www.youtube.com/embed/V7lm4i-VUUA?autoplay=0&controls=1"
  }
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const container = document.querySelector(".work-container");
      if (!box[0] || !container) return;

      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: 1,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const projectNumber = String(index + 1).padStart(2, "0");

            return (
              <div className="work-box" key={index}>
                <div className="flex flex-col justify-start h-full w-full max-w-[320px] mx-auto pb-4 shrink-0">
                  {/* Even Layout: Text at the Top */}
                  {isEven && (
                    <div className="flex flex-col mb-3">
                      <span className="text-4xl font-bold">{projectNumber}</span>
                      <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                      <p className="text-sm text-gray-400">{project.category}</p>
                      <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                    </div>
                  )}

                  {/* Responsive Iframe Container */}
                  <div className="aspect-[9/16] w-full max-h-[46vh] rounded-xl overflow-hidden relative border border-gray-800 bg-black shrink-0 mb-3">
                    <iframe
                      src={project.videoUrl}
                      className="absolute w-full h-full border-0 rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title={project.title}
                    />
                  </div>

                  {/* Odd Layout: Text at the Bottom */}
                  {!isEven && (
                    <div className="flex flex-col">
                      <span className="text-4xl font-bold">{projectNumber}</span>
                      <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                      <p className="text-sm text-gray-400">{project.category}</p>
                      <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
