const productController = require('@controllers/product-controller');

// get all products
export async function GET(req, res) {
  try {
    const products = await productController.getProducts();
    return new Response(JSON.stringify(products), {
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
export async function POST(req, res) {
  try {

    await productController.addProduct(req);
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

// Обработка POST-запроса для добавления нового продукта
// export async function POST(request) {
//   try {
//     // Получаем новый продукт из тела запроса
//     const newProduct = await request.json();

//     // Простой валидационный чек (можно добавить больше проверок)
//     if (!newProduct || !newProduct.id || !newProduct.title || !newProduct.price) {
//       return new Response(JSON.stringify({ error: 'Неверные данные продукта' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Загружаем текущие продукты
//     const products = await getProducts();

//     if (products.filter(product)) {
//     }
//     // Добавляем новый продукт в список
//     products.push(newProduct);

//     // Сохраняем обновленный список продуктов
//     await saveProducts(products);

//     // Возвращаем ответ с добавленным продуктом
//     return new Response(
//       JSON.stringify({ product: newProduct, message: 'Продукт успешно добавлен' }),
//       {
//         status: 201, // Статус "Created"
//         headers: { 'Content-Type': 'application/json' },
//       },
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Не удалось добавить продукт' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
