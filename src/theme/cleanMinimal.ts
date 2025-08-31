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
        background: {
            default: "#efefef",
            paper: "#ffffff",
        },
        formCard: {
            background: '#f3f4f6',
        },
        input: {
            bgColor: '#fff',
            color: '#0f172a',
            borderColor: '#afafafff',
            focusBorderColor: '#3d003e'
        },
        select: {
            bgColor: '#eaeaeaff',
            color: '#0f172a',
            borderColor: '#afafafff',
            focusBorderColor: '#3d003e'
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
        fontWeightMedium: 600,
        fontWeightBold: 800,
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
        layout: {
            buttonsSize: 'sm',
            inputsSize: 'sm',
            toggleButtons: {
                addParticipant: {
                    variant: 'primary'
                },
                addScore: {
                    variant: 'primary'
                },
            },
        },

        standings: {
            showWinLossIcons: false,
            columns: [
                { key: "games" },
                { key: "wins" },
                { key: "draws" },
                { key: "losses" },
                { key: "points" },
            ],
        },
    },
};