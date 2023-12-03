'use client';
// built-in imports
import React from 'react';

// internal imports
import { VerticalList } from './components';
import { Wrapper } from './home.page.styles';

const App: React.FC = () => {
  return (
    <Wrapper>
      <h1>Editable Vertical List</h1>
      <VerticalList />
    </Wrapper>
  );
};

export default App;
