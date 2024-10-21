import productController from '@controllers/product-controller.cjs';

export async function POST(req, res) {
  try {
    await productController.addFavorite(req);
    return new Response(JSON.stringify({ message: 'Продукт успешно добавлен' }), {
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
