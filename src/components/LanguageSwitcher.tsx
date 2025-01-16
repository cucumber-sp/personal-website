import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SwitcherContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LanguageButton = styled(motion.button)<{ $active: boolean }>`
  background: ${props => props.$active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.$active ? 'white' : 'var(--primary)'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: var(--font-matrix);
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    color: ${props => props.$active ? 'white' : 'var(--accent)'};

    &::before {
      opacity: ${props => props.$active ? 0 : 0.1};
    }
  }
`;

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Get saved language from localStorage or use browser language
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
    const initialLang = savedLang || browserLang;
    
    i18n.changeLanguage(initialLang);
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <SwitcherContainer>
      <LanguageButton
        $active={i18n.language === 'en'}
        onClick={() => changeLanguage('en')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </LanguageButton>
      <LanguageButton
        $active={i18n.language === 'ru'}
        onClick={() => changeLanguage('ru')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        RU
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher; 