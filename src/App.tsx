import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [showCharacter, setShowCharacter] = useState(false);

  useEffect(() => {
    // Laptop/Desktop screen check (768px se bada matlab tablet/laptop view)
    if (window.innerWidth >= 768) {
      setShowCharacter(true);
    }
  }, []);

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading...</div>}>
          <MainContainer>
            {showCharacter && (
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