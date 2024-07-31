import { Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landingpage />} />
      </Routes>
    </div>
  );
}

export default App;
