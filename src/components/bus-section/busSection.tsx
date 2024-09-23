import { Bus, Chofer, ResponsePayload } from "@/types/payloads";
import axios, { AxiosResponse } from "axios";
import { ReactElement, useState, useEffect } from "react";
import FetchFrame from "../generic/fetchFrame";
import BusFunctionalList from "./busFunctionalList";
import { Button, Spinner } from "@nextui-org/react";
import BusDataDisplay from "./busDataDisplay";
import AddBusForm from "./addBusForm";

export default function BusSection(): ReactElement{
    const [buses, setBuses] = useState<Bus[]>()
    const [selectedBus, setSelectedBus] = useState<Bus>()
    const [busChofer, setBusChofer] = useState<Chofer>()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [isFetchError, setIsFetchError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showAddBusForm, setShowAddBusForm] = useState<boolean>(false)

    const BUSES_ENDPOINT: string = `${import.meta.env.VITE_API_URL}/buses`

    const fetchBuses = async function(){
        try{
            const response: AxiosResponse<ResponsePayload<Bus[]>> = await axios.get(BUSES_ENDPOINT)
            if(response.data.error){
                setIsFetchError(true)
                setErrorMessage(response.data.message)
                return
            }
            setBuses(response.data.data)
        }catch(error: any){
            setIsFetchError(true)
            setErrorMessage(error.message)
        }
    }

    const fetchChofer = async function(patente: string){
        setIsLoading(true)
        const CHOFER_ENDPOINT: string = `${import.meta.env.VITE_API_URL}/choferes/patente`
        const REQUEST_BODY: Partial<Bus> = {
            patente
        }
        try{
            const response: AxiosResponse<ResponsePayload<Chofer>> = await axios.post(CHOFER_ENDPOINT, REQUEST_BODY)
            if(response.data.error){
                setIsFetchError(true)
                setErrorMessage(response.data.message)
                return
            }
            setBusChofer(response.data.data)
        }catch(error: any){
            setIsFetchError(true)
            setErrorMessage(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect( () => {
        if(!buses){
            fetchBuses()
        }
    }, [] )
    
    return(
        <div className="container flex flex-wrap gap-4 justify-evenly w-full mx-4 border-solid border-3 border-warning-300 rounded-xl p-[15px]">
            {
                isFetchError && errorMessage &&
                <FetchFrame bg="red" message={errorMessage} setShowFrame={setIsFetchError}/>
            }
            {
                buses &&
                <BusFunctionalList buses={buses} fetchChoferFunction={fetchChofer} setSelectedBus={setSelectedBus}/>
            }
            {
                isLoading ?
                <Spinner color="warning" size="sm"/>
                : !isLoading && selectedBus &&
                <BusDataDisplay bus={selectedBus} chofer={busChofer}/>
            }
            <Button variant="bordered" color="warning" onClick={ () => setShowAddBusForm(!showAddBusForm)}>
                Agregar bus
            </Button>
            {
                showAddBusForm &&
                <AddBusForm/>
            }
        </div>
    )
}