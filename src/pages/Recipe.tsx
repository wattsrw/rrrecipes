import { Grid, Typography, Box, Button, Drawer, List, ListItem } from '@mui/joy';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { formatTitleFromSlug } from '../utils/Util';
import IngredientList, { type IngredientSection } from '../components/IngredientList';
import { parseRecipeMarkdown, type DirectionItem } from '../utils/MarkdownParser';

function Recipe() {
    const { category, recipe } = useParams<{ category: string; recipe: string }>();
    const title = formatTitleFromSlug(recipe);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [ingredients, setIngredients] = useState<IngredientSection[]>([]);
    const [directions, setDirections] = useState<DirectionItem[]>([]);

    // Load and read the markdown file
    useEffect(() => {
        const loadMarkdownFile = async () => {
            try {
                // Construct the path to the markdown file
                const mdPath = `/rrrecipes/recipes/${category}/${recipe}.md`;

                // Fetch the markdown file
                const response = await fetch(mdPath);
                if (response.ok) {
                    const content = await response.text();
                    const parsed = parseRecipeMarkdown(content);
                    setIngredients(parsed.ingredients);
                    setDirections(parsed.directions);
                } else {
                    console.warn(`Markdown file not found: ${mdPath}`);
                }
            } catch (error) {
                console.error('Error loading markdown file:', error);
            }
        };

        if (category && recipe) {
            loadMarkdownFile();
        }
    }, [category, recipe]);

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
                    <IngredientList ingredients={ingredients} />
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
                            height: 'fit-content',
                        }}
                    >
                        <IngredientList ingredients={ingredients} />
                    </Box>
                </Grid>

                {/* Directions Section */}
                <Grid xs={12} md={6}>
                    <Box sx={{
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '2rem',
                    }}
                    >
                        <Typography level="h2" sx={{ marginBottom: '1rem' }}>
                            Directions
                        </Typography>
                        <List component="ol" marker="decimal" sx={{ paddingLeft: '1.5rem' }}>
                            {directions.map((dir, index) => (
                                <ListItem key={index}>
                                    {dir.step}
                                    {dir.notes && (
                                        <List component="ul" marker="disc" sx={{ paddingLeft: '1.5rem', paddingTop: '0', paddingBottom: '0' }}>
                                            {dir.notes.map((note, noteIndex) => (
                                                <ListItem key={noteIndex}>
                                                    {note}
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Recipe;
