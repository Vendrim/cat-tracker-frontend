import { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthApi } from '../../api/authApi'
import { LoginUserDto } from '../../api/entities'
import { useAuth } from '../../providers/authProvider'

export default function LoginPage() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    let authApi = new AuthApi()
    const navigate = useNavigate()
    const { login } = useAuth()

    function handleLogin() {
        let loginDto: LoginUserDto = { username: username, password: password }
        authApi.login(loginDto).then((res) => {
            login(res.jwtToken)
            navigate('/home')
        })
    }

    return (
        <div className="main-container">
            <div className="login-form">
                <div className="login-header">
                    <span className="header-text">Log In</span>
                </div>
                <div className="header-desc">
                    <span>
                        Geben Sie ihre E-Mail Adresse oder Ihren Benutzernamen
                        und Ihren Password ein, um sich einzuloggen.
                    </span>
                </div>
                <div className="login-inputs">
                    <span>Benutzername: </span>
                    <input
                        id="username-input"
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                    <span>Password: </span>
                    <input
                        id="password-input"
                        value={password}
                        type="text"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div className="login-btn-container">
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div className="register-container">
                    <span>
                        Noch kein Account, dann registriere dich{' '}
                        <Link to="/register">hier</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
