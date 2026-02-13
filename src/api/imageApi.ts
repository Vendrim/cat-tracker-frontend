import { BackendClient } from './backend'
import { IMAGE_DOWNLOAD, IMAGE_UPLOAD } from './endpoints'
import { ImageUploadResponse, Image } from './entities'

export class ImageApi {
    private backend = new BackendClient()

    async uploadImage(file: File): Promise<ImageUploadResponse> {
        const formData = new FormData()
        formData.append('file', file)

        return this.backend.post(IMAGE_UPLOAD, formData)
    }

    getImage(filename: string): Promise<Image> {
        return this.backend.get(IMAGE_DOWNLOAD.replace('{fileName}', filename))
    }
}
