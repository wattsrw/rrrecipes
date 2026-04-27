import { Typography, List, ListItem, Box } from '@mui/joy';

export interface Ingredient {
    amount?: string;
    ingredient: string;
}

interface IngredientListProps {
    items: Ingredient[];
}

function IngredientList({ items }: IngredientListProps) {
    return (
        <>
            <Typography level="h2" sx={{ marginBottom: '1rem' }}>
                Ingredients
            </Typography>
            <List sx={{ paddingLeft: '1.5rem' }}>
                {items.map((item, index) => (
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
        </>
    );
}

export default IngredientList;
