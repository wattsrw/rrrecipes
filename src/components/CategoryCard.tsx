import { Card, CardContent, Typography, Stack } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

interface CategoryProps {
    icon?: React.ReactNode;
    title: string;
    link: string;
}

function CategoryCard({ icon, title, link }: CategoryProps) {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(link)}
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 'md',
                },
            }}
        >
            <CardContent>
                <Stack
                    spacing={1}
                    alignItems="center"
                    textAlign="center"
                    sx={{
                        flexDirection: { xs: 'row', sm: 'column' },
                        alignItems: { xs: 'center', sm: 'center' },
                        textAlign: { xs: 'center', sm: 'center' },
                        minHeight: { xs: 'auto', sm: 'auto' },
                    }}
                >
                    {icon && (
                        <div
                            style={{
                                fontSize: '2rem',
                                flexShrink: 0,
                                minWidth: '2rem',
                            }}
                        >
                            {icon}
                        </div>
                    )}
                    <Typography
                        level="body-lg"
                        fontWeight="lg"
                        sx={{
                            flex: { xs: 1, sm: 'initial' },
                            textAlign: { xs: 'center', sm: 'center' },
                        }}
                    >
                        {title}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default CategoryCard;
