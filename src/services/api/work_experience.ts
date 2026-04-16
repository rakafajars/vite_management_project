import { BaseApiResponse } from "@/types/api";
import network from "@/utils/network";
import * as Yup from 'yup';

export interface WorkExperienceResponseData {
    ID: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    user_id: number;
    company_name: string;
    position: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
}

export interface WorkExperienceRequestParams {
    page?: number,
    search?: string,
    limit?: number;
    sort?: string;
}



export const workExperienceSchema = Yup.object({
    company_name: Yup.string().required("Company Name tidak boleh kosong").min(3, "Minimal 3 karakter"),
    position: Yup.string().required("Position Name tidak boleh kosong").min(3, "Minimal 3 karakter"),
    start_date: Yup.string().required("Start Date tidak boleh kosong"),
    end_date: Yup.string().nullable().when('is_current', {
        is: false,
        then: (schema) => schema.required("End Date tidak boleh kosong"),
    }),
    is_current: Yup.boolean().required("Is Current tidak boleh kosong"),
    description: Yup.string().required("Description tidak boleh kosong").min(3, "Minimal 3 karakter"),
})

export interface WorkExperiencePayload {
    company_name: string;
    position: string;
    start_date: string;
    end_date?: string | null;
    is_current: boolean;
    description: string;
}


const WorkExperience = {
    workExperience({
        page = 1,
        limit = 10,
        search = "",
        sort = ""
    }: WorkExperienceRequestParams = {}) {
        return network.get<BaseApiResponse<WorkExperienceResponseData[]>>('/v1/work-experience', {
            params: {
                page, limit, search, sort,
            }
        });
    },


    deleteExperience(id: number) {
        return network.delete(`/v1/work-experience/${id}`);
    },


    createWorkExperience(payload: WorkExperiencePayload) {
        return network.post<BaseApiResponse>('/v1/work-experience', payload);

    },

    detailWorkExperience(id: number) {
        return network.get<BaseApiResponse<WorkExperienceResponseData>>(`/v1/work-experience/${id}`);
    },

    updateWorkExperience(payload: WorkExperiencePayload, id: number) {
        return network.put<BaseApiResponse>(`/v1/work-experience/${id}`, payload);
    },
}


export default WorkExperience;