import ProductDetal from '@components/Product/ProductDetal';
import { ProductI } from '@interfaces/ProductI';

async function page({ params }: { params: { id: string } }) {
  // Используем переменную окружения для API URL
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
  const data = await res.json();
  const product: ProductI = data.result.product;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      {product ? (
        <div>
          <ProductDetal product={product} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default page;
