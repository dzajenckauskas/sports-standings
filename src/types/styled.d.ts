import 'styled-components';
import type { AppTheme } from '../theme/ThemeTypes';

declare module 'styled-components' {
    // merge our AppTheme into styled-components DefaultTheme
    export interface DefaultTheme extends AppTheme { }
}