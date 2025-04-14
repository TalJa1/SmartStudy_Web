import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import TaskAPI from "../../api/taskAPI";
import { Task } from "../../models/tabs/taskModel";
import ControlBarMui from "../../components/task/ControlBarMui";
import HeaderSearchBar from "../../components/HeaderSearchBar";

const HomeWorks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const loggedInUserName = "Phúc Nguyễn";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await TaskAPI.getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const HomeWorksContent = () => {
    return (
      <Box>
        <HeaderSearchBar userName={loggedInUserName} />
        <ControlBarMui />
      </Box>
    );
  };

  return <Sidebar children={<HomeWorksContent />} />;
};

export default HomeWorks;
