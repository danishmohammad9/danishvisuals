import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    // Strict Screen Size Check: 1024px se bade devices ko hi desktop manega
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth > 1024);
    }
  }, []);

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading...</div>}>
          <MainContainer>
            {/* Jab tak confirmation desktop ki na ho, mobile par 3D script 0% load hogi */}
            {isClient && isDesktop && (
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