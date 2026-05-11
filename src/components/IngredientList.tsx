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
    selectedIngredient?: string | null;
}

function IngredientList({ ingredients, selectedIngredient }: IngredientListProps) {
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
                    <List sx={{ paddingLeft: '1rem' }}>
                        {section.items.map((item, index) => {
                            const isSelected = selectedIngredient?.toLowerCase() === item.ingredient.toLowerCase();
                            return (
                                <ListItem
                                    key={index}
                                    sx={isSelected ? {
                                        backgroundColor: 'primary.50',
                                        borderLeft: '3px solid',
                                        borderColor: 'primary.500',
                                    } : {}}
                                >
                                    <Box sx={{ display: 'flex', gap: '1rem', width: '100%' }}>
                                        {item.amount && (
                                            <Box sx={isSelected ? { minWidth: '110px', fontWeight: 'bold', color: 'primary.500' } : { minWidth: '110px' }}>
                                                {item.amount}
                                            </Box>
                                        )}
                                        <Box sx={isSelected ? { fontWeight: 'bold', color: 'primary.500' } : {}}>
                                            {item.ingredient}
                                        </Box>
                                    </Box>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            ))}
        </>
    );
}

export default IngredientList;
