import { Paper, Stack, Typography, colors } from "@mui/material";
import Dropdown from "../../../ui/Forms/Dropdown";
import { Settings } from "@mui/icons-material";
import Avatar from "../../../ui/Avatar";
import SidebarLayout from "../../../layouts/SidebarLayout";

// const DetailProject = () => {
//   return (
//     <Stack
//       sx={{
//         height: "100vh",
//         width: "100%",
//       }}
//       justifyContent={"center"}
//       alignItems={"center"}
//     >
//       <Avatar
//         text="Raka Fajar"
//         onClick={() => {
//           console.log("handle click avatar");
//         }}
//       />

//       <Dropdown
//         icon={<Settings />}
//         options={[
//           {
//             label: "Tutup proyek ini",
//             onClick: () => {
//               console.log("handle close project");
//             },
//           },
//           {
//             label: "Ubah deadline",
//             onClick: () => {
//               console.log("handle update deadline project");
//             },
//           },
//         ]}
//       />
//     </Stack>
//   );
// };

const DetailProject = () => {
  return (
    <SidebarLayout
      pageTitle="Daftar Proyek"
      breadcrumbs={[
        {
          label: "Daftar Pryoek",
          href: "/projects",
        },
      ]}
    >
      <Paper
        sx={{
          padding: 2,
          background: colors.lightBlue[100],
        }}
      >
        <Typography>Menampilkan Daftar Projects</Typography>
      </Paper>
    </SidebarLayout>
  );
};
export default DetailProject;
