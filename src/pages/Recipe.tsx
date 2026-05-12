import { Grid, Typography, Box, Button, Drawer, List, ListItem } from '@mui/joy';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Layout from '../components/Layout';
import { formatTitleFromSlug, highlightIngredientsInText, renderBoldText } from '../utils/Util';
import IngredientList, { type IngredientSection } from '../components/IngredientList';
import { parseRecipeMarkdown, type DirectionItem, type ThingToTry } from '../utils/MarkdownParser';

function Recipe() {
    const { category, recipe } = useParams<{ category: string; recipe: string }>();
    const title = formatTitleFromSlug(recipe);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [ingredients, setIngredients] = useState<IngredientSection[]>([]);
    const [directions, setDirections] = useState<DirectionItem[]>([]);
    const [waitTimes, setWaitTimes] = useState<string[]>([]);
    const [thingsToTry, setThingsToTry] = useState<ThingToTry[]>([]);
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
                    setThingsToTry(parsed.thingsToTry);
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
                    {/* Wait Times and Things to Try Section */}
                    {(waitTimes.length > 0 || thingsToTry.length > 0) && (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: thingsToTry.length > 0 && waitTimes.length > 0 ? '1fr 1fr' : '1fr',
                                gap: '1.5rem',
                                marginBottom: '1.5rem',
                            }}
                        >
                            {/* Wait Times Section */}
                            {waitTimes.length > 0 && (
                                <Box
                                    sx={{
                                        backgroundColor: 'success.50',
                                        padding: '1.5rem',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                        <Box sx={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', fontWeight: 'light' }}>
                                            <AccessTimeIcon />
                                        </Box>
                                        <Typography level="h3">
                                            Wait Times
                                        </Typography>
                                    </Box>
                                    <List marker="disc" sx={{ paddingLeft: '1.5rem' }}>
                                        {waitTimes.map((waitTime, index) => (
                                            <ListItem key={index}>{renderBoldText(waitTime)}</ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                            {/* Things to Try Section */}
                            {thingsToTry.length > 0 && (
                                <Box
                                    sx={{
                                        backgroundColor: 'warning.100',
                                        padding: '1.5rem',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Typography level="h3" sx={{ marginBottom: '0.75rem' }}>
                                        Things to Try
                                    </Typography>
                                    <List marker="disc" sx={{ paddingLeft: '1.5rem' }}>
                                        {thingsToTry.map((item, index) => (
                                            <ListItem key={index}>
                                                {renderBoldText(item.suggestion)}
                                                {item.stepNumber && (
                                                    <Typography level="body-sm" sx={{ marginLeft: '0.5rem', fontStyle: 'italic', color: 'text.secondary' }}>
                                                        (Step {item.stepNumber})
                                                    </Typography>
                                                )}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                        </Box>
                    )}
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
