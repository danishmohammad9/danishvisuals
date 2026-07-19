import React, { lazy, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

interface MainContainerProps {
  children?: React.ReactNode;
}

const MobileTechStack = () => {
  const imageUrls = [
    "/images/premiere.png",
    "/images/aftereffects.png",
    "/images/davinci.png",
    "/images/photoshop.png",
    "/images/illustrator.png",
    "/images/audition.png",
    "/images/blender.png",
    "/images/cinema4d.png",
  ];

  return (
    <div className="techstack">
      <h2> My Techstack</h2>
      <div className="grid grid-cols-4 gap-6 max-w-md mx-auto pt-[240px] px-4 justify-items-center">
        {imageUrls.map((url, idx) => {
          const name = url.split("/").pop()?.replace(".png", "") || "";
          return (
            <div
              key={idx}
              className="flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-300 w-16 h-16 sm:w-20 sm:h-20"
            >
              <img
                src={url}
                alt={name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain filter drop-shadow-[0_0_8px_rgba(194,164,255,0.3)]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MainContainer = ({ children }: MainContainerProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1024);
      };
      
      handleResize();
      window.addEventListener("resize", handleResize);

      // Initialize split text animations for paragraph elements
      setSplitText();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="container-main" style={{ scrollBehavior: "smooth" }}>
      {!isMobile && <Cursor />}
      <Navbar />
      <SocialIcons />

      <Landing>{children}</Landing>
      <About />
      <WhatIDo />
      <Career />
      <Work />
      
      {/* Conditionally mount TechStack based on viewport width */}
      <Suspense fallback={<div>Loading Tech Stack....</div>}>
        {isMobile ? <MobileTechStack /> : <TechStack />}
      </Suspense>

      <Contact />
    </div>
  );
};

export default MainContainer;