import network from "@/utils/network"


export interface LoginPayload {
    email: string;
    password: string;
}

const auth = {
    login(payload: LoginPayload) {
        return network.post('/auth/login', payload);
    }
}



export default auth;