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
}
module.exports = new UserController();
