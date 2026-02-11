import { Link } from "react-router-dom";
import React, { useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import defaultAvatar from "../assets/pfp.png"
import '../layout.css'

type Props ={
    children: React.ReactNode
}
// ReactNode erlaubt auch Strings, Fragments, Arrays (Robuster für Layouts)

export default function Layout({ children }: Props) {
    const [imageUrl, setImageUrl]= useState <string>(defaultAvatar);

    const[isOpen, setIsOpen] = useState(false)

    return (
    <>
      <nav className="menu-bar">
        <Link to="/">
          <span>Cat Tracker</span>
        </Link>
          <div className="profile-img">
              <img
                  src={imageUrl}
                  alt="Profile"
                  onClick={() => setIsOpen(true)}
                  style={{ cursor: "pointer" }}
              />
          </div>

      </nav>



        {isOpen && (
            <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
                <div
                    className="modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3>Profilbild ändern</h3>

                    <ImageUpload
                        onUpload={(url) => {
                            setImageUrl(url)
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
  );
}


