'use client';
// built-in imports
import React from 'react';
import { toast } from 'react-toastify';

// internal imports
import { Wrapper, Section, Path } from './nav-bar.component.styles';
import { Button } from '../index';
import { useCellContextProvider } from 'app/context/cell.context';
import { BUTTON_TYPES } from '../button/button.component';

const NavBar: React.FC = () => {
  const { cells, handleInsert } = useCellContextProvider();

  /** when list is empty, user can insert an item! */
  const handleClick = () => {
    if (!cells.length) handleInsert(0);
    toast.success('Cell added successfully!');
  };
  return (
    <Wrapper>
      <Section className="container">
        <Path>
          <p>home &#8827; List</p>
        </Path>
        <Button btnType={BUTTON_TYPES.base} onClick={handleClick}>
          add
        </Button>
      </Section>
    </Wrapper>
  );
};
export default NavBar;
