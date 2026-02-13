import { useState } from 'react'
import { ImageApi } from '../api/imageApi'
import { ImageUploadResponse } from '../api/entities'

type Props = {
    onUpload: (url: string) => void
}

export default function ImageUpload({ onUpload }: Props) {
    const [file, setFile] = useState<File>()
    const imageApi = new ImageApi()

    function uploadImage() {
        if (!file) {
            return
        }

        imageApi
            .uploadImage(file) //
            .then((responsingFileName: ImageUploadResponse) => {
                onUpload(responsingFileName.fileName)
            })
    }

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={uploadImage}>Upload</button>
        </div>
    )
}
