import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
import Button from './Button';
import { HiMenu } from 'react-icons/hi';
import { useState } from 'react';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  /* background-color: red; */
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;

  display: ${({ isOpen }) => (isOpen ? 'none' : 'flex')};
  flex-direction: column;
  gap: 3.2rem;
`;

const ButtonContainer = styled.div`
  /* background-color: red; */
  display: flex;
  align-self: flex-end;
`;

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <StyledSidebar isOpen={isOpen}>
      <ButtonContainer>
        <Button onClick={setIsOpen} size='medium'>
          <HiMenu />
        </Button>
      </ButtonContainer>

      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
