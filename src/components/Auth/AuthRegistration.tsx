'use client';

import React, { useRef } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { validationError } from 'src/utils/validator';

const AuthRegistration = ({ handleSubmit }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  console.log('AuthRender');

  const loginHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const { validateForm } = validationError({
      username,
      password,
      setUsernameError,
      setPasswordError,
    });

    console.log('Username:', username);
    console.log('Password:', password);

    if (validateForm.valUsername && validateForm.valPassword) {
      console.log('Пользователь успешно зарегистрирован');
    }
  };
  return (
    <TabsContent value="register">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Введите данные для регистрации</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="register-email">Имя пользователя</Label>
              <Input id="register-email" ref={usernameRef} error={usernameError} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="register-password">Пароль</Label>
              <Input id="register-password" ref={passwordRef} error={passwordError} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={(e) => loginHandler(e)}>
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default AuthRegistration;
