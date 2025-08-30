import React from "react";
import styled from "styled-components";
import type { AppTheme } from "../../theme/types";
import { FieldSize, Variant, heights } from "../../types/CommonTypes";

interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    label?: string;
    error?: string;
    variant?: Variant;       // "light" | "dark"
    fieldSize?: FieldSize;   // "sm" | "md" | "lg"
    placeholder?: string;    // renders as disabled first option
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
        const isDarkMode = t.palette.mode === "dark";
        const bg = isDarkMode ? t.palette.background.paper : "#1a2d23";
        const text = isDarkMode ? t.palette.text.primary : "#fff";
        const border = isDarkMode ? t.palette.divider.dark : "rgba(255,255,255,0.2)";
        return {
            bg,
            text,
            border,
            focusBorder: hasError ? error : primary,
            focusRing: hasError ? error : primary,
            error,
        };
    }

    return {
        bg: t.ui?.layout.select.bgColor,
        text: t.ui?.layout.select.color,
        border: t.ui?.layout.select.borderColor,
        focusBorder: hasError ? error : t.ui?.layout.select.focusBorderColor,
        focusRing: hasError ? error : t.ui?.layout.select.focusBorderColor,
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

const Wrapper = styled.div({
    position: "relative",
    width: "100%",
});

const StyledSelect = styled.select<{
    $h: number;
    $fs: number;
    $variant: Variant;
    $hasError: boolean;
}>(({ theme, $h, $fs, $variant, $hasError }) => {
    const t = theme as AppTheme;
    const c = getColors(t, $variant, $hasError);

    return {
        width: "100%",
        height: $h,
        fontSize: $fs,
        borderRadius: t.shape?.borderRadius,
        border: `1px solid ${$hasError ? c.error : c.border}`,
        padding: "0 32px 0 10px",
        background: c.bg,
        color: c.text,
        outline: "none",
        cursor: 'pointer',
        appearance: "none",
        transition: "border-color .2s ease, box-shadow .2s ease, transform .1s ease",

        "&:hover:not(:disabled)": {
            borderColor: $hasError ? c.error : c.focusBorder,
        },

        "&:focus": {
            borderColor: $hasError ? c.error : c.focusBorder,
            // boxShadow: `0 0 0 3px color-mix(in srgb, ${c.focusRing} 30%, transparent)`,
        },

        "&:disabled": {
            opacity: 0.6,
            cursor: "not-allowed",
        },

        "&:active": {
            transform: "scale(0.99)",
        },

        '&[aria-invalid="true"]': {
            borderColor: c.error,
            boxShadow: `0 0 0 3px color-mix(in srgb, ${c.error} 30%, transparent)`,
        },
    };
});

const Arrow = styled.svg(({ theme }) => {
    return {
        position: "absolute",
        right: 6,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        color: theme?.ui?.layout.select?.borderColor,
        transition: "transform 0.2s ease",

        [`${StyledSelect}:focus + &`]: {
            transform: "translateY(-50%) rotate(180deg)",
        },
    }
});


export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            error,
            variant = "light",
            fieldSize = "md",
            placeholder,
            children,
            ...rest
        },
        ref
    ) => {
        const { h, fs } = sizeToken(fieldSize);

        return (
            <Container>
                {label && <Label>{label}</Label>}

                <Wrapper>
                    <StyledSelect
                        ref={ref}
                        $h={h}
                        $fs={fs}
                        $variant={variant}
                        $hasError={!!error}
                        aria-invalid={!!error}
                        {...rest}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {children}
                    </StyledSelect>

                    <Arrow
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0l-4.25-4.53a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </Arrow>
                </Wrapper>

                {error && (
                    <div style={{ marginTop: 4, color: "#dc2626", fontSize: 12 }}>
                        {error}
                    </div>
                )}
            </Container>
        );
    }
);

Select.displayName = "Select";