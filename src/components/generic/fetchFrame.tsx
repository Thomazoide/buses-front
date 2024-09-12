import { Dispatch, ReactElement, SetStateAction } from "react";
import CloseIcon from "./CloseIcon";
import { Button } from "@nextui-org/react";

interface FFProps{
    message: string
    bg: "red" | "green"
    setShowFrame: Dispatch<SetStateAction<boolean>>
}

export default function FetchFrame(props: Readonly<FFProps>): ReactElement{
    const background: string = props.bg === "red" ? "bg-red-500" : "bg-green-500"
    return(
        <div className={`flex flex-col ${background} gap-3 w-fit h-fit border-2 border-solid border-warning-500 rounded-xl shadow-xl p-[15px] `}>
            <div className="w-full h-fit flex justify-end ">
                <Button variant="ghost" color="warning" isIconOnly startContent={
                    <CloseIcon/>
                } onClick={ () => props.setShowFrame(false)} />
            </div>
            <hr/>
            <div className="flex text-justify text-default-50">
                <p>
                    {props.message}
                </p>
            </div>
        </div>
    )
}