import { BaseApiResponse } from "@/types/api";
import network from "@/utils/network";



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
    }
}





export default Skills;