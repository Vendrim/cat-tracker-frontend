import { useState } from "react";

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    // @ts-ignore
    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:8080/api/images/upload", {
            method: "POST",
            body: formData
        });

        const filename = await res.text();

        setImageUrl(`http://localhost:8080/api/images/${filename}`);
    };

    return (
        <div>
            <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
            />

            <button onClick={uploadImage}>
                Upload
            </button>

            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Uploaded"
                    style={{ width: "300px", marginTop: "20px" }}
                />
            )}
        </div>
    );
}

export default ImageUpload;
