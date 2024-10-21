'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState, type FormEventHandler } from 'react';

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
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
    <form onSubmit={handleSubmit} className="login-form">
      <input className="bg-slate-400 p-2" type="email" name="email" required />
      <input className="bg-slate-400 p-2" type="password" name="password" required />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибку */}
      <button type="submit">Sign In</button>
    </form>
  );
};

export { SignInForm };
