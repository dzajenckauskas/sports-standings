import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const CardBody = styled.div(({ theme }) => ({
  background: theme.palette.formCard.background,
  borderRadius: theme.shape.borderRadius + 2,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minWidth: 0,
  padding: theme.ui?.layout.showFormCardBackground ? '6px 12px 12px 12px' : 0,

}));


const FormCard: React.FC<Props> = ({
  children,
}) => {

  return (
    <CardBody>
      {children}
    </CardBody>
  );
};

export default FormCard;