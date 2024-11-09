const { getToken } = require('next-auth/jwt');
const productService = require('../services/product-service.cjs');

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      return products;
    } catch (e) {
      throw e;
    }
  }
  async getProductById(req, res) {
    const id = req.nextUrl.pathname.split('/').pop();
    try {
      const product = await productService.getProductById(id);
      return product;
    } catch (e) {
      throw e;
    }
  }
  async addProduct(req, res) {
    try {
      const body = await req.json();
      const { title, description, price } = body;
      const product = await productService.addProduct(title, description, price);
      return product;
    } catch (e) {
      throw e;
    }
  }
  async updateProductById(req, res) {
    try {
      const id = req.nextUrl.pathname.split('/').pop();
      const body = await req.json();
      const { title, description, price } = body;
      const product = await productService.updateProductById(id, title, description, price);
      return product;
    } catch (e) {
      throw e;
    }
  }
  async deleteProductById(req, res) {
    try {
      const id = req.nextUrl.pathname.split('/').pop();
      const product = await productService.deleteProductById(id);
      return product;
    } catch (e) {
      throw e;
    }
  }
  async searchByTitle(req, res) {
    try {
      // console.log(req);

      const searchValue = req.title;

      // console.log(req.limit);

      const productsAndCount = await productService.searchByTitle({
        searchValue,
        limit: req.limit,
        skip: req.skip,
      });

      return productsAndCount;
    } catch (e) {
      console.log('Что-то не так');

      throw e;
    }
  }
  async productsCount(req, res) {
    try {
      const count = await productService.productsCount();
      return count;
    } catch (e) {
      throw e;
    }
  }

  async addFavorite(req, res) {
    try {
      const id = req.nextUrl.pathname.split('/')[3];
      const user = await getToken({ req });

      
      if (!user) {
        throw new Error('Чтобы добавить продукты в корзину,необходимо авторизоваться');
      }
      const body = await req.json();
      const { count } = body;

      const product = await productService.addFavorite({ userId: user.id, productId: id, count });
      return product;
    } catch (e) {
      throw e;
    }
  }
  async basket(req, res) {
    try {
      // console.log(req,"-ressssssssssssssssssssssssss");

      const user = await getToken({ req });
      // console.log(user,"------------------------");

      const products = await productService.basket({ userId: user.id });
      return products;
    } catch (e) {
      throw e;
    }
  }
  async deleteFavorite(req, res) {
    try {
      const user = await getToken({ req });
      const id = req.nextUrl.pathname.split('/')[3];
      // console.log(id);

      // console.log(user,"------------------------");

      const product = await productService.deleteFavorite({ productId: id, userId: user.id });
      return product;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = new ProductController();
