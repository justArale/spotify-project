import React from "react";

import { Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landingpage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
