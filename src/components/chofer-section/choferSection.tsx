import { Bus, Chofer, ResponsePayload } from "@/types/payloads";
import axios, { AxiosResponse } from "axios";
import { ReactElement, useState, useEffect } from "react";
import FetchFrame from "../generic/fetchFrame";
import ChoferFunctionalList from "../generic/choferFunctionalList";
import { Button, Spinner } from "@nextui-org/react";
import ChoferDataDisplay from "../generic/choferDataDisplay";
import AddChoferForm from "./addChoferForm";

export default function ChoferSection(): ReactElement{
    const [choferes, setChoferes] = useState<Chofer[]>()
    const [selectedChofer, setSelectedChofer] = useState<Chofer>()
    const [choferBus, setChoferBus] = useState<Bus>()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [isFetchError, setIsFetchError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showAddChoferForm, setShowAddChoferForm] = useState<boolean>(false)

    const CHOFERES_ENDPOINT: string = `${import.meta.env.VITE_API_URL}/choferes`

    const fetchChoferes = async function(){
        try{
            const response: AxiosResponse<ResponsePayload<Chofer[]>> = await axios.get(CHOFERES_ENDPOINT)
            if(response.data.error){
                setIsFetchError(true)
                setErrorMessage(response.data.message)
                return
            }
            setChoferes(response.data.data)
        }catch(error: any){
            setIsFetchError(true)
            setErrorMessage(error.message)
        }
    }

    const fetchBus = async function(bus_id: number){
        setIsLoading(true)
        const BUS_ENDPOINT: string = `${import.meta.env.VITE_API_URL}/buses/id`
        const REQUEST_BODY: Partial<Bus> = {
            id: bus_id
        }
        try{
            const response: AxiosResponse<ResponsePayload<Bus>> = await axios.post(BUS_ENDPOINT, REQUEST_BODY)
            if(response.data.error){
                setIsFetchError(true)
                setErrorMessage(response.data.message)
                return
            }
            console.log("bus fetched")
            setChoferBus(response.data.data)
        }catch(error: any){
            setIsFetchError(true)
            setErrorMessage(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect( () => {
        if(!choferes){
            fetchChoferes()
        }
    }, [] )

    return(
        <div className="container flex flex-wrap gap-4 justify-evenly w-full mx-4 border-solid border-3 border-warning-300 rounded-xl p-[15px]">
            {
                isFetchError && errorMessage &&
                <FetchFrame bg="red" message={errorMessage} setShowFrame={setIsFetchError}/>
            }
            {
                choferes &&
                <ChoferFunctionalList choferes={choferes} setSelectedChofer={setSelectedChofer} fetchBusFunction={fetchBus}/>
            }
            {
                isLoading ?
                <Spinner color="warning"/>
                : !isLoading && selectedChofer && choferBus &&
                <ChoferDataDisplay chofer={selectedChofer} bus={choferBus}/>
            }
            <Button variant="bordered" color="warning" onClick={ () => setShowAddChoferForm(!showAddChoferForm) }>
                Agregar chofer
            </Button>
            {
                showAddChoferForm &&
                <AddChoferForm/>
            }
        </div>
    )
}