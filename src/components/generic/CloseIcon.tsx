import Icon from "@/assets/211652_close_icon.svg"
import { Image } from "@nextui-org/react";
import { ReactElement } from "react";

export default function CloseIcon(): ReactElement{
    return(
        <Image src={Icon} alt="Close button" width="100%" height="100%" />
    )
}