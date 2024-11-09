'use client';
import InputForForm from '@components/HtmlElements/InputForForm';
import { fetchGetUserList, fetchPostUserRegistration } from '@redux/slices/userSlice';
import React, { useCallback, useState } from 'react';
import { useAppDispatch } from 'src/hook/rtkHook';

const RegistrationForm = () => {
  const dispatch = useAppDispatch();

  // Состояние для username, email и password
  const [username, setUsername] = useState({ value: '', valid: false });
  const [email, setEmail] = useState({ value: '', valid: false });
  const [password, setPassword] = useState({ value: '', valid: false });

  // Обработчики для каждого поля
  const usernameHandler = useCallback(({ value, valid }: { value: string; valid: boolean }) => {
    setUsername({ value, valid });
  }, []);

  const emailHandler = useCallback(({ value, valid }: { value: string; valid: boolean }) => {
    setEmail({ value, valid });
  }, []);

  const passwordHandler = useCallback(({ value, valid }: { value: string; valid: boolean }) => {
    setPassword({ value, valid });
  }, []);

  // Основная логика регистрации
  const registrationHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (username.valid && email.valid && password.valid) {
      const registrationData = {
        name: username.value,
        email: email.value,
        password: password.value,
      };
      await dispatch(fetchPostUserRegistration(registrationData));
      dispatch(fetchGetUserList());

      //! точно прошла ?
      alert('Регистрация прошла успешно');
    } else {
      alert('Пожалуйста, заполните все поля корректно');
    }
  };

  return (
    <form
      action="#"
      onSubmit={registrationHandler}
      className="min-w-[600px] justify-items-center self-start">
      <ul>
        <InputForForm
          type="username"
          placeholder="Введите имя пользователя"
          value={username}
          validHandler={usernameHandler}
        />
        <InputForForm
          type="email"
          placeholder="Введите email"
          value={email}
          validHandler={emailHandler}
        />
        <InputForForm
          type="password"
          placeholder="Введите пароль"
          value={password}
          validHandler={passwordHandler}
        />
      </ul>
      <button type="submit" className="btn">
        Регистрация
      </button>
    </form>
  );
};

export default RegistrationForm;
