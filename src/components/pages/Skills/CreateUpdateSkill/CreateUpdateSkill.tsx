import SidebarLayout from "@/components/layouts/SidebarLayout";
import { ROUTES } from "@/constants/routes";
import { Box, Paper } from "@mui/material"




const CreateUpdateSkill = () => {
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
        </Paper>
    </SidebarLayout>
}

export default CreateUpdateSkill;