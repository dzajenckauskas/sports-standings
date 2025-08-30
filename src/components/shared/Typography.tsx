// components/shared/Typography.tsx
import React, { JSX } from "react";
import styled, { css } from "styled-components";

type Variant =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body1"
    | "body2"
    | "caption";

type Weight = "regular" | "medium" | "bold";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant?: Variant;
    weight?: Weight;
    color?: string;
    as?: React.ElementType; // override the DOM element if needed
    children: React.ReactNode;
}

const variantStyles = {
    h1: css(({ theme }) => ({
        fontSize: "2rem",
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: 1.2,
        margin: 0,
    })),
    h2: css(({ theme }) => ({
        margin: 0,
        fontSize: `${theme.typography.h2.fontSize} !important`,
        fontWeight: `${theme.typography.h2.fontWeight} !important`,
        lineHeight: 1.1,
        whiteSpace: "nowrap" as const,
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontFamily: theme.typography.fontFamily,
    })),
    h3: css(({ theme }) => ({
        fontSize: 14,
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.4,
        margin: '4px 0 8px 0',

    })),
    h4: css(({ theme }) => ({
        fontSize: "1.125rem",
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.4,
        margin: 0,
    })),
    body1: css(({ theme }) => ({
        fontSize: "1rem",
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.5,
    })),
    body2: css(({ theme }) => ({
        fontSize: "0.875rem",
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.5,
    })),
    caption: css(({ theme }) => ({
        fontSize: "0.75rem",
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.4,
    })),
};

const weightMap: Record<Weight, number> = {
    regular: 400,
    medium: 500,
    bold: 700,
};

const StyledTypography = styled.span<{
    $variant: Variant;
    $weight: Weight;
    $color?: string;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  ${({ $variant }) => variantStyles[$variant]};
  font-weight: ${({ $weight, theme }) =>
        weightMap[$weight] ?? theme.typography.fontWeightRegular};
  color: ${({ $color, theme }) => $color || theme.palette.text.primary};
`;

export const Typography: React.FC<TypographyProps> = ({
    variant = "body1",
    weight = "regular",
    color,
    as,
    children,
    ...rest
}) => {
    // Default DOM element based on variant
    const defaultElement: Record<Variant, keyof JSX.IntrinsicElements> = {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        body1: "p",
        body2: "p",
        caption: "span",
    };

    return (
        <StyledTypography
            as={as || defaultElement[variant]}
            $variant={variant}
            $weight={weight}
            $color={color}
            {...rest}
        >
            {children}
        </StyledTypography>
    );
};