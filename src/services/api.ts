import { JWTToken } from '../../types/JWT'
import { JoinRoomResponse } from '../../types/JoinRoomResponse'
import { NewRoomResponse } from '../../types/NewRoomResponse'
import { NewGroupResponse } from '../../types/NewGroupResponse'
import { RoomId } from '../../types/Room'
import { UID } from '../../types/uid'
import ApiClient from './apiClient'
import { Room } from '../pages/AdminDashboard/CreateRoomForm/CreateRoomForm'
import { Group } from '../components/CreateGroup/CreateGroupForm'


export class Api {
    private apiClient: ApiClient

    constructor(jwtToken: JWTToken) {
        this.apiClient = new ApiClient(jwtToken)
    }

    stringifyDestinations(destinations: any) {
        return destinations?.length ? JSON.stringify(destinations) : null
    }

    async createRoom(
        room: Room,
        reminders: Array<any> | null
    ): Promise<NewRoomResponse> {
        const { name, hostName, destinations } = room
        return this.apiClient.post('/rooms/new', {
            name,
            hostName,
            destinations: this.stringifyDestinations(destinations),
            sendsAt: reminders,
        })
    }

    async editRoom(room: Room): Promise<NewRoomResponse> {
        const { id, name, hostName, destinations, startAt } = room
        return this.apiClient.patch(`/rooms/${id}`, {
            name,
            hostName,
            startAt,
            destinations: this.stringifyDestinations(destinations),
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
        hostName: string,
        destinations: [any]
    ): Promise<any> {
        return this.apiClient.post(`/rooms/${roomId}/inviteParticipants`, {
            hostName,
            destinations: JSON.stringify(destinations),
        })
    }

    async getRooms(): Promise<any> {
        return this.apiClient.get(`/rooms`)
    }

    async getUserDetails(userId): Promise<any> {
        return this.apiClient.get(`/users/${userId}`)
    }

    async createGroup(
        group: Group,
    ): Promise<NewGroupResponse> {
        return this.apiClient.post('/groups', group)
    }


    async getGroups() : Promise<any> {
        return this.apiClient.get(`/groups`)
    }
}
