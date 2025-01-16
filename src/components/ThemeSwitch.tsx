import React, { memo, lazy, Suspense } from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";

// Lazy load icons
const Icons = {
  FaSun: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaSun })),
  ),
  FaMoon: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaMoon })),
  ),
};

const Switch = styled.button<{ $isMobile?: boolean }>`
  background: var(--card-background);
  border: 1px solid var(--accent);
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  height: ${(props) => (props.$isMobile ? "35px" : "35px")};
  width: 35px;
  color: var(--accent);

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    font-size: 1rem;
  }
`;

const IconWrapper = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div style={{ width: "1rem", height: "1rem" }} />}>
    {children}
  </Suspense>
));

interface ThemeSwitchProps {
  isMobile?: boolean;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isMobile }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch onClick={toggleTheme} $isMobile={isMobile}>
      <IconWrapper>
        {theme === "dark" ? <Icons.FaSun /> : <Icons.FaMoon />}
      </IconWrapper>
    </Switch>
  );
};

export default memo(ThemeSwitch);
