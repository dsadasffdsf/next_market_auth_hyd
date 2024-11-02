const productController = require('@controllers/product-controller.cjs');
// get 1 product
export async function GET(req, res) {
  try {
    // const body = await req.json();

    const product = await productController.getProductById(req);
    const response = { result: { product } };
    return new Response(JSON.stringify(response), {
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
// update 1 product
export async function PUT(req, res) {
  try {
    // const body = await req.json();

    const product = await productController.updateProductById(req);
    // console.log(product);
    const response = { result: { product } };
    return new Response(JSON.stringify(response), {
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
export async function DELETE(req, res) {
  try {
    // const body = await req.json();

    const product = await productController.deleteProductById(req);
    const response = { result: { product } };
    return new Response(JSON.stringify(response), {
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
