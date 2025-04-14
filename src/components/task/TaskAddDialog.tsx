import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Button,
} from "@mui/material";
import LeftCalendar from "./LeftCalendar";

interface TaskAddDialogProps {
  open: boolean;
  onClose: () => void;
}

const TaskAddDialog: React.FC<TaskAddDialogProps> = ({ open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

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

          {/* Right Side: Content and Add Button */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1, pl: 2 }}>
              <Typography variant="body1" fontWeight="medium">
                {`Ngày ${selectedDate.getDate()} tháng ${
                  selectedDate.getMonth() + 1
                } năm ${selectedDate.getFullYear()}`}
              </Typography>
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
