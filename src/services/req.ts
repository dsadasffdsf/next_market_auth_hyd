import { ProductI } from '@interfaces/ProductI';
import axios from 'axios';

export const searchFetch = async (searchParams: string): Promise<ProductI[]> => {
  try {
    const response = await axios.get<ProductI[]>(
      `http://localhost:3000/api/products?search[title]=${searchParams}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


