import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from 'react-icons/hi2';

import Tag from '../../ui/Tag';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

import { useDeleteBooking } from './useDeleteBooking';
import { formatDistanceFromNow } from '../../utils/helpers';
import { useCheckout } from '../check-in-out/useCheckout';
import { format, isToday } from 'date-fns';
import { respondToMobile } from '../../styles/mediaQueries';
import useWidth from '../../hooks/useWidth';

const Event = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';

  ${respondToMobile(`
  font-size: 1.2rem;
  `)}
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

    ${respondToMobile(`font-size: 1rem;`)}
  }
`;

const People = styled.div`
  font-family: 'Sono';
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    date,
    status,
    reservators: { fullName: reservatorName, number, peopleNum, eventId },
    events: { name: eventName },
  },
}) {
  const { deleteBooking, isLoading: isDeleting } = useDeleteBooking();

  const { checkout, isLoading: isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  const width = useWidth();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row role='row'>
      {width > 325 && <Event>{eventName}</Event>}
      <Stacked>
        <span>{reservatorName}</span>
        <span>{number}</span>
      </Stacked>
      {width > 430 && (
        <Stacked>
          <span>
            {isToday(new Date(date)) ? 'Today' : formatDistanceFromNow(date)}
          </span>
          <span>{format(new Date(date), 'MMM dd yyyy')} </span>
        </Stacked>
      )}
      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
      {width > 430 && <People>{peopleNum}</People>}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}>
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}>
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName='booking'
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
