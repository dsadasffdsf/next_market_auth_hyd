export interface ProductI {
  id?: string;
  title: string;
  price: number;
  description: string;
  count?: number;
}
export interface UserI {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  // basket: [{ id: string; count: number }];
}
// export interface UserFavoriteProductI {
//   id?: string;
//   title: string;
//   price: number;
//   description: string;
//   count: number;
// }
export interface InitialProduct {
  basket: ProductI[];
  searchProducts: ProductI[];
  totalPrice: number;
  editProduct: ProductI;
  error: string | null;
}
export interface InitialUser {
  userList: UserI[];
  error: '' | null;
}
