# Recipe File Structure and Naming Rules

## Directory Naming Convention

- Category directories must use **kebab-case** (lowercase with hyphens)
- Ampersands (`&`) are allowed: `M & M` → `m-&-m`
- Example: `bread`, `meat`, `ice-cream`, `m-&-m` (not `Bread`, `meatDishes`, etc.)
- Special characters are converted:
  - Spaces → hyphens: `ice cream` → `ice-cream`
  - All other special characters are removed: `mom's` → `moms`

## File Naming Convention

- Recipe markdown files must use **kebab-case** (lowercase with hyphens)
- Ampersands (`&`) are allowed: `m-&-m.md`
- File extension is always `.md`
- Examples: `chocolate-chip.md`, `banana-bread.md`, `grilled-cheese.md`, `m-&-m.md`
- The same rules apply as for directories

## Directory Structure

```
/public/recipes/
├── bread/
│   ├── banana-bread.md
│   ├── challah.md
│   └── french.md
├── cookies/
│   ├── chocolate-chip.md
│   └── hamantaschen.md
├── meat/
│   ├── burgers.md
│   └── salmon.md
└── [category]/
    └── [recipe].md
```

## Recipe Markdown Format

### Required Sections

All recipes must include these sections in this order:

1. **## Ingredients**
2. **## Directions**

### Optional Sections

- **## Wait Times** - Optional section for wait times between steps
- **## Things to Try** - Optional section for recipe variations and suggestions

### Section Order

Sections must appear in this exact order:
1. `## Ingredients` (required)
2. `## Directions` (required)
3. `## Wait Times` (optional)
4. `## Things to Try` (optional)

## Ingredients Section Format

```markdown
## Ingredients

### Optional Ingredient Section
- Salt // Unordered list item
    - 1 tsp // Optional amount
- Chicken
- Canola oil

### Another Section (Optional)
- Item 1
    - 2 cups
```

### Rules

- Ingredients are unordered lists (start with `-`)
- Amounts are optional and indented with 4 spaces
- Amount lines must start with `-` (indicating a sub-item)
- Section titles start with `###` and are optional
- Comments (after `//`) are optional and ignored by the parser
- Ingredient names and amounts are stripped of comments when parsed

### Example

```markdown
## Ingredients

### Dry Ingredients
- Flour // All-purpose flour
    - 3 cups
- Baking soda
    - 1 teaspoon

### Wet Ingredients
- Eggs
    - 2
- Vanilla extract // Pure vanilla
    - 2 teaspoons
```

## Directions Section Format

```markdown
## Directions
1. Warm oven to 375 degrees // Ordered list item
1. Put chicken on pan
    - Skin side up // Optional notes about step
    - Bake for 20 minutes
1. Cook
```

### Rules

- Directions are ordered lists (start with `1.`)
- All list items use `1.` (numbering is handled by markdown rendering)
- Notes are optional and indented with 4 spaces under a direction
- Note lines must start with `-` (indicating sub-items)
- Comments (after `//`) are optional and ignored by the parser
- Each note becomes a separate list item in the parsed output

### Example

```markdown
## Directions
1. Preheat oven to **375 degrees**
1. Mix dry ingredients together
    - Sift the flour
    - Combine with baking soda and salt
1. Add wet ingredients
    - Mix until just combined
1. Bake for **12-15 minutes** until golden brown
```

## Wait Times Section Format

```markdown
## Wait Times // Optional section
- Let butter rest for 2 hours // Unordered list item
- Dough refrigeration - 30 minutes to overnight
```

### Rules

- Wait times are unordered lists (start with `-`)
- Each line becomes a separate wait time item
- Comments (after `//`) are optional and ignored by the parser
- Bold text using `**text**` is supported and will render in the UI

### Example

```markdown
## Wait Times
- **1-2 hours** before starting for butter to soften
- Dough can be refrigerated **30 minutes to 24 hours**
```

## Things to Try Section Format

```markdown
## Things to Try // Optional section
- Add chocolate chips instead of raisins // Unordered list item
    - 3 // Optional step number
- Substitute butter with coconut oil
```

### Rules

- Things to try are unordered lists (start with `-`)
- Each line becomes a separate suggestion
- Step numbers are optional and indented with 4 spaces
- Step number lines must start with `-` (indicating a sub-item)
- Comments (after `//`) are optional and ignored by the parser
- Bold text using `**text**` is supported and will render in the UI
- Step numbers indicate which direction step the suggestion applies to

### Example

```markdown
## Things to Try
- Swap **white chocolate** for dark chocolate
    - 4
- Add **espresso powder** for deeper flavor
    - 2
- Try **almond extract** instead of vanilla
```

## Markdown Features

### Bold Text

Bold text is supported throughout the recipe and uses the `**text**` syntax:

```markdown
- Bake for **8-10 minutes**
- Let sit for **30 minutes** before serving
```

- Bold text will render with emphasis in the UI
- Works in Ingredients, Directions, and Wait Times sections
- Comments on the same line as bold text are allowed

### Comments

Comments are optional throughout the file and start with `//`:

```markdown
- Unsalted butter // Must be room temperature
    - 1 cup // 2 sticks
1. Cream butter and sugar // Ordered list item
    - Mix until light and fluffy // Optional notes about step
```

- Comments are stripped when the markdown is parsed
- Use comments to document ingredient requirements, cooking tips, or step details
- Comments do not appear in the rendered UI

## Line Endings

- Recipes can use either **LF** (Unix/Linux) or **CRLF** (Windows) line endings
- The parser handles both automatically

## Creating New Recipes

Use the `create-recipe` script to generate new recipe files with a pre-filled template:

```bash
npm run create-recipe "bread" "sourdough"
```

This will:
1. Slugify the category and recipe names
2. Create the category directory if needed
3. Create the markdown file with a template

After creating the file, run:

```bash
npm run generate-routes
```

To regenerate the application routes.

## Validation Checklist

Before committing a new recipe, ensure:

- [ ] Directory name is in kebab-case
- [ ] Recipe filename is in kebab-case with `.md` extension
- [ ] Recipe contains `## Ingredients` section
- [ ] Recipe contains `## Directions` section
- [ ] All ingredients have a name (and optionally an amount)
- [ ] All directions are numbered with `1.`
- [ ] Optional notes under directions start with `-` and are indented
- [ ] Optional `## Wait Times` section (if applicable) contains unordered list items
- [ ] Optional `## Things to Try` section (if applicable) contains unordered list items with optional step numbers
- [ ] No syntax errors in markdown structure
- [ ] `npm run generate-routes` successfully regenerates routes
