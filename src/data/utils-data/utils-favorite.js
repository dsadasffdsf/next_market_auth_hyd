import path from 'path';
import { promises as fs } from 'fs';

export const favoriteFilePath = path.join(process.cwd(), 'src/data/favorite.json');

export async function getFavorites() {
  // console.log(productsFilePath);

  const data = await fs.readFile(favoriteFilePath, 'utf-8');
  //   const data = 123123

  return JSON.parse(data);
}
export async function saveFavorites(favorite) {
  await fs.writeFile(favoriteFilePath, JSON.stringify(favorite, null, 2), 'utf-8');
}
export async function addFavorites(userId, productId) {
  try {
    const favorites = await getFavorites();
    console.log(favorites, 'favorites------------------------');

    const userFavorites = favorites.find((favorite) => favorite.userId === userId);

    if (userFavorites) {
      // Если пользователь найден, добавляем productId в его массив favorites, если его там еще нет
      if (!userFavorites.favorites.includes(productId)) {
        userFavorites.favorites.push(productId);
      }
    } else {
      // Если пользователь не найден, создаем новый объект
      favorites.push({
        userId: userId,
        favorites: [productId],
      });
    }
    console.log(favorites, 'newFavorites-------------------------------');

    await saveFavorites(favorites);
  } catch (e) {
    console.error(e);
    throw new Error('Не удалось добавить продукт в избранное'); // Обработка ошибки
  }
}
