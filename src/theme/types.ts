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
    warning: PaletteColor;
    tableHeader: PaletteColor;
    tableRow: PaletteColor;
    background: {
        default: string;
        paper: string;
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
    };
    shape: {
        borderRadius: number;
    };
    shadows: {
        card: string;
    };
    ui?: {
        standings?: {
            showWinLossIcons?: boolean;
            columns: Array<{
                key: "games" | "wins" | "losses" | "draws" | "points";
                label: string; // e.g., P, M, W, L, D, Pts
            }>;
        };
    };
}
