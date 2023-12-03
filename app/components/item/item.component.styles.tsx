import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 150px;
  justify-content: left;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--text-secondary-color);
  @media screen and (max-width: 900px) {
    grid-template-columns: auto 1fr auto;
  }
`;
