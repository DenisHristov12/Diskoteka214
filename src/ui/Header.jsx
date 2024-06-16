import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';
import { useUser } from '../features/authentication/useUser';
import Button from './Button';
import { HiMenu } from 'react-icons/hi';
import { motion } from 'framer-motion';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);

  grid-column: 1 / -1;

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  margin-left: auto;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonContainer = styled.div`
  display: ${({ hideButton }) => (hideButton ? 'none' : 'flex')};

  transition: display 2s ease;
`;

function Header({ isOpen, setIsOpen, hideButton }) {
  const { isUser } = useUser();

  return (
    <StyledHeader isOpen={isOpen}>
      <ButtonContainer hideButton={hideButton}>
        <Button onClick={setIsOpen} size='medium'>
          <HiMenu />
        </Button>
      </ButtonContainer>

      <Container>
        <HeaderMenu />
        {isUser && <UserAvatar />}
      </Container>
    </StyledHeader>
  );
}

export default Header;
