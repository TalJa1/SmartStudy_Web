/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/ManualCalendarGrid.tsx
import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem as MuiMenuItem,
  useTheme,
  alpha,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  getDate, // Gets day number
} from "date-fns";
import { vi } from "date-fns/locale";
import {
  mockCalendarEvents,
  CalendarEvent,
  EventCategory,
} from "../../services/calendar/calendarData"; // Adjust path

// --- Event Colors Helper --- (Same as before)
const getEventColor = (
  category: EventCategory
): { background: string; text: string; border: string } => {
  switch (category) {
    case "Lịch học":
      return { background: "#E0F2E9", text: "#4CAF50", border: "#A5D6A7" };
    case "Kiểm tra":
      return { background: "#FFEBEE", text: "#D32F2F", border: "#EF9A9A" };
    case "Kỳ thi":
      return { background: "#E3F2FD", text: "#1976D2", border: "#90CAF9" };
    case "Sự kiện":
      return { background: "#FFF3E0", text: "#EF6C00", border: "#FFCC80" };
    default:
      return { background: "#F5F5F5", text: "#616161", border: "#E0E0E0" };
  }
};

const availableCategories: EventCategory[] = ['Lịch học', 'Kiểm tra', 'Kỳ thi', 'Sự kiện', 'Khác'];

// --- Calendar Component ---
const ManualCalendarGrid = () => {
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 3, 1)); // Start in April 2025
  const [currentView, setCurrentView] = useState("month"); // Only month implemented here
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);

  const [monthAnchorEl, setMonthAnchorEl] = useState<null | HTMLElement>(null);
  const isMonthMenuOpen = Boolean(monthAnchorEl);

  // --- Date Calculations for the Grid ---
  const daysInGrid = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    // Adjust week start to Monday (1) for Vietnamese locale standard
    const startDate = startOfWeek(monthStart, { locale: vi, weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { locale: vi, weekStartsOn: 1 });

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentMonth]);

  // --- Filter Events for a Specific Day ---
  const getEventsForDay = (day: Date): CalendarEvent[] => {
    return events.filter((event) => isSameDay(event.start, day));
    // Basic filtering: doesn't account for multi-day events spanning across this day yet
    // Add more complex logic here if needed (e.g., check if 'day' is within event.start/end interval)
  };

  // --- Handlers ---
  const handleViewChange = (event: React.SyntheticEvent, newValue: string) => {
    // Only month view is implemented in this example
    if (newValue === "month") {
      setCurrentView(newValue);
    } else {
      alert(`${newValue} view not implemented in this example.`);
    }
  };

  const handleMonthMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setMonthAnchorEl(event.currentTarget);
  const handleMonthMenuClose = () => setMonthAnchorEl(null);

  const handleNavigate = (action: "prev" | "next" | "today") => {
    if (action === "prev") setCurrentMonth(subMonths(currentMonth, 1));
    if (action === "next") setCurrentMonth(addMonths(currentMonth, 1));
    if (action === "today") setCurrentMonth(new Date()); // Go to current real-world month
    handleMonthMenuClose();
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log("Event clicked:", event.title);
    // Add logic to show event details
  };

  // --- Render Logic ---
  const dayLabels = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ]; // Monday first

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDateForAdd, setSelectedDateForAdd] = useState<Date | null>(
    null
  );
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventCategory, setNewEventCategory] =
    useState<EventCategory>("Lịch học"); // Default category
  const [newEventDescription, setNewEventDescription] = useState("");
  // Add state for time if you want timed events
  // const [newEventTime, setNewEventTime] = useState('');

  // ... existing calculations and handlers

  // --- Modal Handlers ---
  const handleOpenAddModal = (day: Date) => {
    setSelectedDateForAdd(day);
    // Reset form fields when opening
    setNewEventTitle("");
    setNewEventCategory("Lịch học");
    setNewEventDescription("");
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setSelectedDateForAdd(null); // Clear selected date on close
  };

  const handleAddEvent = () => {
    if (!newEventTitle || !selectedDateForAdd) {
      alert("Vui lòng nhập tiêu đề."); // Simple validation
      return;
    }

    // Create the new event object
    const newEvent: CalendarEvent = {
      // Generate a simple unique ID (use a proper UUID library in real apps)
      id: `event-${Date.now()}-${Math.random()}`,
      title: newEventTitle,
      // Set start date. Combine with time if time input exists, otherwise make it allDay
      start: selectedDateForAdd, // For now, treat as all-day
      allDay: true, // Defaulting to allDay for simplicity
      category: newEventCategory,
      description: newEventDescription,
    };

    // Update the events state
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    handleCloseAddModal(); // Close modal after adding
  };

  // --- Modify Day Click Handler ---
  const handleDayClick = (day: Date) => {
    console.log("Day clicked:", day);
    handleOpenAddModal(day); // Open the modal for this day
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Top Bar: Title, View Tabs, Add Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        {/* ... (Copy Toolbar from previous FullCalendar example) ... */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mr: 3,
              display: { xs: "none", sm: "block" },
            }}
          >
            Lịch học
          </Typography>
          <Tabs
            value={currentView}
            onChange={handleViewChange}
            aria-label="calendar view tabs"
          >
            <Tab
              label="Tháng"
              value="month"
              sx={{ textTransform: "none", fontSize: "0.9rem", minWidth: 80 }}
            />
            <Tab
              label="Tuần"
              value="week"
              sx={{ textTransform: "none", fontSize: "0.9rem", minWidth: 80 }}
              disabled
            />
            <Tab
              label="Ngày"
              value="day"
              sx={{ textTransform: "none", fontSize: "0.9rem", minWidth: 80 }}
              disabled
            />
          </Tabs>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="small"
          sx={{
            backgroundColor: "#1C2A3A",
            "&:hover": { backgroundColor: "#334257" },
            textTransform: "none",
            borderRadius: "8px",
          }}
          onClick={() => console.log("Add Event Clicked")} // Replace with modal logic
        >
          Thêm
        </Button>
      </Box>

      {/* Toolbar: Month Selector, Filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        {/* ... (Copy Toolbar from previous FullCalendar example) ... */}
        <Button
          id="month-button"
          aria-controls={isMonthMenuOpen ? "month-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isMonthMenuOpen ? "true" : undefined}
          onClick={handleMonthMenuOpen}
          endIcon={<ArrowDropDownIcon />}
          sx={{
            textTransform: "none",
            color: "text.primary",
            fontWeight: "bold",
            fontSize: "1rem",
            p: 0.5,
          }}
        >
          {format(currentMonth, "MMMM yyyy", { locale: vi })}
        </Button>
        <Menu
          id="month-menu"
          anchorEl={monthAnchorEl}
          open={isMonthMenuOpen}
          onClose={handleMonthMenuClose}
          MenuListProps={{ "aria-labelledby": "month-button" }}
        >
          <MuiMenuItem onClick={() => handleNavigate("prev")}>
            Tháng trước
          </MuiMenuItem>
          <MuiMenuItem onClick={() => handleNavigate("next")}>
            Tháng sau
          </MuiMenuItem>
          <MuiMenuItem onClick={() => handleNavigate("today")}>
            Hôm nay
          </MuiMenuItem>
        </Menu>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {" "}
          {/* Hide filters on small screens */}
          <Chip
            label="Lịch học"
            size="small"
            variant="outlined"
            clickable
            sx={{ borderColor: "#A5D6A7", color: "#4CAF50" }}
          />
          <Chip
            label="Kiểm tra"
            size="small"
            variant="outlined"
            clickable
            sx={{ borderColor: "#EF9A9A", color: "#D32F2F" }}
          />
          <Chip
            label="Kỳ thi"
            size="small"
            variant="outlined"
            clickable
            sx={{ borderColor: "#90CAF9", color: "#1976D2" }}
          />
          <Chip
            label="Sự kiện"
            size="small"
            variant="outlined"
            clickable
            sx={{ borderColor: "#FFCC80", color: "#EF6C00" }}
          />
          <IconButton
            size="small"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "8px",
              ml: 1,
            }}
          >
            <FilterListIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Calendar Grid Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Day Headers */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)", // 7 columns
            backgroundColor: "#1C2A3A", // Dark background
            color: "#ffffff", // White text
            textAlign: "center",
            borderRadius: "4px 4px 0 0", // Rounded top corners
            flexShrink: 0,
          }}
        >
          {dayLabels.map((label) => (
            <Typography
              key={label}
              variant="caption"
              sx={{ fontWeight: "medium", p: 1 }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {/* Days Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            flexGrow: 1, // Takes remaining vertical space
            overflowY: "auto", // Allow scrolling if content overflows cell height
            border: "1px solid",
            borderColor: "divider",
            borderTop: "none", // Header has top border effectively
            borderRadius: "0 0 4px 4px", // Rounded bottom corners
            backgroundColor: theme.palette.background.paper, // White background for cells
          }}
        >
          {daysInGrid.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isCurrentDay = isToday(day);

            return (
              <Box
                key={day.toString()}
                onClick={() => handleDayClick(day)}
                sx={{
                  borderRight: "1px solid",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  minHeight: "100px", // Minimum height for cells
                  height: "auto", // Allow cells to grow
                  position: "relative", // For positioning day number
                  p: "4px",
                  cursor: "pointer",
                  backgroundColor: isCurrentDay
                    ? alpha(theme.palette.primary.light, 0.1)
                    : "inherit",
                  "&:nth-of-type(7n)": { borderRight: "none" }, // Remove right border on last column
                  // Potentially remove bottom border on last row - harder with dynamic rows
                }}
              >
                {/* Day Number */}
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: "4px",
                    left: "4px",
                    fontWeight: isCurrentDay ? "bold" : "normal",
                    color: isCurrentMonth ? "text.primary" : "text.disabled", // Dim non-month days
                  }}
                >
                  {getDate(day)}
                </Typography>

                {/* Events */}
                <Box
                  sx={{
                    mt: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  {dayEvents.map((event) => {
                    const colors = getEventColor(event.category);
                    return (
                      <Box
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }} // Prevent day click
                        sx={{
                          backgroundColor: colors.background,
                          color: colors.text,
                          borderLeft: `3px solid ${colors.border}`,
                          padding: "1px 4px",
                          borderRadius: "4px",
                          fontSize: "0.7rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          lineHeight: 1.2,
                        }}
                      >
                        <b>{event.title}</b>
                        {/* Optional: Display time/description */}
                        {event.description && (
                          <Typography
                            variant="caption"
                            component="div"
                            sx={{
                              fontStyle: "italic",
                              opacity: 0.9,
                              lineHeight: 1,
                            }}
                          >
                            {event.description}
                          </Typography>
                        )}
                        {!event.allDay && format(event.start, "HH:mm")}
                        {/* Handle end time if needed */}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
        <DialogTitle>Thêm hoạt động mới</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Thêm sự kiện cho ngày:{" "}
            {selectedDateForAdd
              ? format(selectedDateForAdd, "dd/MM/yyyy", { locale: vi })
              : ""}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Tiêu đề"
            type="text"
            fullWidth
            variant="outlined"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel id="category-select-label">Loại</InputLabel>
            <Select
              labelId="category-select-label"
              id="category"
              value={newEventCategory}
              label="Loại"
              onChange={(e) =>
                setNewEventCategory(e.target.value as EventCategory)
              }
              variant="outlined"
            >
              {availableCategories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="description"
            label="Mô tả (tùy chọn)"
            type="text"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
          />
          {/* Add Time Input here if needed */}
        </DialogContent>
        <DialogActions sx={{ p: "16px 24px" }}>
          <Button onClick={handleCloseAddModal}>Hủy</Button>
          <Button
            onClick={handleAddEvent}
            variant="contained"
            disabled={!newEventTitle} // Disable if title is empty
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManualCalendarGrid;
