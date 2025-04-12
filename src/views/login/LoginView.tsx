import { TextField, Button, Typography, Box, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import loginImg from "../../assets/login/login.png";

const LoginView = () => {
  document.title = "Smart Login";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add login logic here
    console.log("Login attempt");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <Grid
        columnSpacing={5}
        container
        sx={{ borderRadius: 2, overflow: "hidden" }}
      >
        {/* Left side - Login Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", mb: 2 }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontWeight: "bold", textAlign: "left" }}
              >
                Đăng nhập
              </Typography>
              <Box>Đăng nhập để truy cập tài khoản của bạn</Box>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%", maxWidth: 400 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  color: "white",
                  backgroundColor: "#092C4C",
                }}
              >
                Đăng nhập
              </Button>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  Chưa có tài khoản?{" "}
                  <Link
                    href="#"
                    sx={{
                      color: "#DB3232",
                    }}
                  >
                    Đăng ký
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right side - Image */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            src={loginImg}
            alt="logo"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginView;
