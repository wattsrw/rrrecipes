import { Grid, Typography, Box, Button, Drawer, List, ListItem } from '@mui/joy';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { formatTitleFromSlug } from '../utils/Util';
import IngredientList from '../components/IngredientList';

function Recipe() {
    const { recipe } = useParams<{ recipe: string }>();
    const title = formatTitleFromSlug(recipe);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Layout title={title}>
            {/* Mobile Ingredients Button */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1rem', backgroundColor: 'background.body', borderTop: '1px solid', borderColor: 'divider', zIndex: 100 }}>
                <Button
                    fullWidth
                    onClick={() => setDrawerOpen(true)}
                    variant="solid"
                    color="primary"
                >
                    View Ingredients
                </Button>
            </Box>



            {/* Ingredients Drawer */}
            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box
                    sx={{
                        backgroundColor: 'primary.50',
                        padding: '1.5rem',
                        borderRadius: '8px 8px 0 0',
                        height: '100%',
                        maxHeight: '70vh',
                        overflow: 'auto',
                    }}
                >
                    <Typography level="h2" sx={{ marginBottom: '1rem' }}>
                        Ingredients
                    </Typography>
                    <List sx={{ paddingLeft: '1.5rem' }}>
                        <ListItem>2 eggs</ListItem>
                        <ListItem>1 cup milk</ListItem>
                        <ListItem>2 tbsp butter</ListItem>
                        <ListItem>Salt and pepper to taste</ListItem>
                        <ListItem>Fresh herbs (optional)</ListItem>
                    </List>
                </Box>
            </Drawer>

            <Grid container spacing={2}>
                {/* Ingredients Section - Hidden on mobile */}
                <Grid xs={12} md={6} sx={{ display: { xs: 'none', md: 'grid' } }}>
                    <Box
                        sx={{
                            backgroundColor: 'primary.50',
                            padding: '1rem',
                            borderRadius: '8px',
                        }}
                    >
                        <Typography level="h2" sx={{ marginBottom: '1rem' }}>
                            Ingredients
                        </Typography>
                        <List sx={{ paddingLeft: '1.5rem' }}>
                            <ListItem>2 eggs</ListItem>
                            <ListItem>1 cup milk</ListItem>
                            <ListItem>2 tbsp butter</ListItem>
                            <ListItem>Salt and pepper to taste</ListItem>
                            <ListItem>Fresh herbs (optional)</ListItem>
                        </List>
                    </Box>
                </Grid>

                {/* Directions Section */}
                <Grid xs={12} md={6}>
                    <Box sx={{
                        padding: '1rem',
                        borderRadius: '8px',
                    }}
                    >
                        <Typography level="h2" sx={{ marginBottom: '1rem' }}>
                            Directions
                        </Typography>
                        <List component="ol" marker="decimal" sx={{ paddingLeft: '1.5rem' }}>
                            <ListItem>Heat butter in a non-stick pan over medium heat.</ListItem>
                            <ListItem>Whisk eggs with milk and seasonings in a bowl.</ListItem>
                            <ListItem>Pour the egg mixture into the pan.</ListItem>
                            <ListItem>Stir gently until eggs are cooked through, about 3-4 minutes.</ListItem>
                            <ListItem>Serve immediately and garnish with fresh herbs if desired.</ListItem>
                            <ListItem>Heat butter in a non-stick pan over medium heat.</ListItem>
                            <ListItem>Whisk eggs with milk and seasonings in a bowl.</ListItem>
                            <ListItem>Pour the egg mixture into the pan.</ListItem>
                            <ListItem>Stir gently until eggs are cooked through, about 3-4 minutes.</ListItem>
                            <ListItem>Serve immediately and garnish with fresh herbs if desired.</ListItem>
                            <ListItem>Heat butter in a non-stick pan over medium heat.</ListItem>
                            <ListItem>Whisk eggs with milk and seasonings in a bowl.</ListItem>
                            <ListItem>Pour the egg mixture into the pan.</ListItem>
                            <ListItem>Stir gently until eggs are cooked through, about 3-4 minutes.</ListItem>
                            <ListItem>Serve immediately and garnish with fresh herbs if desired.</ListItem>
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Recipe;
