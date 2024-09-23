import { ReactElement, useState } from "react";
import { Chofer } from "@/types/payloads";
import { Button, Input } from "@nextui-org/react";

export default function AddChoferForm(): ReactElement{
    const [nombre, setNombre] = useState<string>()
    const [apellido, setApellido] = useState<string>()
    const [rut, setRut] = useState<string>()
    const [numero, setNumero] = useState<string>()

    const handleSubmit = async function(){
        const newChofer: Partial<Chofer> = {
            nombre: `${nombre} ${apellido}`,
            rut,
            numero
        }
        console.log(newChofer)
    }

    return(
        <div className="flex flex-col gap-4 items-center p-[15px] border-1 border-double border-default-900 rounded-xl shadow-md shadow-warning-500 max-w-[500px] min-w-[300px] ">
            <div className="flex justify-center w-full">
                <Input size="sm" type="text" color="warning" variant="bordered" onValueChange={setNombre} label="Primer nombre"/>
            </div>
            <div className="flex justify-center w-full">
                <Input size="sm" type="text" color="warning" variant="bordered" onValueChange={setApellido} label="Apellido"/>
            </div>
            <div className="flex justify-center w-full">
                <Input size="sm" type="text" color="warning" variant="bordered" onValueChange={setRut} label="Rut sin puntos, con guión" placeholder="xxxxxxxx-x"/>
            </div>
            <div className="flex justify-center w-full">
                <Input size="sm" type="text" color="warning" variant="bordered" onValueChange={setNumero} label="Numero celular" placeholder="########" startContent={
                    <span>+56</span>
                }/>
            </div>
            <div className="flex justify-center w-full"></div>
            <div className="flex justify-center w-full">
                <Button color="warning" variant="flat" size="sm" onClick={handleSubmit}>
                    Agregar
                </Button>
            </div>
        </div>
    )
}