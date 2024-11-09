const {
  authGoogle,
  auth,
  registration,
  getUsers,
  remove,
} = require('@data/utils-data/utils-users');

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
  async remove({ role, id }) {
    try {
      const dto = await remove({ role, id });
      return dto;
    } catch (e) {
      throw e;
    }
  }
  async getUsers() {
    try {
      const userList = await getUsers();
      return userList;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = new UserService();
