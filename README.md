# Recipes

## Next Commands
- parse the contents into Ingredients and Directions.
    - Ingredients should be a list of Ingredient objects from IngredientList.tsx. 
        - Use split on tab to separate 'amount' from 'ingredient'.
        - If there is no tab, then there is no 'amount'
    - Directions should be a List of a new object. Each object has a step(string) and optional notes (List of strings)
- In the Directions, accent every occurrance of an 'ingredient' with bold and primary color
- Directions should parse the List of directions to create the order List of ListOtems
    - account for the optional 'notes', which is an unordered List inside a ListItem

## TODOs
- parse markdown recipes
    - output html components
    - use file structure for website structure
    - command to run parser and create react components
    - component template
- search
- breadcrumbs
- parse file structure to create mapping
    - key: category name
    - value: list of recipe names


## Considerations
- category page
    - list of recipes or subcategories
- recipe page
    - breadcrumbs (left)
    - numbered steps in main content
        - highlight ingredients with bold and color
    - notes somewhere? maybe don't need

## Structure
- Indoors
    - chili
    - burgers
    - salmon
    - chicken thighs
    - steak
    - chicken breasts
    - mushroom soup
    - borsh
- grilling
    - burgers
    - chicken thighs
    - potatoes
- desserts
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


