import ProductsList from '@components/Product/ProductsList';
import { ProductI } from '@interfaces/ProductI';

export default async function Products() {
  const res = await fetch('http://localhost:3000/api/products');
  const products: ProductI[] = await res.json();

  return <ProductsList products={products} />;
}
