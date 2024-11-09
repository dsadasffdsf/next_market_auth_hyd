import { fetchGetUserListReq, fetchPostUserRegistrationReq } from '@http/req/fetchUser';

describe('fetchGetUserListReq', () => {
  const TOKEN =
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..T3D3aTA7Lwa4s131.xWGpCV-uHotE8c5J5UAaWSq3ksnxFyP9LDQE1AZwUBuSdPNKhfuMUlNt2IRMyNCIFTPHymyS0KopfYpXjtsMjseweks_a0j4KTGMWT5DlSMsE55ihaVIldshlARjD1V-0VsqkkJKaWLTlNmv_PJrPebj0nUBEkgJsPb7-42n_dTc4K2D_d-x0fM9ZJUgvLAm7ORF_1bKMxanou6X9pGy3tSu2KapAdWarb01CoEplkedXZbohDRxtaC6DcCepnO9sZ-TVI4r5859lnHBZtpN1fcZtNZTbsRKvQAFA3Ka5YWWaf0.STSpR60HZd4ZMQHPV2fq4g';
  it('Список активных пользователей', async () => {
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
  it('Создать нового пользователя', async () => {
    //!нет валидатора на сервере
    const user = { name: 'test', email: 'test@test.ru', password: '12345qwe' };
    const response = await fetchPostUserRegistrationReq(user);

    expect(response).toMatchObject({
      id: expect.any(String),
      email: expect.any(String),
      name: expect.any(String),
      role: expect.any(String),
    });
  });
});
