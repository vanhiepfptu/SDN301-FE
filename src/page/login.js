import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserLayout from "../layout/userLayout";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  // const [userName, setUserName] = React.useState();

  // const [passWord, setPassWord] = React.useState();
  const navigate = useNavigate();
  const [roleName, setRoleName] = React.useState();
  const handleRedirect = (roleName) => {
    if (roleName === "admin") {
      navigate("/staff/dashboard");
    } else if (roleName === "guest") {
      navigate("/");
    }
  };
  const getProfile = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/accounts/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accountId", data.accountid);
        setRoleName(data.roleName);
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function fetchLogin() {
    try {
      const response = await fetch("http://localhost:5000/api/accounts/login", {
        method: "POST",
        headers: {
          // Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "lekhaiphu",
          password: "123456",
        }),
      });
      if (response.ok) {
        console.log("Login success!");
        const responseData = await response.json();
        console.log(responseData.account.tokens[0]);
        localStorage.setItem("token", responseData.account.tokens[0]);
        const token = localStorage.getItem("token");
        getProfile(token);
        handleRedirect(roleName);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchLogin();
  };
  React.useEffect(() => {
    // Kiểm tra xem roleName đã được lưu trong localStorage chưa
    const storedRole = localStorage.getItem("roleName");

    if (storedRole) {
      handleRedirect(storedRole); // Nếu roleName đã có, chuyển hướng dựa trên giá trị đó
    }
  }, []);

  return (
    <UserLayout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="usename"
              label="Email Address"
              name="usename"
              autoComplete="usename"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </UserLayout>
  );
}
