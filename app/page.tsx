import { Hero, SearchBar, CustomFilter, CarCard } from '@/components';
import { fetchCarData } from '@/utils';
import Image from 'next/image';

export default async function Home() {
   const cars = await fetchCarData();
   // const cars: any = ['car'];

   const isDataEmpty = !Array.isArray(cars) || cars.length == 0;

  return (
    <main>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
         <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
            <p>Here's what we have to offer.</p>
         </div>
         <div className='home__filters'>
            <SearchBar />
            <div className='home__filter-container'>
               <CustomFilter title='fuel' />
               <CustomFilter title='year' />
            </div>
         </div>

         {!isDataEmpty
            ?
            <section>
               <div className='home__cars-wrapper'>
                  {cars.map((car, index) => (
                     <CarCard key={index} car={car} />
                  ))}
               </div>
            </section>
            :
            <div className='home__error-container'>
               <h2 className='text-black text-xl font-bold'>
                  Opps, no results!
               </h2>
               <p>{cars?.message}</p>
            </div>
         }

      </div>
    </main>
  )
}