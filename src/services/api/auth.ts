import network from "@/utils/network"


import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email("Format email salah").required("Email wajib diisi"),
    password: Yup.string().min(6, "Minimal 6 karakter").required("Password wajib diisi"),
});

export type LoginPayload = Yup.InferType<typeof loginSchema>;

export interface LoginResponse {
    status: string;
    response_code: number;
    message: string;
    data: {
        token: string;
    };
}


const auth = {
    login(payload: LoginPayload) {
        return network.post<LoginResponse>('/login', payload);
    }
}



export default auth;