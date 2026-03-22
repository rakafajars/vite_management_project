import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField from "../../../ui/Forms/TextField/TextField";
import { ArrowRightAltSharp } from "@mui/icons-material";
import { useNavigate } from "react-router";

interface RegisterFormInputs {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterRightPanel = (): React.ReactElement => {
  const { control } = useForm<RegisterFormInputs>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  return (
    <Box flex={2} paddingLeft={"40px"}>
      <Paper
        elevation={0}
        sx={{
          padding: "40px",
          borderRadius: "32px",
          opacity: "100%",
          boxShadow: "0px 10px 30px 0px rgba(0, 31, 41, 0.05)",
        }}
      >
        <Typography
          fontWeight={400}
          fontSize={"12px"}
          fontFamily={"Inter, sans-serif"}
          letterSpacing={"1.6px"}
        >
          PHASE: INITIATION
        </Typography>
        <Typography
          fontWeight={"bold"}
          fontSize={"30px"}
          fontFamily={"Manrope, sans-serif"}
          mb={"40px"}
        >
          Create Account
        </Typography>

        <Grid container alignItems={"center"}>
          <Grid size={4}>
            <Typography
              fontWeight={500}
              fontSize={"12px"}
              fontFamily={"Inter, sans-serif"}
              letterSpacing={"0.8px"}
              color="#003544B3"
            >
              FULL NAME
            </Typography>
          </Grid>
          <Grid size={8}>
            <TextField
              control={control}
              name="fullname"
              placeholder="Alexande Wright"
            />
          </Grid>
        </Grid>

        <Grid container alignItems={"center"}>
          <Grid size={4}>
            <Typography
              fontWeight={500}
              fontSize={"12px"}
              fontFamily={"Inter, sans-serif"}
              letterSpacing={"0.8px"}
              color="#003544B3"
            >
              EMAIL ADDRESS
            </Typography>
          </Grid>
          <Grid size={8}>
            <TextField
              control={control}
              name="email"
              placeholder="raka@gmail.com"
            />
          </Grid>
        </Grid>

        <Grid container alignItems={"center"}>
          <Grid size={4}>
            <Typography
              fontWeight={500}
              fontSize={"12px"}
              fontFamily={"Inter, sans-serif"}
              letterSpacing={"0.8px"}
              color="#003544B3"
            >
              PASSWORD
            </Typography>
          </Grid>
          <Grid size={8}>
            <TextField
              control={control}
              name="password"
              placeholder="••••••••"
            />
          </Grid>
        </Grid>

        <Grid container alignItems={"center"}>
          <Grid size={4}>
            <Typography
              fontWeight={500}
              fontSize={"12px"}
              fontFamily={"Inter, sans-serif"}
              letterSpacing={"0.8px"}
              color="#003544B3"
            >
              CONFIRM
            </Typography>
          </Grid>
          <Grid size={8}>
            <TextField
              control={control}
              name="confirmPassword"
              placeholder="••••••••"
            />
          </Grid>
        </Grid>

        <Box
          mt={"60px"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            onClick={() => navigate("/login")}
            sx={{
              fontSize: "14px",
              color: "#4C616C",
              fontWeight: "regular",
              fontFamily: "Inter",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Already have an account?
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#003544",
              borderRadius: "8px",
              height: "52px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
            }}
            endIcon={<ArrowRightAltSharp />}
          >
            Create Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterRightPanel;
