import { Route, Routes } from "react-router-dom";

import Aboutus from "./pages/Aboutus";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Aboutus />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
