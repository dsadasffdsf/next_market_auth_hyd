import BtnBack from '@components/HtmlElements/BtnBack';
import { ProductI } from '@interfaces/ProductI';

function ProductDetailPage({ product }: { product: ProductI }) {
  return (
    <>
      <BtnBack />
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    </>
  );
}

export default ProductDetailPage;
