import React from "react";
import styled, { keyframes, css } from "styled-components";

type Props = {
  children: React.ReactNode;
  title: string;
  primaryColor?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  stickyHeader?: boolean;
  scrollBody?: boolean;
  maxBodyHeight?: number | string;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;

  /** keep this for a fun quick spin on hover; default true */
  iconHoverSpin?: boolean;
};

const CardRoot = styled.div(({ theme }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius + 2,
  boxShadow: theme.shadows.card,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minWidth: 0,
}));

const CardHeader = styled.header<{ $sticky: boolean }>(({ theme, $sticky }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  padding: "20px 16px",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  position: $sticky ? ("sticky" as const) : ("relative" as const),
  top: $sticky ? 0 : "auto",
  zIndex: $sticky ? 2 : "auto",
}));

const HeaderLeft = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 8,
  minWidth: 0,
});

const Title = styled.h2(({ theme }) => ({
  margin: 0,
  fontSize: 24,
  fontWeight: theme.typography.fontWeightBold ?? 700,
  lineHeight: 1.1,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontFamily: theme.typography.fontFamily,
}));

const Actions = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexShrink: 0,
});

const CardBody = styled.div<{ $scrollBody: boolean; $maxBodyHeight: string }>(
  ({ $scrollBody, $maxBodyHeight, theme }) => ({
    padding: 16,
    ...($scrollBody
      ? {
        maxHeight: $maxBodyHeight,
        overflowY: "auto",
        background: theme.palette.background.paper,
      }
      : null),
  })
);

const CardFooter = styled.div(({ theme }) => ({
  padding: "12px 16px",
  borderTop: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.default,
}));

/* --- animations --- */
const slowSpin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const spinOnce = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

/** Always spins slowly; optional quick spin on hover */
const IconWrap = styled.span<{ $hoverSpin: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  /* gentle continuous spin (~24s per rotation) */
  animation: ${slowSpin} 24s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  ${({ $hoverSpin }) =>
    $hoverSpin &&
    css`
      &:hover,
      &:focus-visible {
        animation: ${spinOnce} 700ms ease;
      }
      @media (prefers-reduced-motion: reduce) {
        &:hover,
        &:focus-visible {
          animation: none;
        }
      }
    `}
`;

const Card: React.FC<Props> = ({
  children,
  title,
  icon,
  actions,
  stickyHeader = false,
  scrollBody = false,
  maxBodyHeight = "60vh",
  footer,
  className,
  style,
  iconHoverSpin = true,
}) => {
  return (
    <CardRoot className={className} style={style}>
      <CardHeader $sticky={stickyHeader}>
        <HeaderLeft>
          {icon && (
            <IconWrap
              $hoverSpin={iconHoverSpin}
              tabIndex={0}
              aria-hidden
            >
              {icon}
            </IconWrap>
          )}
          <Title title={title} style={{ paddingLeft: icon ? 6 : 0 }}>
            {title}
          </Title>
        </HeaderLeft>
        {actions && <Actions>{actions}</Actions>}
      </CardHeader>

      <CardBody
        $scrollBody={scrollBody}
        $maxBodyHeight={
          typeof maxBodyHeight === "number" ? `${maxBodyHeight}px` : String(maxBodyHeight)
        }
      >
        {children}
      </CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </CardRoot>
  );
};

export default Card;