import productController from '@controllers/product-controller.cjs';

export async function GET(req, res) {
  try {
    const products = await productController.basket(req);
    const response = { result: { products } };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error: 'Ошибка получения продуктов' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
