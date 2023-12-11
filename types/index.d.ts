import { PointerEventHandler } from 'react';

export interface CustomButtonProps {
   title: string,
   containerStyles?: string,
   handleClick?: PointerEventHandler<HTMLButtonElement>,
   btnType?: 'button' | 'submit',
   textStyles?: string,
   rightIcon?: string,
   isDisabled?: boolean
}

export interface SearchManufacturerProps {
   manufacturer: string,
   setManufacturer: (manufacturer: string) => void
}

export interface rapidapiOptions {
   method: string,
   headers: {
      'X-RapidAPI-Key': process.env.APIKEY | string,
      'X-RapidAPI-Host': string
   }
}

export interface carProps {
   car: {
      city_mpg: number,
      class: string,
      combination_mpg: number,
      cylinders: number,
      displacement: number,
      drive: string,
      fuel_type: string,
      highway_mpg: number,
      make: string,
      model: string,
      transmission: string,
      year: number
   }
}

export interface CarDetailsProps {
   isOpen: boolean,
   closeModal: () => void,
   car: carProps['car']
}

export interface FilterProps {
   manufacturer: string
   year: number
   fuel: string
   limit: number
   model: string
}

export interface CustomFilterProps {
   title: string,
   options: OptionProps[]
}

export interface OptionProps {
   title: string,
   value: string
}