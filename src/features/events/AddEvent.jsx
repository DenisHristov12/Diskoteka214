import { useState } from 'react';
import Button from '../../ui/Button';
import CreateEventForm from './CreateEventForm';
import Modal from '../../ui/Modal';

function AddEvent() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new event
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateEventForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddEvent;
