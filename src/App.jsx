import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddInterview from "./pages/AddInterview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddInterview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;