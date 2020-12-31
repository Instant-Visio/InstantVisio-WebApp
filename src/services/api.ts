import { JWTToken } from '../../types/JWT'
import { JoinRoomResponse } from '../../types/JoinRoomResponse'
import { NewRoomResponse } from '../../types/NewRoomResponse'
import { RoomId } from '../../types/Room'
import axios from 'axios'
import { UID } from '../../types/uid'
import { Room } from '../pages/AdminDashboard/CreateRoomForm'
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

    async createRoom(room: Room): Promise<NewRoomResponse> {
        const { name, hostName, destinations } = room
        return this.post('/rooms/new', {
            name,
            hostName,
            destinations: JSON.stringify(destinations),
            password: 'test-password', //TODO set a password ?
        })
    }

    async editRoom(room: Room): Promise<NewRoomResponse> {
        const { id, name, hostName, destinations, startAt } = room
        return this.patch(`/rooms/${id}`, {
            name: name,
            hostName,
            startAt,
            destinations: JSON.stringify(destinations),
        })
    }

    async joinRoom(
        roomId: RoomId,
        participantName: string,
        password: string | null
    ): Promise<JoinRoomResponse> {
        return this.post(`/rooms/${roomId}/join`, {
            participantName,
            password,
        })
    }

    async addRegistrationToken(userId: UID, registrationToken: string) {
        return this.post(`/users/${userId}/addRegistrationToken`, {
            registrationToken,
        })
    }

    async subscribeToGroup(
        groupId: string,
        name: string,
        password: string
    ): Promise<void> {
        return this.post(`/groups/${groupId}/join`, {
            name,
            password,
        })
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

    async getRooms(): Promise<any> {
        return this.get(`/rooms`)
    }

    async get(url: string) {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.jwtToken}`,
        }

        try {
            const response = await axios({
                url: `${this.baseUrl}${url}`,
                headers,
                method: 'get',
            })

            return response.data
        } catch (err) {
            throw new Error(err)
        }
    }

    async getUserDetails(userId): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.jwtToken}`,
        }

        const response = await axios({
            url: `${this.baseUrl}/users/${userId}`,
            headers,
            method: 'get',
        })

        return response?.data?.user
    }

    async patch(apiUrl: string, data: any): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.jwtToken}`,
        }

        try {
            const { data: responseData } = await axios({
                headers,
                method: 'patch',
                url: `${this.baseUrl}${apiUrl}`,
                data,
            })
            return responseData
        } catch (err) {
            const { error: errorMessage } = err.response.data
            throw new Error(errorMessage)
        }
    }

    async post(apiUrl: string, data: any): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.jwtToken}`,
        }

        try {
            const { data: responseData } = await axios({
                headers,
                method: 'post',
                url: `${this.baseUrl}${apiUrl}`,
                data,
            })
            return responseData
        } catch (err) {
            const { error: errorMessage } = err.response.data
            throw new Error(errorMessage)
        }
    }
}
