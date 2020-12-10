import { JWTToken } from '../../types/JWT'
import { NewRoomResponse } from '../../types/NewRoomResponse'
import { JoinRoomResponse } from '../../types/JoinRoomResponse'
export class Api {
    baseUrl: string | undefined
    jwtToken: string
    constructor(jwtToken: JWTToken) {
        this.baseUrl = process.env.REACT_APP_API_URL
        if (!this.baseUrl) {
            throw new Error('API url is missing from env configuration')
        }
        this.jwtToken = jwtToken
    }

    async createRoom(): Promise<NewRoomResponse> {
        const data = {
            password: 'password=test-password',
        }

        return this.post('/rooms/new', data)
    }

    async joinRoom(roomId: string): Promise<JoinRoomResponse> {
        const data = {
            password: 'password=test-password',
        }
        return this.post(`/rooms/${roomId}/join`, data)
    }

    async post(apiUrl: string, data: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.jwtToken}`,
            },
            body: data ? JSON.stringify(data) : null,
        })
        return response.json()
    }
}
