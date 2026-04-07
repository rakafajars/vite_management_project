import SidebarLayout from "@/components/layouts/SidebarLayout";
import FormActions from "@/components/ui/FormActions";
import Dropdown from "@/components/ui/Forms/Dropdown";
import TextField from "@/components/ui/Forms/TextField/TextField";
import { ROUTES } from "@/constants/routes";
import services from "@/services";
import { SkillPayload, skillSchema } from "@/services/api/skills";
import { BaseApiResponse } from "@/types/api";
import { NetworkError } from "@/utils/network";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Typography } from "@mui/material"
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";




const CreateUpdateSkill = () => {
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<SkillPayload>({
        resolver: yupResolver(skillSchema),
    });
    const [loading, setLoading] = useState(false);


    const onSubmit = async (formValue: SkillPayload) => {
        setLoading(true);

        try {
            const response = await services.skills.createSkill(formValue);
            navigate(ROUTES.SKILLS)

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


    const levelOptions = [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Intermediate', value: 'Intermediate' },
        { label: 'Advanced', value: 'Advanced' },
        { label: 'Expert', value: 'Expert' },
    ];



    return <SidebarLayout
        breadcrumbs={[


            {
                label: "Keahlian",
                href: ROUTES.SKILLS,
            },

            {
                label: "Create Keahlian",
                href: ROUTES.CREATE_UPDATE_SKILL,
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
                            Nama Skill
                        </Typography>
                    </Box>

                    <TextField
                        control={control}
                        name="name"
                        type="text"
                        placeholder="Masukkan Nama Skill"
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
                                mb: 1
                            }}
                        >
                            Level
                        </Typography>
                    </Box>

                    <Dropdown
                        control={control}
                        name="level"
                        options={levelOptions}
                        placeholder="Pilih Level"
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
                            Category
                        </Typography>
                    </Box>

                    <TextField
                        control={control}
                        name="category"
                        type="text"
                        placeholder="Masukkan Category"
                        marginBottom="0"
                    />
                </Box>

                <FormActions
                    onCancel={() => navigate(ROUTES.SKILLS,)}
                    loading={loading}
                />
            </Box>
        </Paper>
    </SidebarLayout>
}

export default CreateUpdateSkill;