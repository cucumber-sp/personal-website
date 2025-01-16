import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const SwitchContainer = styled.button`
  position: relative;
  z-index: 1001;
  background: transparent;
  border: 1px solid var(--accent);
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-family: var(--font-matrix);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background-image: radial-gradient(circle, var(--accent) 0.5px, transparent 0.5px);
    background-size: 4px 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    border-radius: 12px;
  }

  &:hover {
    color: var(--accent);
    transform: translateY(-2px);

    &::before {
      opacity: 0.1;
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const IconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ThemeSwitchProps {
  isMobile?: boolean;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isMobile }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitchContainer onClick={toggleTheme} aria-label="Toggle theme" className={isMobile ? 'mobile' : ''}>
      <IconContainer
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <FaMoon /> : <FaSun />}
      </IconContainer>
      {theme === 'dark' ? 'Dark' : 'Light'}
    </SwitchContainer>
  );
};

export default ThemeSwitch; 