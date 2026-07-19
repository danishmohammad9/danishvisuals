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


const MainContainer = ({ children }: MainContainerProps) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsDesktop(window.innerWidth > 1024);
      };

      // Set initial value on mount
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (isDesktop) {
      // Let the DOM render first, then split text
      const timer = setTimeout(() => {
        setSplitText();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isDesktop]);

  return (
    <div className="container-main">
      {isDesktop && <Cursor />}
      <Navbar />
      <SocialIcons />

      {isDesktop ? (
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className="container-main">
              <Landing>{children}</Landing>
              <About />
              <WhatIDo />
              <Career />
              <Work />
              <div className="hidden lg:block">
                <Suspense fallback={<div>Loading Tech Stack....</div>}>
                  <TechStack />
                </Suspense>
              </div>
              <Contact />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-main">
          <Landing>{children}</Landing>
          <About />
          <WhatIDo />
          <Career />
          <Work />
          <div className="hidden lg:block">
            <Suspense fallback={<div>Loading Tech Stack....</div>}>
              <TechStack />
            </Suspense>
          </div>
          <Contact />
        </div>
      )}
    </div>
  );
};

export default MainContainer;