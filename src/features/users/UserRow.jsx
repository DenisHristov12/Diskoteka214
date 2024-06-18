import styled from 'styled-components';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

import { formatDistanceFromNow } from '../../utils/helpers';

import { format, isToday } from 'date-fns';
import { useDeleteUser } from './useDeleteUser';
import CreateEditUserForm from './CreateEditUserForm';
import useWidth from '../../hooks/useWidth';
import { respondToMobile } from '../../styles/mediaQueries';

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;

    ${respondToMobile(`
      font-size: 0.8rem;
    `)}
  }
`;

const Role = styled.div`
  font-family: 'Sono';
  font-weight: 500;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

function UserRow({ user }) {
  const {
    id: userId,
    created_at,
    email,
    fullName,
    avatar,
    roles: { roleName },
  } = user;

  const { deleteUser, isDeleting } = useDeleteUser();

  const width = useWidth();

  return (
    <Table.Row role='row'>
      {width > 325 && (
        <Avatar src={avatar || 'default-user.jpg'} alt='avatar' />
      )}
      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>
      {width > 430 && (
        <Stacked>
          <span>
            {isToday(new Date(created_at))
              ? 'Today'
              : formatDistanceFromNow(created_at)}
          </span>
          <span>{format(new Date(created_at), 'MMM dd yyyy')} </span>
        </Stacked>
      )}
      <Role>{roleName}</Role>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={userId} />
          <Menus.List id={userId}>
            <Modal.Open opens='edit'>
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='edit'>
          <CreateEditUserForm userToEdit={user} />
        </Modal.Window>

        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName='user'
            onConfirm={() => deleteUser(userId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default UserRow;
