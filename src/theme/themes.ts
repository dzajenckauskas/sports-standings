import { AppTheme } from "./types";

export const cleanMinimal: AppTheme = {
    name: "cleanMinimal",
    palette: {
        mode: "light",
        primary: {
            main: "#3d003e",
            contrastText: "#fff",
        },
        secondary: {
            main: "#0065f4",
            contrastText: "#fff",
        },
        error: {
            main: "#ff2335",
            contrastText: "#fff",
        },
        success: {
            main: "#00b94f",
            contrastText: "#fff",
        },
        warning: {
            main: "#ff5b00",
            contrastText: "#fff",
        },
        background: {
            default: "#f9fafb",
            paper: "#ffffff",
        },
        tableHeader: {
            main: "#f3f4f6",
            contrastText: "#0f172a"
        },
        tableRow: {
            main: "#fff",
            contrastText: "#0f172a"
        },
        text: {
            primary: "#0f172a",
            secondary: "#6b7280",
        },
        divider: {
            light: "#e5e7eb",
            dark: "#e5e7eb"
        },
    },
    typography: {
        fontFamily: `'Inter','Roboto',system-ui,-apple-system,"Segoe UI",Arial,sans-serif`,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontSize: "32px",
            fontWeight: 700
        },
        h2: {
            fontSize: "24px",
            fontWeight: 500
        }
    },
    shape: { borderRadius: 6 },
    shadows: { card: "0 6px 20px rgba(0,0,0,0.06)" },
    ui: {
        standings: {
            showWinLossIcons: false,
            columns: [
                { key: "games", label: "P" },
                { key: "wins", label: "W" },
                { key: "draws", label: "D" },
                { key: "losses", label: "L" },
                { key: "points", label: "Pts" },
            ],
        },
    },
};

export const sportyEnergetic: AppTheme = {
    name: "sportyEnergetic",
    palette: {
        mode: "dark",
        primary: {
            main: "#003026",
            contrastText: "#fff"
        },
        secondary: {
            main: "#ff5b00",
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
            main: "#f97316",
            contrastText: "#fff"
        },
        tableHeader: {
            main: "#003026",
            contrastText: "#fff"
        },
        tableRow: {
            main: "#00211b",
            contrastText: "#fff"
        },
        background: {
            default: "#00211b",
            paper: "#003026",
        },
        text: {
            primary: "#e6f3ee",
            secondary: "#93a3b5",
        },
        divider: {
            light: "#00211b",
            dark: "#003026"
        },
    },
    typography: {
        fontFamily: `'Montserrat','Bebas Neue',system-ui,-apple-system,"Segoe UI",Arial,sans-serif`,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontSize: "32px",
            fontWeight: 700
        },
        h2: {
            fontSize: "20px",
            fontWeight: 400
        }
    },
    shape: { borderRadius: 6 },
    shadows: { card: "0 10px 24px rgba(0,0,0,0.35)" },
    ui: {
        standings: {
            showWinLossIcons: false,
            columns: [
                { key: "wins", label: "W" },
                { key: "losses", label: "L" },
                { key: "draws", label: "D" },
                { key: "points", label: "Pts" },
            ],
        },
    },
};

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
