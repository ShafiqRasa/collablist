import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  background-color: transparent;
  outline: none;
  padding: 5px;
  border: none;
  font-size: 15px;
  letter-spacing: 1px;
  transition: var(--transition);
  &:focus {
    border-bottom: 2px solid var(--blue);
  }
`;
export const BlockContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  p {
    font-size: 10px;
    color: green;
  }
`;
