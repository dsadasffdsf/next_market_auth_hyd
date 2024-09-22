export interface ProductI {
  id: string;
  title: string;
  price: number;
  description: string;
}
export interface InitialProduct {
  basket: ProductI[];
}
