import { JWTToken } from '../../types/JWT'
import { JoinRoomResponse } from '../../types/JoinRoomResponse'
import { NewRoomResponse } from '../../types/NewRoomResponse'
import { RoomId } from '../../types/Room'
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

    async createRoom(password?: string): Promise<NewRoomResponse> {
        return this.post('/rooms/new', password ? { password } : null)
    }

    async joinRoom(
        roomId: RoomId,
        password: string
    ): Promise<JoinRoomResponse> {
        return this.post(`/rooms/${roomId}/join`, { password })
    }

    async inviteParticipants(
        roomId: RoomId,
        hostname: string,
        destinations: [any]
    ): Promise<any> {
        return this.post(`/rooms/${roomId}/inviteParticipants`, {
            hostname,
            destinations: JSON.stringify(destinations),
        })
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
