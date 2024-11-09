'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useEffect, useState, type FormEventHandler } from 'react';
import { useAppDispatch } from 'src/hook/rtkHook';
import { resetProductError } from '@redux/slices/productSlice';

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  //! Тут можно улучшить
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res && !res.error) {
      router.push('/profile');
    } else {
      setError(res.error);
      console.log(res, 'Летит из формы SignIn');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form self-start flex flex-col space-y-4">
      <input
        className="bg-slate-200 p-2 rounded-lg"
        type="email"
        name="email"
        placeholder="email"
        required
      />
      <input
        className="bg-slate-200 p-2 rounded-lg"
        type="password"
        name="password"
        placeholder="password"
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className="btn bg-slate-200">
        Sign In
      </button>
    </form>
  );
};

export { SignInForm };
