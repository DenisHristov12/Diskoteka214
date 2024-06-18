import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import { useUser } from '../features/authentication/useUser';
import { respondToMobile, respondToMobileSmall } from '../styles/mediaQueries';

const LoginLayout = styled.main`
  height: 70vh;
  width: 100%;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  ${respondToMobile(`
    grid-template-columns: 28rem;
  `)}

  ${respondToMobileSmall(`
    grid-template-columns: 22rem;
  `)}
`;

function Login() {
  const { user } = useUser();
  const isUser = Boolean(user);

  return (
    <LoginLayout>
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
