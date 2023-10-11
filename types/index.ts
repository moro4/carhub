import { PointerEventHandler } from "react";

export interface CustomButtonProps {
   title: string;
   containerStyles?: string;
   handleClick?: PointerEventHandler<HTMLButtonElement>
}