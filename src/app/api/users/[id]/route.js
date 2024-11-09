import userController from '@controllers/user-controller.cjs';

export async function DELETE(req, res) {
  try {
    // const body = await req.json();

    const user = await userController.remove(req);
    const response = { result: { user } };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error: 'Ошибка удаления пользователя' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
