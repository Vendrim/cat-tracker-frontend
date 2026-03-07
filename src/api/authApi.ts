import { BackendClient } from './backend'
import { AUTH_SIGN_UP, AUTH_LOGIN } from './endpoints'
import { LoginResponse, LoginUserDto, RegisterUserDto } from './entities'

export class AuthApi {
    private backend = new BackendClient()

    signup(payload: RegisterUserDto): Promise<LoginResponse> {
        return this.backend.post(AUTH_SIGN_UP, payload, false)
    }

    login(payload: LoginUserDto): Promise<LoginResponse> {
        return this.backend.post(AUTH_LOGIN, payload, false)
    }
}
