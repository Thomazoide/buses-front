import { useState, useEffect, ReactElement } from "react";
import axios, {AxiosResponse} from "axios";
import { Bus, Chofer, ResponsePayload } from "@/types/payloads";
import FetchFrame from "../generic/fetchFrame";
import ChoferList from "../generic/choferList";
import { Map } from "./map";

export function MapSection(): ReactElement{

    const [choferes, setChoferes] = useState<Chofer[]>()
    const [buses, setBuses] = useState<Bus[]>()
    const [isFetchError, setIsFetchError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>()

    const CHOFERES_ENDPOINT: string = `${import.meta.env.VITE_API_URL}/choferes`
    const BUSES_ENDPOINT: string = `${import.meta.env.VITE_API_URL}/buses`

    const fetchChoferes = async function(){
        try{
            const response: AxiosResponse<ResponsePayload<Chofer[]>> = (await axios.get(CHOFERES_ENDPOINT))
            if(response.data.error){
                setIsFetchError(true)
                setErrorMessage(response.data.message)
                return
            }
            setChoferes(response.data.data)
            console.log("fetched")
        }catch(error: any){
            setIsFetchError(true)
            setErrorMessage(error.message)
        }
    }

    const fetchBuses = async function(){
        try {
            const response: AxiosResponse<ResponsePayload<Bus[]>> = (await axios.get(BUSES_ENDPOINT))
            if(response.data.error){
                setIsFetchError(true)
                setErrorMessage(response.data.message)
                return
            }
            setBuses(response.data.data)
        } catch (error: any) {
            setIsFetchError(true)
            setErrorMessage(error.message)
        }
    }

    useEffect( () => {
        if(!choferes && !buses){
            fetchBuses()
            fetchChoferes()
        }

        const refetchInterval = setInterval( () => {
            fetchBuses()
            fetchChoferes()
        }, 5000 )

        return () => clearInterval(refetchInterval)
    }, [] )

    return(
        <div className="container flex flex-wrap gap-4 justify-evenly w-full mx-4 border-solid border-3 border-warning-300 rounded-xl p-[15px] ">
            {
                isFetchError && errorMessage &&
                <FetchFrame bg="red" message={errorMessage} setShowFrame={setIsFetchError} />
            }
            {
                choferes && buses && 
                <ChoferList choferes={choferes} buses={buses}/>
            }
            {
                choferes && buses &&
                <div className="flex justify-center w-full lg:w-[700px] h-[500px] border-1 border-double border-default-900 rounded-lg shadow-md shadow-warning-500 p-[10px]" >
                <Map buses={buses} choferes={choferes}/>
                </div>
            }
        </div>
    )

}