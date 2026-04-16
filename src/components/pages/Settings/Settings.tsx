import { Paper, Typography, colors } from "@mui/material";
import SidebarLayout from "@/components/layouts/SidebarLayout";

const Settings = () => {
  return (
    <SidebarLayout pageTitle="Settings">
      <Paper
        sx={{
          padding: 2,
          background: colors.lightBlue[100],
        }}
      >
        <Typography>Menampilkan Settings</Typography>
      </Paper>
    </SidebarLayout>
  );
};

export default Settings;
