import styled from 'styled-components';
import { useUser } from './useUser';
import SpinnerMini from '../../ui/SpinnerMini';
import { respondToSmallLaptop } from '../../styles/mediaQueries';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  ${respondToSmallLaptop(`
     font-size: 1.2rem;
  `)}
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);

  ${respondToSmallLaptop(`
     width: 3.2rem;
  `)}
`;

function UserAvatar() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <SpinnerMini />;
  }

  if (!user) {
    return null;
  }

  const { avatar, fullName } = user;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || 'default-user.jpg'}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
