'use client';
// built-in imports
import React from 'react';

// internal imports
import { VerticalList } from './components';

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1>Editable Vertical List</h1>
      <VerticalList />
    </div>
  );
};

export default App;
