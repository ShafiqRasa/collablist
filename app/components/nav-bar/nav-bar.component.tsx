'use client';
// built-in imports
import { toast } from 'react-toastify';
// internal imports
import { Wrapper, Section, Path } from './nav-bar.component.styles';
import { Button } from '../index';
import { useCellContextProvider } from 'app/context/cell.context';

const NavBar = () => {
  const { cells, handleInsert } = useCellContextProvider();

  /** only list is empty, user can insert an item! */
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
        <Button btnType="base" onClick={handleClick}>
          add
        </Button>
      </Section>
    </Wrapper>
  );
};
export default NavBar;
