import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const recipesDir = path.join(__dirname, '../public/recipes');

// Validation rules
const KEBAB_CASE_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const VALID_SECTIONS = ['## Ingredients', '## Directions', '## Wait Times'];
const REQUIRED_SECTIONS = ['## Ingredients', '## Directions'];

let errorCount = 0;

function logError(message) {
    console.error(`❌ ${message}`);
    errorCount++;
}

function logSuccess(message) {
    console.log(`✓ ${message}`);
}

function isValidKebabCase(str) {
    return KEBAB_CASE_REGEX.test(str);
}

function validateDirectoryName(dir, relPath) {
    if (!isValidKebabCase(dir)) {
        logError(`Invalid directory name: "${dir}" at ${relPath}. Must be kebab-case (lowercase with hyphens only).`);
        return false;
    }
    return true;
}

function validateFileName(file, relPath) {
    if (!file.endsWith('.md')) {
        logError(`Invalid file extension: "${file}" at ${relPath}. Recipe files must end with .md`);
        return false;
    }

    const nameWithoutExt = file.slice(0, -3);
    if (!isValidKebabCase(nameWithoutExt)) {
        logError(`Invalid file name: "${file}" at ${relPath}. Must be kebab-case (lowercase with hyphens only).`);
        return false;
    }

    return true;
}

function validateRecipeContent(filePath, relPath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');

        // Check for required sections
        const hasSections = {
            ingredients: false,
            directions: false,
            waitTimes: false,
        };

        for (const line of lines) {
            if (line.trim() === '## Ingredients') hasSections.ingredients = true;
            if (line.trim() === '## Directions') hasSections.directions = true;
            if (line.trim() === '## Wait Times') hasSections.waitTimes = true;
        }

        // Validate required sections
        if (!hasSections.ingredients) {
            logError(`Missing required section in ${relPath}: "## Ingredients"`);
            return false;
        }

        if (!hasSections.directions) {
            logError(`Missing required section in ${relPath}: "## Directions"`);
            return false;
        }

        // Check section order
        const sectionOrder = [];
        for (const line of lines) {
            if (line.trim() === '## Ingredients') sectionOrder.push('ingredients');
            if (line.trim() === '## Directions') sectionOrder.push('directions');
            if (line.trim() === '## Wait Times') sectionOrder.push('waitTimes');
        }

        const expectedOrder = ['ingredients', 'directions'];
        if (hasSections.waitTimes) expectedOrder.push('waitTimes');

        // Verify order matches
        if (JSON.stringify(sectionOrder) !== JSON.stringify(expectedOrder)) {
            logError(`Incorrect section order in ${relPath}. Expected: ${expectedOrder.join(' → ')}, but got: ${sectionOrder.join(' → ')}`);
            return false;
        }

        return true;
    } catch (error) {
        logError(`Error reading ${relPath}: ${error.message}`);
        return false;
    }
}

function validateRecipeStructure(dirPath, relPath, categoryName) {
    try {
        const files = fs.readdirSync(dirPath);
        let hasRecipes = false;

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isFile()) {
                const fileRelPath = path.join(relPath, file);

                if (validateFileName(file, fileRelPath)) {
                    if (!validateRecipeContent(filePath, fileRelPath)) {
                        return false;
                    }
                    hasRecipes = true;
                }
            }
        }

        if (!hasRecipes && files.length === 0) {
            console.log(`⚠ Directory ${relPath} is empty (no recipes)`);
        }

        return true;
    } catch (error) {
        logError(`Error validating ${relPath}: ${error.message}`);
        return false;
    }
}

function validateRecipes() {
    console.log('🔍 Validating recipe files and directories...\n');

    if (!fs.existsSync(recipesDir)) {
        logError(`Recipes directory not found: ${recipesDir}`);
        process.exit(1);
    }

    try {
        const categories = fs.readdirSync(recipesDir);

        for (const category of categories) {
            const categoryPath = path.join(recipesDir, category);
            const stat = fs.statSync(categoryPath);

            if (stat.isDirectory()) {
                const relPath = path.relative(process.cwd(), categoryPath);

                if (!validateDirectoryName(category, relPath)) {
                    continue;
                }

                if (!validateRecipeStructure(categoryPath, relPath, category)) {
                    continue;
                }

                logSuccess(`Category validated: ${category}`);
            }
        }
    } catch (error) {
        logError(`Error scanning recipes directory: ${error.message}`);
        process.exit(1);
    }

    console.log('\n' + '='.repeat(50));

    if (errorCount === 0) {
        console.log('✓ All recipes are valid!');
        process.exit(0);
    } else {
        console.error(`\n❌ Found ${errorCount} validation error${errorCount !== 1 ? 's' : ''}`);
        process.exit(1);
    }
}

validateRecipes();
