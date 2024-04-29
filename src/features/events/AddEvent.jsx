import Button from '../../ui/Button';
import CreateEventForm from './CreateEventForm';
import Modal from '../../ui/Modal';

function AddEvent() {
  return (
    <Modal>
      <Modal.Open opens='event-form'>
        <Button>Add event</Button>
      </Modal.Open>
      <Modal.Window name='event-form'>
        <CreateEventForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddEvent;
