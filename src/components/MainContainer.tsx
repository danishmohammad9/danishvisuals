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
  const [isDesktopView, setIsDesktopView] = useState<boolean>(true); // Default true taaki laptop par pehle render se hi sab dikhe

  useEffect(() => {
    // Screen size check: Agar tablet ya mobile hai (1024px se chota) toh false hoga
    const checkView = () => {
      setIsDesktopView(window.innerWidth > 1024);
    };
    
    checkView(); // Initial check
    
    if (window.innerWidth > 1024) {
      setSplitText();
    }
  }, []);

  return (
    <div className="container-main">
      {isDesktopView && <Cursor />}
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
            
            {/* Mobile crash permanent rokne ke liye: Agar desktop hai tabhi TechStack render hoga, mobile par load hi nahi hoga */}
            {isDesktopView && (
              <Suspense fallback={<div>Loading Tech Stack....</div>}>
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