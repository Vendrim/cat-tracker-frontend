import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import defaultAvatar from '../assets/pfp.png'
import '../layout.css'
import { ImageApi } from '../api/imageApi'
import { Image } from '../api/entities'
import { ProfileImageApi } from '../api/profileImageApi'

type Props = {
    children: React.ReactNode
}
// ReactNode erlaubt auch Strings, Fragments, Arrays (Robuster für Layouts)

export default function Layout({ children }: Props) {
    const imageUrl = defaultAvatar

    const [isOpen, setIsOpen] = useState(false)
    const [imageData, setImageData] = useState<string>()

    const profileImageApi = new ProfileImageApi()

    useEffect(() => {
        if (!isOpen) {
            profileImageApi
                .getProfileImage() //
                .then((response: Image) => {
                    setImageData(response?.data)
                })
        }
    }, [isOpen])

    return (
        <>
            <nav className="menu-bar">
                <Link to="/">
                    <span>Cat Tracker</span>
                </Link>
                <div className="profile-img">
                    <img
                        src={
                            imageData
                                ? `data:image/png;base64,${imageData}`
                                : imageUrl
                        }
                        alt="Profile"
                        onClick={() => setIsOpen(true)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </nav>

            {isOpen && (
                <div
                    className="modal-backdrop"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Profilbild ändern</h3>

                        <ImageUpload onUpload={() => setIsOpen(false)} />

                        <button onClick={() => setIsOpen(false)}>
                            Abbrechen
                        </button>
                    </div>
                </div>
            )}

            {children}
        </>
    )
}
