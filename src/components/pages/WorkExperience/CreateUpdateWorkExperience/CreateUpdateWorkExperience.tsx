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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";



const CreateUpdateWorkExperience = () => {
    const { id } = useParams(); // mengambil id dari url
    const isEdit = Boolean(id); // jika ada ID, berarti sedang edit

    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, reset } = useForm<WorkExperiencePayload>({
        resolver: yupResolver(workExperienceSchema) as any,
        defaultValues: {
            is_current: false,
        }
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit && id) {
            const fetchDetailWorkExperience = async () => {
                try {
                    const response = await services.workExperience.detailWorkExperience(Number(id))


                    if (response.data.data) {
                        const workExperience = response.data.data;
                        reset({
                            company_name: workExperience.company_name,
                            description: workExperience.description,
                            end_date: workExperience.end_date,
                            is_current: workExperience.is_current,
                            position: workExperience.position,
                            start_date: workExperience.start_date,
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


            fetchDetailWorkExperience();
        }
    }, [id, isEdit, reset])


    const onSubmit = async (formValue: WorkExperiencePayload) => {
        setLoading(true);

        try {

            let response;

            if (isEdit && id) {
                response = await services.workExperience.updateWorkExperience(formValue, Number(id));

            } else {
                response = await services.workExperience.createWorkExperience(formValue);

            }

            navigate(ROUTES.WORK_EXPERIENCE)

            toast.success(response.data.message ?? (isEdit && id ? "Berhasil Mengubah Pengalaman Pekerjaan" : "Berhasil Membuat Pengalaman Pekerjaan"));
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
                    label: isEdit ? "Ubah Pengalaman Kerja" : "Tambah Pengalaman Kerja",
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