import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ArrowRightAltSharp } from "@mui/icons-material";
import TextField from "@/components/ui/Forms/TextField/TextField";
import { useNavigate } from "react-router";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginRightPanel = (): React.ReactElement => {
  const { control } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  return (
    <Box bgcolor={"white"} flex={2} position={"relative"}>
      <Box
        position={"absolute"}
        top={24}
        right={24}
        borderRadius={"12px"}
        paddingX={"16px"}
        paddingY={"6px"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"8px"}
        sx={{
          backgroundColor: "#FFDCC1",
        }}
      >
        <Box
          height={"10px"}
          width={"10px"}
          bgcolor={"#4C2700"}
          borderRadius={100}
        />
        <Typography
          fontFamily={"Inter, sans-serif"}
          sx={{
            fontSize: "12px",
            fontWeight: "medium",
            color: "#2E1500",
            letterSpacing: "1.2px",
          }}
        >
          SECURE ACCESS
        </Typography>
      </Box>
      <Box
        justifyContent={"center"}
        display={"flex"}
        height={"100vh"}
        flexDirection={"column"}
        alignItems={"center"}
        textAlign={"left"}
      >
        <Stack spacing={3} sx={{ width: "100%", maxWidth: "448px", px: 4 }}>
          <Box
            sx={{
              textAlign: "left",
            }}
          >
            <Typography
              fontFamily={"Manrope, sans-serif"}
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#003544",
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              fontFamily={"Inter, sans-serif"}
              sx={{
                fontSize: "16",
                fontWeight: "medium",
                color: "#4C616C",
                paddingBottom: "40px",
              }}
            >
              Continue drafting your professional story.
            </Typography>
            <TextField
              control={control}
              name="username"
              label="Email Address"
              placeholder="name@architect.com"
              marginBottom={"32px"}
            />
            <TextField
              control={control}
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              marginBottom={"0px"}
              rightLabel={
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#003544",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </Typography>
              }
            />

            <FormControlLabel
              sx={{
                paddingTop: "32px",
                gap: "8px",
                margin: 0,
                "& .MuiFormControlLabel-label": {
                  margin: 0,
                },
              }}
              control={
                <Checkbox
                  defaultChecked={false}
                  sx={{
                    padding: "0",
                    color: "#E7E8E9",
                    "& .MuiSvgIcon-root": {
                      fontSize: 20, // Opsional: mengatur ukuran icon
                      color: "#E7E8E9",
                    },
                    "&.Mui-checked .MuiSvgIcon-root": {
                      color: "#003544",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#4C616C",
                  }}
                >
                  Remember this device
                </Typography>
              }
            />
          </Box>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#003544",
              borderRadius: "8px",
              height: "60px",
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "none",
            }}
            endIcon={<ArrowRightAltSharp />}
          >
            Sign In
          </Button>

          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "medium",
              color: "#4C616C",
            }}
            textAlign={"center"}
          >
            Don't have an acount?{" "}
            <span
              style={{
                color: "#003544",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={() => navigate("/register")}
            >
              Create an Account
            </span>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginRightPanel;
