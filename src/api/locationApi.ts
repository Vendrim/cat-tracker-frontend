import { BackendClient } from './backend'
import { LOCATIONS_FOR_DEVICE } from './endpoints'
import { Device, DeviceLocation } from './entities'

export class LocationApi {
    private backend = new BackendClient()

    getLocationsForDevice(device: Device): Promise<DeviceLocation[]> {
        return this.backend.get(
            LOCATIONS_FOR_DEVICE.replace(
                '{deviceIdentifier}',
                device.id.toString()
            )
        )
    }
}
