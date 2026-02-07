export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface BackendClientOptions {
    baseUrl: string
    getToken?: () => string | null // token provider (e.g. from localStorage)
}

export class BackendClient {
    private baseUrl: string = import.meta.env.VITE_BACKEND_URL
    private token: string | null

    constructor() {
        this.token = localStorage.getItem('jwt')
    }

    // @ts-ignore
    private async request<T>(
        method: HttpMethod,
        endpoint: string,
        body?: unknown,
        requiresAuth: boolean = true
    ): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (requiresAuth && this.token) {
            const token = this.token
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined,
        })

        if (!response.ok) {
            const text = await response.text()
            throw new Error(
                `HTTP ${response.status}: ${text || response.statusText}`
            )
        }

        // Handle empty responses (204, etc.)
        if (response.status === 204) {
            return undefined as T
        }

        return response.json() as Promise<T>
    }

    get<T>(endpoint: string, requiresAuth = true) {
        return this.request<T>('GET', endpoint, undefined, requiresAuth)
    }

    post<T>(endpoint: string, body?: unknown, requiresAuth = true) {
        return this.request<T>('POST', endpoint, body, requiresAuth)
    }

    put<T>(endpoint: string, body?: unknown, requiresAuth = true) {
        return this.request<T>('PUT', endpoint, body, requiresAuth)
    }

    delete<T>(endpoint: string, requiresAuth = true) {
        return this.request<T>('DELETE', endpoint, undefined, requiresAuth)
    }
}
