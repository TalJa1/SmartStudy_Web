import { Container } from "@mui/material";
import "./styles/login/loginPage.css";
import LoginView from "./views/login/LoginView";

function App() {
  document.title = `Smart Login`;
  return (
    <Container className="fullView">
      <LoginView />
    </Container>
  );
}

export default App;
