import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from 'react-icons/hi2';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

import { formatDistanceFromNow } from '../../utils/helpers';

import { format, isToday } from 'date-fns';

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: 'Sono';
// `;

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
  }
`;

const Role = styled.div`
  font-family: 'Sono';
  font-weight: 500;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  /* background-color: red; */

  /* text-align: center; */
`;

function UserRow({
  user: {
    id: userId,
    created_at,
    email,
    fullName,
    avatar,
    role,
    roles: { id: roleId, roleName },
  },
}) {
  //   console.log(user);
  const navigate = useNavigate();

  //   const statusToTagName = {
  //     unconfirmed: 'blue',
  //     'checked-in': 'green',
  //     'checked-out': 'silver',
  //   };

  return (
    <Table.Row role='row'>
      <Avatar src={avatar || 'default-user.jpg'} alt='avatar' />
      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(created_at))
            ? 'Today'
            : formatDistanceFromNow(created_at)}
        </span>
        <span>{format(new Date(created_at), 'MMM dd yyyy')} </span>
      </Stacked>
      <Role>{roleName}</Role>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={userId} />
          <Menus.List id={userId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/users/${userId}`)}>
              See details
            </Menus.Button>

            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={() => deleteUser(userId)}
              disabled={isDeleting}
            />
          </Modal.Window> */}
      </Modal>
    </Table.Row>
  );
}

export default UserRow;
