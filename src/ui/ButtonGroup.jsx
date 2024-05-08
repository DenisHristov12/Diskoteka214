import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: ${(props) => (props.isEvent ? 'flex-start' : 'flex-end')};

  padding: ${(props) => (props.isEvent ? '0 4.8rem' : '0')};
`;

export default ButtonGroup;
