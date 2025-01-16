import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  font-family: var(--font-matrix);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled(motion.section)`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-matrix);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: var(--card-background);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--card-border);
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
    border-radius: 12px;
  }

  &:hover::before {
    opacity: 0.1;
  }
`;

const SkillTitle = styled.h3`
  font-family: var(--font-matrix);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--primary);
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--text);
  }
`;

const About: React.FC = () => {
  const { t } = useTranslation();

  const skills = {
    frontend: ['React', 'TypeScript', 'Next.js', 'Styled Components', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    devops: ['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'Terraform'],
    tools: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest']
  };

  return (
    <AboutContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t('about.title')}
      </Title>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p>{t('about.intro')}</p>
      </Section>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <SectionTitle>{t('about.skills.title')}</SectionTitle>
        <SkillsGrid>
          <SkillCard whileHover={{ y: -5 }}>
            <SkillTitle>{t('about.skills.frontend')}</SkillTitle>
            <SkillList>
              {skills.frontend.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </SkillList>
          </SkillCard>

          <SkillCard whileHover={{ y: -5 }}>
            <SkillTitle>{t('about.skills.backend')}</SkillTitle>
            <SkillList>
              {skills.backend.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </SkillList>
          </SkillCard>

          <SkillCard whileHover={{ y: -5 }}>
            <SkillTitle>{t('about.skills.devops')}</SkillTitle>
            <SkillList>
              {skills.devops.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </SkillList>
          </SkillCard>

          <SkillCard whileHover={{ y: -5 }}>
            <SkillTitle>{t('about.skills.tools')}</SkillTitle>
            <SkillList>
              {skills.tools.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </SkillList>
          </SkillCard>
        </SkillsGrid>
      </Section>
    </AboutContainer>
  );
};

export default About; 