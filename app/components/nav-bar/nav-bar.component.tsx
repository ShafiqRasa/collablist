'use client';
// internal imports
import { Wrapper, Section, Path } from './nav-bar.component.styles';
import { Button } from '../index';

const NavBar = () => {
  return (
    <Wrapper>
      <Section className="container">
        <Path>
          <p>home &#8827; List</p>
        </Path>
        <Button onClick={() => console.log('add btn clicked')}>add</Button>
      </Section>
    </Wrapper>
  );
};
export default NavBar;
