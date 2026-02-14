import { useState } from 'react'
import { ProfileImageApi } from '../api/profileImageApi'

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
                }
            })
    }

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={uploadImage}>Upload</button>
        </div>
    )
}
