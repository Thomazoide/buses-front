import { Bus, Chofer } from "@/types/payloads";
import { Button, ScrollShadow, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { ReactElement, useEffect, useState } from "react";

interface CLProps{
    choferes: Chofer[]
    buses: Bus[]
}

interface chofer_bus{
        chofer: Chofer,
        bus?: Bus,
        showData: boolean
}

export default function ChoferList(props: Readonly<CLProps>): ReactElement{

    const [entities, setEntities] = useState<chofer_bus[]>()

    const sortEntities = function(): chofer_bus[]{
        const entitiesTemp: chofer_bus[] = []
        for(let chofer of props.choferes){
            entitiesTemp.push({
                chofer,
                bus: props.buses.find( (bus) => bus.id === chofer.bus_id ),
                showData: false
            })
        }
        console.log(entitiesTemp)
        return entitiesTemp
    }

    useEffect( () => {
        if(!entities){
            setEntities(sortEntities())
        }
    }, [] )

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
        <div className="flex flex-col border-1 border-double border-default-900 shadow-lg rounded-xl p-[15px] max-h-[100vh] max-w-[500px]">
            <ScrollShadow className="flex flex-col items-center gap-3 p-[15px] w-full h-full ">
            { entities &&
                entities.map( (entity) => entity.chofer.ubicacion && (
                    <div key={entity.chofer.id} className="flex flex-col items-center gap-2" >
                        <Popover placement="bottom" showArrow>
                            <PopoverTrigger>
                                <Button value={entity.chofer.id} color="warning" variant="flat">
                                    {entity.chofer.nombre} | {entity.chofer.rut}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2 ">
                                    <p>
                                        { entity.bus ?
                                            <small className="font-bold" >
                                                Patente: {entity.bus?.patente}
                                            </small>
                                         : 
                                            <small>
                                                Sin bus asociado
                                            </small>
                                        }
                                    </p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) )
            }
            </ScrollShadow>
        </div>
    )
}