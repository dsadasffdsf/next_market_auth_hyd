import Pagination from '@components/Pagination';
import ProductsList from '@components/Product/ProductsList';
import Search from '@components/Search';
import { ProductI } from '@interfaces/ProductI';

//! Нужно добавить продуктам order или тип того для отображения порядка? и count научиться выводить для пагинации
//! При жесткой перезагрузке - ломается , сделать search опциональным
export default async function Products({ params, searchParams }) {
  // const page = parseInt(context?.params?.page);
  // console.log(page,'---------------------');
  const searchQuery = searchParams.search || '*';
  const limit = 3;
  const page = parseInt(params.page) || 1;
  const skip = (page - 1) * limit;
  // console.log('page-', page, 'skip-', skip, 'limit-', limit);

  // const page = parseInt(router.query.page)

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/products?search[title]=${searchQuery}&count=true&limit=${limit}&skip=${skip}`,
  );
  const result = await res.json();

  const products: ProductI[] = result.result.products;
  const count: number = result.result.count;

  // console.log(count, '--------------------------');

  return (
    <>
      <Search />
      <ProductsList products={products} />
      <Pagination count={count} page={page} limit={limit} search={searchQuery} />
    </>
  );
}
