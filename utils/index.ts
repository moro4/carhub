import { rapidapiOptions } from "@/types";

export async function fetchCarData() {

   const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=bmw';
   const options: rapidapiOptions = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': process.env.APIKEY,
         'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
      }
   };

   try {
      const response = await fetch(url, options);
      const result = await response.json();

      return result;

   } catch (error) {
      console.log(error);
   }

}

export const calculateCarRent = (city_mpg: number, year: number) => {
   // This function uses a random algorithm to calculate a fictitious
   // daily rental rate serving as a filler in the user interface

   const basePricePerDay = 50; // Base rental price per day in dollars
   const mileageFactor = 0.1; // Additional rate per mile driven
   const ageFactor = 0.05; // Additional rate per year of vehicle age

   // Calculate additional rate based on mileage and age
   const mileageRate = city_mpg * mileageFactor;
   const ageRate = (new Date().getFullYear() - year) * ageFactor;

   // Calculate total rental rate per day
   const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

   return rentalRatePerDay.toFixed(0);
};