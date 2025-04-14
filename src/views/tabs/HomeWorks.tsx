import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import TaskAPI from "../../api/taskAPI";
import { Task } from "../../models/tabs/taskModel";
import ControlBarMui from "../../components/task/ControlBarMui";
import HeaderSearchBar from "../../components/HeaderSearchBar";
import { format } from "date-fns";

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
    const getStatusChip = (status: string) => {
      switch (status) {
        case "Hoàn thành":
          return <Chip label="Hoàn thành" color="success" />;
        case "Đang làm":
          return <Chip label="Đang làm" color="warning" />;
        case "Quá hạn":
          return <Chip label="Quá hạn" color="error" />;
        default:
          return <Chip label={status} />;
      }
    };

    const getPriorityLabel = (priority: number) => {
      switch (priority) {
        case 1:
          return "Thấp";
        case 2:
          return "Trung bình";
        case 3:
          return "Cao";
        default:
          return priority;
      }
    };

    const formatDate = (date: string) => {
      const parsedDate = new Date(date);
      return format(parsedDate, "MMMM d, yyyy");
    };

    return (
      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <HeaderSearchBar userName={loggedInUserName} />
        <ControlBarMui />
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: "fixed", minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell>Môn</TableCell>
                  <TableCell>Hạn</TableCell>
                  <TableCell>Mức ưu tiên</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.user_id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.subject}</TableCell>
                    <TableCell>{formatDate(task.due_date)}</TableCell>
                    <TableCell>{getPriorityLabel(task.priority)}</TableCell>
                    <TableCell>{getStatusChip(task.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };

  return <Sidebar children={<HomeWorksContent />} />;
};

export default HomeWorks;
