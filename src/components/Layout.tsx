import { Box, Stack, Typography, Divider, IconButton, type BoxProps } from '@mui/joy';
import React from 'react';
import { FONT_COLOR } from '../theme';
import EditIcon from '@mui/icons-material/Edit';

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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography level="h1">{title}</Typography>
                            <IconButton
                                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSewSbW9Uw0T5zM-XEZ4GS_j_r24Vsmds1SXboTBb6jE1siZHw/viewform?usp=header', '_blank')}
                                variant="plain"
                                color="primary"
                            >
                                <EditIcon />
                            </IconButton>
                        </Box>
                        <Divider sx={{ borderColor: FONT_COLOR }} />
                    </>
                )}
                {children}
            </Stack>
        </Box>
    );
}

export default Layout;
