import React, { useState } from "react";
import { Sidebar as S, Menu, MenuItem } from "react-pro-sidebar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const navigate = useNavigate();

  const handleTabChange = (tabName: string, route: string) => {
    setActiveTab(tabName);
    navigate(route);
  };

  const getMenuItemStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? "#1C1E30" : "transparent",
    margin: "8px",
    borderRadius: "8px",
    color: isActive ? "white" : "black",
  });

  return (
    <S style={{ height: "100vh" }}>
      <Menu>
        <MenuItem
          icon={<HomeFilledIcon />}
          active={activeTab === "Tổng quan"}
          onClick={() => handleTabChange("Tổng quan", "/home")}
          style={getMenuItemStyle(activeTab === "Tổng quan")}
        >
          Tổng quan
        </MenuItem>
        <MenuItem
          icon={<CalendarMonthIcon />}
          active={activeTab === "Lịch học"}
          onClick={() => handleTabChange("Lịch học", "/schedule")}
          style={getMenuItemStyle(activeTab === "Lịch học")}
        >
          Lịch học
        </MenuItem>
        <MenuItem
          icon={<HomeWorkIcon />}
          active={activeTab === "Bài tập"}
          onClick={() => handleTabChange("Bài tập", "/assignments")}
          style={getMenuItemStyle(activeTab === "Bài tập")}
        >
          Bài tập
        </MenuItem>
        <MenuItem
          icon={<StarIcon />}
          active={activeTab === "Mục tiêu"}
          onClick={() => handleTabChange("Mục tiêu", "/goals")}
          style={getMenuItemStyle(activeTab === "Mục tiêu")}
        >
          Mục tiêu
        </MenuItem>
        <MenuItem
          icon={<SchoolIcon />}
          active={activeTab === "Pomodoro"}
          onClick={() => handleTabChange("Pomodoro", "/pomodoro")}
          style={getMenuItemStyle(activeTab === "Pomodoro")}
        >
          Pomodoro
        </MenuItem>
        <MenuItem
          icon={<AssessmentIcon />}
          active={activeTab === "Hiệu suất học tập"}
          onClick={() => handleTabChange("Hiệu suất học tập", "/performance")}
          style={getMenuItemStyle(activeTab === "Hiệu suất học tập")}
        >
          Hiệu suất học tập
        </MenuItem>
        <MenuItem
          icon={<NotificationsIcon />}
          active={activeTab === "Thông báo"}
          onClick={() => handleTabChange("Thông báo", "/notifications")}
          style={getMenuItemStyle(activeTab === "Thông báo")}
        >
          Thông báo
        </MenuItem>
        <MenuItem
          icon={<SettingsIcon />}
          active={activeTab === "Cài đặt"}
          onClick={() => handleTabChange("Cài đặt", "/settings")}
          style={getMenuItemStyle(activeTab === "Cài đặt")}
        >
          Cài đặt
        </MenuItem>
      </Menu>
    </S>
  );
};

export default Sidebar;
