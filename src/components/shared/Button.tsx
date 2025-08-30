import React from "react";
import styled, { keyframes } from "styled-components";
import { AppTheme } from "../../theme/types";

type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  active?: boolean;
  variant?: Variant;
  size?: Size;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}


const sizeTokens: Record<Size, { h: number; fs: number; px: number; gap: number }> = {
  sm: { h: 34, fs: 13, px: 8, gap: 6 },
  md: { h: 40, fs: 14, px: 12, gap: 6 },
  lg: { h: 48, fs: 15, px: 26, gap: 8 },
};

const spin = keyframes`
  to { transform: rotate(360deg); }
`;


const StyledButton = styled.button<{
  $variant: Variant;
  $size: Size;
  $active: boolean;
}>(({ theme, $variant, $size }) => {
  const t = theme as AppTheme;
  const s = sizeTokens[$size];

  const paletteMap = {
    primary: t.palette.primary,
    secondary: t.palette.secondary,
    danger: t.palette.error,
  };

  const c = paletteMap[$variant];

  return {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.h,
    padding: `0 ${s.px}px`,
    fontSize: s.fs,
    fontWeight: t.typography.fontWeightBold ?? 600,
    borderRadius: t.shape?.borderRadius ?? 6,
    border: "none",
    cursor: "pointer",
    transition: "background .2s ease, opacity .2s ease, transform .1s ease",
    background: c.main,
    color: c.contrastText ?? "#fff",

    "&:hover:not(:disabled):not(.is-active)": {
      background: c.light ?? c.main,
    },
    "&:active:not(:disabled), &.is-active": {
      transform: "scale(0.97)",
      background: c.dark ?? c.main,
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  };
});

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.2s;
  }
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 0;
`;


export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  active = false,
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  ...rest
}) => {
  return (
    <StyledButton
      {...rest}
      className={active ? "is-active" : rest.className}
      $variant={variant}
      $size={size}
      $active={!!active}
      disabled={loading || rest.disabled}
    >
      {loading ? (
        <Spinner aria-hidden="true" />
      ) : (
        <>
          {startIcon && <IconWrap>{startIcon}</IconWrap>}
          {children}
          {endIcon && <IconWrap>{endIcon}</IconWrap>}
        </>
      )}
    </StyledButton>
  );
};