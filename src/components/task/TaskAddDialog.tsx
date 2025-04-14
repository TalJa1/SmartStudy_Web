import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LeftCalendar from "./LeftCalendar";
import { fetchTasksByDate } from "../../api/taskAPI"; // Assuming this service exists

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskAddDialogProps {
  open: boolean;
  onClose: () => void;
}

const TaskAddDialog: React.FC<TaskAddDialogProps> = ({ open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await fetchTasksByDate(selectedDate);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [selectedDate]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Thời hạn
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ height: "60vh" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // Equal width for left and right sides
            gap: 2,
            height: "100%",
          }}
        >
          {/* Left Side: Calendar and Close Button */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1, borderRight: "1px solid #ddd", pr: 2 }}>
              <LeftCalendar
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  color: "text.primary",
                  borderColor: "divider",
                  textTransform: "none",
                  width: "80%",
                  fontWeight: "medium",
                }}
              >
                Đóng
              </Button>
            </Box>
          </Box>

          {/* Right Side: Task List and Add Button */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1, pl: 2, overflowY: "auto" }}>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <Box
                    key={task.id}
                    sx={{
                      mb: 2,
                      p: 2,
                      border: "1px solid #4caf50",
                      borderRadius: "8px",
                      bgcolor: "#f9f9f9",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          bgcolor: "#4caf50",
                          borderRadius: "50%",
                        }}
                      ></Box>
                      <Typography variant="body2" fontWeight="bold" color="#4caf50">
                        Hoàn thành
                      </Typography>
                      <Chip
                        label="Môn văn"
                        size="small"
                        sx={{ bgcolor: "#e8f5e9", color: "#4caf50", fontWeight: "bold" }}
                      />
                      <NotificationsIcon sx={{ color: "#4caf50", fontSize: 18 }} />
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ghi chú: {task.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <StarBorderIcon sx={{ fontSize: 16 }} /> Mức độ ưu tiên: Trung bình
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Không có bài tập nào cho ngày này.
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#2c3e50",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "medium",
                  width: "80%",
                  "&:hover": {
                    bgcolor: "#34495e",
                  },
                }}
              >
                Thêm bài tập
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TaskAddDialog;
