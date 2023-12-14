export async function GET(
   request: Request, {params}: {params: {slug: string | string[]}}
   ) {
   try {
      const [year, make, model, zoomtype, angle] = params.slug;

      const url = new URL('https://cdn.imagin.studio/getimage');

      url.searchParams.append('customer', process.env.CARIMG_APIKEY as string);
      url.searchParams.append('modelYear', year.toString());
      url.searchParams.append('make', make);
      url.searchParams.append('modelFamily', model.split(' ')[0]);
      url.searchParams.append('zoomType', zoomtype);
      url.searchParams.append('angle', angle);

      // just forward the response to the frontend as blob,
      // img's src attribute will handle it correctly
      const res = await fetch(url);
      const blob = await res.blob();
      return new Response(blob, {
         status: 200,
         headers: {
            'Content-Type': 'image/webp'
       }});
   } catch (error) {
      console.log('ROUTE HANDLER CAR IMAGE ERROR', error);
   }
}