import React, { MouseEvent } from 'react';
import { styled } from '@mui/material/styles';

interface HamburgerMenuProps {
  isActive: boolean;
  toggleActive: (event: MouseEvent<HTMLElement>) => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isActive, toggleActive }) => {
  const HamburgerLine = styled('div')((
    options: {
      transform?: string,
      marginBottom?: string
    }) => ({
    ...options,
    height: '1px',
    width: '25px',
    backgroundColor: '#f5f5f5',
    transition: '.25s ease-in-out'
  }));

  return (
    <div style={{ cursor: 'pointer' }} onClick={toggleActive}>
      <HamburgerLine transform={isActive ? 'rotate(45deg)' : undefined} marginBottom={isActive ? 'auto' : '5px'}/>
      {!isActive && <HamburgerLine marginBottom='5px' />}
      <HamburgerLine transform={isActive ? 'rotate(-45deg)' : undefined} />
    </div>
  );
}

