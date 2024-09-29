const productController = require('@controllers/product-controller');

export async function GET(req, res) {
  try {
    // const body = await req.json();

    const product = await productController.getProductById(req);
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
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
      headers: { 'Content-Type': 'application/json' },
    });
  }
}