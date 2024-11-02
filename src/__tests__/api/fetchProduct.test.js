import {
  fetchDeleteProductReq,
  fetchDelFavoriteProductReq,
  getBasketProductsReq,
  getSearchProductReq,
  postCreateProductReq,
  putAddFavoriteProductReq,
  putEditProductReq,
} from '@http/req/fetchProduct';
//! Если я добавил пользователю продукт ,а потом его удалил . Нужно что-то вернуть
//! Проверить уровни доступа к запросам и добавить проверку ролей Добавлять и менять продукты может только админ
describe('Products Tests', () => {
  let ID;
  const TOKEN =
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..iElgMkecem-MiMIi.u_A9jX3qmJEdObAoG0w1y9PnC5bS-606DhIih9udmaUlQBOge6_fmCrLnZIfErm0VL79_jVd8QLLaJ-WVsv6XFiBea5FEFevSvO1mDgWfmRh3GHSUpvsvvxRyyMSD3U590ROujsRoIuo0Xzk_DcHEY4XmU1FpJM5FfoK0qRFKw-CaemZBT4F19VdFzzMdGXLejX5DBT-hlvabPOdS-92NDwG1IIbTdzMfMpkEqwWSV72MNkPcxpzcB9ETNZcPQoloriF3CMgHbt0q_z3T2MXhikFbXA4q9RovTWD89CmGP4.Za2xoj3l-PdxfQaihV7YjQ';
  it('getSearchProductReq', async () => {
    const response = await getSearchProductReq('*');

    expect(Array.isArray(response)).toBe(true);

    response.forEach((product) => {
      expect(typeof product.id).toBe('string');
      expect(typeof product.title).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.description).toBe('string');
      if (product.count !== undefined) {
        expect(typeof product.count).toBe('number');
      }
    });
  });

  it('postCreateProductReq', async () => {
    const params = { title: 'New Product', price: 50, description: 'New product description' }; // Пример данных
    const response = await postCreateProductReq(params);

    expect(response).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
    });
    ID = response.id;
  });
  it('putEditProductReq', async () => {
    const editParams = {
      id: ID,
      title: 'Updated Product',
      price: 99999,
      description: 'Updated Description',
    }; // Пример данных
    const response = await putEditProductReq(editParams);

    expect(response).toMatchObject({
      id: editParams.id,
      title: editParams.title,
      price: editParams.price,
      description: editParams.description,
    });
  });
  it('putAddFavoriteProductReq', async () => {
    const response = await putAddFavoriteProductReq(
      {
        productId: ID,
        count: 3,
      },
      TOKEN,
    );
    expect(response).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
    });
  });
  it('getBasketProductsReq', async () => {
    const response = await getBasketProductsReq(TOKEN);

    expect(Array.isArray(response)).toBe(true);

    response.forEach((product) => {
      expect(product).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        price: expect.any(Number),
        description: expect.any(String),
      });
    });
  });
  it('fetchDelFavoriteProductReq', async () => {
    const response = await fetchDelFavoriteProductReq(ID, TOKEN);

    expect(response).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
    });
  });

  it('fetchDeleteProductReq', async () => {
    const response = await fetchDeleteProductReq(ID);

    expect(response).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
    });
  });
});
