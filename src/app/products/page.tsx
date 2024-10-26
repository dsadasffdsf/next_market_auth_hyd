// import Pagination from '@components/Pagination';
// import ProductsList from '@components/Product/ProductsList';
// import { ProductI } from '@interfaces/ProductI';


// //! Нужно добавить продуктам order или тип того для отображения порядка? и count научиться выводить для пагинации
// //! При жесткой перезагрузке - ломается , сделать search опциональным
// export default async function Products() {
//   // const page = parseInt(context?.params?.page);
//   // console.log(page,'---------------------');
//   // const page = parseInt(params.page) || 1;

//   console.log(api.getSlugs);
  
  
//   // const page = parseInt(router.query.page)
  
//   const res = await fetch('http://localhost:3000/api/products?search[title]=*&count=true&limit=3');
//   const result = await res.json();

//   const products: ProductI[] = result.result.products;
//   const count: number = result.result.count;

//   // console.log(count, '--------------------------');

//   return (
//     <>
//       <ProductsList products={products} />
//       <Pagination count={count} />
//     </>
//   );
// }
