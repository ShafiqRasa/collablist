import styled from 'styled-components';

export const BaseButton = styled.button`
  height: 50px;
  padding: 0 35px;
  background-color: var(--blue);
  color: var(--white);
  cursor: pointer;
  text-align: center;
  border: none;
  text-transform: uppercase;
  &:hover {
    background-color: #2b6fdc;
  }
`;
export const InsertButton = styled.button`
  background-color: transparent;
  padding: 5px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
export const DeleteButton = styled.button`
  background-color: transparent;
  padding: 5px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
