import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  respondToLandscapeTablets,
  respondToMobile,
} from '../styles/mediaQueries';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  ${respondToLandscapeTablets(`font-size: 1.2rem`)}

  ${respondToMobile(`
   margin-left: 0rem;
    font-size: 1rem`)}

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;

  ${respondToMobile(`
   gap: 0rem;`)}
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;

    ${respondToLandscapeTablets(`height: 1.6rem;
    width: 1.6rem;`)}

    ${respondToMobile(`height: 1.2rem;
    width: 1.2rem;`)}
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  ${respondToLandscapeTablets(`font-size: 1.2rem`)}

  ${respondToMobile(`font-size: 1rem`)}
`;

function Pagination({ count, pageSize }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / pageSize);

  function nextPage() {
    const next = currPage === pageCount ? currPage : currPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    const prev = currPage === 1 ? currPage : currPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) {
    return null;
  }
  return (
    <StyledPagination>
      <P>
        <span>{(currPage - 1) * pageSize + 1}</span> to{' '}
        <span>{currPage === pageCount ? count : currPage * pageSize}</span> of{' '}
        <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={previousPage} disabled={currPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={currPage === pageCount}>
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
