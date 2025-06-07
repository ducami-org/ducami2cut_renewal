import "./App.css";
import First from '../src/pages/FirstPage/index'
import SelectFrame from "./pages/SelectFrame";
import SelectBg from "./pages/SelectBgFrame";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<First />} />
            <Route path="/frame" element={<SelectFrame/>}/>
            <Route path="/bg" element={<SelectBg/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
