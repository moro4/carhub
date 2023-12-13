import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from '@/components';
import { fetchCarData } from '@/utils';
import { FilterProps } from '@/types';
import Image from 'next/image';
import { fuels, yearsOfProduction } from '@/constants';

export default async function Home(
   { searchParams }: { searchParams: FilterProps }
) {
   const cars = await fetchCarData({
      manufacturer: searchParams.manufacturer ?? '',
      year: searchParams.year ?? '2023',
      fuel: searchParams.fuel ?? '',
      limit: searchParams.limit ?? 10,
      model: searchParams.model ?? ''
   });

   const isDataEmpty = !Array.isArray(cars) || cars.length == 0;

   return (
      <main>
         <Hero />
         <div className='mt-12 padding-x padding-y max-width' id='discover'>
            <div className='home__text-container'>
               <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
               <p>Here is what we have to offer.</p>
            </div>
            <div className='home__filters'>
               <SearchBar />
               <div className='home__filter-container'>
                  <CustomFilter title='fuel' options={fuels} />
                  <CustomFilter title='year' options={yearsOfProduction} />
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
                  <ShowMore
                     pageNumber={(searchParams.limit || 10) / 10}
                     // API has no endpoint for exact number of cars available
                     // hence this hack with isNext prop
                     isNext={(searchParams.limit || 10) > cars.length}
                  />
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