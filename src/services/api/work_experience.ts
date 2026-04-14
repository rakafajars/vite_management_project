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
    start_date: Date;
    end_date: Date | null;
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
    end_date: Yup.string().required("End Date tidak boleh kosong"),
    is_current: Yup.boolean().required("Is Current tidak boleh kosong"),
    description: Yup.string().required("Description tidak boleh kosong").min(3, "Minimal 3 karakter"),
})

export type WorkExperiencePayload = Yup.InferType<typeof workExperienceSchema>;


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

    }
}


export default WorkExperience;