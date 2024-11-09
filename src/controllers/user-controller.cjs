const { getToken } = require('next-auth/jwt');
const userService = require('../services/user-service.cjs');

class UserController {
  async authByGoogle(req, res) {
    const body = await req.json();
    const { email, name } = body;
    const dto = await userService.authByGoogle({ email, name });
    return dto;
  }
  async auth(req, res) {
    const body = await req.json();
    const { email, password } = body;
    const dto = await userService.auth({ email, password });
    return dto;
  }
  async registration(req, res) {
    try {
      const body = await req.json();
      const { name, email, password } = body;
      const dto = await userService.registration({ name, email, password });
      return dto;
    } catch (e) {
      throw e;
    }
  }

  async remove(req, res) {
    try {
      const id = req.nextUrl.pathname.split('/').pop();
      const user = await getToken({ req });
      // console.log(user, '-------------user');
      // console.log(id, '-------------id');

      const dto = await userService.remove({ role: user.role, id });
      return dto;
    } catch (e) {
      throw e;
    }
  }

  async getUsers(req, res) {
    try {
      const userList = await userService.getUsers();
      return userList;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = new UserController();
