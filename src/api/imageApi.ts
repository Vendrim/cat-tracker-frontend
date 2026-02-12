import { BackendClient } from "./backend"
import { IMAGE_DOWNLOAD, IMAGE_UPLOAD } from "./endpoints"

export class ImageApi {
    private backend = new BackendClient()

    async uploadImage(file: File): Promise<string> {
        const formData = new FormData()
        formData.append("file", file)

        return this.backend.post<string>(
            IMAGE_UPLOAD,
            formData,
            true // requiresAuth
        )
    }

    async getImageUrl(filename: string): Promise<string> {
        return `${this.backend['baseUrl']}${IMAGE_DOWNLOAD.replace("{filename}", filename)}`
    }
}
