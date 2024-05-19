import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateEditUserForm from './CreateEditUserForm';

function AddUser() {
  return (
    <Modal>
      <Modal.Open opens='user-form'>
        <Button>Add user</Button>
      </Modal.Open>
      <Modal.Window name='user-form'>
        <CreateEditUserForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddUser;
