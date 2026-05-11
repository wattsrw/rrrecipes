import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const recipesDir = path.join(__dirname, '../public/recipes');

// Slugify function - converts to kebab-case
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[&]/g, 'and') // Replace & with 'and'
        .replace(/[^\w-]/g, '') // Remove special characters
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

const recipeTemplate = `## Ingredients

### Optional Ingredient Section
- Salt // Unordered list item
    - 1 tsp // Optional amount
- Item 2
- Item 3

## Directions
1. Warm oven to 375 degrees // Ordered list item
1. Step 2
    - Skin side up // Optional notes about step
1. Step 3

## Wait Times // Optional section
- Let butter rest for 2 hours // Unordered list item
- Item 2
`;

async function promptUser() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question('Enter category name: ', (category) => {
            rl.question('Enter recipe name: ', (recipe) => {
                rl.close();
                resolve({ category, recipe });
            });
        });
    });
}

async function createRecipe(categoryInput, recipeInput) {
    try {
        // Slugify inputs
        const category = slugify(categoryInput);
        const recipe = slugify(recipeInput);

        if (!category || !recipe) {
            console.error('Error: Category and recipe names cannot be empty or contain only special characters.');
            process.exit(1);
        }

        // Create category directory path
        const categoryPath = path.join(recipesDir, category);
        const recipePath = path.join(categoryPath, `${recipe}.md`);

        // Check if recipe already exists
        if (fs.existsSync(recipePath)) {
            console.error(`Error: Recipe already exists at ${recipePath}`);
            process.exit(1);
        }

        // Create category directory if it doesn't exist
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath, { recursive: true });
            console.log(`✓ Created directory: ${categoryPath}`);
        }

        // Create recipe file with template
        fs.writeFileSync(recipePath, recipeTemplate);
        console.log(`✓ Created recipe: ${recipePath}`);
        console.log(`\nNext steps:`);
        console.log(`1. Edit the recipe file to add your ingredients, directions, and wait times`);
        console.log(`2. Run: npm run generate-routes`);
    } catch (error) {
        console.error('Error creating recipe:', error.message);
        process.exit(1);
    }
}

// Main execution
(async () => {
    let category, recipe;

    // Check if arguments are provided
    if (process.argv.length >= 4) {
        category = process.argv[2];
        recipe = process.argv[3];
    } else {
        // Prompt user for input
        ({ category, recipe } = await promptUser());
    }

    await createRecipe(category, recipe);
})();
