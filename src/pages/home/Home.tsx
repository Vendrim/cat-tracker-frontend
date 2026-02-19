import { LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Layout from '../../layouts/layout'

import { DeviceApi } from '../../api/deviceApi'
import { useEffect, useState } from 'react'
import { LocationApi } from '../../api/locationApi'
import { Device, DeviceLocation } from '../../api/entities'

export default function Home() {
    const [position, setPosition] = useState<LatLngExpression>()

    const [devices, setDevices] = useState([])

    const deviceApi = new DeviceApi()
    const locationApi = new LocationApi()

    function locationToLatLngExpression(
        location: DeviceLocation
    ): LatLngExpression {
        if (location === null || location === undefined) {
            return undefined
        }

        let position: LatLngExpression = {
            lat: location.latitude,
            lng: location.longitude,
        }

        return position
    }

    useEffect(() => {
        deviceApi.getDevices().then((res: Device[]) => {
            if (res) {
                setDevices(res)
            }
        })
    }, [])

    useEffect(() => {
        if (devices && devices.length > 0) {
            let device = devices[0]
            locationApi
                .getLocationsForDevice(device) //
                .then((res: DeviceLocation[]) => {
                    if (res) {
                        setPosition(locationToLatLngExpression(res[0]))
                    }
                })
        }
    }, [devices])

    return (
        <Layout>
            <div className="main-container">
                <div className="content-container"></div>

                {position && (
                    <MapContainer
                        center={position}
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer
                            attribution="© OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={position}>
                            <Popup>Marker text</Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
        </Layout>
    )
}
