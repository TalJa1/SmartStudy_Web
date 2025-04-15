import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Chip,
  DialogProps,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LeftCalendar from "./LeftCalendar";
import { fetchTasksByDate } from "../../api/taskAPI"; // Assuming this service exists

interface Task {
  id: number;
  title: string;
  description: string;
  status: string; // Added status property
}

interface TaskAddDialogProps {
  open: boolean;
  onClose: () => void;
}

const TaskAddDialog: React.FC<TaskAddDialogProps> = ({ open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  const dialogProps: DialogProps = {
    disablePortal: true, // Prevents creating a new portal for the dialog
    disableEnforceFocus: true, // Avoids enforcing focus on the dialog
    disableScrollLock: true,
    open: false,
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (open) {
      setSelectedDate(new Date());
    }
  }, [open]);

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
    <Dialog
      {...dialogProps}
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
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
              <Typography variant="h6" fontWeight="bold">
                Thời hạn
              </Typography>
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
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ color: "#D55455", textAlign: "center", mb: 2 }}
            >
              Ngày {selectedDate.getDate()} tháng {selectedDate.getMonth() + 1}{" "}
              năm {selectedDate.getFullYear()}
            </Typography>
            <Box sx={{ flex: 1, pl: 2, overflowY: "auto" }}>
              {tasks.length > 0 ? (
                tasks.map((task) => {
                  let borderColor = "#4caf50"; // Default: Hoàn thành
                  let priority = "Trung bình"; // Default priority

                  if (task.status === "Đang làm") {
                    borderColor = "#ff9800"; // Orange for "Đang làm"
                    priority = "Cao";
                  } else if (task.status === "Quá hạn") {
                    borderColor = "#f44336"; // Red for "Quá hạn"
                    priority = "Rất cao";
                  }

                  return (
                    <Box
                      key={`task-${task.id}${task.title}`}
                      sx={{
                        mb: 2,
                        p: 2,
                        border: `1px solid ${borderColor}`,
                        borderRadius: "8px",
                        bgcolor: "#f9f9f9",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            bgcolor: borderColor,
                            borderRadius: "50%",
                          }}
                        ></Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color={borderColor}
                        >
                          {task.status}
                        </Typography>
                        <Chip
                          label="Môn văn"
                          size="small"
                          sx={{
                            bgcolor: "#e8f5e9",
                            color: borderColor,
                            fontWeight: "bold",
                          }}
                        />
                        <NotificationsIcon
                          sx={{ color: borderColor, fontSize: 18 }}
                        />
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
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <StarBorderIcon sx={{ fontSize: 16 }} /> Mức độ ưu tiên:{" "}
                        {priority}
                      </Typography>
                    </Box>
                  );
                })
              ) : (
                <></>
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
