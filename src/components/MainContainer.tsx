import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
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

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(false);

  useEffect(() => {
    // Initial check
    const isDesktop = window.innerWidth > 1024;
    setIsDesktopView(isDesktop);
    
    // Split text sirf desktop par chalayenge taaki mobile crash na ho
    if (isDesktop) {
      setSplitText();
    }

    const resizeHandler = () => {
      const checkDesktop = window.innerWidth > 1024;
      setIsDesktopView(checkDesktop);
      if (checkDesktop) {
        setSplitText();
      }
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      {isDesktopView && <Cursor />}
      <Navbar />
      <SocialIcons />
      
      {/* ScrollSmoother wrapper ko mobile par simple div treat kar rahe hain */}
      <div id={isDesktopView ? "smooth-wrapper" : "mobile-wrapper"}>
        <div id={isDesktopView ? "smooth-content" : "mobile-content"}>
          <div className="container-main">
            <Landing>
              {!isDesktopView && children}
            </Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;