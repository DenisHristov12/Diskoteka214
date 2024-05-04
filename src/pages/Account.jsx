import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import { useUser } from '../features/authentication/useUser';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Account() {
  const { isUser } = useUser();

  return (
    <>
      {!isUser ? (
        <Heading as='h1'>
          You do not have permission to access this page!
        </Heading>
      ) : (
        <>
          <Heading as='h1'>Update your account</Heading>

          <Row>
            <Heading as='h3'>Update user data</Heading>
            <UpdateUserDataForm />
          </Row>

          <Row>
            <Heading as='h3'>Update password</Heading>
            <UpdatePasswordForm />
          </Row>
        </>
      )}
    </>
  );
}

export default Account;
