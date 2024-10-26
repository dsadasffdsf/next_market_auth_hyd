const productController = require('@controllers/product-controller.cjs');

// get all products
// export async function GET(req, res) {
//   try {
//     const products = await productController.getProducts();
//     return new Response(JSON.stringify(products), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Ошибка получения продуктов' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

export async function GET(req, res) {
  //http://localhost:3000/api/products?search[title]=men
  try {
    console.log('------------------------------------------------');

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    let products = [];
    let count = 0;
    // Получаем все условия поиска в виде объекта
    const searchConditions = {};

    const limit = searchParams.get('limit') || '3';
    const skip = searchParams.get('skip') || '0';

    console.log(limit, skip);

    const countRequested = searchParams.get('count');
    // console.log(searchParams, '=---------------------=====');
    // console.log(countRequested);

    // Перебираем все параметры поиска
    for (const [key, value] of searchParams.entries()) {
      // Пример: 'search[title]' -> 'title', 'men' -> 'men'
      const paramKey = key.split('[')[1]?.slice(0, -1); // Извлекаем ключ
      const paramValue = value.startsWith('*') ? value.slice(1) : value; // Убираем * если есть

      searchConditions[paramKey] = paramValue; // Сохраняем в объекте
    }

    // console.log('Условия поиска:', Object.keys(searchConditions)[0]);
    if (Object.keys(searchConditions)[0] === 'title') {
      products = await productController.searchByTitle({
        title: searchConditions.title,
        limit,
        skip,
      });
      // console.log(products, '--------------------prod');
    }
    if (countRequested) {
      count = await productController.productsCount();
    }

    const response = { result: { products } };
    // console.log(JSON.stringify(response, null, 2), "-----------------------------resp");

    if (count) {
      response.result.count = count;
    }
    // console.log(products);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error();

    return new Response(JSON.stringify({ error: 'Ошибка получения продуктов' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// add new product
export async function POST(req, res) {
  try {
    const product = await productController.addProduct(req);

    const response = { result: { product } }

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
