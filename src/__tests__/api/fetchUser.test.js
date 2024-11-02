import { fetchGetUserListReq } from '@http/req/fetchUser';

describe('fetchGetUserListReq', () => {
  it('должен возвращать массив пользователей с корректной структурой', async () => {
    const response = await fetchGetUserListReq();

    expect(Array.isArray(response)).toBe(true);

    response.forEach((user) => {
      expect(typeof user.id).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.name).toBe('string');
      expect(typeof user.password).toBe('string');
      expect(typeof user.role).toBe('string');
      expect(Array.isArray(user.basket)).toBe(true);

      if (user.basket && user.basket.length > 0) {
        user.basket.forEach((item) => {
          expect(typeof item.id).toBe('string');
          expect(typeof item.count).toBe('number');
        });
      }
    });
  });
});
