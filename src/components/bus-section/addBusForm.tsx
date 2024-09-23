import { ReactElement, useState } from "react";
import { Bus } from "@/types/payloads";
import { Button, Input } from "@nextui-org/react";

export default function AddBusForm(): ReactElement{
    const [patente, setPatente] = useState<string>()
    
    const handleSubmit = async function(){
        const newBus: Partial<Bus> = {
            patente
        }
        console.log(newBus)
    }
    return(
        <div className="flex flex-col gap-4 items-center p-[15px] border-1 border-double border-default-900 rounded-xl shadow-md shadow-warning-500 max-w-[500px] min-w-[300px] ">
            <div className="flex justify-center w-full ">
                <Input size="sm" type="text" color="warning" variant="bordered" onValueChange={setPatente} label="Patente del bus"/>
            </div>
            <div className="flex justify-center w-full">
                <Button color="warning" variant="flat" size="sm" onClick={handleSubmit}>
                    Agregar
                </Button>
            </div>
        </div>
    )
}