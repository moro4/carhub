'use client';

import { useEffect, useState } from 'react'
import Image from 'next/image';
import { carProps } from '@/types';
import { CarDetails, CustomButton } from '.';
import { calculateCarRent, constructCarImgURL } from '@/utils';

export default function CardCard({ car }: carProps) {

   const [isOpen, setIsOpen] = useState(false);

   const {city_mpg, year, make, model, transmission, drive} = car;
   const carRent = calculateCarRent(city_mpg, year);
   const transmiss = transmission === 'a' ? 'Automatic' : 'Manual';

   return (
      <div className='car-card group'>
         {/* Heading */}
         <div className='car-card__content'>
            <h2 className='car-card__content-title'>{make} {model}</h2>
         </div>

         {/* Rental Rate */}
         <p className='flex mt-6 text-[32px] font-extrabold'>
            <span className='self-start text-[16px] font-semibold'>
               €
            </span>
            <span className='leading-[1.085]'>{carRent}</span>
            <span className='self-end text-[16px] font-medium'>
               /day
            </span>
         </p>

         {/* Car Image */}
         <div className='relative w-full h-40 m-3 object-contain'>
            <Image src={constructCarImgURL(car)} alt='car' fill
               className='object-contain' />
         </div>

         {/* Car Features */}
         <div className='flex relative w-full mt-2'>
            <div className='flex group-hover:invisible w-full justify-between
               text-gray'
            >

               <div className='flex flex-col justify-center items-center
                  gap-2'
               >
                  <Image src='/steering-wheel.svg' width='20' height='20'
                     alt='steering wheel'
                  />
                  <p className='text-[14px]'>{transmiss}</p>
               </div>

               <div className='flex flex-col justify-center items-center
                  gap-2'
               >
                  <Image src='/tire.svg' width='20' height='20' alt='tire' />
                  <p className='text-[14px]'>{drive.toUpperCase()}</p>
               </div>

               <div className='flex flex-col justify-center items-center
                  gap-2'
               >
                  <Image src='/gas.svg' width='20' height='20' alt='gas' />
                  <p className='text-[14px]'>{city_mpg} MPG</p>
               </div>

            </div>

            <div className='car-card__btn-container'>
               <CustomButton
                  title='View More'
                  containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                  textStyles='text-white text-[14px] leading-[17px] font-bold'
                  rightIcon='/right-arrow.svg'
                  handleClick={() => setIsOpen(true)}
               />
            </div>
         </div>

         {/*Modal popup for further car details */}
         <CarDetails
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            car={car}
         />

      </div>
   )
}