import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Cinematic Minimal Short / Reel",
    category: "Vertical Narrative & Pacing",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    image: "/images/placeholder.webp"
  },
  {
    title: "Cinematic Video Production",
    category: "Pacing & Visual Aesthetics",
    tools: "Adobe Premiere Pro",
    image: "/images/placeholder.webp"
  },
  {
    title: "Cinematic Brand Film",
    category: "Advanced Composition & Pacing",
    tools: "Adobe Premiere Pro",
    image: "/images/placeholder.webp"
  },
  {
    title: "Minimal Explainer Animation",
    category: "Motion Graphics & Kinetic Structure",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    image: "/images/placeholder.webp"
  },
  {
    title: "2D Explainer Motion Graphics",
    category: "Minimal Layouts & Kinetic Typography",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    image: "/images/placeholder.webp"
  },
  {
    title: "Minimal Motion Graphics",
    category: "Kinetic Shapes & Smooth Pacing",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    image: "/images/placeholder.webp"
  },
  {
    title: "Minimal Text Animation",
    category: "Kinetic Typography & Pacing",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    image: "/images/placeholder.webp"
  },
  {
    title: "Abstract Motion Graphics",
    category: "Vector Shapes & Clean Layouts",
    tools: "Adobe Premiere Pro, Adobe After Effects",
    image: "/images/placeholder.webp"
  }
];

const Work = () => {
  useGSAP(() => {
    if (window.innerWidth <= 1024) return;
    let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
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

  // Clean up (optional, good practice)
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
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              {index === 0 ? (
                <div className="flex flex-col justify-start gap-3 h-full w-full max-w-[320px] mx-auto pb-6">
                  <div>
                    <span className="text-4xl font-bold">01</span>
                    <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                    <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                  </div>
                  
                  <div className="aspect-[9/16] w-full max-h-[48vh] rounded-xl overflow-hidden relative border border-gray-800 bg-black mt-2 shrink-0">
                    <iframe
                      src="https://www.youtube.com/embed/WvHX83zdw0M?autoplay=0&controls=1"
                      className="absolute w-full border-0 rounded-xl"
                      style={{ height: '115%', top: '-7.5%', left: '0' }}
                      title={project.title}
                    />
                  </div>
                </div>
              ) : index === 1 ? (
                <div className="flex flex-col justify-start h-full w-full max-w-[320px] mx-auto pb-4">
                  {/* Video Container Locked at the Top */}
                  <div className="aspect-[9/16] w-full max-h-[46vh] rounded-xl overflow-hidden relative border border-gray-800 bg-black shrink-0 mb-3">
                    <iframe
                      src="https://www.youtube.com/embed/HJoRHg1fC6Y?autoplay=0&controls=1"
                      className="absolute w-full border-0 rounded-xl"
                      style={{ height: '115%', top: '-7.5%', left: '0' }}
                      title={project.title}
                    />
                  </div>

                  {/* Text Content Directly Below */}
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold">02</span>
                    <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                    <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                  </div>
                </div>
              ) : index === 2 ? (
                <div className="flex flex-col justify-start h-full w-full max-w-[320px] mx-auto pb-4">
                  {/* Text Content at the Top */}
                  <div className="flex flex-col mb-3">
                    <span className="text-4xl font-bold">03</span>
                    <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                    <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                  </div>

                  {/* Video Container Locked at the Bottom */}
                  <div className="aspect-[9/16] w-full max-h-[48vh] rounded-xl overflow-hidden relative border border-gray-800 bg-black shrink-0">
                    <iframe
                      src="https://www.youtube.com/embed/WKpHTQXTTjM?autoplay=0&controls=1"
                      className="absolute w-full border-0 rounded-xl"
                      style={{
                        height: '115%',
                        top: '-7.5%',
                        left: '0',
                      }}
                      title={project.title}
                    />
                  </div>
                </div>
              ) : index === 3 ? (
                <div className="flex flex-col justify-start h-full w-full max-w-[320px] mx-auto pb-4">
                  {/* Video Container Locked at the Top */}
                  <div className="aspect-[9/16] w-full max-h-[46vh] rounded-xl overflow-hidden relative border border-gray-800 bg-black shrink-0 mb-3">
                    <iframe
                      src="https://drive.google.com/file/d/18ODGuSjFJkYmvSPdGCTYUsWw2f8Gu8Pb/preview"
                      className="absolute w-full border-0 rounded-xl"
                      style={{
                        height: '115%', // Scaled to bypass Google Drive's control layouts
                        top: '-7.5%',    // Centers the portrait clip vertically
                        left: '0',
                      }}
                      allow="autoplay"
                      title={project.title}
                    />
                  </div>

                  {/* Text Content Directly Below */}
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold">04</span>
                    <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                    <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                  </div>
                </div>
              ) : index === 4 ? (
                <div className="flex flex-col justify-start h-full w-full max-w-[320px] mx-auto pb-4 shrink-0">
                  {/* Text Content at the Top */}
                  <div className="flex flex-col mb-3">
                    <span className="text-4xl font-bold">05</span>
                    <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                    <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                  </div>

                  {/* Video Container Locked at the Bottom */}
                  <div className="aspect-[9/16] w-full max-h-[48vh] rounded-xl overflow-hidden relative border border-gray-800 bg-black shrink-0">
                    <iframe
                      src="https://drive.google.com/file/d/1vlSHIzl893i02XNfLZ4uYZ_GuwoV28sU/preview"
                      className="absolute w-full border-0 rounded-xl"
                      style={{
                        height: '115%', // Scaled to bypass Google Drive's vertical header/footer bars
                        top: '-7.5%',    // Perfectly centers the portrait clip vertically
                        left: '0',
                      }}
                      allow="autoplay"
                      title={project.title}
                    />
                  </div>
                </div>
              ) : index === 5 ? (
                <div className="flex flex-col justify-start h-full w-full max-w-[320px] mx-auto pb-4 shrink-0">
                  {/* Video Container Locked at the Top */}
                  <div className="aspect-[9/16] w-full max-h-[46vh] rounded-xl overflow-hidden relative border border-gray-800 bg-black shrink-0 mb-3">
                    <iframe
                      src="https://drive.google.com/file/d/1SFvizi8hL81v_wzN1PlEEKRSDco6lQ7I/preview"
                      className="absolute w-full border-0 rounded-xl"
                      style={{
                        height: '115%', // Scaled to bypass Google Drive's vertical control bars
                        top: '-7.5%',    // Perfectly centers the portrait clip vertically
                        left: '0',
                      }}
                      allow="autoplay"
                      title={project.title}
                    />
                  </div>

                  {/* Text Content Directly Below */}
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold">06</span>
                    <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                    <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                  </div>
                </div>
              ) : index === 6 ? (
                <div className="flex flex-col justify-start h-full w-full max-w-[320px] mx-auto pb-4 shrink-0">
                  {/* Text Content at the Top */}
                  <div className="flex flex-col mb-3">
                    <span className="text-4xl font-bold">07</span>
                    <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                    <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                  </div>

                  {/* Video Container Locked at the Bottom */}
                  <div className="aspect-[9/16] w-full max-h-[48vh] rounded-xl overflow-hidden relative border border-gray-800 bg-black shrink-0">
                    <iframe
                      src="https://drive.google.com/file/d/1Pz01D2KHjn9F-CU6JSa8N9s_RjsDFqwE/preview"
                      className="absolute w-full border-0 rounded-xl"
                      style={{
                        height: '115%', // Scaled to bypass Google Drive's vertical header/footer bars
                        top: '-7.5%',    // Perfectly centers the portrait clip vertically
                        left: '0',
                      }}
                      allow="autoplay"
                      title={project.title}
                    />
                  </div>
                </div>
              ) : index === 7 ? (
                <div className="flex flex-col justify-start h-full w-full max-w-[320px] mx-auto pb-4 shrink-0">
                  {/* Video Container Locked at the Top */}
                  <div className="aspect-[9/16] w-full max-h-[46vh] rounded-xl overflow-hidden relative border border-gray-800 bg-black shrink-0 mb-3">
                    <iframe
                      src="https://drive.google.com/file/d/13iuNZOxamA9VFbB9zH_qzm7kJVa3lXkM/preview"
                      className="absolute w-full border-0 rounded-xl"
                      style={{
                        height: '115%', // Scaled to bypass Google Drive's vertical control bars
                        top: '-7.5%',    // Perfectly centers the portrait clip vertically
                        left: '0',
                      }}
                      allow="autoplay"
                      title={project.title}
                    />
                  </div>

                  {/* Text Content Directly Below */}
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold">08</span>
                    <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                    <div className="text-xs text-gray-500 mt-2">{project.tools}</div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="work-info">
                    <div className="work-title">
                      <h3>0{index + 1}</h3>

                      <div>
                        <h4>{project.title}</h4>
                        <p>{project.category}</p>
                      </div>
                    </div>
                    <h4>Tools and features</h4>
                    <p>{project.tools}</p>
                  </div>
                  <WorkImage image={project.image} alt={project.title} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
