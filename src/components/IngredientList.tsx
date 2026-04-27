import { Typography, List, ListItem } from '@mui/joy';

function IngredientList() {
    return (
        <>
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
        </>
    );
}

export default IngredientList;
