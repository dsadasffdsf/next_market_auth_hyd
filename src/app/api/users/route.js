import userController from '@controllers/user-controller.cjs';

export async function POST(req, res) {
  try {
    // const body = await req.json();

    const jwt = await userController.registration(req);

    return new Response(JSON.stringify({ dto }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log(e.message, '----------------------------');

    return new Response(JSON.stringify({ message: e.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
