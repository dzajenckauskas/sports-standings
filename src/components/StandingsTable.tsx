import React from "react";
import styled, { useTheme } from "styled-components";
import { TType } from "../types/TType";
import { ParticipantType } from "../types/ParticipantType";
import { StandingsRowType } from "../types/StandingsRowType";
import { CheckIcon } from "./shared/icons/CheckIcon";
import { CrossIcon } from "./shared/icons/CrossIcon";
import { Typography } from "./shared/Typography";

type Props = {
    participants?: ParticipantType[];
    standings: StandingsRowType[];
    maxHeight?: number | string;
    t: TType;
};

const Wrapper = styled.div(({ theme }) => ({
    maxHeight: 300,
    overflowY: "auto",
    background: theme.palette.background.paper,
}));

const Table = styled.table({
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed", // <-- important for ellipsis
});

const TheadCell = styled.th<{ $align?: "left" | "center" }>(({ theme, $align = "left" }) => ({
    position: "sticky",
    top: 0,
    zIndex: 1,
    background: theme.palette.tableHeader.main,
    borderBottom: `1px solid ${theme.palette.divider.dark}`,
    padding: "8px 12px",
    fontWeight: theme.typography.fontWeightBold ?? 600,
    fontSize: 13,
    color: theme.palette.tableHeader.contrastText,
    textAlign: $align,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const Row = styled.tr(({ theme }) => ({
    "&:last-of-type td": { borderBottom: "none" },
}));

const Cell = styled.td<{ $align?: "left" | "center"; $emphasize?: boolean }>(
    ({ theme, $align = "center", $emphasize }) => ({
        padding: "8px 12px",
        fontSize: 14,
        borderBottom: `1px solid ${theme.palette.divider.dark}`,
        background: theme.palette.tableRow.main,
        color: theme.palette.tableRow.contrastText,
        textAlign: $align,
        fontWeight: $emphasize ? (theme.typography.fontWeightBold ?? 700) : 400,
        minWidth: $emphasize ? 56 : "auto",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    })
);

// Dedicated wrapper to ensure ellipsis on the name column
const NameText = styled.span({
    display: "block",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
});

const StatWithIcon = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: ${({ $color }) => $color};
`;

const IconSlot = styled.span`
  display: inline-flex;
  line-height: 0;
`;

// Fixed widths for numeric columns so the name column can shrink with ellipsis
const ColGroup: React.FC<{ colsCount: number }> = ({ colsCount }) => {
    const fixed = Array.from({ length: colsCount - 1 }, (_, i) => {
        const cls = i === colsCount - 2 ? "col-points" : "col-stat";
        return <col key={`c-${i}`} className={cls} />;
    });

    return (
        <colgroup>
            <col className="col-name" /> {/* flexible team name column */}
            {fixed}
            <style>{`
        .col-name {
          width: auto;
        }
        .col-stat {
          width: 38px;
          max-width: 36px;
        }
        .col-points {
          width: 46px;
          max-width: 44px;
        }

        /* Larger widths for tablets / desktop */
        @media (min-width: 600px) {
          .col-stat {
            width: 38px;
            max-width: 48px;
          }
          .col-points {
            width: 50px;
            max-width: 60px;
          }
        }
        @media (min-width: 1024px) {
          .col-stat {
            width: 52px;
            max-width: 56px;
          }
          .col-points {
            width: 68px;
            max-width: 72px;
          }
        }

        td.col-stat, th.col-stat,
        td.col-points, th.col-points {
          text-align: center;
          white-space: nowrap;
        }
      `}</style>
        </colgroup>
    );
};

const StandingsTable: React.FC<Props> = ({ participants, standings, maxHeight, t }) => {
    const hasData = Boolean(participants && participants.length > 0);
    const theme = useTheme();
    const showIcons = (theme as any)?.ui?.standings?.showWinLossIcons ?? true;

    // Column specification
    type ColKey = "games" | "wins" | "losses" | "draws" | "points";
    type ColSpec = { key: ColKey; label: string };
    const defaultCols: ColSpec[] = [
        { key: "games", label: t("standings.columns.games") },
        { key: "wins", label: t("standings.columns.wins") },
        { key: "losses", label: t("standings.columns.losses") },
        { key: "points", label: t("standings.columns.points") },
    ];
    const themeCols = (theme as any)?.ui?.standings?.columns as ColSpec[] | undefined;
    const colSpec: ColSpec[] = Array.isArray(themeCols) ? themeCols : defaultCols;

    const success = (theme.palette as any).success?.main ?? "#16a34a";
    const error = (theme.palette as any).error?.main ?? "#dc2626";

    return (
        <div>
            <Typography variant="h3" weight="bold">
                {t("standings.title")}
            </Typography>

            <Wrapper
                style={
                    maxHeight
                        ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
                        : undefined
                }
            >
                {hasData ? (
                    <Table>
                        <ColGroup colsCount={1 + colSpec.length} />

                        <thead>
                            <tr>
                                <TheadCell $align="left">{t("standings.participant")}</TheadCell>
                                {colSpec.map((c) => (
                                    <TheadCell key={c.key} $align="center">
                                        {t(`standings.columns.${c.key}`)}
                                    </TheadCell>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {standings.map((r) => {
                                const winsZero = r.wins === 0;
                                const lossesZero = r.losses === 0;

                                return (
                                    <Row key={r.id}>
                                        <Cell $align="left">
                                            <NameText title={r.name}>{r.name}</NameText>
                                        </Cell>

                                        {colSpec.map((c) => {
                                            switch (c.key) {
                                                case "games":
                                                    return <Cell key={c.key}>{r.games}</Cell>;
                                                case "wins":
                                                    return (
                                                        <Cell key={c.key}>
                                                            <StatWithIcon $color={success}>
                                                                <span style={{ color: theme.palette.text.primary }}>{r.wins}</span>
                                                                {showIcons && !winsZero && (
                                                                    <IconSlot>
                                                                        <CheckIcon />
                                                                    </IconSlot>
                                                                )}
                                                            </StatWithIcon>
                                                        </Cell>
                                                    );
                                                case "losses":
                                                    return (
                                                        <Cell key={c.key}>
                                                            <StatWithIcon $color={error}>
                                                                <span style={{ color: theme.palette.text.primary }}>{r.losses}</span>
                                                                {showIcons && !lossesZero && (
                                                                    <IconSlot>
                                                                        <CrossIcon />
                                                                    </IconSlot>
                                                                )}
                                                            </StatWithIcon>
                                                        </Cell>
                                                    );
                                                case "draws":
                                                    return <Cell key={c.key}>{r.draws}</Cell>;
                                                case "points":
                                                    return <Cell key={c.key} $emphasize>{r.points}</Cell>;
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </Row>
                                );
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <Typography style={{ fontStyle: "italic" }} variant="caption">
                        {t("standings.empty")}
                    </Typography>
                )}
            </Wrapper>
        </div>
    );
};

export default StandingsTable;