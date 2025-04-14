import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import TaskAPI from "../../api/taskAPI";
import { Task } from "../../models/tabs/taskModel";

const HomeWorks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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
        {tasks.map((task) => (
          <Box key={task.task_id}>{task.title}</Box>
        ))}
      </Box>
    );
  };

  return <Sidebar children={<HomeWorksContent />} />;
};

export default HomeWorks;
