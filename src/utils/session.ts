const TOKEN_KEY = "my-token";


const session = {
    setSession(token: string) {
        return localStorage.setItem(TOKEN_KEY, token)
    },
    getSession() {
        return localStorage.getItem(TOKEN_KEY);

    },
    clearSession() {
        return localStorage.removeItem(TOKEN_KEY);
    },
    isAuthenticated() {
        const session = localStorage.getItem(TOKEN_KEY);

        return !!session;
    }
}


export default session;