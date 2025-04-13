import { Route, Routes } from "react-router-dom";
import LoginView from "./views/login/LoginView";
import HomeView from "./views/tabs/HomeView";
import ScheduleView from "./views/tabs/ScheduleView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/home" element={<HomeView />} />
      <Route path="/schedule" element={<ScheduleView />} />
    </Routes>
  );
}

export default App;
