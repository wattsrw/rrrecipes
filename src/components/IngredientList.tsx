import { Typography, List, ListItem, Box } from '@mui/joy';

interface IngredientItem {
    amount?: string;
    ingredient: string;
}

export interface IngredientSection {
    title?: string
    items: IngredientItem[];
}

interface IngredientListProps {
    ingredients: IngredientSection[];
}

function IngredientList({ ingredients }: IngredientListProps) {
    return (
        <>
            <Typography level="h2" sx={{ marginBottom: '1rem' }}>
                Ingredients
            </Typography>
            {ingredients.map((section, sectionIndex) => (
                <Box key={sectionIndex} sx={{ marginBottom: '1.5rem' }}>
                    {section.title && (
                        <Typography level="h4" >
                            {section.title}
                        </Typography>
                    )}
                    <List sx={{ paddingLeft: '1.5rem' }}>
                        {section.items.map((item, index) => (
                            <ListItem key={index}>
                                <Box sx={{ display: 'flex', gap: '1rem', width: '100%' }}>
                                    {item.amount && (
                                        <Box sx={{ minWidth: '80px' }}>
                                            {item.amount}
                                        </Box>
                                    )}
                                    <Box>
                                        {item.ingredient}
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ))}
        </>
    );
}

export default IngredientList;
