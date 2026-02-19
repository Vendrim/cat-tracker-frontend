import { useState } from 'react'
import { ProfileImageApi } from '../api/profileImageApi'

import { ClipLoader } from 'react-spinners'

import toast from 'react-simple-toasts'
import 'react-simple-toasts/dist/style.css'
import 'react-simple-toasts/dist/theme/failure.css'
import 'react-simple-toasts/dist/theme/success.css'

export default function ImageUpload(props: { onUpload: Function }) {
    const [file, setFile] = useState<File>()
    const [buttonClicked, setButtonClicked] = useState<boolean>(false)
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
                setButtonClicked(false)
            })
    }

    function doUpload() {
        setButtonClicked(true)
        setTimeout(() => uploadImage(), 50)
    }

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button disabled={buttonClicked} onClick={doUpload}>
                {buttonClicked ? <ClipLoader size={12} /> : 'Upload'}
            </button>
        </div>
    )
}
