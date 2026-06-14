# RRRecipes

## To Add a New Recipe
1. Run the following command and follow the prompts:
    ```bash
    npm run create-recipe
    ```
    or with category and recipe names as arguments:
    ```bash
    npm run create-recipe "bread" "sourdough"
    ```
1. All recipes are stored in [/public/recipes](https://github.com/wattsrw/rrrecipes/tree/main/public/recipes). Categories are kept as directories. Recipes are kept as markdown files. Edit the new markdown file to add your ingredients, directions, and wait times
1. After updating the recipe markdown file, validate that the new recipe follows all the rules:
    ```base
    npm run validate-recipes
    ```
1. After the new category/recipe has been added, run the following command to generate all the category and recipe routes:
    ```bash
    npm run generate-routes
    ```
    - If adding a new category, you may also want to add the category and icon to `categoryIconMap` in [Home.tsx](https://github.com/wattsrw/rrrecipes/blob/main/src/pages/Home.tsx#L12).

## If Updating Recipe File Structure
Need to update:
- [recipe-file-rules.md](https://github.com/wattsrw/rrrecipes/blob/main/scripts/recipe-file-rules.md)
- [create-recipe.js](https://github.com/wattsrw/rrrecipes/blob/main/scripts/create-recipe.js)
- [validate-recipes.js](https://github.com/wattsrw/rrrecipes/blob/main/scripts/validate-recipes.js)
- [MarkdownParser.ts](https://github.com/wattsrw/rrrecipes/blob/main/src/utils/MarkdownParser.ts)

## TODOs
- In validator
    - for all sections, validate that title has the correct capitalization and that the lists are the correct type (unordered or ordered)
- breadcrumbs (as title??)
- In the ingredients, a line is clickable to highlight the ingredient?
    - accent every other line?
        - divider?
        - alternating colors?
- search
- update `copilot-instructions.md`


## Recipes to add
- Irina
    - mushroom soup
    - borsh
    - latkes
- ice cream
    - chocolate
- cookies
    - mom's holiday cookie
- muffins
    - chocolate chocolate chip
    - cinnamon coffee cake
