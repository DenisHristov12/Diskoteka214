import styled from 'styled-components';
import Button from './Button';

const StyledMenu = styled.ul`
  padding-right: 4.8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 75vh;
  border-right: 1px solid var(--color-grey-200);
`;

function SettingsMenu() {
  return (
    <StyledMenu>
      <li>
        <Button size='fullWidth' variation='secondary'>
          Dark mode
        </Button>
      </li>
      <li>
        <Button size='fullWidth' variation='secondary'>
          Profile
        </Button>
      </li>
      <li>
        <Button size='fullWidth' variation='secondary'>
          Change password
        </Button>
      </li>
      <li>
        <Button size='fullWidth' variation='secondary'>
          Logout
        </Button>
      </li>
    </StyledMenu>
  );
}

export default SettingsMenu;
