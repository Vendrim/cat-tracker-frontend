import { useState } from 'react'
import { ImageApi } from '../api/imageApi'

type Props = {
    onUpload: (url: string) => void
}

export default function ImageUpload({ onUpload }: Props) {
    const [file, setFile] = useState<File | null>(null)
    const imageApi = new ImageApi()

    const uploadImage = async () => {
        if (!file) return

        try {
            //const serverFile = await imageApi.uploadImage(file)

            //const imageUrl = `http://localhost:8080/api/images/${serverFile?.filename}`
            //let imageUrl
            //imageUrl= imageApi.getImageUrl(serverFile);
            //onUpload(imageUrl)
            const serverFilename = await imageApi.uploadImage(file)
            const imageUrl = imageApi.getImage(serverFilename)
            onUpload(imageUrl)
        } catch (error) {
            console.error('Upload failed:', error)
        }
    }

    return (
        <div>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <button onClick={uploadImage}>Upload</button>
        </div>
    )
}
