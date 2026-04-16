import session from './session';

export class NetworkError<T = any> extends Error {
    response?: {
        data: T;
        status: number;
        statusText: string;
        headers: Headers;
    };

    constructor(message: string, response?: NetworkError['response']) {
        super(message);
        this.name = 'NetworkError';
        this.response = response;
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}

const baseURL = "/api";

const network = {
    async request<T>(url: string, options: RequestInit & { params?: Record<string, any> } = {}): Promise<{ data: T }> {
        const { params, ...fetchOptions } = options;

        let fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
        
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
            const queryString = searchParams.toString();
            if (queryString) {
                fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString;
            }
        }

        const token = session.getSession();
        const headers = new Headers(fetchOptions.headers);

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        if (!headers.has("Content-Type") && !(fetchOptions.body instanceof FormData)) {
            headers.set("Content-Type", "application/json");
        }

        try {
            const response = await fetch(fullUrl, {
                ...fetchOptions,
                headers,
            });

            if (response.status === 401) {
                console.log("Token tidak valid, sesi akan dihapus");
                session.clearSession();
            }

            let data: any;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                const errorMessage = data?.error || data?.message || response.statusText || "Network response was not ok";
                throw new NetworkError(errorMessage, {
                    data,
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers,
                });
            }

            return { data };
        } catch (error) {
            if (error instanceof NetworkError) {
                throw error;
            }
            console.log("network error: ", error);
            throw error;
        }
    },

    get<T>(url: string, config: any = {}) {
        return this.request<T>(url, { ...config, method: "GET" });
    },

    post<T>(url: string, data?: any, config: any = {}) {
        return this.request<T>(url, {
            ...config,
            method: "POST",
            body: data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined),
        });
    },

    put<T>(url: string, data?: any, config: any = {}) {
        return this.request<T>(url, {
            ...config,
            method: "PUT",
            body: data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined),
        });
    },

    patch<T>(url: string, data?: any, config: any = {}) {
        return this.request<T>(url, {
            ...config,
            method: "PATCH",
            body: data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined),
        });
    },

    delete<T>(url: string, config: any = {}) {
        return this.request<T>(url, { ...config, method: "DELETE" });
    },
};

export default network;