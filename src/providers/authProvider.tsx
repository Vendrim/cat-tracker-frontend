import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface AuthContextValue {
    token: string | null
    isAuthenticated: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const TOKEN_KEY = 'jwt'

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
    const navigate = useNavigate()
    const location = useLocation()

    // Load token on app startup
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY)
        if (storedToken) {
            setToken(storedToken)
        }
        if (
            (!storedToken && location.pathname !== '/') ||
            location.pathname !== '/register'
        ) {
            navigate('/')
        }
    }, [])

    const login = (newToken: string) => {
        localStorage.setItem(TOKEN_KEY, newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
    }

    const value: AuthContextValue = {
        token,
        isAuthenticated: !!token,
        login,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
