import axios from 'axios'
import { JWTToken } from '../../types/JWT'

export default class ApiClient {
    private baseUrl: string | undefined
    private jwtToken: string

    constructor(jwtToken: JWTToken) {
        this.baseUrl = process.env.REACT_APP_API_URL
        if (!this.baseUrl) {
            throw new Error('API url is missing from env configuration')
        }
        this.jwtToken = jwtToken
    }

    private getHeaders() {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.jwtToken}`,
        }
    }

    async get<T>(url: string): Promise<T> {
        try {
            const response = await axios({
                url: `${this.baseUrl}${url}`,
                headers: this.getHeaders(),
                method: 'get',
            })

            return response.data
        } catch (err) {
            throw new Error(err)
        }
    }

    async patch<T>(url: string, data: unknown): Promise<T> {
        try {
            const { data: responseData } = await axios({
                headers: this.getHeaders(),
                method: 'patch',
                url: `${this.baseUrl}${url}`,
                data,
            })

            return responseData
        } catch (err) {
            const { error: errorMessage } = err.response.data
            throw new Error(errorMessage)
        }
    }

    async delete<T>(url: string, data: unknown): Promise<T> {
        try {
            const { data: responseData } = await axios({
                headers: this.getHeaders(),
                method: 'delete',
                url: `${this.baseUrl}${url}`,
                data,
            })

            return responseData
        } catch (err) {
            const { error: errorMessage } = err.response.data
            throw new Error(errorMessage)
        }
    }

    async post<T>(url: string, data: any): Promise<T> {
        try {
            const { data: responseData } = await axios({
                headers: this.getHeaders(),
                method: 'post',
                url: `${this.baseUrl}${url}`,
                data,
            })
            return responseData
        } catch (err) {
            const { error: errorMessage } = err.response.data
            throw new Error(errorMessage)
        }
    }
}
