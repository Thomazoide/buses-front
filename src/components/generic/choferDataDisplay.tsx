import { Bus, Chofer } from "@/types/payloads";
import { ReactElement } from "react";

interface CHDDProps{
    chofer: Chofer
    bus: Bus
}

export default function ChoferDataDisplay(props: Readonly<CHDDProps>): ReactElement{
    return(
        <div className="flex flex-col items-center p-[15px] max-w-[500px] min-w-fit max-h-[100vh] border-1 border-double border-default-900 rounded-xl shadow-md shadow-warning-500 ">
            <h1>Chofer: {props.chofer.nombre}</h1>
            <hr/>
            <p>
                Rut: {props.chofer.rut}
                <br/>
                Número: {props.chofer.numero}
                <br/>
                Bus: {props.bus.patente}
            </p>
        </div>
    )
}