import { useRef, useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PortraitVideoEmbedProps {
  videoId: string;
  title: string;
  maxHeightClass: string;
  marginClass?: string;
}

const PortraitVideoEmbed = ({ videoId, title, maxHeightClass, marginClass = "" }: PortraitVideoEmbedProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const newMuted = !isMuted;
    const command = newMuted ? "mute" : "unmute";

    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: command, args: "" }),
      "*"
    );
    setIsMuted(newMuted);
  };

  return (
    <div className={`aspect-[9/16] w-full ${maxHeightClass} rounded-xl overflow-hidden relative border border-gray-800 bg-black ${marginClass} shrink-0`}>
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&enablejsapi=1&modestbranding=1&rel=0`}
        className="absolute w-full border-0 rounded-xl"
        style={{ height: "115%", top: "-7.5%", left: "0" }}
        allow="autoplay; encrypted-media"
        title={title}
      />
      
      {/* Floating Speaker Action Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 3.28-2 6.07-4.88 7.22l1.19 1.19C19.16 18.69 21 15.57 21 12s-1.84-6.69-4.69-8.41l-1.19 1.19C18 5.93 20 8.72 20 12zM3 9v6h4l5 5V4L7 9H3zm13.12-6.52L15 3.6c3.48 1.96 5.8 5.6 5.8 9.8 0 4.2-2.32 7.84-5.8 9.8l1.12 1.12C19.98 22.04 22.5 17.5 22.5 13c0-4.5-2.52-9.04-6.38-10.52zM4.27 3L3 4.27l9 9v3.73l5-5 1.73 1.73c-1 .73-2.14 1.29-3.39 1.62l1.19 1.19c1.68-.48 3.19-1.37 4.41-2.58l2.58 2.58 1.27-1.27L4.27 3z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </div>
  );
};

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
                  
                  <PortraitVideoEmbed
                    videoId="WvHX83zdw0M"
                    title={project.title}
                    maxHeightClass="max-h-[48vh]"
                    marginClass="mt-2"
                  />
                </div>
              ) : index === 1 ? (
                <div className="flex flex-col justify-start h-full w-full max-w-[320px] mx-auto pb-4">
                  {/* Video Container Locked at the Top */}
                  <PortraitVideoEmbed
                    videoId="HJoRHg1fC6Y"
                    title={project.title}
                    maxHeightClass="max-h-[46vh]"
                    marginClass="mb-3"
                  />

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
                  <PortraitVideoEmbed
                    videoId="WKpHTQXTTjM"
                    title={project.title}
                    maxHeightClass="max-h-[48vh]"
                  />
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
