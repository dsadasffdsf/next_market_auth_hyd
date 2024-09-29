<<<<<<< HEAD
import React from 'react';

const AuthForm = () => {
  return <div>AuthForm</div>;
};

export default AuthForm;
=======
'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLogin from './AuthLogin';
import AuthRegistration from './AuthRegistration';

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState('login');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle form submission
    console.log(`${activeTab} form submitted`);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <AuthLogin handleSubmit={handleSubmit} />
      <AuthRegistration handleSubmit={handleSubmit} />
    </Tabs>
  );
}
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
