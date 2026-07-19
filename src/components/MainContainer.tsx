import { lazy, PropsWithChildren, useEffect, useState, Suspense } from "react";
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
            {/* Landing ke andar position maintain karne ke liye directly children pass kar rahe hain */}
            <Landing>
              {children}
            </Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {/* Mobile par blank screen crash rokne ke liye TechStack ko desktop conditional check de rahe hain */}
            {isDesktopView && (
              <Suspense fallback={<div style={{ color: 'white', textAlign: 'center' }}>Loading Tech Stack...</div>}>
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