import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import defaultAvatar from '../assets/pfp.png'
import styles from './layout.module.css'
import { Image } from '../api/entities'
import { ProfileImageApi } from '../api/profileImageApi'
import { useAuth } from '../providers/authProvider'
import { ClipLoader } from 'react-spinners'

type Props = {
    children: React.ReactNode
}
// ReactNode erlaubt auch Strings, Fragments, Arrays (Robuster für Layouts)

export default function Layout({ children }: Props) {
    const imageUrl = defaultAvatar

    const [isOpen, setIsOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [profileImageOpen, setProfileImageOpen] = useState(false)
    const [imageData, setImageData] = useState<string>()

    const profileImageApi = new ProfileImageApi()
    const { logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!profileImageOpen) {
            profileImageApi
                .getProfileImage() //
                .then((response: Image) => {
                    setImageData(response?.data)
                })
        }
    }, [profileImageOpen])

    return (
        <>
            <nav className={styles.menuBar}>
                <Link to="/">
                    <span>Cat Tracker</span>
                </Link>
                <div className={styles.profileImg}>
                    <img
                        src={
                            imageData
                                ? `data:image/png;base64,${imageData}`
                                : imageUrl
                        }
                        alt="Profile"
                        onClick={() => setIsOpen(!isOpen)}
                    />

                    <div
                        className={`${styles.optionsMenu} ${isOpen ? styles.open : ''} `}
                    >
                        <div
                            className={styles.optionsMenuItem}
                            onClick={() => {
                                setIsOpen(false)
                                setProfileImageOpen(true)
                            }}
                        >
                            <span>Profilbild ändern</span>
                        </div>
                        <div
                            className={`${styles.optionsMenuItem} ${isLoggingOut ? styles.loggingOut : ''}`}
                            onClick={() => {
                                setIsLoggingOut(true)
                                setIsOpen(false)
                                setTimeout(() => {
                                    logout()
                                    navigate('/')
                                }, 250)
                            }}
                        >
                            {isLoggingOut ? (
                                <ClipLoader
                                    className={styles.logOutLoader}
                                    size={16}
                                />
                            ) : (
                                <span>Abmelden</span>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {profileImageOpen && (
                <div
                    className={styles.modalBackdrop}
                    onClick={() => setProfileImageOpen(false)}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Profilbild ändern</h3>

                        <ImageUpload
                            onUpload={() => setProfileImageOpen(false)}
                        />

                        <button onClick={() => setProfileImageOpen(false)}>
                            Abbrechen
                        </button>
                    </div>
                </div>
            )}

            {children}
        </>
    )
}
