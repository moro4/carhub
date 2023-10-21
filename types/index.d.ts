import { PointerEventHandler } from "react";

export interface CustomButtonProps {
   title: string,
   containerStyles?: string,
   handleClick?: PointerEventHandler<HTMLButtonElement>,
   btnType?: 'button' | 'submit'
}

export interface SearchManufacturerProps {
   manufacturer: string,
   setManufacturer: (manufacturer: string) => void
}