import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiPencil,
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
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { useCheckout } from '../check-in-out/useCheckout';
import { format, isToday } from 'date-fns';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
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
  }
`;

const People = styled.div`
  font-family: 'Sono';
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background-color: red; */

  /* text-align: center; */
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    date,
    status,
    reservators: { fullName: reservatorName, number, peopleNum },
    events: { name: eventName },
  },
}) {
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: 'blue',
    confirmed: 'green',
    past: 'silver',
  };

  return (
    <Table.Row role='row'>
      <Cabin>{eventName}</Cabin>
      <Stacked>
        <span>{reservatorName}</span>
        <span>{number}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(date)) ? 'Today' : formatDistanceFromNow(date)}
        </span>
        <span>{format(new Date(date), 'MMM dd yyyy')} </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
      <People>{peopleNum}</People>
      {/* <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}>
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}>
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
                icon={<HiArrowUpOnSquare />}>
                Check out
              </Menus.Button>
            )}

            <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>

            <Modal.Toggle opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Toggle>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='delete'>
          <ConfirmDelete
            resource='booking'
            onConfirm={(options) => deleteBooking(bookingId, options)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal> */}
      {/* <div>
        <ButtonConfirm
          title='Delete booking'
          description='Are you sure you want to delete this booking? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteBooking(bookingId)}
          disabled={isDeleting}>
          Delete
        </ButtonConfirm>

        <Link to={`/bookings/${bookingId}`}>Details &rarr;</Link>
      </div> */}
    </Table.Row>
  );
}

export default BookingRow;
