import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    // Component mount hone ke baad screen size check karega taaki loader 0% par na atke
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth > 1024);
    }
  }, []);

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading...</div>}>
          <MainContainer>
            {/* Laptop par 3D model load hoga, phone par skip ho jayega taaki lag bilkul zero ho sake */}
            {isDesktop && (
              <Suspense fallback={null}>
                <CharacterModel />
              </Suspense>
            )}
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;