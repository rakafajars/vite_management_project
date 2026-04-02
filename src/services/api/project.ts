import { BaseApiResponse } from "@/types/api";
import network from "@/utils/network";
import * as Yup from 'yup';

export interface ProjectRequestParams {
    page?: number,
    search?: string,
    limit?: number;
    sort?: string;
}

export const projectSchema = Yup.object({
    title: Yup.string().required("Nama Project tidak boleh kosong").min(3, "Minimal 3 karakter"),
    description: Yup.string().required("Description tidak boleh kosong").min(3, "Minimal 3 karakter"),
    link: Yup.string().required("Link tidak boleh kosong").url("Format link tidak valid"),
    tech_stack: Yup.string().required("Tech Stack tidak boleh kosong"),

});


export type ProjectPayload = Yup.InferType<typeof projectSchema>;


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
    },


    createProject(payload: ProjectPayload) {
        return network.post<BaseApiResponse>('/v1/project', payload);
    }
}


export default project;