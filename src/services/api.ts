import { JWTToken } from '../../types/JWT'
import { JoinRoomResponse } from '../../types/JoinRoomResponse'
import { NewRoomResponse } from '../../types/NewRoomResponse'
import { RoomId } from '../../types/Room'
import { UID } from '../../types/uid'
import ApiClient from './apiClient'
import { Room } from '../pages/AdminDashboard/CreateRoomForm/CreateRoomForm'

export class Api {
    private apiClient: ApiClient

    constructor(jwtToken: JWTToken) {
        this.apiClient = new ApiClient(jwtToken)
    }

    async createRoom(
        room: Room,
        reminders: Array<any> | null
    ): Promise<NewRoomResponse> {
        const { name, hostName, destinations } = room
        return this.apiClient.post('/rooms/new', {
            name,
            hostName,
            destinations: destinations?.length
                ? JSON.stringify(destinations)
                : null,
            sendsAt: reminders,
        })
    }

    async editRoom(room: Room): Promise<NewRoomResponse> {
        const { id, name, hostName, destinations, startAt } = room
        return this.apiClient.patch(`/rooms/${id}`, {
            name,
            hostName,
            startAt,
            destinations: JSON.stringify(destinations),
        })
    }

    async createReminder(roomId: string, sendAt: number): Promise<any> {
        return this.apiClient.post(`/rooms/${roomId}/reminders`, {
            roomId,
            sendAt,
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
