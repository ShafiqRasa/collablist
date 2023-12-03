import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 150px;
  justify-content: left;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--text-secondary-color);
  .delete-icon {
    width: 25px;
    height: 25px;
    transition: var(--transition);
    &:hover {
      color: red;
      scale: 1.1;
    }
  }
  .insert-icon {
    width: 25px;
    height: 25px;
    color: green;
    transition: var(--transition);

    &:hover {
      scale: 1.1;
    }
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: auto 1fr auto;
  }
`;
export const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
