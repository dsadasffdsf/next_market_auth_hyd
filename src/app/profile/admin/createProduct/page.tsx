'use client';

import Edit from '@components/Profile/Edit';
import { postCreateProduct } from '@redux/slices/productSlice';
import React from 'react';

function page() {
  return <Edit btnName={'Создать новый продукт'} paramKey="create" />;
}

export default page;
