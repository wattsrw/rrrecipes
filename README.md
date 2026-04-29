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

If adding a category, maybe add the category and icon to `categoryIdonMap` in [Home.tsx](https://github.com/wattsrw/rrrecipes/blob/main/src/pages/Home.tsx#L12).

## Next Commands
- parse the contents into Ingredients and Directions.
    - Ingredients should be a list of Ingredient objects from IngredientList.tsx. 
        - Use split on tab to separate 'amount' from 'ingredient'.
        - If there is no tab, then there is no 'amount'
    - Directions should be a List of a new object. Each object has a step(string) and optional notes (List of strings)
- command to verify all recipe files match stucture
    - file names use snake-naming-convention
    - first line is ## Ingredients
    - has 1 empty line
    - has line ## Directions
- In the Directions, accent every occurrance of an 'ingredient' with bold and primary color


## TODOs
- In the directions, clicking on an ingredient, opens the ingredient drawer (if on mobile) and highlights the ingredient clicked
- In the directions, a step is clickable to highlight which step we're on?
- In the ingredients, a line is clickable to highlight the ingredient?
    - accent every other line?
        - divider?
        - alternating colors?
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
- cookies
    - chocolate chip cookies
    - hamatachen
- bread
    - rye
    - french
    - banana
    - cornbread
    - challah


