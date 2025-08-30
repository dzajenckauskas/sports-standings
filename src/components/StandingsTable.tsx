import React from "react";
import styled from "styled-components";
import { ParticipantType } from "../utils/ParticipantType";
import { StandingsRowType } from "../utils/StandingsRowType";

type Props = {
    participants?: ParticipantType[];
    standings: StandingsRowType[];
    maxHeight?: number | string; // optional: override scroll container height
};

const Wrapper = styled.div(({ theme }) => ({
    maxHeight: 300,
    overflowY: "auto",
    // border: `1px solid ${theme.palette.divider}`,
    borderRadius: Math.max(2, theme.shape.borderRadius - 2),
    background: theme.palette.background.paper,
}));

const Table = styled.table({
    width: "100%",
    borderCollapse: "collapse",
});

const TheadCell = styled.th<{ align?: "left" | "center" }>(
    ({ theme, align = "left" }) => ({
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: "8px 12px",
        fontWeight: theme.typography.fontWeightBold ?? 600,
        fontSize: 13,
        color: theme.palette.text.secondary,
        textAlign: align,
        "@media (max-width: 400px)": {
            padding: "6px 8px",
            fontSize: 13,
        },
    })
);

const Row = styled.tr(({ theme }) => ({
    // // zebra
    // "&:nth-of-type(odd) td": {
    //     background: theme.palette.background.default,
    // },
    // remove border on last row
    "&:last-of-type td": {
        borderBottom: "none",
    },
}));

const Cell = styled.td<{ align?: "left" | "center"; emphasize?: boolean }>(
    ({ theme, align = "center", emphasize }) => ({
        padding: "8px 12px",
        fontSize: 14,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
        textAlign: align,
        fontWeight: emphasize ? (theme.typography.fontWeightBold ?? 700) : 400,
        minWidth: emphasize ? 56 : "auto",
        "@media (max-width: 400px)": {
            padding: "6px 8px",
            fontSize: 13,
        },
    })
);

const EmptyState = styled.div(({ theme }) => ({
    fontSize: 14,
    padding: "8px 12px",
    color: theme.palette.text.secondary,
    fontStyle: "italic",
}));

const Title = styled.h3(({ theme }) => ({
    margin: "0 0 8px",
    fontSize: 16,
    fontWeight: theme.typography.fontWeightBold ?? 700,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
}));

const StandingsTable: React.FC<Props> = ({
    participants,
    standings,
    maxHeight,
}) => {
    const hasData = Boolean(participants && participants.length > 0);

    return (
        <div>
            <Title>Standings</Title>

            <Wrapper style={maxHeight ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight } : undefined}>
                {hasData ? (
                    <Table>
                        <thead>
                            <tr>
                                <TheadCell align="left">Participant</TheadCell>
                                <TheadCell align="center">Games</TheadCell>
                                <TheadCell align="center">Wins</TheadCell>
                                <TheadCell align="center">Loses</TheadCell>
                                <TheadCell align="center">Draws</TheadCell>
                                <TheadCell align="center">Pts</TheadCell>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((r) => (
                                <Row key={r.id}>
                                    <Cell align="left">{r.name}</Cell>
                                    <Cell>{r.games}</Cell>
                                    <Cell>{r.wins}</Cell>
                                    <Cell>{r.losses}</Cell>
                                    <Cell>{r.draws}</Cell>
                                    <Cell emphasize>{r.points}</Cell>
                                </Row>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <EmptyState>No participants yet.</EmptyState>
                )}
            </Wrapper>
        </div>
    );
};

export default StandingsTable;