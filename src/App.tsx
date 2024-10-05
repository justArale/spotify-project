import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Resultpage from "./pages/Resultpage";
import Errorpage from "./pages/Errorpage";
import Generatepage from "./pages/Generatepage";
// import Footer from "./components/Footer";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/generate" element={<Generatepage />} />
        <Route path="/result" element={<Resultpage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
