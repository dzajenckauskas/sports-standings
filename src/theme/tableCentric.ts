import { AppTheme } from "./types";


export const tableCentric: AppTheme = {
    name: "tableCentric",
    palette: {
        mode: "light",
        primary: {
            main: "#00682d",
            contrastText: "#fff"
        },
        secondary: {
            main: "#49005f",
            contrastText: "#fff"
        },
        error: {
            main: "#ff2335",
            contrastText: "#fff"
        },
        success: {
            main: "#00b94f",
            contrastText: "#fff"
        },
        warning: {
            main: "#ff5b00",
            contrastText: "#fff"
        },
        tableHeader: {
            main: "#f3f4f6",
            contrastText: "#0f172a"
        },
        tableRow: {
            main: "#ffffff",
            contrastText: "#0f172a"
        },
        background: {
            default: "#f9fafb",
            paper: "#ffffff",
        },
        text: {
            primary: "#0f172a",
            secondary: "#475569",
        },
        divider: {
            light: "#e2e8f0",
            dark: "#e2e8f0"
        },
    },
    typography: {
        fontFamily: `'Space Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,
        fontFamilyMono: `'Space Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontSize: "32px",
            fontWeight: 700
        },
        h2: {
            fontSize: "24px",
            fontWeight: 800
        }
    },
    shape: { borderRadius: 6 },
    shadows: { card: "0 4px 16px rgba(2,6,23,0.08)" },
    ui: {
        layout: {
            input: {
                bgColor: '#fff',
                color: '#0f172a',
                borderColor: '#0f172a',
                focusBorderColor: '#49005f'
            },
            select: {
                bgColor: '#fff',
                color: '#0f172a',
                borderColor: '#0f172a',
                focusBorderColor: '#49005f'
            },
            buttonsSize: 'md',
            inputsSize: 'md'
        },
        toggleButtons: {
            addParticipant: {
                variant: 'primary'
            },
            addScore: {
                variant: 'secondary'
            },
        },
        standings: {
            showWinLossIcons: true,
            columns: [
                { key: "games", label: "M" },
                { key: "wins", label: "W" },
                { key: "losses", label: "L" },
                { key: "points", label: "Pts" },
            ],
        },
    },
};
