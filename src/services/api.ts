export class Api {
    baseUrl: string | undefined
    jwtToken: string
    constructor(jwtToken) {
        this.baseUrl = process.env.REACT_APP_API_URL
        if (!this.baseUrl) {
            throw new Error('API url is missing from env configuration')
        }
        this.jwtToken = jwtToken
    }

    async createRoom() {
        const data = {
            password: 'password=test-password',
        }

        return this.post('/rooms/new', data) // NO PASSWORD
    }

    async joinRoom(roomId: string) {
        const data = {
            password: 'password=test-password',
        }
        return this.post(`/rooms/${roomId}/join`, data)
    }

    async post(apiUrl: string, data: any) {
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
