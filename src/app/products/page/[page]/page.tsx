import Pagination from '@components/Pagination';
import ProductsList from '@components/Product/ProductsList';
import { ProductI } from '@interfaces/ProductI';

//! Нужно добавить продуктам order или тип того для отображения порядка? и count научиться выводить для пагинации
//! При жесткой перезагрузке - ломается , сделать search опциональным
export default async function Products({ params }) {
  // const page = parseInt(context?.params?.page);
  // console.log(page,'---------------------');
  const limit = 3;
  const page = parseInt(params.page) || 1;
  const skip = (page - 1) * limit;
  console.log('page-', page, 'skip-', skip, 'limit-', limit);

  // const page = parseInt(router.query.page)

  const res = await fetch(
    `http://localhost:3000/api/products?search[title]=*&count=true&limit=${limit}&skip=${skip}`,
  );
  const result = await res.json();

  const products: ProductI[] = result.result.products;
  const count: number = result.result.count;

  // console.log(count, '--------------------------');

  return (
    <>
      <ProductsList products={products} />
      <Pagination count={count} page={page} />
    </>
  );
}
