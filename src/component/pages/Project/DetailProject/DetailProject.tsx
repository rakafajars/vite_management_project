import { Stack } from "@mui/material";
import Dropdown from "../../../ui/Forms/Dropdown";
import { Settings } from "@mui/icons-material";
import Avatar from "../../../ui/Avatar";

const DetailProject = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Avatar
        text="Raka Fajar"
        onClick={() => {
          console.log("handle click avatar");
        }}
      />

      <Dropdown
        icon={<Settings />}
        options={[
          {
            label: "Tutup proyek ini",
            onClick: () => {
              console.log("handle close project");
            },
          },
          {
            label: "Ubah deadline",
            onClick: () => {
              console.log("handle update deadline project");
            },
          },
        ]}
      />
    </Stack>
  );
};

export default DetailProject;
