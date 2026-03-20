import { LockOutlined, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import TextField from "../../../ui/Forms/TextField";

interface LoginFormInputs {
  username: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const { control, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login data:", data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-30%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ flex: 1, zIndex: 1, padding: 3 }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 460,
            padding: 5,
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack spacing={3}>
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                }}
              >
                <LockOutlined sx={{ color: "white", fontSize: 40 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, marginBottom: 1, color: "#1a1a1a" }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please sign in to continue
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.5}>
                <TextField
                  name="username"
                  control={control}
                  label="Username"
                  placeholder="Enter your username"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  name="password"
                  control={control}
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="text.secondary">
                        Remember me
                      </Typography>
                    }
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#667eea",
                      cursor: "pointer",
                      fontWeight: 500,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    padding: "12px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                    fontWeight: 600,
                    fontSize: "16px",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 30px rgba(102, 126, 234, 0.5)",
                    },
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </form>

            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Typography
                  component="span"
                  sx={{
                    color: "#667eea",
                    cursor: "pointer",
                    fontWeight: 600,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign Up
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Login;
