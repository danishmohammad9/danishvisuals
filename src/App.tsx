import { lazy, Suspense } from "react";
import MainContainer from "./components/MainContainer";
import { LoadingProvider } from "./context/LoadingProvider";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));

const App = () => {
  return (
    <LoadingProvider>
      <MainContainer>
        <Suspense fallback={null}>
          <CharacterModel />
        </Suspense>
      </MainContainer>
    </LoadingProvider>
  );
};

export default App;