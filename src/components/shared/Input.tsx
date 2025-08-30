// components/shared/Input.tsx
import React from "react";
import styled from "styled-components";
import type { AppTheme } from "../../theme/types";
import ErrorMessage from "./ErrorMessage";
import { FieldSize, Variant, heights } from "../../utils/CommonTypes";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: string;
  label?: string;
  variant?: Variant;        // "light" | "dark"
  fieldSize?: FieldSize;    // "sm" | "md" | "lg"
  placeHolder?: string;     // alias for native placeholder
}


const sizeToken = (size: FieldSize) => {
  const h = heights[size];
  const fs = size === "sm" ? 13 : size === "lg" ? 15 : 14;
  return { h, fs };
};

const getColors = (t: AppTheme, v: Variant, hasError: boolean) => {
  const primary = t.palette.primary.main;
  const error = t.palette.error.main;

  if (v === "dark") {
    // Use theme dark palette when available; otherwise fall back to the previous dark values
    const isDarkMode = t.palette.mode === "dark";
    const bg = isDarkMode ? t.palette.background.paper : "#1a2d23";
    const text = isDarkMode ? t.palette.text.primary : "#ffffff";
    const border = isDarkMode ? t.palette.divider : "rgba(255,255,255,0.2)";
    return {
      bg,
      text,
      border,
      focusBorder: hasError ? error : primary,
      focusRing: hasError ? error : primary,
      error,
    };
  }

  // light
  return {
    bg: t.palette.background.paper,
    text: t.palette.text.primary,
    border: t.palette.divider,
    focusBorder: hasError ? error : primary,
    focusRing: hasError ? error : primary,
    error,
  };
};


const Container = styled.div({
  width: "100%",
});

const Label = styled.label({
  display: "block",
  marginBottom: 4,
  fontSize: 13,
  fontWeight: 600,
});

const StyledInput = styled.input<{
  $h: number;
  $fs: number;
  $variant: Variant;
  $hasError: boolean;
}>(({ theme, $h, $fs, $variant, $hasError }) => {
  const t = theme as AppTheme;
  const c = getColors(t, $variant, $hasError);

  return {
    width: "100%",
    boxSizing: "border-box",
    height: $h,
    fontSize: $fs,
    borderRadius: t.shape?.borderRadius,
    padding: "0 10px",
    outline: "none",
    border: `1px solid ${$hasError ? c.error : c.border}`,
    background: c.bg,
    color: c.text,
    transition:
      "border-color .2s ease, box-shadow .2s ease, background .2s ease, transform .1s ease",

    "::placeholder": { opacity: 0.7 },

    "&:hover:not(:disabled)": {
      borderColor: $hasError ? c.error : c.focusBorder,
    },

    "&:focus": {
      borderColor: $hasError ? c.error : c.focusBorder,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${c.focusRing} 30%, transparent)`,
    },

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:active:not(:disabled)": {
      transform: "scale(0.99)",
    },

    // also reflect ARIA invalid if libraries set it
    '&[aria-invalid="true"]': {
      borderColor: c.error,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${c.error} 30%, transparent)`,
    },
  };
});


export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      label,
      variant = "light",
      fieldSize = "md",
      placeHolder, // alias
      placeholder, // native
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { h, fs } = sizeToken(fieldSize);
    const finalPlaceholder = placeholder ?? placeHolder;

    return (
      <Container className={className} style={style}>
        {label && <Label>{label}</Label>}

        <StyledInput
          ref={ref}
          $h={h}
          $fs={fs}
          $variant={variant}
          $hasError={!!error}
          placeholder={finalPlaceholder}
          aria-invalid={!!error}
          {...rest}
        />

        {error && (
          <div style={{ marginTop: 4 }}>
            <ErrorMessage error={error} />
          </div>
        )}
      </Container>
    );
  }
);

Input.displayName = "Input";