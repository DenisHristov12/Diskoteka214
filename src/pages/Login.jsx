import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import { useUser } from '../features/authentication/useUser';
import { LoginRegisterLayout } from '../ui/LoginRegisterLayout';

function Login() {
  const { isUser } = useUser();

  return (
    <LoginRegisterLayout login>
      {isUser ? (
        <Heading as='h4'>You are alredy signed in</Heading>
      ) : (
        <>
          <Heading as='h4'>Log in to your account</Heading>

          <LoginForm />
        </>
      )}
    </LoginRegisterLayout>
  );
}

export default Login;
