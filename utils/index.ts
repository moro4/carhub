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