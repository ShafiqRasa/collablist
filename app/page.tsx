'use client';
// built-in imports
import React from 'react';

// internal imports
import { Wrapper } from './home.page.styles';
import { ComplexList } from './components';
import { useCellContextProvider } from './context/cell.context';

const App: React.FC = () => {
  const { cells } = useCellContextProvider();
  return (
    <Wrapper className="container">
      <h1>Editable Vertical List</h1>
      <ComplexList data={cells}>
        {({ id, value }) => <div key={id}>{value}</div>}
      </ComplexList>
    </Wrapper>
  );
};

export default App;
