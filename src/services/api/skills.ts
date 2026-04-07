import { BaseApiResponse } from "@/types/api";
import network from "@/utils/network";
import * as Yup from 'yup';



export interface SkillsResponseData {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: null;
    user_id: number;
    name: string;
    level: string;
    category: string;
}




export interface SkillsRequestParams {
    page?: number,
    search?: string,
    limit?: number;
    sort?: string;
}


export const skillSchema = Yup.object({
    name: Yup.string().required(),
    level: Yup.string().required(),
    category: Yup.string().required(),
})


export type SkillPayload = Yup.InferType<typeof skillSchema>

const Skills = {
    skills({
        page = 1,
        limit = 10,
        search = "",
        sort = "",
    }: SkillsRequestParams = {}) {
        return network.get<BaseApiResponse<SkillsResponseData[]>>('/v1/skill', {
            params: {
                page, limit, search, sort,
            }
        });
    },

    deleteSkill(id: number) {
        return network.delete(`/v1/skill/${id}`);
    },

    createSkill(payload: SkillPayload) {
        return network.post<BaseApiResponse>("/v1/skill", payload);
    }
}

export default Skills;