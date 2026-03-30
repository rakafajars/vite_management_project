import { BaseApiResponse } from "@/types/api";
import network from "@/utils/network";

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
}

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
};

export default education;
