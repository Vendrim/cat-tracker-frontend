export interface RegisterUserDto {
    email: string
    password: string
    fullName: string
    username: string
}

export interface LoginResponse {
    jwtToken: string
    expirationTime: number
}

export interface LoginUserDto {
    username: string
    password: string
}

export interface Device {
    id: number
    identifier: string
    userId: number
}

export interface DeviceLocation {
    id: number
    latitude: number
    longitude: number
    timestamp: string | number
    deviceIdentifier: string
}

export interface ImageUploadResponse {
    fileName: string
}
