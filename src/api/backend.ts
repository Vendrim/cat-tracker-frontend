export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface BackendClientOptions {
    baseUrl: string
    getToken?: () => string | null // token provider (e.g. from localStorage)
}


//Explanation:
// Using FormData it isn't allowed to sed Content-Type by yourself.

export class BackendClient {
    private baseUrl: string = 'http://localhost:8080/'
    private token: string | null

    constructor() {
        this.token = localStorage.getItem('jwt')
    }

    private async request<T>(
        method: HttpMethod,
        endpoint: string,
        body?: unknown,
        requiresAuth: boolean = true
    ): Promise<T> {

        const headers: HeadersInit = {}

        // JWT setzen
        if (requiresAuth) {
            const token = localStorage.getItem('jwt')
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }
        }

        // Nur JSON-Header setzen wenn body KEIN FormData ist
        const isFormData = body instanceof FormData

        if (!isFormData) {
            headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers,
            body: body
                ? isFormData
                    ? body
                    : JSON.stringify(body)
                : undefined,
        })

        if (!response.ok) {
            const text = await response.text()
            throw new Error(
                `HTTP ${response.status}: ${text || response.statusText}`
            )
        }

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
