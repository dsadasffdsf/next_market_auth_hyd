'use client';
import { useRef, useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { validationError } from 'src/utils/validator';

const AuthLogin = ({ handleSubmit }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // console.log('AuthRender');

  const loginHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   const username = usernameRef.current?.value;
  //   const password = passwordRef.current?.value;


  //   const { validateForm } = validationError({
  //     username,
  //     password,
  //     setUsernameError,
  //     setPasswordError
  //   });


  //   console.log('Username:', username);
  //   console.log('Password:', password);
  };

  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Введите данные от аккаунта для авторизации</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="login-email">Имя пользователя</Label>
              <Input id="login-email" ref={usernameRef} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="login-password">Пароль</Label>
              <Input id="login-password" ref={passwordRef} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={(e) => loginHandler(e)}>
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default AuthLogin;
