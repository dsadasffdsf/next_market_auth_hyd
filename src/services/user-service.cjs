const { authGoogle, auth, registration } = require('@data/utils-data/utils-users');

class UserService {
  async authByGoogle({ email, name }) {
    try {
      const dto = await authGoogle({ email, name });
      return dto;
    } catch (e) {
      console.error(e);
    }
  }
  async auth({ email, password }) {
    try {
      const dto = await auth({ email, password });
      return dto;
    } catch (e) {
      console.error(e);
    }
  }
  async registration({ name, email, password }) {
    try {
      const dto = await registration({ name, email, password });
      return dto;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = new UserService();
