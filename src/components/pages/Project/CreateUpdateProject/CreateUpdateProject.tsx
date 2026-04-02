import SidebarLayout from "@/components/layouts/SidebarLayout";
import TextField from "@/components/ui/Forms/TextField/TextField";
import services from "@/services";
import { ProjectPayload, projectSchema } from "@/services/api/project";
import { BaseApiResponse } from "@/types/api";
import { NetworkError } from "@/utils/network";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ROUTES } from "@/constants/routes";

const CreateUpdateProject = () => {

    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm<ProjectPayload>({
        resolver: yupResolver(projectSchema),
    })


    const onSubmit = async (formValue: ProjectPayload) => {
        setLoading(true);

        try {
            const response = await services.project.createProject(formValue);
            navigate(ROUTES.PROJECT)

            toast.success(response.data.message ?? "Berhasil Membuat Project");
        } catch (error) {
            const networkError = error as NetworkError<BaseApiResponse>;
            const errorMessage = networkError.response?.data?.error
                || networkError.response?.data?.message
                || 'Silahkan coba lagi.';

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }



    const navigate = useNavigate();

    return (
        <SidebarLayout
            breadcrumbs={[
                {
                    label: "Project",
                    href: ROUTES.PROJECT,
                },
                {
                    label: "Create Project",
                    href: ROUTES.CREATE_UPDATE_PROJECT
                }
            ]}
        ><Paper sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 3,
            background: "white",
        }}>

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
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
                                Nama Project
                            </Typography>
                        </Box>
                        <TextField
                            control={control}
                            name="title"
                            type="text"
                            placeholder="Masukkan Nama Project"
                            marginBottom="0"
                        />
                    </Box>

                    <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
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
                                Deskripsi Project
                            </Typography>
                        </Box>
                        <TextField
                            control={control}
                            name="description"
                            type="text"
                            placeholder="Masukkan Deskripsi Project"
                            marginBottom="0"
                        />
                    </Box>

                    <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
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
                                Link
                            </Typography>
                        </Box>
                        <TextField
                            control={control}
                            name="link"
                            type="url"
                            placeholder="Masukkan Link Project"
                            marginBottom="0"
                        />
                    </Box>


                    <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
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
                                Tech Stack
                            </Typography>
                        </Box>
                        <TextField
                            control={control}
                            name="tech_stack"
                            type="text"
                            placeholder="Masukkan Tech Stack Project"
                            marginBottom="0"
                        />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        gap: 1,
                        width: "100%",
                        mt: 2
                    }}>
                        <Button
                            type="button"
                            variant="contained"
                            color="error"
                            sx={{
                                flex: 1,
                                borderRadius: "10px",
                                px: { xs: 3, md: 4 },
                                py: { xs: 1.5, md: 1.75 },
                                fontSize: { xs: "14px", md: "15px" },
                                fontWeight: 600,
                                textTransform: "none",
                                boxShadow: "0px 4px 12px 0px rgba(0, 53, 68, 0.15)",
                                "&:hover": {
                                    backgroundColor: "#d32f2f",
                                },
                            }}
                            onClick={() => navigate(ROUTES.PROJECT)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            loading={loading}
                            sx={{
                                flex: 1,
                                backgroundColor: "#003544",
                                borderRadius: "10px",
                                px: { xs: 3, md: 4 },
                                py: { xs: 1.5, md: 1.75 },
                                fontSize: { xs: "14px", md: "15px" },
                                fontWeight: 600,
                                textTransform: "none",
                                boxShadow: "0px 4px 12px 0px rgba(0, 53, 68, 0.15)",
                                "&:hover": {
                                    backgroundColor: "#002a35",
                                    boxShadow: "0px 6px 16px 0px rgba(0, 53, 68, 0.25)",
                                },
                            }}
                        >
                            Tambah
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </SidebarLayout>
    );
}

export default CreateUpdateProject