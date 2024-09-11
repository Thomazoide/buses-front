import { Bus, Chofer } from "@/types/payloads";
import { Chip } from "@nextui-org/react";
import { ReactElement } from "react";

interface CLProps{
    choferes: Chofer[]
    buses?: Bus[]
}

export default function ChoferList(props: Readonly<CLProps>): ReactElement{
    if(!props.choferes[0]){
        return(
            <div className="flex flex-col border-1 border-dotted border-default-900 shadow-lg rounded-xl max-h-[100vh] w-fit p-[15px] ">
                <h1>
                    Sin datos de choferes...
                </h1>
            </div>
        )
    }
    return(
        <div className="flex flex-col border-1 border-dotted border-default-900 shadow-lg rounded-xl max-h-[100vh] min-w-[375px] max-w-[500px] overflow-y-scroll ">
            {
                props.choferes.map( (chofer) => chofer.ubicacion && (
                    <Chip key={chofer.id} color="warning">
                        {chofer.nombre} | {chofer.rut}
                    </Chip>
                ) )
            }
        </div>
    )
}