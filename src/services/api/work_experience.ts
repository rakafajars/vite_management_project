import { BaseApiResponse } from "@/types/api";
import network from "@/utils/network";




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
    }
}


export default WorkExperience;