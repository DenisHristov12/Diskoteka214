import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import FormRow from './FormRow';
import Button from './Button';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Textarea from './Textarea';
import toast from 'react-hot-toast';
import Form from './Form';
import FormRowVertical from './FormRowVertical';
import Heading from './Heading';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const StyledMapContainer = styled(MapContainer)`
  z-index: 99;
`;

const ContactsContainer = styled.div`
  width: 100%;
  height: 75vh;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactFormWrapper = styled.div`
  position: absolute;
  width: 30%;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 998;
`;

const ContactDetails = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  padding: 1.8rem 5rem;
  margin-top: 2.4rem;

  display: flex;
  flex-direction: column;
  gap: 3.6rem;
`;

const ContainerHeading = styled.div`
  width: 100%;
`;

const ContainerInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.4rem;
`;

const Socials = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.4rem;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-main-700);

  font-size: 2.4rem;
  text-decoration: none;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  &:hover {
    transform: scale(1.3);
    overflow: visible;

    transition: all 0.5s;
  }
`;

const POSITION = [42.650207791739085, 23.342672934006053];

const serviceId = 'service_h5xc6xi';
const templateId = 'template_ph40a4c';
const key = 'vgkVc0XkcC0bq13xg';

const facebook = 'https://www.facebook.com/denishrstv/';
const twitter = 'https://x.com/DenisHrstv';
const instagram = 'https://www.instagram.com/_denis.hristov_/';

function ContactsForm() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  // const { isUser } = useUser();

  function onSubmit(data) {
    // console.log(data);
    emailjs.send(serviceId, templateId, data, key).then(
      (result) => {
        // console.log(result.text);
        toast.success('Email sent successfully!');
        reset();
      },
      (error) => {
        console.log(error.text);
        toast.error('Failed to send email.');
        reset();
      }
    );
  }

  return (
    <>
      <ContactsContainer>
        <StyledMapContainer
          center={POSITION}
          zoom={16}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={POSITION}>
            <Popup>Diskoteka 214</Popup>
          </Marker>
        </StyledMapContainer>

        <ContactFormWrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRowVertical
              label='Full name'
              error={errors?.fullName?.message}>
              <Input
                type='text'
                id='fullName'
                // disabled={isLoading || isUser}
                {...register('fullName', {
                  required: 'This field is required',
                })}
              />
            </FormRowVertical>

            <FormRowVertical
              label='Email address'
              error={errors?.email?.message}>
              <Input
                type='email'
                id='email'
                // disabled={isLoading || isUser}
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please provide a valid email address',
                  },
                })}
              />
            </FormRowVertical>

            <FormRowVertical label='Subject' error={errors?.subject?.message}>
              <Input
                type='text'
                id='subject'
                // disabled={isLoading || isUser}
                {...register('subject', {
                  required: 'This field is required',
                })}
              />
            </FormRowVertical>

            <FormRowVertical label='Message' error={errors?.message?.message}>
              <Textarea
                id='message'
                // disabled={isLoading || isUser}
                {...register('message', {
                  required: 'This field is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters long',
                  },
                })}
              />
            </FormRowVertical>

            <FormRowVertical>
              <Button
              // disabled={isLoading || isUser}
              >
                Submit
              </Button>
            </FormRowVertical>
          </Form>
        </ContactFormWrapper>
      </ContactsContainer>

      <ContactDetails>
        <ContainerHeading>
          <Heading as='h2'>Get in touch</Heading>
        </ContainerHeading>
        <ContainerInfo>
          <Address>
            <span>Address:</span>
            <span>acad. Nikolai Stoyanov Street,</span>
            <span>Sofia, </span>
            <span>Bulgaria</span>
          </Address>
          <ContactInfo>
            <span>Email: info@diskoteka214.com</span>
            <span>Phone: +359 877 193 786</span>
          </ContactInfo>
          <Socials>
            <StyledLink to={facebook} target='_blank'>
              <FaFacebook />
            </StyledLink>

            <StyledLink to={twitter} target='_blank'>
              <FaTwitter />
            </StyledLink>

            <StyledLink to={instagram} target='_blank'>
              <FaInstagram />
            </StyledLink>
          </Socials>
        </ContainerInfo>
      </ContactDetails>
    </>
  );
}

export default ContactsForm;
