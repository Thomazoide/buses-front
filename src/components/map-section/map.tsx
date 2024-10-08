import { Bus, Chofer } from "@/types/payloads";
import { LatLngExpression, icon } from "leaflet";
import { ReactElement } from "react";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"

interface MapProps{
    choferes: Chofer[]
    buses: Bus[]
}

export function Map(props: Readonly<MapProps>): ReactElement{

    const puenteAltoCenter: LatLngExpression = {
        lat: -33.593757, 
        lng: -70.567672
    }

    const busIcon = icon({
        iconUrl: "https://storagejca.s3.sa-east-1.amazonaws.com/icono.png",
        iconSize: [24, 24],
        iconAnchor: [16, 16],
        popupAnchor: [0, -34]
    })

    return(
        <MapContainer 
        center={puenteAltoCenter} 
        zoom={13} 
        style={{
            height: "100%",
            width: "100%"
        }}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Open StreetMap</a> contributors'/>
            { props.choferes[0] &&
                props.choferes.map( (chofer) => chofer.ubicacion && (
                    <ReactLeafletDriftMarker
                    key={chofer.id} 
                    duration={1200}
                    position={{
                        lat: chofer.ubicacion.locations[0].coords.latitude,
                        lng: chofer.ubicacion.locations[0].coords.longitude
                    }}
                    icon={busIcon}>
                        <Popup closeButton>
                            <strong> {chofer.nombre} </strong>
                        </Popup>
                    </ReactLeafletDriftMarker>
                ) )
            }
        </MapContainer>
    )
}