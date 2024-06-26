import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBooking } from './useBooking';
import { useDeleteBooking } from './useDeleteBooking';
import { useMoveBack } from '../../hooks/useMoveBack';

import Spinner from '../../ui/Spinner';
import BookingDataBox from './BookingDataBox';
import Tag from '../../ui/Tag';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonText from '../../ui/ButtonText';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';
import CheckoutButton from '../check-in-out/CheckoutButton';
import useWidth from '../../hooks/useWidth';
import { respondToMobile } from '../../styles/mediaQueries';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;

  ${respondToMobile(`
  width: 100%;
    justify-content: space-between;
  `)}
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { deleteBooking, isLoading: isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const width = useWidth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!booking) {
    return <Empty resource='booking' />;
  }

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        {width > 435 && <ButtonText onClick={moveBack}>&larr; Back</ButtonText>}
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && <CheckoutButton bookingId={bookingId} />}

        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete</Button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='booking'
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
