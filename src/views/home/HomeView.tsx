import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";

const HomeView = () => {
  return <Sidebar children={<HomeContent />} />;
};

const HomeContent = () => {
  return (
    <Box style={{ padding: "20px" }}>
      <h1>Home Content</h1>
      <p>This is the home content.</p>
    </Box>
  );
};

export default HomeView;
