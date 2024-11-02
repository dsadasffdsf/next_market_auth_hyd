import path from 'path';
import { promises as fs } from 'fs';

export const productsFilePath = path.join(process.cwd(), 'src/data/products.json');

export async function getProducts() {
  // console.log(productsFilePath);

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
export async function deleteProduct(id) {
  const products = await getProducts();
  const product = products.find((item) => item.id === id);
  const filteredProduct = products.filter((product) => {
    return product.id != id;
  });

  await saveProducts(filteredProduct);
  return product;
}
export async function searchProductsByTitle(searchString, limit, skip) {
  try {
    const products = await getProducts(); // Получаем все продукты
    // console.log(products,"---------products");

    // Фильтруем продукты, у которых поле title содержит searchString
    let filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchString.toLowerCase()),
    );
    // console.log(filteredProducts, '----------filtred');
    // console.log(typeof Number(skip) === 'number', typeof limit === 'number', '-----------------------lim');
    const count = filteredProducts.length;
    filteredProducts = filteredProducts.slice(Number(skip), Number(skip) + Number(limit));

    // console.log(filteredProducts, 'filtred------------');

    return { products: filteredProducts, count }; // Возвращаем отфильтрованные продукты
  } catch (e) {
    throw new Error('Не удалось получить продукты');
  }
}
export async function productsCount() {
  try {
    const products = await getProducts(); // Получаем все продукты
    // console.log(products.length);

    return products.length;
  } catch (e) {
    console.log(e);
  }
}
