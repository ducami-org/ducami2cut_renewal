import "./App.css";
import First from '../src/pages/FirstPage/index'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<First />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
