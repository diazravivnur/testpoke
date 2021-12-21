import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./components/context/userContext";

import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import ListPoke from "./components/pages/ListPoke";
import Login from "./components/forms/Login";
import DetailPoke from "./components/pages/DetailPoke";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listpoke" element={<ListPoke />} />
              <Route path="/login" element={<Login />} />
              <Route path="/detailpoke/:id" element={<DetailPoke />} />
            </Routes>
          </Router>
        </UserContextProvider>
      </header>
    </div>
  );
}

export default App;
