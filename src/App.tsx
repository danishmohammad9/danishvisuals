import { lazy, Suspense, useEffect, useState } from "react";
import { LoadingProvider } from "./context/LoadingProvider";
import "./App.css";

// Clean, lazy-loaded container and 3D character components
const MainContainer = lazy(() => import("./components/MainContainer"));
const CharacterModel = lazy(() => import("./components/Character"));

const App = () => {
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

  return (
    <LoadingProvider>
      <Suspense fallback={<div style={{ color: "white", textAlign: "center", marginTop: "20%" }}>Loading...</div>}>
        <MainContainer>
          {isDesktop && (
            <Suspense fallback={null}>
              <CharacterModel />
            </Suspense>
          )}
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

export default App;