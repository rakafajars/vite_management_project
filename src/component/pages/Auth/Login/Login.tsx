import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField from "../../../ui/Forms/TextField";

// 1. Definisikan Interface untuk Form
// Ini seperti membuat Data Model di Flutter
interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  // 2. Pasang Interface ke useForm
  const { control, watch } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // TypeScript sekarang tahu kalau username & category adalah string
  const username = watch("username");

  console.log("username:", username);

  return (
    // <Stack
    //   spacing={2}
    //   alignItems={"center"}
    //   justifyContent={"center"}
    //   sx={{ height: "100vh" }} // Gunakan sx untuk konsistensi di MUI
    // >
    //   <Paper
    //     sx={{
    //       width: 600,
    //       padding: 3, // Sedikit lebih besar agar tidak terlalu sesak
    //     }}
    //   >
    //     <Stack spacing={3}>
    //       <Typography>Welcome Back</Typography>
    //       <Typography>Continue drafting your professional story.</Typography>
    //       <TextField name="username" control={control} label="Username" />
    //       <TextField name="password" control={control} label="Password" />
    //       <Button variant="contained">Login</Button>
    //     </Stack>
    //   </Paper>
    // </Stack>

    <Box display={"flex"} flexDirection={"row"} height={"100vh"}>
      <Box
        flex={1}
        bgcolor={"#003544"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Box
          flexDirection={"row"}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          <img src="/src/assets/ic_architect_cv.svg" height={24} width={16} />
          <Typography color="white" fontSize={18} fontWeight={"bold"}>
            Architect CV
          </Typography>
        </Box>
      </Box>
      <Box flex={2} bgcolor={"#ffffff"}></Box>
    </Box>
  );
};

export default Login;
