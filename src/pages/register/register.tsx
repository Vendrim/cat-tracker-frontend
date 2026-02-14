import { useState } from 'react'
import styles from './register.module.css'
import { AuthApi } from '../../api/authApi'
import { RegisterUserDto } from '../../api/entities'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/authProvider'

export default function RegisterPage() {
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [firstName, setFirstName] = useState<string>()
    const [lastName, setLastName] = useState<string>()

    const authApi = new AuthApi()
    const navigate = useNavigate()
    const { login } = useAuth()

    function handleSignup() {
        if (!lastName) {
            return
        }

        if (!firstName) {
            return
        }

        if (!email) {
            return
        }

        if (!username) {
            return
        }
        if (!password) {
            return
        }

        let registerDto: RegisterUserDto = {
            username: username,
            email: email,
            password: password,
            fullName: firstName + ' ' + lastName,
        }

        authApi.signup(registerDto).then((res) => {
            login(res.jwtToken)
            navigate('/home')
        })
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginHeader}>
                <span className={styles.headerText}>Register</span>
            </div>
            <div className={styles.loginForm}>
                <div className={styles.loginInputs}>
                    <span>Vorname:</span>
                    <input
                        value={firstName}
                        type="text"
                        onChange={(e) => setFirstName(e.currentTarget.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                                handleSignup()
                            }
                        }}
                    />
                    <span>Nachname: </span>
                    <input
                        value={lastName}
                        type="text"
                        onChange={(e) => setLastName(e.currentTarget.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                                handleSignup()
                            }
                        }}
                    />
                    <span>Benutzername: </span>
                    <input
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.currentTarget.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                                handleSignup()
                            }
                        }}
                    />
                    <span>Password: </span>
                    <input
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                                handleSignup()
                            }
                        }}
                    />
                    <span>Email: </span>
                    <input
                        value={email}
                        type="text"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                                handleSignup()
                            }
                        }}
                    />
                </div>
                <div className={styles.loginBtnContainer}>
                    <button onClick={() => handleSignup()}>Register</button>
                </div>
            </div>
        </div>
    )
}
