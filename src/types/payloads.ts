export interface ResponsePayload<T>{
    data?: T
    error: boolean
    message: string
}

interface coordinates{
    altitude: number
    heading: number
    altitudeAccuracy: number
    latitude: number
    speed: number
    longitude: number
    accuracy: number
}

interface locationData{
    timestamp: number
    moked: boolean
    coords: coordinates
}

interface geolocation{
    rut: string,
    locations: locationData[]
}

export interface Bus{
    id: number
    patente: string
}

export interface Chofer{
    id: number
    nombre: string
    rut: string
    numero: string
    bus_id: number
    ubicacion: geolocation | null
}