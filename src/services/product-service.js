import { getProducts, saveProducts, updateProduct } from '@data/utilsData';
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
    } catch (e) {
      console.error(e);
    }
  }
  async getProducts() {
    try {
      const products = await getProducts();

      return products;
    } catch (e) {
      console.error(e);
    }
  }
  async getProductById(id) {
    try {
      const products = await getProducts();
      const newProduct = products.find((item) => item.id === id);
      console.log(newProduct);

      return newProduct;
    } catch (e) {
      console.error(e);
    }
  }
  async updateProductById(id, title, description, price) {
    try {
      const product = updateProduct(id, title, description, price);


      return product;
    } catch (e) {
      console.error(e);
    }
  }
  //   async updatePost(_id, title, desc, status, author) {
  //     try {
  //       const post = await PostModel.findByIdAndUpdate(_id, {
  //         title,
  //         desc,
  //         status: `${!status}`,
  //         author,
  //       });
  //       return post;
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   async removePost(_id) {
  //     try {
  //       const post = await PostModel.findByIdAndDelete(_id);
  //       return post;
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
}
module.exports = new ProductService();
