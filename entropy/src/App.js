import "./App.css";
import Landing from "./Components/Landing";
import VolcanoInfo from "./Components/VolcanoInfo";
import CatInfo from "./Components/CatInfo";

function App() {
  const path = window.location.pathname;

  if (path === "/volcano-info") {
    return <VolcanoInfo />;
  }

  if (path === "/cat-info") {
    return <CatInfo />;
  }

  return <Landing />;
}

export default App;
