import './App.css'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './providers/authProvider'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
