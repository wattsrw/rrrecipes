import { extendTheme } from '@mui/joy/styles';

export const FONT_COLOR = '#2f2436';

const theme = extendTheme({
    fontFamily: {
        body: '"Roboto", var(--joy-fontFamily-fallback)',
        display: '"Poiret One", cursive',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: '#f0e6ff',
                    100: '#e4cef7',
                    200: '#d4b0f0',
                    300: '#bb7ae8',
                    400: '#9946d9',
                    500: '#611e8a',
                    600: '#531578',
                    700: '#460d67',
                    800: '#380555',
                    900: '#210033',
                },
                success: {
                    50: '#e0f7f4',
                    100: '#c2f0eb',
                    200: '#a0e8df',
                    300: '#5cd6c6',
                    400: '#25c4ad',
                    500: '#05a890',
                    600: '#048a75',
                    700: '#037361',
                    800: '#03574a',
                    900: '#022933',
                },
                text: {
                    primary: FONT_COLOR,
                },
            },
        },
    },
    components: {
        JoyTypography: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.level === 'h1' && {
                        fontFamily: '"Poiret One", cursive',
                        color: FONT_COLOR,
                    }),
                    ...(ownerState.level === 'h2' && {
                        fontFamily: '"Poiret One", cursive',
                        color: FONT_COLOR,
                    }),
                    ...(ownerState.level === 'h3' && {
                        fontFamily: '"Poiret One", cursive',
                        color: FONT_COLOR,
                    }),
                    ...(ownerState.level === 'h4' && {
                        fontFamily: '"Poiret One", cursive',
                        color: FONT_COLOR,
                    }),
                }),
            },
        },
    },
});

export default theme;
