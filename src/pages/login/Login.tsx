import { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthApi } from '../../api/authApi'
import { LoginUserDto } from '../../api/entities'
import { useAuth } from '../../providers/authProvider'

import toast from 'react-simple-toasts'
import 'react-simple-toasts/dist/style.css'
import 'react-simple-toasts/dist/theme/failure.css'

export default function LoginPage() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    let authApi = new AuthApi()
    const navigate = useNavigate()
    const { login } = useAuth()

    function handleLogin() {
        let loginDto: LoginUserDto = { username: username, password: password }
        authApi
            .login(loginDto)
            .then((res) => {
                login(res.jwtToken)
                navigate('/home')
            })
            .catch((err) => {
                console.error(err)
                toast('Die Logindaten scheinen falsch zu sein.', {
                    theme: 'failure',
                    position: 'top-center',
                })
            })
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginHeader}>
                <span className={styles.headerText}>Log In</span>
            </div>
            <div className={styles.loginForm}>
                <div className={styles.headerDesc}>
                    <span>
                        Geben Sie ihre E-Mail Adresse oder Ihren Benutzernamen
                        und Ihren Password ein, um sich einzuloggen.
                    </span>
                </div>
                <div className={styles.loginInputs}>
                    <span>Benutzername: </span>
                    <input
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.currentTarget.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin()
                            }
                        }}
                    />
                    <span>Password: </span>
                    <input
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin()
                            }
                        }}
                    />
                </div>
                <div className={styles.loginBtnContainer}>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div className={styles.registerContainer}>
                    <span>Noch kein Account, dann registriere dich </span>
                    <Link to="/register">hier</Link>
                </div>
            </div>
        </div>
    )
}
