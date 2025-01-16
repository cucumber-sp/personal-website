import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeSwitch from './ThemeSwitch';
import { FaHome } from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.75rem 2rem;
  background: var(--card-background);
  border-bottom: 1px solid var(--card-border);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0;
    border: none;
    background: none;
    backdrop-filter: none;
  }
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  font-family: var(--font-matrix);
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.li)`
  position: relative;
  
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
    border-radius: 4px;
  }

  &:hover::before {
    opacity: 0.1;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  text-decoration: none;
  color: var(--primary);
  padding: 0.5rem 0;
  transition: color 0.2s ease;
  position: relative;
  font-size: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    transform: scaleX(${props => props.$active ? 1 : 0});
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: var(--accent);
    
    &::after {
      transform: scaleX(1);
    }
  }
`;

const MobileNav = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background);
  z-index: 1000;
  padding: 2rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: 'DotMatrix', monospace;
  font-size: 1.5rem;
  margin-top: 4rem;
`;

const HamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1001;
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  padding: 0.5rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

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
    border-radius: 50%;
  }

  &:hover::before {
    opacity: 0.1;
  }

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--primary);
    transition: all 0.3s ease;
  }

  &.open {
    span:first-child {
      transform: rotate(45deg) translate(7px, 7px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:last-child {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  }
`;

interface HomeButtonProps {
  $show: boolean;
}

const HomeButton = styled(Link)<{ $show: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${props => props.$show ? 'flex' : 'none'};
    position: fixed;
    top: 2rem;
    left: 2rem;
    z-index: 1001;
    text-decoration: none;
    color: var(--primary);
    font-size: 1.2rem;
    padding: 0.75rem;
    transition: all 0.3s ease;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    background: var(--card-background);
    backdrop-filter: blur(10px);
    align-items: center;
    justify-content: center;

    &:hover {
      color: var(--accent);
      transform: translateY(-2px);
      border-color: var(--accent);
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

const MobileLanguageSwitch = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  background: var(--card-background);
  border-radius: 8px;
  padding: 0.3rem;
  height: 35px;
  width: fit-content;
  margin: 0;
  border: 1px solid var(--accent);
  overflow: hidden;
`;

const MobileLangButton = styled.button<{ $active: boolean }>`
  height: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
  min-width: 45px;
  background: transparent;
  color: ${props => props.$active ? 'white' : 'var(--primary)'};
  border: none;
  font-family: var(--font-matrix);
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--accent);
    opacity: ${props => props.$active ? 1 : 0};
    transition: opacity 0.2s ease;
    z-index: -1;
    border-radius: 4px;
  }

  &:hover {
    color: ${props => props.$active ? 'white' : 'var(--accent)'};
  }
`;

const MobileControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--card-background);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  justify-content: center;
`;

const DesktopControls = styled.div`
  display: flex;
  gap: 1rem;
  height: 45px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopLanguageSwitch = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  background: var(--card-background);
  border-radius: 8px;
  padding: 0.3rem;
  height: 35px;
  border: 1px solid var(--accent);
  overflow: hidden;
`;

const LangButton = styled(MobileLangButton)`
  border-radius: 4px;
  
  &::before {
    border-radius: 4px;
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navItems = [
    { path: '/', label: t('nav.home'), delay: 0.2 },
    { path: '/about', label: t('nav.about'), delay: 0.3 },
    { path: '/projects', label: t('nav.projects'), delay: 0.4 },
    { path: '/experience', label: t('nav.experience'), delay: 0.5 },
    { path: '/blog', label: t('nav.blog'), delay: 0.6 }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const showHomeButton = !isOpen && location.pathname !== '/';

  return (
    <Nav>
      <NavContainer>
        <NavList>
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to={item.path} $active={isActive(item.path)}>{item.label}</NavLink>
            </NavItem>
          ))}
        </NavList>

        <DesktopControls>
          <DesktopLanguageSwitch>
            <LangButton
              $active={i18n.language === 'en'}
              onClick={() => changeLanguage('en')}
            >
              EN
            </LangButton>
            <LangButton
              $active={i18n.language === 'ru'}
              onClick={() => changeLanguage('ru')}
            >
              RU
            </LangButton>
          </DesktopLanguageSwitch>
          <ThemeSwitch />
        </DesktopControls>
      </NavContainer>

      <HomeButton to="/" $show={showHomeButton}>
        <FaHome />
      </HomeButton>

      <HamburgerButton 
        onClick={toggleMenu}
        className={isOpen ? 'open' : ''}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>

      <AnimatePresence>
        {isOpen && (
          <MobileNav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <MobileNavList>
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: item.delay }}
                >
                  <NavLink 
                    to={item.path} 
                    onClick={closeMenu}
                    $active={isActive(item.path)}
                  >
                    {item.label}
                  </NavLink>
                </NavItem>
              ))}
            </MobileNavList>
            <MobileControls>
              <MobileLanguageSwitch>
                <MobileLangButton
                  $active={i18n.language === 'en'}
                  onClick={() => changeLanguage('en')}
                >
                  EN
                </MobileLangButton>
                <MobileLangButton
                  $active={i18n.language === 'ru'}
                  onClick={() => changeLanguage('ru')}
                >
                  RU
                </MobileLangButton>
              </MobileLanguageSwitch>
              <ThemeSwitch isMobile />
            </MobileControls>
          </MobileNav>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navigation; 