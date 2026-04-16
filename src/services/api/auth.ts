import network from "@/utils/network"
import { BaseApiResponse } from "@/types/api";

import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email("Format email salah").required("Email wajib diisi"),
    password: Yup.string().min(6, "Minimal 6 karakter").required("Password wajib diisi"),
    remember_me: Yup.boolean().default(false),
});


export const registerSchema = Yup.object({
    email: Yup.string().email("Format email salah").required("Email wajib diisi"),
    password: Yup.string().min(6, "Minimal 6 karakter").required("Password wajib diisi"),
});

export type LoginPayload = Yup.InferType<typeof loginSchema>;

export type RegisterPayload = Yup.InferType<typeof registerSchema>;

export interface LoginResponseData {
    token: string;
}

export interface RegisterResponseData {
    email: string;
    id: number;
}


const auth = {
    login(payload: LoginPayload) {
        return network.post<BaseApiResponse<LoginResponseData>>('/v1/login', payload);
    },

    register(payload: RegisterPayload) {
        return network.post<BaseApiResponse<RegisterResponseData>>('/v1/register', payload);
    }
}



export default auth;