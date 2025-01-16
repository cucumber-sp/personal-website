import React, { useEffect, useState, lazy, Suspense } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Project, ProjectWithMeta } from "../types/project";
import projectsData from "../data/projects.json";
import Modal from "../components/Modal";

// Lazy load icons
const Icons = {
  FaGithub: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaGithub })),
  ),
  FaExternalLinkAlt: lazy(() =>
    import("react-icons/fa").then((mod) => ({
      default: mod.FaExternalLinkAlt,
    })),
  ),
  FaDownload: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaDownload })),
  ),
  FaStar: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaStar })),
  ),
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-family: var(--font-matrix);
  font-size: 2.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 0.5rem 0 1rem 0;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: var(--font-matrix);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--accent);

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ProjectCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border: 2px solid var(--accent);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (max-width: 768px) {
    padding: 1rem;
  }

  &:hover {
    transform: scale(1.02);
  }
`;

const ProjectContent = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-family: var(--font-matrix);
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.95rem;
  color: var(--text);

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
    margin-bottom: 1rem;
  }
`;

const Tech = styled.span`
  background: rgba(0, 0, 0, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-family: var(--font-mono);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  background: transparent;
  color: var(--accent);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  border: 1px solid var(--accent);
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }

  &:hover {
    background: var(--accent);
    color: white;
  }
`;

const StarsCount = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--accent);
  background: rgba(255, 217, 0, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 217, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  svg {
    color: #ffd700;
  }
`;

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div style={{ width: "1rem", height: "1rem" }} />}>
    {children}
  </Suspense>
);

const Projects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<ProjectWithMeta[]>([]);
  const [modalContent, setModalContent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStars = async (projects: Project[]) => {
      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          if (!project.github) {
            return { ...project, isLoading: false };
          }

          try {
            const repoPath = project.github.replace("https://github.com/", "");
            const response = await fetch(
              `https://api.github.com/repos/${repoPath}`,
            );
            const data = await response.json();
            return {
              ...project,
              stars: data.stargazers_count,
              isLoading: false,
            };
          } catch (error) {
            console.error("Error fetching stars:", error);
            return { ...project, isLoading: false };
          }
        }),
      );

      setProjects(updatedProjects);
    };

    const initialProjects = projectsData.projects.map((project) => {
      const translatedProject = {
        ...project,
        title: t(`projects.items.${project.id}.title`, project.id),
        description: t(`projects.items.${project.id}.description`, project.id),
      } as Project;
      return { ...translatedProject, isLoading: true } as ProjectWithMeta;
    });

    setProjects(initialProjects);
    fetchStars(initialProjects);
  }, [t, i18n.language]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "github":
        return (
          <IconWrapper>
            <Icons.FaGithub />
          </IconWrapper>
        );
      case "external":
        return (
          <IconWrapper>
            <Icons.FaExternalLinkAlt />
          </IconWrapper>
        );
      case "download":
        return (
          <IconWrapper>
            <Icons.FaDownload />
          </IconWrapper>
        );
      default:
        return null;
    }
  };

  const renderProjectCard = (project: ProjectWithMeta) => (
    <ProjectCard
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <ProjectContent>
        <Title>
          {project.title}
          {project.stars && project.stars >= 50 && (
            <StarsCount>
              <IconWrapper>
                <Icons.FaStar />
              </IconWrapper>{" "}
              {project.stars}
            </StarsCount>
          )}
        </Title>
        <Description>{project.description}</Description>
        <TechStack>
          {project.tech.map((tech, index) => (
            <Tech key={index}>{tech}</Tech>
          ))}
        </TechStack>
      </ProjectContent>
      <Links>
        {project.actions.map((action, index) => (
          <LinkButton
            key={index}
            href={action.type === "link" ? action.url : "#"}
            onClick={
              action.type === "modal"
                ? () => handleActionClick(action)
                : undefined
            }
            target={action.type === "link" ? "_blank" : undefined}
            rel={action.type === "link" ? "noopener noreferrer" : undefined}
          >
            {getIconComponent(action.icon)}{" "}
            {t(
              `projects.actions.${action.translationKey}`,
              action.translationKey,
            )}
          </LinkButton>
        ))}
      </Links>
    </ProjectCard>
  );

  const handleActionClick = (action: any) => {
    if (action.type === "modal") {
      setModalContent(action.content);
      setIsModalOpen(true);
    }
  };

  const groupedProjects = projects.reduce<Record<string, ProjectWithMeta[]>>(
    (acc, project) => {
      const category = project.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(project);
      return acc;
    },
    {},
  );

  return (
    <Container>
      <PageTitle>{t("projects.title")}</PageTitle>
      {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
        <Section key={category}>
          <SectionTitle>
            {t(`projects.categories.${category}`, category)}
          </SectionTitle>
          <Grid>{categoryProjects.map(renderProjectCard)}</Grid>
        </Section>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
    </Container>
  );
};

export default Projects;
