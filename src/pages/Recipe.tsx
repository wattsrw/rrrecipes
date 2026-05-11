import { Grid, Typography, Box, Button, Drawer, List, ListItem } from '@mui/joy';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { formatTitleFromSlug, highlightIngredientsInText, renderBoldText } from '../utils/Util';
import IngredientList, { type IngredientSection } from '../components/IngredientList';
import { parseRecipeMarkdown, type DirectionItem } from '../utils/MarkdownParser';

function Recipe() {
    const { category, recipe } = useParams<{ category: string; recipe: string }>();
    const title = formatTitleFromSlug(recipe);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [ingredients, setIngredients] = useState<IngredientSection[]>([]);
    const [directions, setDirections] = useState<DirectionItem[]>([]);
    const [waitTimes, setWaitTimes] = useState<string[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [selectedStep, setSelectedStep] = useState<number | null>(null);

    // Extract all ingredient names for highlighting
    const ingredientNames = useMemo(() => {
        return ingredients.flatMap(section => section.items.map(item => item.ingredient));
    }, [ingredients]);

    // Handle ingredient click from directions
    const handleIngredientClick = (ingredientName: string) => {
        setSelectedIngredient(ingredientName);
        // Only open drawer on mobile (viewport < md breakpoint of 900px)
        if (window.innerWidth < 900) {
            setDrawerOpen(true);
        }
    };

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
                    setWaitTimes(parsed.waitTimes);
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
                    <IngredientList ingredients={ingredients} selectedIngredient={selectedIngredient} />
                </Box>
            </Drawer>

            {/* Wait Times Section */}
            {waitTimes.length > 0 && (
                <Box
                    sx={{
                        backgroundColor: 'success.50',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                    }}
                >
                    <Typography level="h3" sx={{ marginBottom: '0.75rem' }}>
                        Wait Times
                    </Typography>
                    <List marker="disc" sx={{ paddingLeft: '1.5rem' }}>
                        {waitTimes.map((waitTime, index) => (
                            <ListItem key={index}>{renderBoldText(waitTime)}</ListItem>
                        ))}
                    </List>
                </Box>
            )}

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
                        <IngredientList ingredients={ingredients} selectedIngredient={selectedIngredient} />
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
                                <ListItem
                                    key={index}
                                    onClick={() => setSelectedStep(index)}
                                    sx={selectedStep === index ? {
                                        backgroundColor: 'success.50',
                                        borderLeft: '3px solid',
                                        borderColor: 'success.500',
                                        color: 'success.500',
                                        cursor: 'pointer',
                                    } : { cursor: 'pointer' }}
                                >
                                    {highlightIngredientsInText(dir.step, ingredientNames, handleIngredientClick)}
                                    {dir.notes && (
                                        <List component="ul" marker="disc" sx={{ paddingLeft: '1.5rem', paddingTop: '0', paddingBottom: '0' }}>
                                            {dir.notes.map((note, noteIndex) => (
                                                <ListItem
                                                    key={noteIndex}
                                                    sx={selectedStep === index ? {
                                                        backgroundColor: 'success.50',
                                                        color: 'success.500',
                                                    } : {}}
                                                >
                                                    {highlightIngredientsInText(note, ingredientNames, handleIngredientClick)}
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
