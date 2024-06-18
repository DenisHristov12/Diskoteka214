import styled from 'styled-components';
import SignupForm from '../features/authentication/SignupForm';
import { useUser } from '../features/authentication/useUser';
import Heading from '../ui/Heading';
import { respondToMobile, respondToMobileSmall } from '../styles/mediaQueries';

const RegisterLayout = styled.main`
  height: 100vh;
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

function Register() {
  const { isUser } = useUser();

  return (
    <RegisterLayout>
      {isUser ? (
        <Heading as='h4'>You are alredy registered!</Heading>
      ) : (
        <>
          <Heading as='h4'>Create new account</Heading>

          <SignupForm />
        </>
      )}
    </RegisterLayout>
  );
}

export default Register;
