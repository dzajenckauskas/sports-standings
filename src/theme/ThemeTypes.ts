import { ButtonVariant, FieldSize } from "../types/CommonTypes";

export interface PaletteColor {
    main: string;
    light?: string;
    dark?: string;
    contrastText?: string;
}

export interface Palette {
    mode: "light" | "dark";
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    success: PaletteColor;
    tableHeader: PaletteColor;
    tableRow: PaletteColor;
    background: {
        default: string;
        paper: string;
    };
    formCard: {
        background: string;
    };
    input: {
        bgColor: string;
        color: string;
        borderColor: string;
        focusBorderColor: string;
    },
    select: {
        bgColor: string;
        color: string;
        borderColor: string;
        focusBorderColor: string;
    };
    text: {
        primary: string;
        secondary: string;
        disabled?: string;
    };
    divider: {
        light: string;
        dark: string;
    };
}

export interface AppTheme {
    name: string;
    palette: Palette;
    typography: {
        fontFamily: string;
        fontFamilyMono?: string;
        fontFamilyDisplay?: string;
        fontWeightRegular: number;
        fontWeightMedium: number;
        fontWeightBold: number;
        h1: {
            fontSize: string;
            fontWeight: number | string;
        };
        h2: {
            fontSize: string;
            fontWeight: number | string;
        };
    };
    shape: {
        borderRadius: number;
    };
    shadows: {
        card: string;
    };
    ui?: {
        layout: {
            showFormCardBackground: boolean;
            buttonsSize: FieldSize;
            inputsSize: FieldSize;
            toggleButtons: {
                addParticipant: {
                    variant: ButtonVariant;
                },
                addScore: {
                    variant: ButtonVariant;
                },
            },
        },
        standings?: {
            showWinLossIcons?: boolean;
            columns: Array<{
                key: "games" | "wins" | "losses" | "draws" | "points";
            }>;
        };
    };
}
