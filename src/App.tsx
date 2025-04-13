import { Route, Routes } from "react-router-dom";
import LoginView from "./views/login/LoginView";
import HomeView from "./views/tabs/HomeView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/home" element={<HomeView />} />
    </Routes>
  );
}

export default App;
