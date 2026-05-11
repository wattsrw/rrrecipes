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

2. All recipes are stored in [/public/recipes](https://github.com/wattsrw/rrrecipes/tree/main/public/recipes). Categories are kept as directories. Recipes are kept as markdown files. Edit the new markdown file to add your ingredients, directions, and wait times

### Update Webpage
After the new category/recipe has been added, run the following command to generate all the category and recipe routes:
```bash
npm run generate-routes
```

If adding a new category, you may also want to add the category and icon to `categoryIconMap` in [Home.tsx](https://github.com/wattsrw/rrrecipes/blob/main/src/pages/Home.tsx#L12).


## Next Commands
- command to verify all recipe files match stucture
    - file names use snake-naming-convention
    - first line is ## Ingredients
    - has 1 empty line
    - has line ## Directions

## TODOs
- In mobile, category tiles display icon on left side, smaller and inline
- In the ingredients, a line is clickable to highlight the ingredient?
    - accent every other line?
        - divider?
        - alternating colors?
- update/add functionality that creates an issue in github repo
- search
- breadcrumbs (as title??)
- put validate markdown files and generate routes commands into action?
- update `copilot-instructions.md`


## Recipes to add
- soup
    - mushroom soup
    - borsh
- latkes
- ice cream
    - chocolate
    - vanilla
- cookies
    - mom's holiday cookie
