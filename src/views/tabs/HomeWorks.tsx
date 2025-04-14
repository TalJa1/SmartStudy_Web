import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";

const HomeWorks = () => {
  const HomeWorksContent = () => {
    return <Box>HomeWorks</Box>;
  };

  return <Sidebar children={<HomeWorksContent />} />;
};

export default HomeWorks;
