/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import wavinghand from "../../assets/home/wavinghand.png";
import { useState } from "react";
import BarChart from "../../components/BarChart";

const HomeView = () => {
  const [name, setName] = useState<string>("Nguyên");
  const HomeContent = () => {
    return (
      <Box style={{ padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 8 }}>
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
            <Grid container spacing={2}>
              <Grid size={8}>
                <BarChart />
              </Grid>
              <Grid size={4}></Grid>
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
