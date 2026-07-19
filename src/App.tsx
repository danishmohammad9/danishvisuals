import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth > 1024);
    }
  }, []);

  return (
    <LoadingProvider>
      <Suspense fallback={<div style={{ color: "white", textAlign: "center", marginTop: "20%" }}>Loading...</div>}>
        <MainContainer>
          {isDesktop ? (
            <Suspense fallback={null}>
              <CharacterModel />
            </Suspense>
          ) : null}
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

export default App;