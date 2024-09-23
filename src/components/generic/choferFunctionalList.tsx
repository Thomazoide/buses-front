import { Chofer } from "@/types/payloads";
import { Button, ScrollShadow } from "@nextui-org/react";
import { Dispatch, MouseEvent, ReactElement, SetStateAction, useState } from "react";

interface CHFLProps{
    choferes: Chofer[]
    setSelectedChofer: Dispatch<SetStateAction<Chofer | undefined>>
    fetchBusFunction: (bus_id: number) => Promise<void>
}

export default function ChoferFunctionalList(props: Readonly<CHFLProps>): ReactElement{
    const [selectedBusID, setSelectedBusID] = useState<number>()

    const handleSelect = function(e: MouseEvent<HTMLButtonElement>){
        const bus_id: number = Number(e.currentTarget.value)
        setSelectedBusID(bus_id)
        props.setSelectedChofer(props.choferes.find( (chofer) => chofer.bus_id === bus_id ))
        props.fetchBusFunction(bus_id)
    }

    return(
        <div className="flex felx-col items-center p-[15px] border-1 border-default-900 border-double rounded-xl shadow-md shadow-warning-500 max-w-[500px] min-w-fit max-h-[100vh]">
            <ScrollShadow className="w-full h-full flex flex-col items-center">
                {
                    props.choferes.map( (chofer) => (
                        <Button key={chofer.bus_id} variant="flat" isDisabled={selectedBusID === chofer.bus_id} color="warning" value={chofer.bus_id} onClick={ handleSelect }>
                            {chofer.nombre} | {chofer.rut}
                        </Button>
                    ) )
                }
            </ScrollShadow>
        </div>
    )
}