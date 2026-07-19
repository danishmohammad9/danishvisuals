import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  // Mobile check directly bina state ke render helper ke liye
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 1024;

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading...</div>}>
          <MainContainer>
            {/* Agar mobile screen hai toh Three.js elements ko physically gayab rakhega taaki memory crash na ho */}
            <div style={isMobile ? { display: 'none', pointerEvents: 'none', visibility: 'hidden' } : {}}>
              <Suspense fallback={null}>
                <CharacterModel />
              </Suspense>
            </div>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;