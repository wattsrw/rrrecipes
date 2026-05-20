import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const recipesDir = path.join(__dirname, '../public/recipes');

// Validation rules
const KEBAB_CASE_REGEX = /^[a-z0-9&]+(-[a-z0-9&]+)*$/;
const VALID_SECTIONS = ['## Ingredients', '## Directions', '## Wait Times', '## Things to Try'];
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
            thingsToTry: false,
        };

        const sectionIndices = {
            ingredients: -1,
            directions: -1,
            waitTimes: -1,
            thingsToTry: -1,
        };

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '## Ingredients') {
                hasSections.ingredients = true;
                sectionIndices.ingredients = i;
            }
            if (lines[i].trim() === '## Directions') {
                hasSections.directions = true;
                sectionIndices.directions = i;
            }
            if (lines[i].trim() === '## Wait Times') {
                hasSections.waitTimes = true;
                sectionIndices.waitTimes = i;
            }
            if (lines[i].trim() === '## Things to Try') {
                hasSections.thingsToTry = true;
                sectionIndices.thingsToTry = i;
            }
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
            if (line.trim() === '## Things to Try') sectionOrder.push('thingsToTry');
        }

        const expectedOrder = ['ingredients', 'directions'];
        if (hasSections.waitTimes) expectedOrder.push('waitTimes');
        if (hasSections.thingsToTry) expectedOrder.push('thingsToTry');

        // Verify order matches
        if (JSON.stringify(sectionOrder) !== JSON.stringify(expectedOrder)) {
            logError(`Incorrect section order in ${relPath}. Expected: ${expectedOrder.join(' → ')}, but got: ${sectionOrder.join(' → ')}`);
            return false;
        }

        // Check for invalid/unknown sections
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('## ')) {
                if (!VALID_SECTIONS.includes(line)) {
                    logError(`Invalid section in ${relPath} (line ${i + 1}): "${line}". Valid sections are: ${VALID_SECTIONS.join(', ')}`);
                    return false;
                }
            }
        }

        // Validate list types within sections
        if (!validateSectionListTypes(lines, sectionIndices, relPath)) {
            return false;
        }

        return true;
    } catch (error) {
        logError(`Error reading ${relPath}: ${error.message}`);
        return false;
    }
}

function validateSectionListTypes(lines, sectionIndices, relPath) {
    // Get section boundaries
    const ingredientsStart = sectionIndices.ingredients + 1;
    const ingredientsEnd = sectionIndices.directions;
    const directionsStart = sectionIndices.directions + 1;
    const directionsEnd = sectionIndices.waitTimes >= 0 ? sectionIndices.waitTimes : (sectionIndices.thingsToTry >= 0 ? sectionIndices.thingsToTry : lines.length);
    const waitTimesStart = sectionIndices.waitTimes >= 0 ? sectionIndices.waitTimes + 1 : -1;
    const waitTimesEnd = sectionIndices.thingsToTry >= 0 ? sectionIndices.thingsToTry : lines.length;
    const thingsToTryStart = sectionIndices.thingsToTry >= 0 ? sectionIndices.thingsToTry + 1 : -1;

    // Validate Ingredients section (should be unordered lists with `-`)
    for (let i = ingredientsStart; i < ingredientsEnd; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith('###')) continue; // Skip empty lines and section titles

        if (!line.startsWith('    ') && trimmed && !trimmed.startsWith('-') && !trimmed.startsWith('##')) {
            logError(`Invalid list item in Ingredients section at ${relPath} (line ${i + 1}): "${trimmed}". Ingredients must be unordered lists (start with "-").`);
            return false;
        }

        // Check indented lines (amounts) start with `-`
        if (line.startsWith('    ') && trimmed && !trimmed.startsWith('-')) {
            logError(`Invalid sub-item in Ingredients section at ${relPath} (line ${i + 1}): "${trimmed}". Amounts must start with "-".`);
            return false;
        }
    }

    // Validate Directions section (should be ordered lists with `1.`)
    for (let i = directionsStart; i < directionsEnd; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) continue; // Skip empty lines

        if (!line.startsWith('    ') && trimmed && !trimmed.startsWith('##')) {
            if (!/^\d+\./.test(trimmed)) {
                logError(`Invalid list item in Directions section at ${relPath} (line ${i + 1}): "${trimmed}". Directions must be ordered lists (start with "1.").`);
                return false;
            }
        }

        // Check indented lines (notes) start with `-`
        if (line.startsWith('    ') && trimmed && !trimmed.startsWith('-')) {
            logError(`Invalid note in Directions section at ${relPath} (line ${i + 1}): "${trimmed}". Notes must start with "-".`);
            return false;
        }
    }

    // Validate Wait Times section (should be unordered lists with `-`)
    if (waitTimesStart >= 0) {
        for (let i = waitTimesStart; i < waitTimesEnd; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            if (!trimmed) continue; // Skip empty lines

            if (!line.startsWith('    ') && trimmed && !trimmed.startsWith('##')) {
                if (!trimmed.startsWith('-')) {
                    logError(`Invalid list item in Wait Times section at ${relPath} (line ${i + 1}): "${trimmed}". Wait times must be unordered lists (start with "-").`);
                    return false;
                }
            }

            // Check indented lines (sub-items) start with `-`
            if (line.startsWith('    ') && trimmed && !trimmed.startsWith('-')) {
                logError(`Invalid sub-item in Wait Times section at ${relPath} (line ${i + 1}): "${trimmed}". Sub-items must start with "-".`);
                return false;
            }
        }
    }

    // Validate Things to Try section (should be unordered lists with `-`)
    // Note: This section can be empty (just the header with no items)
    if (thingsToTryStart >= 0) {
        for (let i = thingsToTryStart; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            if (!trimmed) continue; // Skip empty lines

            // Stop if we hit another section header
            if (trimmed.startsWith('##')) {
                break;
            }

            if (!line.startsWith('    ') && trimmed) {
                if (!trimmed.startsWith('-')) {
                    logError(`Invalid list item in Things to Try section at ${relPath} (line ${i + 1}): "${trimmed}". Things to try must be unordered lists (start with "-").`);
                    return false;
                }
            }

            // Check indented lines (step numbers) start with `-`
            if (line.startsWith('    ') && trimmed && !trimmed.startsWith('-')) {
                logError(`Invalid step number in Things to Try section at ${relPath} (line ${i + 1}): "${trimmed}". Step numbers must start with "-".`);
                return false;
            }
        }
    }

    return true;
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
