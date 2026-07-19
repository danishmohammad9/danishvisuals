import { lazy, PropsWithChildren, useEffect, Suspense } from "react";
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
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth > 1024) {
      setSplitText();
    }
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 1024;

  return (
    <div className="container-main">
      {/* Cursor filter */}
      <div style={isMobile ? { display: 'none' } : {}}>
        <Cursor />
      </div>
      
      <Navbar />
      <SocialIcons />
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>
              {children}
            </Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            
            {/* Mobile par dynamic crash rokne ke liye explicit check */}
            <div style={isMobile ? { display: 'none', pointerEvents: 'none', visibility: 'hidden' } : {}}>
              <Suspense fallback={<div>Loading Tech Stack....</div>}>
                <TechStack />
              </Suspense>
            </div>
            
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;