import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaEnvelope,
  FaHistory,
  FaCode,
  FaTools,
  FaTelegram,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const HomeContainer = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.75rem;
  }
`;

const MainSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PhotoCard = styled(motion.div)`
  width: 180px;
  height: 180px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin: 0;
  }
`;

const PhotoContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--card-border);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const MessageBubble = styled(motion.div)`
  background: var(--card-background);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1rem;
  max-width: 100%;
  position: relative;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text);
`;

const FirstMessage = styled(MessageBubble)`
  &::after {
    content: "";
    position: absolute;
    left: -10px;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--card-border);

    @media (max-width: 768px) {
      left: 20px;
      top: -10px;
      transform: none;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid var(--card-border);
      border-top: none;
    }
  }

  &::before {
    content: "";
    position: absolute;
    left: -9px;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--card-background);
    z-index: 1;

    @media (max-width: 768px) {
      left: 20px;
      top: -9px;
      transform: none;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid var(--card-background);
      border-top: none;
    }
  }
`;

const SenderName = styled.div`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const StatButton = styled(motion.button)`
  text-align: left;
  padding: 1rem;
  background: var(--card-background);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon {
    font-size: 1.5rem;
    color: var(--accent);
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
  }

  h3 {
    font-family: var(--font-matrix);
    font-size: 1.5rem;
    margin: 0;
    color: var(--primary);
  }

  p {
    font-size: 0.85rem;
    margin: 0.25rem 0 0;
    color: var(--text);
    font-family: var(--font-mono);
    white-space: nowrap;
  }

  .mobile-arrow {
    color: var(--accent);
    font-size: 1.25rem;
    display: none;
    flex-shrink: 0;

    @media (max-width: 768px) {
      display: block;
    }
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.75rem;

    .icon {
      font-size: 1.25rem;
    }

    h3 {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.8rem;
    }

    .mobile-arrow {
      font-size: 1rem;
    }
  }

  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }
`;

const ContactSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--card-background);
  border: 1px solid var(--card-border);
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  transition: all 0.3s ease;

  svg {
    font-size: 1.1rem;
    color: var(--accent);
  }

  &:hover {
    border-color: var(--accent);

    svg {
      transform: scale(1.1);
    }
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <HomeContainer>
      <MainSection>
        <PhotoCard
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PhotoContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img src="/images/profile.jpg" alt="Andrey Onischenko" />
          </PhotoContainer>
        </PhotoCard>
        <ChatSection>
          <FirstMessage
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SenderName>Andrey Onischenko</SenderName>
            <p>{t("home.intro")}</p>
          </FirstMessage>

          <MessageBubble
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p>{t("home.messages.about")}</p>
            <StatsContainer>
              <StatButton
                onClick={() => navigate("/experience")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="icon">
                  <FaHistory />
                </div>
                <div className="content">
                  <h3>{t("home.stats.experience.value")}</h3>
                  <p>{t("home.stats.experience.label")}</p>
                </div>
                <div className="mobile-arrow">→</div>
              </StatButton>
              <StatButton
                onClick={() => navigate("/projects")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="icon">
                  <FaCode />
                </div>
                <div className="content">
                  <h3>{t("home.stats.projects.value")}</h3>
                  <p>{t("home.stats.projects.label")}</p>
                </div>
                <div className="mobile-arrow">→</div>
              </StatButton>
              <StatButton
                onClick={() => navigate("/about")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="icon">
                  <FaTools />
                </div>
                <div className="content">
                  <h3>{t("home.stats.opensource.value")}</h3>
                  <p>{t("home.stats.opensource.label")}</p>
                </div>
                <div className="mobile-arrow">→</div>
              </StatButton>
            </StatsContainer>
          </MessageBubble>

          <MessageBubble
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <p>{t("home.messages.contact")}</p>
            <ContactSection>
              <ContactButton
                href="https://github.com/cucumber-sp"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
                {t("home.contact.github")}
              </ContactButton>
              <ContactButton
                href="mailto:your.email@example.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope />
                {t("home.contact.email")}
              </ContactButton>
              <ContactButton
                href="https://t.me/a_dzeta"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTelegram />
                {t("home.contact.telegram")}
              </ContactButton>
            </ContactSection>
          </MessageBubble>

          <MessageBubble
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <p>{t("home.messages.blog")}</p>
            <ContactButton
              as={motion.button}
              onClick={() => navigate("/blog")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                marginTop: "0.5rem",
              }}
            >
              {t("home.navigation.blog")} →
            </ContactButton>
          </MessageBubble>
        </ChatSection>
      </MainSection>
    </HomeContainer>
  );
};

export default Home;
