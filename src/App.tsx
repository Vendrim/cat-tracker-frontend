import './App.css'
import Register from './pages/register/register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './providers/authProvider'
import DevicesPage from './pages/devices/Devices'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/devices" element={<DevicesPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
