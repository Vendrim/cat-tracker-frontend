import { BackendClient } from './backend'
import { DEVICES_ALL } from './endpoints'
import { Device } from './entities'

export class DeviceApi {
    private backend = new BackendClient()

    getDevices(): Promise<Device[]> {
        return this.backend.get(DEVICES_ALL)
    }
}
