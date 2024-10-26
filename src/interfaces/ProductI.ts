export interface ProductI {
  id?: string;
  title: string;
  price: number;
  description: string;
}
export interface UserFavoriteProductI {
  id?: string;
  title: string;
  price: number;
  description: string;
  count: number;
}
export interface InitialProduct {
  basket: ProductI[];
  searchProducts: ProductI[];
  editProduct: ProductI;
  error: '' | null;
}
