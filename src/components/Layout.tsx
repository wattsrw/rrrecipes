import { Box, Stack, Typography, Divider, IconButton, Breadcrumbs, Link, type BoxProps } from '@mui/joy';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FONT_COLOR } from '../theme';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import { formatTitleFromSlug } from '../utils/Util';

interface LayoutProps extends BoxProps {
    children: React.ReactNode;
    title?: string;
}

function Layout({ children, title, ...props }: LayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();

    // Build breadcrumbs based on current route
    const buildBreadcrumbs = () => {
        const path = location.pathname.replace('#', '');
        const segments = path.split('/').filter(Boolean);

        if (segments.length === 0) {
            return null; // No breadcrumbs on home page
        }

        const breadcrumbs = [
            { label: 'Home', path: '/' }
        ];

        if (segments.length >= 1) {
            const category = segments[0];
            breadcrumbs.push({
                label: formatTitleFromSlug(category),
                path: `/${category}`
            });
        }

        if (segments.length >= 2) {
            const recipe = segments[1];
            breadcrumbs.push({
                label: formatTitleFromSlug(recipe),
                path: `/${segments[0]}/${recipe}`
            });
        }

        return breadcrumbs;
    };

    const breadcrumbs = buildBreadcrumbs();

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
                {breadcrumbs && (
                    <Breadcrumbs
                        separator="/"
                        size="sm"
                        slotProps={{
                            root: {
                                style: { margin: 0, padding: 0 }
                            }
                        }}
                    >
                        {breadcrumbs.map((crumb, index) => (
                            <Link
                                key={index}
                                onClick={() => navigate(crumb.path)}
                                component="button"
                                color={index === breadcrumbs.length - 1 ? 'neutral' : 'primary'}
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: index === breadcrumbs.length - 1 ? 'none' : 'underline',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {index === 0 ? (
                                    <HomeIcon />
                                ) : (
                                    crumb.label
                                )}
                            </Link>
                        ))}
                    </Breadcrumbs>
                )}
                {children}
            </Stack>
        </Box>
    );
}

export default Layout;
