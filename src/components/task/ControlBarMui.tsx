import { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Chip,
  FormControlLabel,
  Radio,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TaskAPI from "../../api/taskAPI";

function ControlBarMui({ onFilterChange }: { onFilterChange: (filters: { subject: string; priority: string; status: string }) => void }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: "",
    priority: "",
    status: "",
  });
  const [selectedValue, setSelectedValue] = useState("all");
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const tasks: { subject: string }[] = await TaskAPI.getTasks();
        const uniqueSubjects = Array.from(new Set(tasks.map((task) => task.subject)));
        setSubjects(uniqueSubjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: { xs: 1, sm: 2 },
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => console.log("Date selector clicked")}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            textTransform: "none",
            color: "text.primary",
            fontWeight: "normal",
            fontSize: "1rem",
            p: 0,
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          Tháng 4/2025
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => console.log("Add button clicked")}
            sx={{
              bgcolor: "#2c3e50",
              color: "#fff",
              "&:hover": {
                bgcolor: "#34495e",
              },
            }}
          >
            Thêm
          </Button>

          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            sx={{
              color: "text.secondary",
              borderColor: "grey.400",
              "&:hover": {
                borderColor: "grey.600",
                bgcolor: "action.hover",
              },
            }}
          >
            Lọc
          </Button>

          <FormControlLabel
            value="all"
            control={
              <Radio
                checked={selectedValue === "all"}
                onChange={handleRadioChange}
                size="small"
                sx={{
                  color: "grey.600",
                  "&.Mui-checked": {
                    color: "#2c3e50",
                  },
                }}
              />
            }
            label="Tất cả"
            sx={{ ml: 1 }}
          />
        </Box>
      </Box>

      {showFilters && (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
          <TextField
            label="Chọn môn"
            select
            value={filters.subject}
            onChange={(e) => handleFilterChange("subject", e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Mức ưu tiên"
            select
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="1">Thấp</MenuItem>
            <MenuItem value="2">Trung bình</MenuItem>
            <MenuItem value="3">Cao</MenuItem>
          </TextField>

          <Box sx={{ display: "flex", gap: 1 }}>
            {["Hoàn thành", "Đang làm", "Quá hạn"].map((status) => (
              <Chip
                key={status}
                label={status}
                onClick={() => handleFilterChange("status", status)}
                color={filters.status === status ? "primary" : "default"}
                variant={filters.status === status ? "filled" : "outlined"}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ControlBarMui;