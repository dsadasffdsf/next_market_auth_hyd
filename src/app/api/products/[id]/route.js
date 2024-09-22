import { products } from '@data/products';

export async function GET(req) {
  console.log(req, 'req -----------------------------');

  const url = new URL(req.url); // Получаем URL запроса
  const productId = url.pathname.split('/').pop(); // Получаем ID из URL

  // Находим продукт с нужным ID
  const product = products.find((item) => item.id === parseInt(productId));

  if (product) {
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: 'Product not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
