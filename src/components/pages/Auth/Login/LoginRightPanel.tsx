import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ArrowRightAltSharp } from "@mui/icons-material";
import TextField from "@/components/ui/Forms/TextField/TextField";
import Checkbox from "@/components/ui/Forms/Checkbox/Checkbox";
import { useNavigate } from "react-router";
import session from "@/utils/session";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import services from "@/services";
import { LoginPayload, loginSchema } from "@/services/api/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import { NetworkError } from "@/utils/network";
import { BaseApiResponse } from "@/types/api";
import toast from "react-hot-toast";

const LoginRightPanel = (): React.ReactElement => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (formValue: LoginPayload) => {
    setLoading(true);

    try {
      const response = await services.auth.login(
        formValue
      );

      const token = response.data.data?.token;

      if (token) {
        session.setSession(token);
      }
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const networkError = error as NetworkError<BaseApiResponse>;
      const errorMessage = networkError.response?.data?.error
        || networkError.response?.data?.message
        || 'Silahkan coba lagi.';

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
        <Stack
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          spacing={3}
          sx={{ width: "100%", maxWidth: "448px", px: 4 }}
        >
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
              name="email"
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

            <Checkbox
              control={control}
              name="remember_me"
              label="Remember this device"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            loading={loading}
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
              onClick={() => navigate(ROUTES.REGISTER)}
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
