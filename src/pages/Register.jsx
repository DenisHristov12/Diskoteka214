import SignupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';

function Register() {
  return (
    <>
      <Heading as='h1'>Create new account</Heading>

      <SignupForm />
    </>
  );
}

export default Register;
