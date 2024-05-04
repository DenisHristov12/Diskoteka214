import styled from 'styled-components';
import SignupForm from '../features/authentication/SignupForm';
import { useUser } from '../features/authentication/useUser';
import Heading from '../ui/Heading';

const RegisterLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Register() {
  const { user } = useUser();
  const isUser = Boolean(user);

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
