import React from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Navigation from "./components/Navigation";
import MouseFollower from "./components/MouseFollower";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const GlobalStyle = createGlobalStyle`
  :root {
    --font-matrix: 'DotMatrix', monospace;
    --font-mono: 'JetBrains Mono', monospace;
    --dot-size: 1px;
    --dot-space: 16px;
  }

  :root[data-theme="light"] {
    --background: #f5f1e9;
    --card-background: rgba(255, 252, 247, 0.7);
    --card-border: rgba(0, 0, 0, 0.1);
    --primary: #2c2c2c;
    --text: #4a4a4a;
    --accent: #4a72ff;
    --dot-color: rgba(0, 0, 0, 0.1);
  }

  :root[data-theme="dark"] {
    --background: #1a1a1a;
    --card-background: rgba(30, 30, 30, 0.7);
    --card-border: rgba(255, 255, 255, 0.1);
    --primary: #ffffff;
    --text: rgba(255, 255, 255, 0.9);
    --accent: #4a72ff;
    --dot-color: rgba(255, 255, 255, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background);
    background-image: radial-gradient(circle, var(--dot-color) var(--dot-size), transparent var(--dot-size));
    background-size: var(--dot-space) var(--dot-space);
    color: var(--text);
    font-family: var(--font-mono);
    line-height: 1.6;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  @media (hover: hover) {
    a, button {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }

  code {
    font-family: var(--font-mono);
    background: var(--card-background);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  ::selection {
    background: var(--accent);
    color: white;
  }

  @font-face {
    font-family: 'DotMatrix';
    src: url('/fonts/DotMatrix.woff2') format('woff2');
    font-display: swap;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  padding-top: calc(2rem + 80px);
  flex: 1;

  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: calc(1rem + 60px);
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 3rem 0;
  background: var(--card-background);
  border-top: 1px solid var(--card-border);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLeft = styled.div`
  h3 {
    font-family: var(--font-matrix);
    margin-bottom: 1rem;
    color: var(--primary);
  }

  p {
    color: var(--text-secondary);
    max-width: 400px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    color: var(--primary);
    font-size: 1.5rem;
    transition: transform 0.3s ease;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      background-image: radial-gradient(
        circle,
        var(--accent) 0.5px,
        transparent 0.5px
      );
      background-size: 4px 4px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
      border-radius: 50%;
    }

    &:hover {
      transform: translateY(-2px);
      opacity: 1;

      &::before {
        opacity: 0.1;
      }
    }
  }
`;

const AppWithRouter: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppContainer>
        <Navigation />
        <MainContent>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </AnimatePresence>
        </MainContent>
        <Footer>
          <FooterContent>
            <FooterLeft>
              <h3>{t("footer.title")}</h3>
              <p>{t("footer.subtitle")}</p>
            </FooterLeft>
            <SocialLinks>
              <a href="mailto:your.email@example.com" title={t("footer.email")}>
                <FaEnvelope />
              </a>
              <a
                href="https://github.com/cucumber-sp"
                target="_blank"
                rel="noopener noreferrer"
                title={t("footer.github")}
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                title={t("footer.linkedin")}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                title={t("footer.twitter")}
              >
                <FaTwitter />
              </a>
            </SocialLinks>
          </FooterContent>
        </Footer>
        <MouseFollower />
      </AppContainer>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  );
};

export default App;
