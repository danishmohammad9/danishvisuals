import { lazy, Suspense } from "react";
import { LoadingProvider } from "./context/LoadingProvider";
import "./App.css";

// Clean, lazy-loaded container and 3D character components
const MainContainer = lazy(() => import("./components/MainContainer"));
const CharacterModel = lazy(() => import("./components/Character"));

const App = () => {
  return (
    <LoadingProvider>
      <Suspense fallback={<div style={{ color: "white", textAlign: "center", marginTop: "20%" }}>Loading...</div>}>
        <MainContainer>
          <Suspense fallback={null}>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

export default App;