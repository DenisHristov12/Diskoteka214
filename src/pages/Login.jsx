import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import { useUser } from '../features/authentication/useUser';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { user } = useUser();
  const isUser = Boolean(user);

  return (
    <LoginLayout>
      {/* <Logo /> */}
      {isUser ? (
        <Heading as='h4'>You are alredy signed in</Heading>
      ) : (
        <>
          <Heading as='h4'>Log in to your account</Heading>

          <LoginForm />
        </>
      )}
    </LoginLayout>
  );
}

export default Login;
