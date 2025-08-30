import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  title: string;
  primaryColor?: string;         // optional override for header accent
  icon?: React.ReactNode;
  actions?: React.ReactNode;     // right-side header actions
  stickyHeader?: boolean;        // keep header fixed when body scrolls
  scrollBody?: boolean;          // scroll only body content
  maxBodyHeight?: number | string; // used when scrollBody is true
  footer?: React.ReactNode;      // optional footer
  className?: string;
  style?: React.CSSProperties;
};

/* ------------ styled parts ------------ */

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

/** Accent is resolved in React and passed as $accent so we can make a gradient. */
const CardHeader = styled.header<{
  $sticky: boolean;
}>(({ theme, $sticky }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  padding: "20px 16px",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  position: $sticky ? "sticky" as const : "relative" as const,
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
        // paddingRight: 6, // avoid scrollbar overlap
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
}) => {
  return (
    <CardRoot className={className} style={style}>
      <CardHeader
        $sticky={stickyHeader}
      >
        <HeaderLeft>
          {icon && <span style={{ paddingRight: 6, position: 'relative', top: 2 }}>{icon}</span>}
          <Title title={title}>{title}</Title>
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