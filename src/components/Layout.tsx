import { Box, Stack, Typography, Divider, type BoxProps } from '@mui/joy';
import React from 'react';
import { FONT_COLOR } from '../theme';

interface LayoutProps extends BoxProps {
    children: React.ReactNode;
    title?: string;
}

function Layout({ children, title, ...props }: LayoutProps) {
    return (
        <Box
            sx={{
                padding: '1rem',
                maxWidth: '1000px',
                margin: '0 auto',
                ...props.sx,
            }}
            {...props}
        >
            <Stack spacing={2}>
                {title && (
                    <>
                        <Typography level="h1">{title}</Typography>
                        <Divider sx={{ borderColor: FONT_COLOR }} />
                    </>
                )}
                {children}
            </Stack>
        </Box>
    );
}

export default Layout;
