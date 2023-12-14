'use client';

import { CarDetailsProps, carProps } from '@/types';
import { SyntheticEvent, useEffect, useRef, useState} from 'react'
import Image from 'next/image';
import { Fragment } from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {
   Table,
   TableBody,
   TableCell,
   TableRow
 } from '@/components';
import { constructCarImgURL } from '@/utils';

export default function CarDetails(
   {isOpen, closeModal, car}: CarDetailsProps
   ) {
      const featuredImage = useRef<HTMLImageElement>(null);

      function swapImageHandler(event: SyntheticEvent): void {
         if (featuredImage.current instanceof HTMLImageElement &&
            event.target instanceof HTMLImageElement) {

            const featuredImageSrc = featuredImage.current.src;
            const supImageSrc = event.target.src;

            featuredImage.current.srcset = supImageSrc;
            event.target.srcset = featuredImageSrc;
         }
      }

   return (
      <>
         <Transition show={isOpen} appear={true} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-150'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
               >
                  <div className='fixed inset-0 bg-black bg-opacity-25
                     backdrop-blur-[5px]'
                  ></div>
               </Transition.Child>
               <div className='fixed inset-0 overflow-y-auto p-4'>
                  <div className='flex min-h-full items-center justify-center'
                  >
                     <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-150'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-100'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                     >
                        <Dialog.Panel className='relative flex flex-col
                           w-full max-w-lg max-h-[90vh] overflow-y-auto
                           rounded-2xl bg-white gap-5 drop-shadow-2xl p-6'
                        >
                           <button
                              type='button'
                              onClick={closeModal}
                              className='absolute z-10 top-2 right-2 p-2 m-2
                               bg-primary-blue-100 rounded-full
                               ring-1 ring-black ring-opacity-20'
                           >
                              <Image
                                 src='/close.svg'
                                 alt='closebutton'
                                 width='20'
                                 height='20'
                                 className='object-contain opacity-40
                                    hover:opacity-70'
                              />
                           </button>

                           <div className='flex-1 flex flex-col gap-3'>

                              {/* Background Pattern with featured car image */}
                              <div className='relative w-full h-44 bg-pattern
                                 bg-cover bg-center rounded-lg'
                              >
                                 <Image src={constructCarImgURL(car)}
                                    unoptimized
                                    alt='car'
                                    fill
                                    className='object-contain p-3'
                                    ref={featuredImage}
                                 />
                              </div>

                              {/* Car supplementary images */}
                              <div className='flex gap-3'>
                                 <div className='flex-1 relative w-full h-24
                                    bg-primary-blue-100 rounded-lg'
                                 >
                                    <Image src={constructCarImgURL(car, '13')}
                                       unoptimized
                                       alt='car'
                                       fill
                                       className='object-contain'
                                       onClick={swapImageHandler}
                                    />
                                 </div>
                                 <div className='flex-1 relative w-full h-24
                                    bg-primary-blue-100 rounded-lg'
                                 >
                                    <Image src={constructCarImgURL(car, '33')}
                                       unoptimized
                                       alt='car'
                                       fill
                                       className='object-contain'
                                       onClick={swapImageHandler}
                                    />
                                 </div>
                                 <div className='flex-1 relative w-full h-24
                                    bg-primary-blue-100 rounded-lg'
                                 >
                                    <Image src={constructCarImgURL(car, '29')}
                                       unoptimized
                                       alt='car'
                                       fill
                                       className='object-contain'
                                       onClick={swapImageHandler}
                                    />
                                 </div>
                              </div>
                           </div>

                           {/* Car data */}
                           <div className='flex-1 flex flex-col gap-2'>
                              <h2 className='font-semibold text-xl capitalize'>
                                 {car.make} {car.model}
                              </h2>
                              <Table>
                                 <TableBody>
                                    {Object.entries(car).map(([k, v], idx) => (
                                       <TableRow key={idx}>
                                          <TableCell>
                                             <h4 className='text-grey
                                                font-semibold capitalize'
                                             >
                                                {k.replace('_', ' ') + ':'}
                                             </h4>
                                          </TableCell>
                                          <TableCell className='text-left
                                             font-semibold'
                                          >
                                             {k === 'transmission'
                                                ? v === 'a'
                                                   ? 'automatic'
                                                   : 'manual'
                                                : v}
                                          </TableCell>
                                       </TableRow>
                                    ))}
                                 </TableBody>
                              </Table>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   )
}



