import { useState } from 'react'
import { ProfileImageApi } from '../api/profileImageApi'
import toast from 'react-simple-toasts'
import 'react-simple-toasts/dist/style.css'
import 'react-simple-toasts/dist/theme/failure.css'
import 'react-simple-toasts/dist/theme/success.css'

export default function ImageUpload(props: { onUpload: Function }) {
    const [file, setFile] = useState<File>()
    const profileImageApi = new ProfileImageApi()

    function uploadImage() {
        if (!file) {
            return
        }

        profileImageApi
            .uploadProfileImage(file) //
            .then((res) => {
                if (res) {
                    props.onUpload()
                    toast('Profilbild aktualisiert', {
                        theme: 'success',
                        position: 'top-center',
                    })
                }
            })
            .catch((_) => {
                toast('Falscher Dateityp', {
                    theme: 'failure',
                    position: 'top-center',
                })
            })
    }

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={uploadImage}>Upload</button>
        </div>
    )
}
