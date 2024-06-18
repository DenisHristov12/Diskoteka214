import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';
import { useLogin } from './useLogin';
import { useUser } from './useUser';
import { StyledNavLink } from '../../ui/Link';
import { StyledDiv } from '../../ui/LoginRegisterParagraph';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useLogin();

  const { isUser } = useUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || isUser}
        />
      </FormRowVertical>

      <FormRowVertical label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading || isUser}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledDiv>
          Do not have an account?{' '}
          <StyledNavLink
            logReg
            style={{
              color: 'blue',
            }}
            to='/register'>
            Register
          </StyledNavLink>
        </StyledDiv>
        <Button size='large' disabled={isLoading || isUser}>
          {!isLoading ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
