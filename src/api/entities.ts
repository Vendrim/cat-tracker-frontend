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
