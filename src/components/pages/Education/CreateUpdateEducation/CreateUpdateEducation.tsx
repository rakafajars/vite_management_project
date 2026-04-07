import SidebarLayout from "@/components/layouts/SidebarLayout";
import TextField from "@/components/ui/Forms/TextField/TextField";
import { ROUTES } from "@/constants/routes";
import services from "@/services";
import { EducationPayload, educationSchema } from "@/services/api/education";
import { BaseApiResponse } from "@/types/api";
import { NetworkError } from "@/utils/network";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Checkbox from "@/components/ui/Forms/Checkbox/Checkbox";
import DatePicker from "@/components/ui/Forms/DatePicker";
import FormActions from "@/components/ui/FormActions";


const CreateUpdateEducation = () => {


    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm<EducationPayload>({
        resolver: yupResolver(educationSchema),
        defaultValues: {
            is_current: false,
        }
    })
    const navigate = useNavigate();


    const onSubmit = async (formValue: EducationPayload) => {
        setLoading(true);

        try {
            const response = await services.education.createEducation(formValue);
            navigate(ROUTES.EDUCATION)

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


    return <SidebarLayout
        breadcrumbs={[
            {
                label: "Pendidikan",
                href: ROUTES.EDUCATION,
            },
            {
                label: "Tambah Pendidikan",
                href: ROUTES.CREATE_UPDATE_EDUCATION,
            },
        ]}
    >
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
                            Nama Institution
                        </Typography>
                    </Box>
                    <TextField
                        control={control}
                        name="institution"
                        type="text"
                        placeholder="Masukkan Nama Institution"
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
                            Gelar
                        </Typography>
                    </Box>
                    <TextField
                        control={control}
                        name="degree"
                        type="text"
                        placeholder="Masukkan Nama Gelar"
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
                            Jurusan
                        </Typography>
                    </Box>
                    <TextField
                        control={control}
                        name="field_of_study"
                        type="text"
                        placeholder="Masukkan Jurusan"
                        marginBottom="0"
                    />
                </Box>

                {/* TODO: MEMBUAT START DATE DAN END DATE */}

                <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
                    <DatePicker control={control} name="start_date" label="Tanggal Kuliah" />
                    <DatePicker control={control} name="end_date" label="Selesai Kuliah" />
                    <Checkbox
                        control={control}
                        name="is_current"
                        label="Saya masih menempuh pendidikan"
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
                            GPA
                        </Typography>
                    </Box>
                    <TextField
                        control={control}
                        name="gpa"
                        type="number"
                        placeholder="Masukkan GPA"
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
                    onCancel={() => navigate(ROUTES.EDUCATION,)}
                    loading={loading}
                />


            </Box>
        </Paper>
    </SidebarLayout >
}



export default CreateUpdateEducation;