import { addFavorites, basketFavorites, deleteFavorite } from '@data/utils-data/utils-favorite';
import {
  deleteProduct,
  getProducts,
  productsCount,
  saveProducts,
  searchProductsByTitle,
  updateProduct,
} from '@data/utils-data/utils-products';
import { v4 as uuidv4 } from 'uuid';

class ProductService {
  async addProduct(title, desc, price) {
    try {
      //Какие-то проверки можно сделать , хотя бы на повтор(валидатор?)

      const newId = uuidv4();
      const newProduct = {
        id: newId,
        title,
        desc,
        price,
      };
      const products = await getProducts();
      products.push(newProduct);
      saveProducts(products);
      return newProduct;
    } catch (e) {
      throw e;
    }
  }
  async getProducts() {
    try {
      const products = await getProducts();

      return products;
    } catch (e) {
      throw e;
    }
  }
  async getProductById(id) {
    try {
      const products = await getProducts();
      const newProduct = products.find((item) => item.id === id);
      console.log(newProduct);

      return newProduct;
    } catch (e) {
      throw e;
    }
  }
  async updateProductById(id, title, description, price) {
    try {
      const product = updateProduct(id, title, description, price);

      return product;
    } catch (e) {
      throw e;
    }
  }
  async deleteProductById(id) {
    try {
      const message = deleteProduct(id);

      return message;
    } catch (e) {
      throw e;
    }
  }
  async searchByTitle({ searchValue, limit, skip }) {
    try {
      console.log(limit, skip);

      const products = await searchProductsByTitle(searchValue, limit, skip);

      return products;
    } catch (e) {
      throw e;
    }
  }
  async productsCount() {
    try {
      const count = await productsCount();

      return count;
    } catch (e) {
      throw e;
    }
  }

  async addFavorite({ userId, productId, count }) {
    try {
      const product = await addFavorites({ userId, productId, count });
      return product;
    } catch (e) {
      throw e;
    }
  }
  async basket({ userId }) {
    try {
      const product = await basketFavorites(userId);
      return product;
    } catch (e) {
      throw e;
    }
  }
  async deleteFavorite({ productId, userId }) {
    try {
      const product = await deleteFavorite(productId, userId);
      return product;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = new ProductService();
