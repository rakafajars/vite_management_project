import { BaseApiResponse } from "@/types/api";
import network from "@/utils/network";

export interface ProjectRequestParams {
    page?: number,
    search?: string,
    limit?: number;
    sort?: string;
}


export interface ProjectResponseData {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: null;
    user_id: number;
    title: string;
    description: string;
    link: string;
    tech_stack: string;
}

const project = {
    project({
        page = 1,
        limit = 10,
        search = "",
        sort = ""
    }: ProjectRequestParams = {}) {
        return network.get<BaseApiResponse<ProjectResponseData[]>>('/v1/project', {
            params: {
                page, limit, search, sort,
            }
        });
    },


    deleteProject(id: number) {
        return network.delete(`/v1/project/${id}`);
    }
}


export default project;