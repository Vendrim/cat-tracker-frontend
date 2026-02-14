import { BackendClient } from './backend'
import { PROFILE_IMAGE_UPLOAD, PROFILE_IMAGE_GET } from './endpoints'

export class ProfileImageApi {
    private backend = new BackendClient()

    uploadProfileImage(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        return this.backend.post(PROFILE_IMAGE_UPLOAD, formData)
    }

    getProfileImage() {
        return this.backend.get(PROFILE_IMAGE_GET)
    }
}
