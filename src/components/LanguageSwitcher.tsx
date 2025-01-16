import React, { memo, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Container = styled.div`
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

const Button = styled.button<{ $active: boolean }>`
  height: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
  min-width: 45px;
  background: transparent;
  color: ${(props) => (props.$active ? "white" : "var(--primary)")};
  border: none;
  font-family: var(--font-matrix);
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--accent);
    opacity: ${(props) => (props.$active ? 1 : 0)};
    transition: opacity 0.2s ease;
    z-index: -1;
    border-radius: 4px;
  }

  &:hover {
    color: ${(props) => (props.$active ? "white" : "var(--accent)")};
  }
`;

interface LanguageButtonProps {
  lang: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const LanguageButton = memo(
  ({ lang, active, onClick, children }: LanguageButtonProps) => (
    <Button
      onClick={onClick}
      $active={active}
      aria-label={`Switch to ${lang} language`}
    >
      {children}
    </Button>
  ),
);

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const setLanguage = useCallback(
    (lang: string) => {
      localStorage.setItem("i18nextLng", lang);
      i18n.changeLanguage(lang);
    },
    [i18n],
  );

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng");
    const browserLang = navigator.language.split("-")[0];
    const defaultLang = savedLang || browserLang || "en";

    if (!savedLang) {
      setLanguage(defaultLang);
    }
  }, [setLanguage]);

  return (
    <Container>
      <LanguageButton
        lang="en"
        active={i18n.language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </LanguageButton>
      <LanguageButton
        lang="ru"
        active={i18n.language === "ru"}
        onClick={() => setLanguage("ru")}
      >
        RU
      </LanguageButton>
    </Container>
  );
};

export default memo(LanguageSwitcher);
