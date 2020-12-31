import { JWTToken } from '../../types/JWT'
import { JoinRoomResponse } from '../../types/JoinRoomResponse'
import { NewRoomResponse } from '../../types/NewRoomResponse'
import { RoomId } from '../../types/Room'
import { UID } from '../../types/uid'
import ApiClient from './apiClient'

export class Api {
    private apiClient: ApiClient

    constructor(jwtToken: JWTToken) {
        this.apiClient = new ApiClient(jwtToken)
    }

    async createRoom(
        name,
        hostName,
        destinations,
        password?: string
    ): Promise<NewRoomResponse> {
        return this.apiClient.post('/rooms/new', {
            name: name,
            hostName,
            destinations: JSON.stringify(destinations),
            password,
        })
    }

    async editRoom(
        roomId,
        name,
        hostName,
        destinations,
        password?: string
    ): Promise<NewRoomResponse> {
        return this.apiClient.patch(`/rooms/${roomId}`, {
            name: name,
            hostName,
            destinations: JSON.stringify(destinations),
            password,
        })
    }

    async joinRoom(
        roomId: RoomId,
        participantName: string,
        password: string | null
    ): Promise<JoinRoomResponse> {
        return this.apiClient.post(`/rooms/${roomId}/join`, {
            participantName,
            password,
        })
    }

    async addRegistrationToken(userId: UID, registrationToken: string) {
        return this.apiClient.post(`/users/${userId}/addRegistrationToken`, {
            registrationToken,
        })
    }

    async subscribeToGroup(
        groupId: string,
        name: string,
        password: string
    ): Promise<void> {
        return this.apiClient.post(`/groups/${groupId}/join`, {
            name,
            password,
        })
    }

    async inviteParticipants(
        roomId: RoomId,
        hostname: string,
        destinations: [any]
    ): Promise<any> {
        return this.apiClient.post(`/rooms/${roomId}/inviteParticipants`, {
            hostname,
            destinations: JSON.stringify(destinations),
        })
    }

    async getRooms(): Promise<any> {
        return this.apiClient.get(`/rooms`)
    }

    async getUserDetails(userId): Promise<any> {
        return this.apiClient.get(`/users/${userId}`)
    }
}
