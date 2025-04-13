import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import HeaderSearchBar from "../../components/HeaderSearchBar";

const ScheduleView = () => {
  const loggedInUserName = "Phúc Nguyễn";

  const ScheduleContent = () => {
    return (
      <div className="schedule-content">
        <Box
          sx={{ padding: 2, borderBottom: "1px solid", borderColor: "divider" }}
        >
          <HeaderSearchBar userName={loggedInUserName} />
        </Box>
      </div>
    );
  };

  return (
    <div className="app-container">
      <Sidebar children={<ScheduleContent />} />
    </div>
  );
};

export default ScheduleView;
