import SidebarLayout from "@/components/layouts/SidebarLayout";
import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";



const Skills = () => {
    return <SidebarLayout pageTitle="Skills" breadcrumbs={[{
        label: "Skills",
        href: "/skills"
    }]}><Paper sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        background: "white",
    }}>        <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1}
        sx={{ mb: 2 }}
    >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Daftar Skills
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{
                        bgcolor: "#003544",
                        textTransform: "none",
                        "&:hover": { bgcolor: "#002530" },
                    }}
                >
                    Tambah
                </Button>
            </Stack>

        </Paper>
    </SidebarLayout>
}


export default Skills;