import Image from 'next/image';

export default function Hero() {
   return (
      <div className='hero'>
         <div className='flex-1 pt-36 padding-x'>
            <h1 className='hero__title'>
               Find, book, rent a car — quickly and easily!
            </h1>
            <p className='hero__subtitle'>
               Streamline your car rental experience with our effortless booking process.
            </p>
         </div>
      </div>
   )
}