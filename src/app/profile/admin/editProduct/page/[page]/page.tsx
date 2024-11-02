import Pagination from '@components/Pagination';
import ProductsList from '@components/Product/ProductsList';
import EditProductList from '@components/Profile/EditProductList';
import Search from '@components/Search';
import { ProductI } from '@interfaces/ProductI';


//! Нужно добавить продуктам order или тип того для отображения порядка? и count научиться выводить для пагинации
//! При жесткой перезагрузке - ломается , сделать search опциональным
export default async function Products({ params ,searchParams}) {
  const searchQuery = searchParams.search || '*';
  // const page = parseInt(context?.params?.page);
  // console.log(params,'---------------------');
  const limit = 9;
  const page = parseInt(params.page) || 1;
  const skip = (page - 1) * limit;
  // console.log('page-', page, 'skip-', skip, 'limit-', limit);

  // const page = parseInt(router.query.page)

  const res = await fetch(
    `http://localhost:3000/api/products?search[title]=${searchQuery}&count=true&limit=${limit}&skip=${skip}`,
  );
  const data = await res.json();

  const products: ProductI[] = data.result.products;
  const count: number = data.result.count;

  // console.log(count, '--------------------------');

  return (
    <>
      <Search />
      <EditProductList searchProducts={products} />
      <Pagination count={count} page={page} limit={limit} />
    </>
  );
}
