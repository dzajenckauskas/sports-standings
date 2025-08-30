import { AppTheme } from "./types";

export const cleanMinimal: AppTheme = {
    name: "cleanMinimal",
    palette: {
        mode: "light",
        primary: {
            // main: "#3d003e",
            main: "#0065f4",
            contrastText: "#fff",
        },
        secondary: {
            main: "#3d003e",
            // main: "#0065f4",
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
        text: {
            primary: "#0f172a",
            secondary: "#6b7280",
        },
        divider: "#e5e7eb",
    },
    typography: {
        fontFamily: `'Inter','Roboto',system-ui,-apple-system,"Segoe UI",Arial,sans-serif`,
        fontWeightBold: 600,
    },
    shape: { borderRadius: 4 },
    shadows: { card: "0 6px 20px rgba(0,0,0,0.06)" },
};

export const sportyEnergetic: AppTheme = {
    name: "sportyEnergetic",
    palette: {
        mode: "dark",
        primary: { main: "#003026", contrastText: "#fff" },
        secondary: { main: "#ff5b00", contrastText: "#fff" },
        error: { main: "#ff2335", contrastText: "#fff" },
        success: { main: "#00b94f", contrastText: "#fff" },
        warning: { main: "#f97316", contrastText: "#fff" },
        background: {
            default: "#00211b",
            paper: "#003026",
        },
        text: {
            primary: "#e6f3ee",
            secondary: "#93a3b5",
        },
        divider: "#134e45",
    },
    typography: {
        fontFamily: `'Montserrat','Bebas Neue',system-ui,-apple-system,"Segoe UI",Arial,sans-serif`,
        fontWeightBold: 700,
    },
    shape: { borderRadius: 4 },
    shadows: { card: "0 10px 24px rgba(0,0,0,0.35)" },
};

export const tableCentric: AppTheme = {
    name: "tableCentric",
    palette: {
        mode: "light",
        primary: { main: "#00682d", contrastText: "#fff" },
        secondary: { main: "#49005f", contrastText: "#fff" },
        error: { main: "#ff2335", contrastText: "#fff" },
        success: { main: "#00b94f", contrastText: "#fff" },
        warning: { main: "#ff5b00", contrastText: "#fff" },
        background: {
            default: "#f9fafb",
            paper: "#ffffff",
        },
        text: {
            primary: "#0f172a",
            secondary: "#475569",
        },
        divider: "#e2e8f0",
    },
    typography: {
        fontFamily: `'Space Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,
        fontFamilyMono: `'Space Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,
        fontWeightBold: 700,
    },
    shape: { borderRadius: 4 },
    shadows: { card: "0 4px 16px rgba(2,6,23,0.08)" },
};