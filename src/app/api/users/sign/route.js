import userController from '@controllers/user-controller.cjs';

export async function POST(req, res) {
  try {
    // const body = await req.json();

    const dto = await userController.auth(req);
    if (dto) {
      return new Response(JSON.stringify({ dto }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      //!Вроде возвращаю 403 , но next сам ее перебивает под свою 401 ,надо будет подумать
      return new Response(JSON.stringify({ message: 'Неправильный логин или пароль' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ошибка авторизации' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req, res) {
  try {
    // const body = await req.json();

    const dto = await userController.authByGoogle(req);
    return new Response(JSON.stringify({ dto }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ошибка авторизации' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
