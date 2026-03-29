import { BaseApiResponse } from "@/types/api";
import network from "@/utils/network";




export interface WorkExperienceResponseData {
    id: number;
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


const WorkExperience = {
    workExperince() {
        return network.get<BaseApiResponse<WorkExperienceResponseData[]>>('/v1/work-experience',);
    }
}


export default WorkExperience;