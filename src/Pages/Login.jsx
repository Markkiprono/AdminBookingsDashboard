import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Backdrop,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { FulfillingBouncingCircleSpinner } from "react-epic-spinners";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const theme = createTheme();
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const [loading, setLoading] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await axios
        .post("/api/v1/user/login", { email, password })
        .then((res) => localStorage.setItem("user", true));
      setLoading(true);
      console.log({ token });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
      });
      setLoading(false);
    }
  };
  return (
    <ThemeProvider theme={theme} style={{ background: "white" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} validate sx={{ mt: 1 }}>
            <TextField
              required
              margin="normal"
              fullWidth
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                required
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "#933FDF" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      {loading && (
        <Backdrop
          sx={{ color: "#41e065", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <FulfillingBouncingCircleSpinner color="#933FDF" size={100} />
        </Backdrop>
      )}
    </ThemeProvider>
  );
};

export default Login;
