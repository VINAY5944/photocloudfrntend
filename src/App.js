import logo from "./logo.svg";
import "./App.css";
import Upload from "./components/Upload";
import Uploadedfiles from "./components/Uploadedfiles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Singleimages from "./components/Singleimages";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <>
                {" "}
                <Upload />
                <Uploadedfiles />
              </>
            }
          />

          <Route path="/single/:id" element={<Singleimages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
