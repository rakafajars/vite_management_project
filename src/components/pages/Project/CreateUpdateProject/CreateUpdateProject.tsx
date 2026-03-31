import SidebarLayout from "@/components/layouts/SidebarLayout";
import TextField from "@/components/ui/Forms/TextField/TextField";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const CreateUpdateProject = () => {


    const { control, handleSubmit } = useForm({})

    return (
        <SidebarLayout
            // pageTitle="Create Project"
            breadcrumbs={[
                {
                    label: "Project",
                    href: "/project",
                },
                {
                    label: "Create Project",
                    href: "/create-update-project"
                }
            ]}
        ><Paper sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 3,
            background: "white",
        }}>

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
                        name="nama-project"
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
                        name="deskripsi-project"
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
                        name="link-project"
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
                        name="tech-stack-project"
                        type="url"
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
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
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
            </Paper>
        </SidebarLayout>
    );
}

export default CreateUpdateProject