import { BaseApiResponse } from "@/types/api";
import network from "@/utils/network";
import * as Yup from 'yup';

export interface EducationRequestParams {
    page?: number;
    search?: string;
    limit?: number;
    sort?: string;
}

export interface EducationResponseData {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: null;
    user_id: number;
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    gpa: number;
    is_current: boolean;
    description: string;
}


export const educationSchema = Yup.object({
    institution: Yup.string().required("Institution tidak boleh kosong").min(3, "Minimal 3 karakter"),
    degree: Yup.string().required("Degree tidak boleh kosong").min(3, "Minimal 3 karakter"),
    field_of_study: Yup.string().required("Field of Study tidak boleh kosong").min(3, "Minimal 3 karakter"),
    start_date: Yup.string().required("Start Date tidak boleh kosong"),
    end_date: Yup.string().required("End Date tidak boleh kosong"),
    gpa: Yup.number().required("GPA tidak boleh kosong").min(0, "GPA tidak boleh negatif").max(4, "GPA tidak boleh lebih dari 4"),
    is_current: Yup.boolean().required("Is Current tidak boleh kosong"),
    description: Yup.string().required("Description tidak boleh kosong")
});


export type EducationPayload = Yup.InferType<typeof educationSchema>;


const education = {
    education({
        page = 1,
        limit = 10,
        search = "",
        sort = "",
    }: EducationRequestParams = {}) {
        return network.get<BaseApiResponse<EducationResponseData[]>>('/v1/education', {
            params: {
                page, limit, search, sort,
            },
        });
    },

    deleteEducation(id: number) {
        return network.delete(`/v1/education/${id}`);
    },

    createEducation(payload: EducationPayload) {
        return network.post<BaseApiResponse>('/v1/education', payload);
    },


    detailEducation(id: number) {
        return network.get<BaseApiResponse<EducationResponseData>>(`/v1/education/${id}`);
    },

    updateEducation(payload: EducationPayload, id: number) {
        return network.put<BaseApiResponse>(`/v1/education/${id}`, payload);
    },


};

export default education;
