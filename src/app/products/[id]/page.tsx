import ProductDetal from '@components/Product/ProductDetal';
import { ProductI } from '@interfaces/ProductI';

<<<<<<< HEAD
async function page({ params }: { params: { id: string } }) {
=======
async function ProductDetailPage({ params }: { params: { id: string } }) {
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const product: ProductI = await res.json();

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

// export async function generateStaticParams() {
//   const res = await fetch('http://localhost:3000/api/products');
//   const products: ProductI[] = await res.json();

//   // Генерируем параметры для каждого продукта на этапе сборки
//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

<<<<<<< HEAD
export default page;
=======
export default ProductDetailPage;
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
