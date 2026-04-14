import SidebarLayout from "@/components/layouts/SidebarLayout";
import TextField from "@/components/ui/Forms/TextField/TextField";
import services from "@/services";
import { ProjectPayload, projectSchema } from "@/services/api/project";
import { BaseApiResponse } from "@/types/api";
import { NetworkError } from "@/utils/network";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Typography } from "@mui/material";
import FormActions from "@/components/ui/FormActions";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { ROUTES } from "@/constants/routes";

const CreateUpdateProject = () => {

    const { id } = useParams(); // mengambil id dari url
    const isEdit = Boolean(id); // jika ada ID, berarti sedang edit


    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, reset } = useForm<ProjectPayload>({
        resolver: yupResolver(projectSchema),
    })

    useEffect(() => {
        if (isEdit && id) {
            const fetchDetailProject = async () => {
                try {
                    const response = await services.project.DetailProject(Number(id))

                    if (response.data.data) {
                        const project = response.data.data;
                        reset({
                            title: project.title,
                            description: project.description,
                            link: project.link,
                            tech_stack: project.tech_stack,
                        });
                    }
                } catch (error) {
                    const networkError = error as NetworkError<BaseApiResponse>;
                    const errorMessage = networkError.response?.data?.error
                        || networkError.response?.data?.message
                        || 'Silahkan coba lagi.';
                    toast.error(errorMessage)
                }
            }


            fetchDetailProject();
        }
    }, [id, isEdit, reset])


    const onSubmit = async (formValue: ProjectPayload) => {
        setLoading(true);

        try {
            let response;

            if (isEdit && id) {
                response = await services.project.updateProject(formValue, Number(id));
            } else {
                response = await services.project.createProject(formValue);
            }

            navigate(ROUTES.PROJECT)

            toast.success(response.data.message ?? (isEdit && id ? "Berhasil Mengubah Project" : "Berhasil Membuat Project"));
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
                    label: isEdit ? "Update Project" : "Create Project",
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

                    <FormActions
                        onCancel={() => navigate(ROUTES.PROJECT)}
                        loading={loading}
                    />
                </Box>
            </Paper>
        </SidebarLayout>
    );
}

export default CreateUpdateProject;