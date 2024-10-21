'use client';

import Edit from '@components/Profile/Edit';
import { fetchCreateProduct } from '@redux/slices/slice';
import React from 'react';

function page() {
  return <Edit btnName={'Создать новый продукт'} paramKey="create" />;
}

export default page;
