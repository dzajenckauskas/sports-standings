import React from "react";
import styled from "styled-components";
import { MatchType } from "../utils/MatchType";

type Props = {
    getParticipantName: (id: string) => string | undefined;
    matches?: MatchType[];
    maxHeight?: number | string; // optional override
};

const Title = styled.h3(({ theme }) => ({
    margin: "0 0 8px",
    fontSize: 16,
    fontWeight: theme.typography.fontWeightBold ?? 700,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
}));

const Wrapper = styled.div<{ $maxH?: string }>(({ theme, $maxH }) => ({
    maxHeight: $maxH ?? "300px",
    overflowY: "auto",
    // border: `1px solid ${theme.palette.divider}`,
    borderRadius: Math.max(2, theme.shape.borderRadius - 2),
    background: theme.palette.background.paper,
}));

const List = styled.ul({
    margin: 0,
    padding: 0,
    listStyle: "none",
});

const Item = styled.li(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,

    // // zebra
    // "&:nth-of-type(odd)": {
    //     background: theme.palette.background.default,
    // },

    // no divider on last row
    "&:last-of-type": {
        borderBottom: "none",
    },
}));

const Names = styled.div(({ theme }) => ({
    display: "flex",
    gap: 8,
    fontSize: 14,
    color: theme.palette.text.primary,
}));

const Name = styled.span({
    fontWeight: 500,
});

const Vs = styled.span(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const Score = styled.div(({ theme }) => ({
    minWidth: 50,
    display: "flex",
    justifyContent: "center",
    gap: 4,
    fontWeight: theme.typography.fontWeightBold ?? 700,
    fontSize: 14,
    color: theme.palette.text.primary,
}));

const EmptyState = styled.div(({ theme }) => ({
    fontSize: 14,
    padding: "8px 12px",
    color: theme.palette.text.secondary,
    fontStyle: "italic",
}));

const PastMatchesList: React.FC<Props> = ({ getParticipantName, matches, maxHeight }) => {
    const hasData = !!matches && matches.length > 0;

    return (
        <div>
            <Title>Past matches</Title>

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
                                <Names>
                                    <Name>{getParticipantName(m.homeParticipantId)}</Name>
                                    <Vs>vs</Vs>
                                    <Name>{getParticipantName(m.awayParticipantId)}</Name>
                                </Names>

                                <Score>
                                    <span>{m.homeParticipantScore}</span>
                                    <span>-</span>
                                    <span>{m.awayParticipantScore}</span>
                                </Score>
                            </Item>
                        ))}
                    </List>
                ) : (
                    <EmptyState>No matches yet.</EmptyState>
                )}
            </Wrapper>
        </div>
    );
};

export default PastMatchesList;