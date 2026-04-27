import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    fontFamily: {
        body: '"Roboto", var(--joy-fontFamily-fallback)',
        display: '"Poiret One", cursive',
    },
    colorSchemes: {
        light: {
            palette: {
                text: {
                    primary: '#252226',
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
                        color: '#252226',
                    }),
                    ...(ownerState.level === 'h2' && {
                        fontFamily: '"Poiret One", cursive',
                        color: '#252226',
                    }),
                    ...(ownerState.level === 'h3' && {
                        fontFamily: '"Poiret One", cursive',
                        color: '#252226',
                    }),
                    ...(ownerState.level === 'h4' && {
                        fontFamily: '"Poiret One", cursive',
                        color: '#252226',
                    }),
                }),
            },
        },
    },
});

export default theme;
