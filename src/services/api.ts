import { JWTToken } from '../../types/JWT'
import { JoinRoomResponse } from '../../types/JoinRoomResponse'
import { NewRoomResponse } from '../../types/NewRoomResponse'
import { NewGroupResponse } from '../../types/NewGroupResponse'
import { RoomId } from '../../types/Room'
import { UID } from '../../types/uid'
import ApiClient from './apiClient'
import { NewEditRoom } from '../pages/AdminDashboard/CreateRoomForm/CreateRoomForm'
import { Member } from '../components/GroupMembersList/groupSelector'
import { Group } from '../components/CreateGroup/CreateGroupForm'

const ONE_MIN_IN_MS = 60 * 1000
export class Api {
    private apiClient: ApiClient

    constructor(jwtToken: JWTToken) {
        this.apiClient = new ApiClient(jwtToken)
    }

    stringifyParams(params: string[] | number[] | null) {
        return params?.length ? JSON.stringify(params) : null
    }

    async createRoom(
        room: NewEditRoom,
        reminders: number | null
    ): Promise<NewRoomResponse> {
        const { name, hostName, destinations, startAt } = room

        const data: {
            [key: string]: boolean | number | string | number[] | null
        } = {
            name,
            hostName,
            destinations: this.stringifyParams(destinations),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }

        if (startAt && startAt > Date.now() / 1000) {
            data.startAt = startAt
        }
        if (reminders) {
            data.sendsAt = [reminders]
        }

        return this.apiClient.post('/rooms/new', data)
    }

    async editRoom(
        room: NewEditRoom,
        reminders: number | null
    ): Promise<NewRoomResponse> {
        const { id, name, hostName, destinations, startAt } = room

        const data: {
            [key: string]: string | number[] | number | null
        } = {
            name,
            hostName,
            startAt,
            destinations: this.stringifyParams(destinations),
        }

        if (reminders) {
            data.sendsAt = [reminders]
        }

        return this.apiClient.patch(`/rooms/${id}`, data)
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

    async getRooms(
        startingAfter: number = Date.now() - ONE_MIN_IN_MS
    ): Promise<any> {
        return this.apiClient.get(
            `/rooms?startingAfter=${startingAfter / 1000}`
        )
    }

    async getOngoingCalls(): Promise<any> {
        return this.apiClient.get('/rooms?includeGroups=true&status=created')
    }

    async getUserDetails(userId): Promise<any> {
        return this.apiClient.get(`/users/${userId}`)
    }

    async createGroup(group: Group): Promise<NewGroupResponse> {
        return this.apiClient.post('/groups', group)
    }

    async getGroups(): Promise<any> {
        return this.apiClient.get(`/groups`)
    }

    async getGroup(groupId: string): Promise<any> {
        return this.apiClient.get(`/groups/${groupId}`)
    }

    async deleteMembers(groupId: string, members: Array<Member>): Promise<any> {
        return this.apiClient.delete(`/groups/${groupId}/removeMembers`, {
            members: JSON.stringify(members),
        })
    }
}
