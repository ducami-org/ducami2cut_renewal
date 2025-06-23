import "./App.css";
import First from '../src/pages/FirstPage/index'
import SelectFrame from "./pages/SelectFrame";
import SelectBg from "./pages/SelectBgFrame";
import TakePhoto from "./pages/TakePhoto";
import Finish from "./pages/finishPage";
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
            <Route path="/take" element={<TakePhoto/>} />
            <Route path="/finish" element={<Finish />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
