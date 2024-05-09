import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: ${(props) => (props.isEvent ? 'flex-start' : 'flex-end')};

  padding: ${(props) => (props.isEvent ? '0 4.8rem' : '0')};
`;

export default ButtonGroup;
