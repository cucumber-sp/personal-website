import React, { useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaTimes, FaTerminal } from "react-icons/fa";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 0;

  @media (max-width: 768px) {
    align-items: flex-start;
    background: var(--background);
    overflow-y: auto;
  }
`;

const ModalContainer = styled(motion.div)`
  background: var(--background);
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  position: relative;
  border: 2px solid var(--accent);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    min-height: 100vh;
    height: auto;
    max-height: none;
    padding: 1rem;
    margin: 0;
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding-top: 4rem;
  }
`;

const ModalContent = styled.div`
  @media (max-width: 768px) {
    padding-bottom: 2rem;
  }
`;

const CloseButtonContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10000;
  padding: 0.5rem;
  background: var(--background);
  border-bottom-left-radius: 12px;
  border-left: 2px solid var(--accent);
  border-bottom: 2px solid var(--accent);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    position: fixed;
    width: auto;
    border-radius: 0 0 0 12px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h2`
  font-family: var(--font-matrix);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--accent);
  padding-right: 2rem;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-family: var(--font-matrix);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommandBlock = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);

  a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px dashed var(--accent);
    padding-bottom: 1px;
    transition: all 0.2s ease;

    &:hover {
      border-bottom-style: solid;
      opacity: 0.8;
    }
  }
`;

const Command = styled.pre`
  margin: 0.5rem 0;
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--text);
  line-height: 1.4;
`;

const Note = styled.p`
  font-size: 0.85rem;
  color: var(--text);
  opacity: 0.8;
  margin-top: 0.5rem;
  font-style: italic;

  a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px dashed var(--accent);
    padding-bottom: 1px;
    transition: all 0.2s ease;

    &:hover {
      border-bottom-style: solid;
      opacity: 0.8;
    }
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    sections: {
      type: string;
      title: string;
      content: string;
      note?: string;
    }[];
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  const { t } = useTranslation();
  const scrollPositionRef = useRef(0);

  React.useEffect(() => {
    if (isOpen) {
      scrollPositionRef.current = window.pageYOffset;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
      window.scrollTo(0, scrollPositionRef.current);
    }
    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
      if (scrollPositionRef.current) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    };
  }, [isOpen]);

  const modalContent = React.useMemo(() => {
    if (!content) return null;

    return {
      title: content.title,
      sections: content.sections.map((section) => ({
        ...section,
        title: section.title,
        content: section.content,
        note: section.note,
      })),
    };
  }, [content]);

  return (
    <AnimatePresence>
      {isOpen && modalContent && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{
              opacity: 0,
              scale: window.innerWidth > 768 ? 0.9 : 1,
              y: window.innerWidth > 768 ? 0 : 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: window.innerWidth > 768 ? 0.9 : 1,
              y: window.innerWidth > 768 ? 0 : 20,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButtonContainer>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </CloseButtonContainer>
            <ModalContent>
              <Title>
                {String(
                  t(modalContent.title, { defaultValue: modalContent.title }),
                )}
              </Title>
              {modalContent.sections.map((section, index) => (
                <Section key={index}>
                  <SectionTitle>
                    <FaTerminal />
                    {String(t(section.title, { defaultValue: section.title }))}
                  </SectionTitle>
                  <CommandBlock>
                    <Command
                      dangerouslySetInnerHTML={{
                        __html: section.content,
                      }}
                    />
                  </CommandBlock>
                  {section.note && (
                    <Note
                      dangerouslySetInnerHTML={{
                        __html: String(
                          t(section.note, { defaultValue: section.note }),
                        ),
                      }}
                    />
                  )}
                </Section>
              ))}
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
