import productController from '@controllers/product-controller.cjs';
import { getToken } from 'next-auth/jwt';

export async function PUT(req, res) {
  try {
    //!У меня id продукта прям в запросе ,но так впадлу его вытаскивать от туда,вставлять куда-то ,если я просто могу передать id в теле запроса и всем будет хорошо. Мб нужно иметь отдельную базу И там напротив каждого продукта выставлять массив пользователей , кто его хочет . Но как будто шило на мыло . Но в чем тогда вообще смысл строить этот роут через id ,если им не пользоваться.Ересь
    const product = await productController.addFavorite(req);

    const response = { result: { product } };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function DELETE(req, res) {
  try {
    //!У меня id продукта прям в запросе ,но так впадлу его вытаскивать от туда,вставлять куда-то ,если я просто могу передать id в теле запроса и всем будет хорошо. Мб нужно иметь отдельную базу И там напротив каждого продукта выставлять массив пользователей , кто его хочет . Но как будто шило на мыло . Но в чем тогда вообще смысл строить этот роут через id ,если им не пользоваться.Ересь
    const product = await productController.deleteFavorite(req);
    const response = { result: { product } };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error.message);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
