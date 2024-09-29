<<<<<<< HEAD
const productController = require('@controllers/product-controller');

export async function GET(req, res) {
  try {
    // const body = await req.json();

    const product = await productController.getProductById(req);
=======
import { products } from '@data/products';

export async function GET(req) {
  console.log(req, 'req -----------------------------');

  const url = new URL(req.url); // Получаем URL запроса
  const productId = url.pathname.split('/').pop(); // Получаем ID из URL

  // Находим продукт с нужным ID
  const product = products.find((item) => item.id === parseInt(productId));

  if (product) {
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
<<<<<<< HEAD
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ошибка получения продуктов' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function PUT(req, res) {
  try {
    // const body = await req.json();

    const product = await productController.updateProductById(req);
    console.log(product);
    
    return new Response(JSON.stringify({ message: 'Продукт успешно обновлен', product: product }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ошибка получения продуктов' }), {
      status: 500,
=======
  } else {
    return new Response(JSON.stringify({ message: 'Product not found' }), {
      status: 404,
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
