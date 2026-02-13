import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import defaultAvatar from '../assets/pfp.png'
import '../layout.css'
import { ImageApi } from '../api/imageApi'

type Props = {
    children: React.ReactNode
}
// ReactNode erlaubt auch Strings, Fragments, Arrays (Robuster für Layouts)

export default function Layout({ children }: Props) {
    const imageUrl = defaultAvatar

    const [imageFileName, setImageFileName] = useState<string>()
    const [isOpen, setIsOpen] = useState(false)
    const [imageData, setImageData] = useState()

    const imageApi = new ImageApi()

    useEffect(() => {
        if (
            imageFileName !== undefined &&
            imageFileName !== null &&
            imageFileName.length > 0
        ) {
            imageApi
                .getImage(imageFileName) //
                .then((response) => {
                    setImageData(response?.data)
                    console.log(response)
                })
        }
    }, [imageFileName])

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

                        <ImageUpload
                            onUpload={(filename) => {
                                setImageFileName(filename)
                                setIsOpen(false) // Modal schließen
                            }}
                        />

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
