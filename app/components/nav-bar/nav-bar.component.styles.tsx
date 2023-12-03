import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1rem 0 2rem 0;
  @media screen and (max-width: 900px) {
    margin-top: 5rem;
  }
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: white;
  border: 1px solid #676767;
  border-radius: 0.25rem;
  overflow: hidden;
`;
export const Path = styled.div`
  padding: 10px;
  p {
    color: #6e6e73;
  }
`;
