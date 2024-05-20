import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import styled from 'styled-components';

const ContactsContainer = styled.div`
  width: 80%;
  height: 80vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactFormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ContactForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #6a11cb;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
`;

const POSITION = [42.650207791739085, 23.342672934006053];

function ContactsMap() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <ContactsContainer>
      <MapContainer
        center={POSITION}
        zoom={13}
        scrollWheelZoom={false}
        // style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={POSITION}>
          <Popup>Diskoteka 214</Popup>
        </Marker>
      </MapContainer>
      {/* <ContactFormWrapper>
        <ContactForm onSubmit={handleSubmit}>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <FormInput type='text' id='name' name='name' required />
          <FormLabel htmlFor='email'>Email</FormLabel>
          <FormInput type='email' id='email' name='email' required />
          <FormLabel htmlFor='message'>Message</FormLabel>
          <FormTextarea id='message' name='message' rows='4' required />
          <FormButton type='submit'>Send</FormButton>
        </ContactForm>
      </ContactFormWrapper> */}
    </ContactsContainer>
  );
}

export default ContactsMap;
