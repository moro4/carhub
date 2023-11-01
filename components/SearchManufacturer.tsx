'use client';

import Image from 'next/image';
import { SearchManufacturerProps } from '@/types';
import {Transition, Combobox} from '@headlessui/react';
import { useState, Fragment } from 'react';
import {manufacturers} from '@/constants';
import { log } from 'console';

export default function SearchManufacturer(
   {manufacturer, setManufacturer}: SearchManufacturerProps
   ) {

   const [query, setQuery] = useState('');

   const filteredManufacturers =
      query === ''
         ? manufacturers
         : manufacturers.filter(
            item => item.toLowerCase().replace(/\s+/g, '')
               .startsWith(query.toLowerCase().replace(/\s+/g, ''))
         )

   return (
      <div className='search-manufacturer'>
         <Combobox value={manufacturer} onChange={setManufacturer}>
            <div className='w-full shadow-md rounded-md ring-1 ring-black
               ring-opacity-5'
            >
                  <Combobox.Button className='absolute top-[14px]'>
                     <Image
                        src='/car-logo.svg'
                        width='20'
                        height='20'
                        className='ml-4'
                        alt='Car logo'
                     />
                  </Combobox.Button>
                  <Combobox.Input
                     className='search-manufacturer__input'
                     placeholder='Volkswagen'
                     displayValue={(manufacturer: string) => manufacturer}
                     onChange={event => setQuery(event.target.value)}
                  />
                  <Transition
                     as={Fragment}
                     leave='transition ease-in duration-100'
                     leaveFrom='opacity-100'
                     leaveTo='opacity-0'
                     afterLeave={() => setQuery('')}
                  >
                     <Combobox.Options className='w-full absolute z-[999]
                        max-h-72 cursor-default text-left sm:text-sm
                        rounded-b-md bg-white shadow-md overflow-auto
                        mt-[-3px] ring-1 ring-black ring-opacity-5'
                     >
                        {filteredManufacturers.length === 0
                           // if no matching manufacturer
                           ? <Combobox.Option
                              value={query}
                              className='search-manufacturer__option'
                           >
                              Nothing found.
                           </Combobox.Option>

                           // if manufacturer exists
                           : filteredManufacturers.map(item => (
                              <Combobox.Option
                                 key={item}
                                 value={item}
                                 className={({ active }) => `
                                    relative search-manufacturer__option
                                    ${active ? 'bg-primary-blue text-white'
                                             : 'text-gray-900'}
                              `}
                              >
                                 {({ selected, active }) => (
                                    <>
                                       <span
                                          className={`block truncate
                                          ${selected ? 'font-bold indent-2'
                                                     : 'font-normal'}
                                       `}
                                       >
                                          {item}
                                       </span>

                                       {selected
                                          ? <span
                                             className={`absolute inset-y-0
                                                left-0 flex items-center pl-6
                                                font-bold text-base
                                                ${active ? 'text-white'
                                                         : 'text-gray-400'}`
                                             }
                                          >
                                             {/* this arcane syntax for a
                                             right arrow is needed to fix a
                                             TS warning */}
                                             {'->'}
                                          </span>
                                          : null}
                                    </>
                                 )}
                              </Combobox.Option>
                           ))
                        }
                     </Combobox.Options>
                  </Transition>
            </div>
         </Combobox>
      </div>
   )
}
