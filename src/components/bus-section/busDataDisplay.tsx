import { Bus, Chofer } from "@/types/payloads";
import { ReactElement } from "react";

interface BDDProps{
    bus: Bus,
    chofer: Chofer | undefined
}

export default function BusDataDisplay(props: Readonly<BDDProps>): ReactElement{
    return(
        <div className="flex flex-col items-center p-[15px] max-w-[500px] min-w-fit max-h-[100vh] border-1 border-double border-default-900 rounded-xl shadow-md shadow-warning-500 ">
            <h1>Patente: {props.bus.patente} </h1>
            {
                props.chofer ?
                <p>
                    Nombre: {props.chofer.nombre}
                    <br/>
                    Rut: {props.chofer.rut}
                    <br/>
                    Número: {props.chofer.numero}
                </p>
                :
                <p>
                    Sin chofer asignado...
                </p>
            }
        </div>
    )
}