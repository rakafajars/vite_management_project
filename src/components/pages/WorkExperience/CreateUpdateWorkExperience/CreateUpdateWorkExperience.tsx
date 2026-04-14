import SidebarLayout from "@/components/layouts/SidebarLayout";
import FormActions from "@/components/ui/FormActions";
import Checkbox from "@/components/ui/Forms/Checkbox/Checkbox";
import DatePicker from "@/components/ui/Forms/DatePicker";
import TextField from "@/components/ui/Forms/TextField/TextField";
import { ROUTES } from "@/constants/routes";
import services from "@/services";
import { WorkExperiencePayload, workExperienceSchema } from "@/services/api/work_experience";
import { BaseApiResponse } from "@/types/api";
import { NetworkError } from "@/utils/network";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";



const CreateUpdateWorkExperience = () => {


    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm<WorkExperiencePayload>({
        resolver: yupResolver(workExperienceSchema),
        defaultValues: {
            is_current: false,
        }
    })
    const navigate = useNavigate();


    const onSubmit = async (formValue: WorkExperiencePayload) => {
        setLoading(true);

        try {
            const response = await services.workExperience.createWorkExperience(formValue);
            navigate(ROUTES.WORK_EXPERIENCE)

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

    return (
        <SidebarLayout
            breadcrumbs={[
                {
                    label: "Pengalaman Kerja",
                    href: ROUTES.CREATE_UPDATE_WORK_EXPERIENCE,
                }, {
                    label: "Tambah Pengalaman Kerja",
                    href: ROUTES.CREATE_UPDATE_WORK_EXPERIENCE,
                },
            ]} >
            <Paper
                sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 3,
                    background: "white",
                }}
            >
                <Box
                    component="form" onSubmit={handleSubmit(onSubmit)}
                >
                    <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                        }} >
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
                                Nama Perusahaan
                            </Typography>
                        </Box>
                        <TextField
                            control={control}
                            name="company_name"
                            type="text"
                            placeholder="Masukkan Nama Perusahaan"
                            marginBottom="0"
                        />
                    </Box>

                    <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                        }} >
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
                                Nama Position
                            </Typography>
                        </Box>
                        <TextField
                            control={control}
                            name="position"
                            type="text"
                            placeholder="Masukkan Position"
                            marginBottom="0"
                        />
                    </Box>


                    <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
                        <DatePicker control={control} name="start_date" label="Tanggal Bekerja" />
                        <DatePicker control={control} name="end_date" label="Tanggal Selesai Bekerja" />
                        <Checkbox
                            control={control}
                            name="is_current"
                            label="Saya masih bekerja saat ini"
                            paddingTop="0"
                        />
                    </Box>


                    <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                        }} >
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
                                Description
                            </Typography>
                        </Box>
                        <TextField
                            control={control}
                            name="description"
                            type="text"
                            placeholder="Masukkan Description"
                            marginBottom="0"
                        />
                    </Box>



                    <FormActions
                        onCancel={() => navigate(ROUTES.CREATE_UPDATE_WORK_EXPERIENCE,)}
                        loading={loading}
                    />

                </Box>
            </Paper>
        </SidebarLayout>
    );
}

export default CreateUpdateWorkExperience;