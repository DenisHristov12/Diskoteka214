import styled from 'styled-components';
import SettingsMenu from '../ui/SettingsMenu';

const SettingsLayout = styled.div`
  /* padding: 0; */
  display: grid;
  grid-template-columns: 30% 1fr;
  gap: 2.4rem;
`;

function Settings() {
  return (
    <SettingsLayout>
      <SettingsMenu />
      <p>Test 2</p>
    </SettingsLayout>
  );
}

export default Settings;
