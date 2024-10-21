import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Edit from '@components/Profile/Edit';
import { ProductI } from '@interfaces/ProductI';
import '@testing-library/jest-dom/extend-expect'; // Убедитесь, что это подключено

// Mock для функций редактирования и создания продуктов
jest.mock('@redux/slices/slice', () => ({
  postEditProduct: jest.fn(),
  postCreateProduct: jest.fn(),
}));

const { postEditProduct, postCreateProduct } = require('@redux/slices/slice');

const product: ProductI = {
  id: '1',
  title: 'Test Product',
  price: 100,
  description: 'ssssssssssssssssssssssssssssssssssssss',
};

describe('Edit Component', () => {
  it('renders correctly for editing a product', () => {
    render(<Edit product={product} btnName="Изменить продукт" paramKey="edit" />);

    // Проверяем, что отображается правильная кнопка
    expect(screen.getByText('Изменить продукт')).toBeInTheDocument();

    // Проверяем, что название продукта рендерится
    expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
  });

  //   it('calls postEditProduct when editing', () => {
  //     render(<Edit product={product} btnName="Добавить продукт" paramKey="create" />);

  //     const button = screen.getByText('Добавить продукт');
  //     fireEvent.click(button);

  //     // Проверяем, что функция редактирования была вызвана
  //     expect(postEditProduct).toHaveBeenCalledWith(product);
  //   });

  //   it('renders correctly for creating a new product', () => {
  //     const newProduct: ProductI = { id: '', name: '', price: 0 };

  //     render(<Edit product={newProduct} btnName="Создать продукт" isNew={true} />);

  //     // Проверяем, что отображается правильная кнопка
  //     expect(screen.getByText('Создать продукт')).toBeInTheDocument();
  //   });

  //   it('calls postCreateProduct when creating', () => {
  //     const newProduct: ProductI = { id: '', name: '', price: 0 };

  //     render(<Edit product={newProduct} btnName="Создать продукт" isNew={true} />);

  //     const button = screen.getByText('Создать продукт');
  //     fireEvent.click(button);

  //     // Проверяем, что функция создания была вызвана
  //     expect(postCreateProduct).toHaveBeenCalledWith(newProduct);
  //   });
});
