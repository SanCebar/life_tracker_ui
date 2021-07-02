import axios from "axios";

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "life_tracker_token"
    }

    setToken(token) {
        this.token = token 
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method = 'GET', data = {}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({ url, method, data, headers })
            return {data: res.data, error: null}
        } catch(error) {
            console.error({ errorResponse: error.response })
            const message = error?.response?.data?.error?.message
            return { data: null, error: message || String(error)}
        }
    }

    async logExercise(info) {
        return await this.request({ endpoint: `exercises`, method: `POST`, data: info})
    }

    async loginUser(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials})
    }

    async registerUser(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials})
    }

    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }

    async activityFeed() {
        return await this.request({ endpoint: `activity`, method: `GET`})
    }

    async exerciseFeed() {
        return await this.request({ endpoint: `exercises`, method: `GET`})
    }

}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001")