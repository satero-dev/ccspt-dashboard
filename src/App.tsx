import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import { BuildingViewer } from "./components/building/building-viewer";
import { LoginForm } from "./components/user/login-form";
import { MapViewer } from "./components/map/map-viewer";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/map" element={<MapViewer />} />
        <Route path="/building" element={<BuildingViewer />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>


  );

}

export default App;