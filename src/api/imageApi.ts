import {BackendClient} from "./backend";
import {IMAGE_DOWNLOAD, IMAGE_UPLOAD} from "./endpoints";

export class ImageApi {
    private backend = new BackendClient();

    // TODO: siehe unten
    postImage(file: any): Promise<any> {
        return this.backend.post(IMAGE_UPLOAD, file);
    }

    //TODO: sicher implementieren (sicher hheißt hier mit JWT Token)
    getImage(filename: string) : Promise<any> {
        return this.backend.get(IMAGE_DOWNLOAD.replace("{filename}", filename));
    }
}