import RegistrationForm from '@components/SignIn/RegistrationForm';
import { SignInForm } from '@components/SignIn/SignInForm';
import SignInInformationList from '@components/SignIn/SignInInformationList';

export default async function Signin() {
  return (
    <div className="flex items-center justify-between">
      <SignInForm />
      <RegistrationForm />
      <SignInInformationList />
      
    </div>
  );
}
