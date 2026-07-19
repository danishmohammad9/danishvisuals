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
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const desktopCheck = window.innerWidth > 1024;
      setIsDesktop(desktopCheck);
      
      if (desktopCheck) {
        setSplitText();
      }
    }
  }, []);

  return (
    <div className="container-main">
      {isClient && isDesktop && <Cursor />}
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
            
            {/* TechStack particle heavy animation ko bhi strictly desktop tak limit kiya */}
            {isClient && isDesktop ? (
              <Suspense fallback={<div>Loading Tech Stack....</div>}>
                <TechStack />
              </Suspense>
            ) : null}
            
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;