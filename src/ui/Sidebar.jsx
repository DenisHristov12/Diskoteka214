import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
import { HiBars4 } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { respondToLandscapeTablets } from '../styles/mediaQueries';
import { ButtonMenu } from './ButtonMenu';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 1.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  width: 26rem;
  height: 100vh;

  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-26rem')};

  transition: all 0.5s ease-in-out;

  flex-direction: column;
  gap: 3.2rem;

  display: flex;
  z-index: 1000;

  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ${respondToLandscapeTablets(`
    padding: 1.2rem 0.8rem;
    width: 22rem;
  `)}
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 999;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
`;

function Sidebar({ isOpen, setIsOpen }) {
  function closeSidebar() {
    setIsOpen(false);
  }

  return (
    <>
      <Backdrop
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
        transition={{ duration: 0.3 }}
        isOpen={isOpen}
        onClick={() => setIsOpen(false)} // Close sidebar when backdrop is clicked
      />
      <StyledSidebar isOpen={isOpen}>
        <ButtonContainer>
          <ButtonMenu onClick={setIsOpen} size='medium'>
            <HiBars4 />
          </ButtonMenu>
        </ButtonContainer>

        <Logo />
        <MainNav closeSidebar={closeSidebar} />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
