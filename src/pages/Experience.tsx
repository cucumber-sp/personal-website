import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ExperienceContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  font-family: var(--font-matrix);
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: calc(100% - 100px);
    background: var(--accent);
    opacity: 0.2;
    top: 50px;

    @media (max-width: 768px) {
      left: 20px;
      height: calc(100% - 50px);
      top: 25px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 3rem;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 40px;
    margin-bottom: 2rem;
  }
`;

const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  background: var(--background);
  border: 2px solid var(--accent);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  &::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 768px) {
    left: 20px;
  }
`;

const TimelineContent = styled(motion.div)<{ $align?: "left" | "right" }>`
  width: 42%;
  padding: 1.5rem;
  background: var(--card-background);
  border-radius: 8px;
  border: 1px solid var(--card-border);
  position: relative;
  margin-${(props) => (props.$align === "right" ? "left" : "right")}: 58%;

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

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const Company = styled.h3`
  font-family: var(--font-matrix);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
`;

const Period = styled.div`
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Role = styled.h4`
  font-family: var(--font-matrix);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--accent);
`;

const Description = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  h5 {
    font-family: var(--font-matrix);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--accent);
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  li {
    font-size: 0.85rem;
    color: var(--text);
    background: var(--card-background);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: var(--font-mono);
    border: 1px solid var(--card-border);
  }
`;

const Experience: React.FC = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      company: "Tech Solutions Inc",
      period: "2022 - " + t("experience.present"),
      role: "Senior Full Stack Developer",
      responsibilities: [
        "Led development of microservices architecture",
        "Mentored junior developers",
        "Implemented CI/CD pipelines",
      ],
      technologies: ["React", "Node.js", "TypeScript", "Docker", "AWS"],
    },
    {
      company: "Digital Innovations Ltd",
      period: "2020 - 2022",
      role: "Full Stack Developer",
      responsibilities: [
        "Developed scalable web applications",
        "Optimized database performance",
        "Integrated third-party APIs",
      ],
      technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "GCP"],
    },
  ];

  return (
    <ExperienceContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t("experience.title")}
      </Title>
      <Timeline>
        {experiences.map((exp, index) => (
          <TimelineItem
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <TimelineDot />
            <TimelineContent
              $align={index % 2 === 0 ? "left" : "right"}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Company>{exp.company}</Company>
              <Period>{exp.period}</Period>
              <Role>{exp.role}</Role>
              <Description>
                <h5>{t("experience.responsibilities")}:</h5>
                <ul>
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </Description>
              <Description>
                <h5>{t("experience.technologies")}:</h5>
                <ul>
                  {exp.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </Description>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </ExperienceContainer>
  );
};

export default Experience;
