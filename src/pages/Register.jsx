import SignupForm from '../features/authentication/SignupForm';
import { useUser } from '../features/authentication/useUser';
import Heading from '../ui/Heading';

import { LoginRegisterLayout } from '../ui/LoginRegisterLayout';

function Register() {
  const { isUser } = useUser();

  return (
    <LoginRegisterLayout>
      {isUser ? (
        <Heading as='h4'>You are alredy registered!</Heading>
      ) : (
        <>
          <Heading as='h4'>Create new account</Heading>

          <SignupForm />
        </>
      )}
    </LoginRegisterLayout>
  );
}

export default Register;
