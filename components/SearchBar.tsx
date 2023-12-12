'use client';

import { SearchManufacturer } from '.';
import { useState } from 'react';
import Image from 'next/image';
import icon from 'public/search.svg';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
   const [manufacturer, setManufacturer] = useState('');
   const [model, setModel] = useState('');
   const router = useRouter();

   function handleSearch(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if(manufacturer === '' || model === '') {
         return null;
      }

      updateSearchParams(manufacturer, model);

   }

   function updateSearchParams(manu: string, model: string): void {
      const searchParams = new URLSearchParams(window.location.search);

      searchParams.set('manufacturer', manu.toLowerCase());
      searchParams.set('model', model.toLowerCase());

      const newPath = window.location.pathname + '?' + searchParams.toString();

      router.push(newPath, {scroll: false});
   }


   return (
      <form className='searchbar' onSubmit={handleSearch}>

         <div className='searchbar__item'>
            {/* Autocomplete box displaying a list of car makers */}
            <SearchManufacturer
               manufacturer={manufacturer}
               setManufacturer={setManufacturer}
            />
            <SearchButton otherClasses='sm:hidden' />
         </div>

         <div className='searchbar__item rounded-md ring-1 ring-black
            ring-opacity-5 shadow-md sm:ml-4'
         >
            <Image
               src='/model-icon.png'
               width='25'
               height='25'
               className='absolute w-[20px] h-[20px] ml-4'
               alt='car model'
            />
            <input
               type='text'
               name='model'
               value={model}
               onChange={(e) => setModel(e.target.value)}
               placeholder='Tiguan'
               className='searchbar__input'
            />
            <SearchButton otherClasses='sm:hidden' />
         </div>

         <SearchButton otherClasses='max-sm:hidden' />

      </form>
   )
}

function SearchButton({otherClasses}: {otherClasses: string}) {
   return (
      <button type='submit' className={'flex absolute right-1 z-10 \
         items-center gap-2 bg-primary-blue rounded-md ring-1 ring-black \
         ring-opacity-0 h-[40px] px-4 ' + otherClasses}
      >
         <span className='text-slate-200 font-semibold text-md'>Find</span>
         <Image
            src={icon}
            alt='magnifying glass'
            width='21'
            height='21'
            className='object-contain'
         />
      </button>
   )
}