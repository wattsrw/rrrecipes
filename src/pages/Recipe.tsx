import { Grid, Typography, Box, Stack } from '@mui/joy';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { formatTitleFromSlug } from '../utils/Util';

function Recipe() {
    const { recipe } = useParams<{ recipe: string }>();
    const title = formatTitleFromSlug(recipe);

    return (
        <Layout title={title}>
            {/* Ingredients Section */}
            <Box
                sx={{
                    backgroundColor: 'primary.50',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    borderRadius: '8px',
                }}
            >
                <Typography level="h2" sx={{ marginBottom: '1rem' }}>
                    Ingredients
                </Typography>
                <Stack component="ul" spacing={1} sx={{ paddingLeft: '1.5rem' }}>
                    <Typography component="li">2 eggs</Typography>
                    <Typography component="li">1 cup milk</Typography>
                    <Typography component="li">2 tbsp butter</Typography>
                    <Typography component="li">Salt and pepper to taste</Typography>
                    <Typography component="li">Fresh herbs (optional)</Typography>
                </Stack>
            </Box>

            {/* Instructions Section */}
            <Box>
                <Typography level="h2" sx={{ marginBottom: '1rem' }}>
                    Directions
                </Typography>
                <Stack component="ol" spacing={1} sx={{ paddingLeft: '1.5rem' }}>
                    <Typography component="li">Heat butter in a non-stick pan over medium heat.</Typography>
                    <Typography component="li">Whisk eggs with milk and seasonings in a bowl.</Typography>
                    <Typography component="li">Pour the egg mixture into the pan.</Typography>
                    <Typography component="li">Stir gently until eggs are cooked through, about 3-4 minutes.</Typography>
                    <Typography component="li">Serve immediately and garnish with fresh herbs if desired.</Typography>
                </Stack>
            </Box>
        </Layout >
    );
}

export default Recipe;
