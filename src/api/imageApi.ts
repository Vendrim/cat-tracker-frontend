import { BackendClient } from "./backend"
import { IMAGE_DOWNLOAD, IMAGE_UPLOAD } from "./endpoints"
import {File} from './entities'

export class ImageApi {
    private backend = new BackendClient()


    async uploadImage(file: File): Promise<string> {
        const formData = new FormData()
        formData.append("file", file)

        const response = await this.backend.post<{ filename: string }>(
            IMAGE_UPLOAD,
            formData,
        )

        return response.filename
    }

    getImage(filename:string){
        return this.backend.get(IMAGE_DOWNLOAD.replace("{filename}", filename));
    }
}
