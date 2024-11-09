import userController from '@controllers/user-controller.cjs';

export async function POST(req, res) {
  try {
    // const body = await req.json();

    const user = await userController.registration(req);
    const response = { result: { user } };
    return new Response(JSON.stringify(response), {
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

export async function GET(req, res) {
  try {
    // const body = await req.json();

    const userList = await userController.getUsers(req);
    const response = { result: { userList } };
    return new Response(JSON.stringify(response), {
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
