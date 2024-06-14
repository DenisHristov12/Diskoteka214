import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';
import { useUser } from '../features/authentication/useUser';
import { useState } from 'react';
import Button from './Button';
import { HiMenu } from 'react-icons/hi';

const StyledHeader = styled.header`
  background-color: red;
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  grid-column: ${({ isOpen }) => (!isOpen ? '2 / -1' : '1 / -1')};

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonContainer = styled.div`
  /* background-color: red; */
  display: ${({ hideButton }) => (!hideButton ? 'none' : 'flex')};
  align-self: flex-end;
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
        {isUser && <UserAvatar />}
        <HeaderMenu />
      </Container>
    </StyledHeader>
  );
}

export default Header;
