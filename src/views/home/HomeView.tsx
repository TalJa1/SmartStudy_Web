/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import wavinghand from "../../assets/home/wavinghand.png";
import { useState } from "react";
import BarChart from "../../components/BarChart";
import progress from "../../assets/home/progress.png";
import PercentProgress from "../../components/home/PercentProgress";

const HomeView = () => {
  const [name, setName] = useState<string>("Nguyên");
  const HomeContent = () => {
    return (
      <Box style={{ padding: "20px" }}>
        <Grid container spacing={2}>
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
          </Grid>
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
