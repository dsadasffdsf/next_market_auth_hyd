import path from 'path';
import { promises as fs } from 'fs';
import { getUsers, saveUsers } from './utils-users';
import { getProducts, saveProducts } from './utils-products';

export async function addFavorites({ userId, productId, count }) {
  try {
    const userList = await getUsers();
    const user = userList.find((user) => user.id === userId);
    // console.log(user,"user.basket----------------------");

    const existingProduct = user.basket.find((item) => item.id === productId);
    // console.log(isProductInBasket);

    if (existingProduct) {
      existingProduct.count += count;
    } else {
      user.basket.push({ id: productId, count });
    }

    await saveUsers(userList);

    const productList = await getProducts();

    const product = productList.find((product) => product.id === productId);

    return product;
  } catch (e) {
    if (e.message) {
      throw e;
    }
    throw new Error('Не удалось добавить продукт в избранное'); // Обработка ошибки
  }
}
export async function basketFavorites(id) {
  //! count сломает
  try {
    const userList = await getUsers();
    const user = userList.find((user) => user.id === id);
    const productsList = await getProducts();

    const productsWithCount = user.basket.map((basketItem) => {
      const product = productsList.find((product) => product.id === basketItem.id);
      if (product) {
        return { ...product, count: basketItem.count };
      }
    });

    // const favoriteProducts = productList.filter((product) =>
    //   user.basket.some((item) => {
    //     if (item.id === product.id) {
    //       return {...item ,count:}
    //     }
        
    //   }),
    // );
    console.log(productsWithCount,"favoriteProducts-----------------");
    
    return productsWithCount;
  } catch (e) {
    if (e.message) {
      throw e;
    }
    throw new Error('Не удалось получить продукты для корзины'); // Обработка ошибки
  }
}
export async function deleteFavorite(productId, userId) {
  try {
    console.log(productId, userId);

    const productList = await getProducts();
    const userList = await getUsers();
    const user = userList.find((user) => user.id === userId);

    user.basket = user.basket.filter((item) => {
      console.log(item, productId);

      return item != productId;
    });
    console.log(user, '------------------------');

    const product = productList.find((product) => product.id === productId);
    await saveUsers(userList);

    // console.log(product);

    return product;
  } catch (e) {
    if (e.message) {
      throw e;
    }
    throw new Error('Не удалось удалить продукт из корзины'); // Обработка ошибки
  }
}
