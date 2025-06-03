import "./App.css";
import First from '../src/pages/FirstPage/index'
import SelectFrame from "./pages/SelectFrame";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<First />} />
            <Route path="/frame" element={<SelectFrame/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
