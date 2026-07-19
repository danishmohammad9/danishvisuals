import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import "./mobile-fix.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1024);
  }, []);

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading...</div>}>
          <MainContainer>
            {/* 3D Model sirf laptop par load hoga, mobile par 0% load rahega */}
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