import { AppTheme } from "./types";


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
        fontWeightMedium: 600,
        fontWeightBold: 800,
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
        layout: {
            input: {
                bgColor: '#00211b',
                color: '#fff',
                borderColor: '#00211b',
                focusBorderColor: '#00211b'
            },
            select: {
                bgColor: '#00211b',
                color: '#fff',
                borderColor: '#00211b',
                focusBorderColor: '#00211b'
            },
            buttonsSize: 'sm',
            inputsSize: 'sm'
        },
        toggleButtons: {
            addParticipant: {
                variant: 'secondary'
            },
            addScore: {
                variant: 'secondary'
            },
        },
        standings: {
            showWinLossIcons: false,
            columns: [
                { key: "wins" },
                { key: "losses" },
                { key: "draws" },
                { key: "points" },
            ],
        },
    },
};