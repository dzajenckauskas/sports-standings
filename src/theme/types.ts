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
    background: {
        default: string;
        paper: string;
    };
    text: {
        primary: string;
        secondary: string;
        disabled?: string;
    };
    divider: string;
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
        showWinLossIcons?: boolean;
    };
}
