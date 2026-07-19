import { lazy, PropsWithChildren, useEffect, useState } from "react";
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
    const isDesktop = window.innerWidth > 1024;
    setIsDesktopView(isDesktop);
    
    if (isDesktop) {
      setSplitText();
    }
  }, []);

  return (
    <div className="container-main" style={{ willChange: "transform" }}>
      {isDesktopView && <Cursor />}
      <Navbar />
      <SocialIcons />
      
      <div id="smooth-wrapper" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
        <div id="smooth-content" style={{ willChange: "transform" }}>
          <div className="container-main">
            {/* Yahan bina kisi condition ke children (Character) ko wapas render kar rahe hain */}
            <Landing>
              {children}
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