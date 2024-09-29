import path from 'path';
import { promises as fs } from 'fs';
// export const productsFilePath = path.join('C:\\Users\\User\\Desktop\\next_market_auth_hyd\\src\\data\\', 'products.json');
export const productsFilePath = path.join(process.cwd(), 'src/data/products.json');
//получить продукты
export async function getProducts() {
  console.log(productsFilePath);

  const data = await fs.readFile(productsFilePath, 'utf-8');
  //   const data = 123123

  return JSON.parse(data);
}
//сохранить продукты
export async function saveProducts(products) {
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
}
// Если будет надувка, то мб класс стоит сделать
// export const productsFilePath = path.join(process.cwd(), 'src/data/products.json');
export async function updateProduct(id, title, description, price) {
  const products = await getProducts();

  // Найти индекс продукта по id
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    throw new Error(`Продукт с id ${id} не найден`);
  }

  // Обновить продукт
  products[productIndex] = {
    ...products[productIndex], // Сохранить существующие данные
    title: title || products[productIndex].title, // Обновить только если передано новое значение
    description: description || products[productIndex].description,
    price: price !== undefined ? price : products[productIndex].price,
  };

  // Сохранить обновленные продукты
  await saveProducts(products);

  return products[productIndex];
}
