import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import HeaderSearchBar from "../../components/HeaderSearchBar";
import ManualCalendarGrid from "../../components/schedule/ManualCalendarGrid";

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
        <Box sx={{ flexGrow: 1, overflow: "hidden", width: "100%" }}>
          <ManualCalendarGrid />
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
