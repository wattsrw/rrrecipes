# RRRecipes

## To Add a New Recipe
All recipes are stored in [/public/recipes](https://github.com/wattsrw/rrrecipes/tree/main/public/recipes). Categories are kept as directories. Recipes are kept as markdown files. All directory and file names should use snake-naming-convention.

### Recipe Markdown Structure
```markdown
## Ingredients
- Salt // Unordered list item
    - 1 tsp // Optional amount
- Chicken
- Canola oil

## Direction
1. Warm oven to 375 degrees // Ordered list item
2. Put chicken on pan
    - Skin side up // Optional notes about step
3. Cook
```

### Update Webpage
After the new category/recipe has been added. Run
```
npm run generate-routes
```


## Next Commands
- parse the contents into Ingredients and Directions.
    - Ingredients should be a list of Ingredient objects from IngredientList.tsx. 
        - Use split on tab to separate 'amount' from 'ingredient'.
        - If there is no tab, then there is no 'amount'
    - Directions should be a List of a new object. Each object has a step(string) and optional notes (List of strings)
- command to verify all recipe files match stucture
    - first line is ## Ingredients
    - has 1 empty line
    - has line ## Directions
- In the Directions, accent every occurrance of an 'ingredient' with bold and primary color
- Directions should parse the List of directions to create the order List of ListOtems
    - account for the optional 'notes', which is an unordered List inside a ListItem
- Update 'categoryIconMap' to account for all of the keys in RECIPE_MAPPING

## TODOs
- In the directions, clicking on an ingredient, opens the ingredient drawer (if on mobile) and highlights the ingredient clicked
- In the directions, a step is clickable to highlight which step we're on?
- search
- breadcrumbs


## Structure
- meat
    - burgers
    - salmon
    - chicken thighs
    - steak
    - chicken breasts
- soup
    - mushroom soup
    - chili
    - borsh
- grilling
    - burgers
    - chicken thighs
    - potatoes
- ice cream
    - chocolate
    - vanilla
- baking
    - chocolate chip cookies
    - hamatachen
- bread
    - rye
    - french
    - banana
    - cornbread
    - challah


