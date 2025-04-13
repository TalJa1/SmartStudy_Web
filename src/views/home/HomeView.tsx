/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import wavinghand from "../../assets/home/wavinghand.png";
import { useState } from "react";
import BarChart from "../../components/BarChart";
import progress from "../../assets/home/progress.png";
import { getLearningData } from "../../services/home/learningService";
import PercentProgress from "../../components/home/PercentProgress";

const HomeView = () => {
  document.title = "Tổng quan";
  const [name, setName] = useState<string>("Nguyên");
  const learningData = getLearningData();

  const HomeContent = () => {
    return (
      <Box style={{ padding: "20px" }}>
        {/* Chart group */}
        <Grid container>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Box sx={{ m: 2 }}>
              <Box
                display="flex"
                alignItems="center"
                sx={{ color: "#1C1E30", fontSize: "24px", fontWeight: "700" }}
              >
                Xin chào {name} <img src={wavinghand} width={30} />
              </Box>
              <Box sx={{ color: "#828282", fontSize: "14px" }}>
                Chúc bạn một tuần học tập hiệu quả!
              </Box>
            </Box>
            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid size={7}>
                <Box
                  sx={{
                    color: "#1C1E30",
                    fontSize: "24px",
                    fontWeight: "700",
                  }}
                >
                  Thời gian học
                </Box>
                <BarChart />
              </Grid>
              <Grid size={5}>
                <Box
                  sx={{
                    color: "#1C1E30",
                    fontSize: "24px",
                    fontWeight: "700",
                  }}
                >
                  Hiệu suất
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <img src={progress} width={140} />
                  <Box display={"flex"} flexDirection={"row"} gap={1}>
                    <Box sx={{ fontSize: "14px", color: "#4F4F4F" }}>
                      Bài tập hoàn thành:
                    </Box>
                    <Box sx={{ fontSize: "14px", fontWeight: "700" }}>8/10</Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Data Group */}
            <Grid sx={{ mt: 5, width: "100%" }} container>
              <Box
                sx={{
                  color: "#1C1E30",
                  fontSize: "20px",
                  fontWeight: 600,
                  width: "100%",
                }}
              >
                Lộ trình mục tiêu
              </Box>
              <Grid container sx={{ mt: 2, width: "100%" }}>
                <Grid container sx={{ width: "100%" }}>
                  <Grid
                    container
                    sx={{
                      color: "#84868A",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Grid size={2}>Môn</Grid>
                    <Grid size={2}>Mục tiêu</Grid>
                    <Grid size={2}>Tiến độ</Grid>
                    <Grid size={2}>BĐ</Grid>
                    <Grid size={2}>KT</Grid>
                    <Grid size={2}>Phân loại</Grid>
                  </Grid>
                </Grid>
                {learningData.map((item, index) => (
                  <Grid key={index} sx={{ width: "100%", mt: 2 }}>
                    <Grid
                      container
                      sx={{
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      <Grid size={2} sx={{ wordWrap: "break-word", fontWeight:700 }}>
                        {item.subject}
                      </Grid>
                      <Grid size={2} sx={{ wordWrap: "break-word" }}>
                        {item.goal}
                      </Grid>
                      <Grid size={2} sx={{ wordWrap: "break-word" }}>
                        {item.progress}
                      </Grid>
                      <Grid size={2} sx={{ wordWrap: "break-word" }}>
                        {item.startDate}
                      </Grid>
                      <Grid size={2} sx={{ wordWrap: "break-word" }}>
                        {item.endDate}
                      </Grid>
                      <Grid size={2} sx={{ wordWrap: "break-word" }}>
                        {item.category}
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        mt: 1,
                        p: 2,
                        fontSize: "14px",
                        borderRadius: "8px",
                        backgroundColor:
                          Math.random() > 0.5 ? "#FFE4E4" : "#E1E2F6",
                      }}
                    >
                      <Box sx={{ fontWeight: "bold", mb: 1 }}>{item.title}</Box>
                      {item.description}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Left info */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              textAlign="left"
              color="#000000"
              sx={{ fontWeight: "700", fontSize: "24px" }}
            >
              Hồ sơ
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return <Sidebar children={<HomeContent />} />;
};

export default HomeView;
