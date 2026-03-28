import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import TextField from "@/components/ui/Forms/TextField/TextField";
import { useState } from "react";
import { RegisterPayload, registerSchema } from "@/services/api/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import services from "@/services";
import Dialog, { DialogAction } from "@/components/ui/Dialog/Dialog";
import { AxiosError } from "axios";
import { BaseApiResponse } from "@/types/api";


const RegisterRightPanel = () => {

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    message: "",
  });

  const [dialogActions, setDialogActions] = useState<DialogAction[]>([]);



  const { control, handleSubmit } = useForm<RegisterPayload>({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (formValue: RegisterPayload) => {
    setLoading(true);

    try {
      await services.auth.register(
        formValue
      );

      navigate('/login')
    } catch (error) {
      const axiosError = error as AxiosError<BaseApiResponse>;
      const errorMessage = axiosError.response?.data?.error 
                        || axiosError.response?.data?.message 
                        || 'Silahkan coba lagi.';

      setOpenDialog(true);
      setDialogMessage({
        title: 'Oops...',
        message: errorMessage
      });
      setDialogActions([
        {
          label: 'Okay',
          onClick() {
            setOpenDialog(false)
          }
        }
      ])
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        flex: { xs: "1", lg: "1 1 55%" },
        maxWidth: { lg: "650px" },
        width: "100%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: "24px", md: "32px" },
          p: { xs: 3, sm: 4, md: 5 },
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 10px 40px 0px rgba(0, 31, 41, 0.06)",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: { xs: "11px", md: "12px" },
              fontWeight: 500,
              letterSpacing: "1.8px",
              color: "#003544",
              opacity: 0.6,
              mb: 1.5,
            }}
          >
            PHASE: INITIATION
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: "Manrope, sans-serif",
              fontSize: { xs: "26px", md: "32px" },
              fontWeight: 700,
              color: "#003544",
            }}
          >
            Create Account
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name Field */}
          {/* <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.8px",
                  color: "#003544",
                  opacity: 0.7,
                  width: { xs: "100%", sm: "140px" },
                  flexShrink: 0,
                }}
              >
                FULL NAME
              </Typography>
            </Box>
            <TextField
              control={control}
              name="fullname"
              placeholder="Alexander Wright"
              marginBottom="0"
            />
          </Box> */}

          {/* Email Field */}
          <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.8px",
                  color: "#003544",
                  opacity: 0.7,
                  width: { xs: "100%", sm: "140px" },
                  flexShrink: 0,
                }}
              >
                EMAIL ADDRESS
              </Typography>
            </Box>
            <TextField
              control={control}
              name="email"
              type="email"
              placeholder="alex@studio.com"
              marginBottom="0"
            />
          </Box>

          {/* Password Field */}
          <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.8px",
                  color: "#003544",
                  opacity: 0.7,
                  width: { xs: "100%", sm: "140px" },
                  flexShrink: 0,
                }}
              >
                PASSWORD
              </Typography>
            </Box>
            <TextField
              control={control}
              name="password"
              type="password"
              placeholder="••••••••"
              marginBottom="0"
            />
          </Box>

          {/* Confirm Password Field */}
          {/* <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.8px",
                  color: "#003544",
                  opacity: 0.7,
                  width: { xs: "100%", sm: "140px" },
                  flexShrink: 0,
                }}
              >
                CONFIRM
              </Typography>
            </Box>
            <TextField
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              marginBottom="0"
            />
          </Box> */}

          {/* Footer Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              onClick={() => navigate("/login")}
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#4C616C",
                textDecoration: "underline",
                cursor: "pointer",
                order: { xs: 2, sm: 1 },
                textAlign: { xs: "center", sm: "left" },
                "&:hover": {
                  color: "#003544",
                },
              }}
            >
              Already have an account?
            </Typography>
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForward />}
              loading={loading}
              sx={{
                backgroundColor: "#003544",
                borderRadius: "10px",
                px: { xs: 3, md: 4 },
                py: { xs: 1.5, md: 1.75 },
                fontSize: { xs: "14px", md: "15px" },
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                textTransform: "none",
                order: { xs: 1, sm: 2 },
                boxShadow: "0px 4px 12px 0px rgba(0, 53, 68, 0.15)",
                "&:hover": {
                  backgroundColor: "#002a35",
                  boxShadow: "0px 6px 16px 0px rgba(0, 53, 68, 0.25)",
                },
              }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Paper>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title={dialogMessage.title}
        message={dialogMessage.message}
        actions={dialogActions}
      />
    </Box>
  );
};

export default RegisterRightPanel;
