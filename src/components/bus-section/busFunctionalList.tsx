import { Bus } from "@/types/payloads";
import { Button, ScrollShadow } from "@nextui-org/react";
import { Dispatch, MouseEvent, ReactElement, SetStateAction, useState } from "react";

interface BFLProps{
    buses: Bus[]
    setSelectedBus: Dispatch<SetStateAction<Bus | undefined>>
    fetchChoferFunction: (patente: string) => Promise<void>
}

export default function BusFunctionalList(props: Readonly<BFLProps>): ReactElement{
    const [selectedBusPatente, setSelectedBusPatente] = useState<string>()

    const handleSelect = function(e: MouseEvent<HTMLButtonElement>){
        const bus_patente: string = e.currentTarget.value
        setSelectedBusPatente(bus_patente)
        props.setSelectedBus(props.buses.find( (bus) => bus.patente === bus_patente ))
        props.fetchChoferFunction(bus_patente)
    }

    return(
        <div className="flex flex-col items-center p-[15px] border-1 border-default-900 border-double rounded-xl shadow-md shadow-warning-500 max-w-[500px] min-w-fit max-h-[100vh] ">
            <ScrollShadow className="w-full h-full flex flex-col items-center ">
                {
                    props.buses.map( (bus) => (
                        <Button key={bus.patente} variant="flat" isDisabled={selectedBusPatente === bus.patente} color="warning" value={bus.patente} onClick={handleSelect}>
                            Patente: {bus.patente}
                        </Button>
                    ) )
                }
            </ScrollShadow>
        </div>
    )
}