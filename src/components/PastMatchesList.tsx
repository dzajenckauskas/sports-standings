import React from "react";
import styled from "styled-components";
import { MatchType } from "../types/MatchType";
import { TType } from "../types/TType";
import { Typography } from "./shared/Typography";

type Props = {
    getParticipantName: (id: string) => string | undefined;
    matches?: MatchType[];
    maxHeight?: number | string; // optional override
    t: TType;
};

const Wrapper = styled.div<{ $maxH?: string }>(({ theme, $maxH }) => ({
    maxHeight: $maxH ?? "300px",
    overflowY: "auto",
    borderRadius: Math.max(2, theme.shape.borderRadius - 2),
    background: theme.palette.background.paper,
}));

const List = styled.ul({
    margin: 0,
    padding: 0,
    listStyle: "none",
});

const Item = styled.li(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr) auto",
    alignItems: "center",
    columnGap: 10,
    padding: "10px 12px",
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider.light}`,
    "&:last-of-type": { borderBottom: "none" },
    "@media (max-width: 380px)": { columnGap: 6 },
}));

const Name = styled.span(({ theme }) => ({
    display: "block",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.2,
    color: theme.palette.text.primary,
}));

const Vs = styled.span(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: 12,
    lineHeight: 1,
    padding: "0 2px",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
}));

const Score = styled.div(({ theme }) => ({
    display: "inline-flex",
    justifyContent: "center",
    gap: 4,
    fontWeight: theme.typography.fontWeightBold ?? 700,
    fontSize: 14,
    color: theme.palette.text.primary,
    lineHeight: 1,
    flexShrink: 0,
}));

const PastMatchesList: React.FC<Props> = ({ getParticipantName, matches, maxHeight, t }) => {
    const hasData = !!matches && matches.length > 0;

    return (
        <div>
            <Typography variant="h3" weight="bold">{t('matches.title')}</Typography>
            <Wrapper
                $maxH={
                    maxHeight
                        ? typeof maxHeight === "number"
                            ? `${maxHeight}px`
                            : String(maxHeight)
                        : undefined
                }
            >
                {hasData ? (
                    <List>
                        {matches!.map((m) => (
                            <Item key={m.id}>
                                <Name title={getParticipantName(m.homeParticipantId) || ""}>
                                    {getParticipantName(m.homeParticipantId)}
                                </Name>
                                <Vs>{t('matches.vs')}</Vs>
                                <Name title={getParticipantName(m.awayParticipantId) || ""}>
                                    {getParticipantName(m.awayParticipantId)}
                                </Name>
                                <Score>
                                    <span>{m.homeParticipantScore}</span>
                                    <span>-</span>
                                    <span>{m.awayParticipantScore}</span>
                                </Score>
                            </Item>
                        ))}
                    </List>
                ) : (
                    <Typography style={{ fontStyle: 'italic' }} variant="caption">
                        {t('matches.empty')}
                    </Typography>
                )}
            </Wrapper>
        </div>
    );
};

export default PastMatchesList;