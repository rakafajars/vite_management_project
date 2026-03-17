import { Paper, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import Select from "../../../ui/Forms/Select";
import TextField from "../../../ui/Forms/TextField"; // Perbaikan typo dari TextFeild

// 1. Definisikan Interface untuk Form
// Ini seperti membuat Data Model di Flutter
interface LoginFormInputs {
  username: string;
  category: string;
}

const Login = () => {
  // 2. Pasang Interface ke useForm
  const { control, watch } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      category: "",
    },
  });

  // TypeScript sekarang tahu kalau username & category adalah string
  const username = watch("username");
  const category = watch("category");

  console.log("username:", username);
  console.log("category:", category);

  return (
    <Stack
      spacing={2}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ height: "100vh" }} // Gunakan sx untuk konsistensi di MUI
    >
      <Paper
        sx={{
          width: 600,
          padding: 3, // Sedikit lebih besar agar tidak terlalu sesak
        }}
      >
        <Stack spacing={3}>
          {/* name di sini sekarang punya autocomplete (username/category) */}
          <TextField 
            name="username" 
            control={control} 
            label="Username" 
          />
          
          <Select
            name="category"
            control={control}
            label="Pilih Kategori"
            id="category-select"
            options={[
              { value: "Kategori 1", label: "Kategori 1" },
              { value: "Kategori 2", label: "Kategori 2" },
              { value: "Kategori 3", label: "Kategori 3" },
            ]}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Login;