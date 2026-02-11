import { useCallback, useState } from 'react'
type Props = {
    onUpload: (url: string) => void
}

function ImageUpload({ onUpload }: Props) {
    const [file, setFile] = useState<File | null>(null)

    // @ts-ignore
    const uploadImage = useCallback(async () => {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('http://localhost:8080/api/images/upload', {
            method: 'POST',
            body: formData,
        })

        const filename = await res.text()
        const url = `http://localhost:8080/api/images/${filename}`

        onUpload(url) // 👈 Übergabe an Home
    }, [file, onUpload])

    return (
        <div>
            <input
                type="file"
                onChange={(e) =>
                    setFile(e.target.files?.[0] ?? null)
                }
            />
            <button onClick={uploadImage}>Upload</button>
        </div>
    )
}

export default ImageUpload

