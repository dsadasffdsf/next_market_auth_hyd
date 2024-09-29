const productService = require('../services/product-service');

class ProductController {
  //   async editProduct(req, res, next) {
  //     try {
  //       console.log(req.body);
  //       const { title, desc, author } = req.body;
  //       const postData = await postService.addPost(title, desc, author);
  //       res.json(postData);
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      return products;
    } catch (e) {
      console.error(e);
    }
  }
  async getProductById(req, res) {
    const id = req.nextUrl.pathname.split('/').pop();
    try {
      const product = await productService.getProductById(id);
      return product;
    } catch (e) {
      console.error(e);
    }
  }
  async addProduct(req, res) {
    try {
      const body = await req.json();
      const { title, description, price } = body;
      await productService.addProduct(title, description, price);
    } catch (e) {
      console.error(e);
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
      console.error(e);
    }
  }
  //   async updatePost(req, res, next) {
  //     try {
  //       console.log(req.body);
  //       const { _id, title, desc, status, author } = req.body;
  //       const post = await postService.updatePost(_id, title, desc, status, author);
  //       console.log(post);
  //       return res.json(post);
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
  //   async removePost(req, res, next) {
  //     try {
  //       const { _id } = req.body;
  //       const post = await postService.removePost(_id);
  //       if (!post) {
  //         return res.json('Такого поста нет');
  //       }
  //       return res.json({ message: 'Пост успешно удален' });
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
}
module.exports = new ProductController();
