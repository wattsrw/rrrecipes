import type { IngredientSection } from '../components/IngredientList';

export interface IngredientItem {
    amount?: string;
    ingredient: string;
}

export interface DirectionItem {
    step: string;
    notes?: string[];
}

export interface ThingToTry {
    suggestion: string;
    stepNumber?: string;
}

export interface ParsedRecipe {
    ingredients: IngredientSection[];
    directions: DirectionItem[];
    waitTimes: string[];
    thingsToTry: ThingToTry[];
}

export function parseRecipeMarkdown(content: string): ParsedRecipe {
    const result: ParsedRecipe = {
        ingredients: [],
        directions: [],
        waitTimes: [],
        thingsToTry: [],
    };

    // Split content by section headers (handle both LF and CRLF line endings)
    const ingredientsMatch = content.match(/## Ingredients\r?\n([\s\S]*?)(?=## |$)/);
    const directionsMatch = content.match(/## Directions\r?\n([\s\S]*?)(?=## |$)/);
    const waitTimesMatch = content.match(/## Wait Times\r?\n([\s\S]*?)(?=## |$)/);
    const thingsToTryMatch = content.match(/## Things to Try\r?\n([\s\S]*?)(?=## |$)/);

    if (ingredientsMatch) {
        result.ingredients = parseIngredients(ingredientsMatch[1].trim());
    }

    if (directionsMatch) {
        result.directions = parseDirections(directionsMatch[1].trim());
    }

    if (waitTimesMatch) {
        result.waitTimes = parseWaitTimes(waitTimesMatch[1].trim());
    }

    if (thingsToTryMatch) {
        result.thingsToTry = parseThingsToTry(thingsToTryMatch[1].trim());
    }

    return result;
}

function parseIngredients(content: string): IngredientSection[] {
    const sections: IngredientSection[] = [];
    const lines = content.split('\n');
    let currentSection: IngredientSection | null = null;
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip empty lines
        if (!trimmed) {
            i++;
            continue;
        }

        // Check for section title (###)
        if (trimmed.startsWith('###')) {
            // Save previous section if it exists
            if (currentSection) {
                sections.push(currentSection);
            }
            // Create new section
            const title = trimmed.replace(/^#+\s*/, '').trim();
            currentSection = {
                title,
                items: [],
            };
            i++;
        }
        // Check for ingredient item (-)
        else if (trimmed.startsWith('-')) {
            // Ensure we have a section
            if (!currentSection) {
                currentSection = {
                    items: [],
                };
            }

            const ingredient = trimmed.substring(1).trim();
            const item: IngredientItem = { ingredient };

            // Check if next line is indented (amount)
            if (i + 1 < lines.length) {
                const nextLine = lines[i + 1];
                if (nextLine.startsWith('    ') && nextLine.trim().startsWith('-')) {
                    const amount = nextLine.trim().substring(1).trim();
                    item.amount = amount;
                    i++; // Skip next line as we've processed it
                }
            }

            currentSection.items.push(item);
            i++;
        } else {
            i++;
        }
    }

    // Don't forget to add the last section
    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
}

function parseDirections(content: string): DirectionItem[] {
    const items: DirectionItem[] = [];
    const lines = content.split('\n');
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip empty lines
        if (!trimmed) {
            i++;
            continue;
        }

        // Check for numbered item (1., 2., etc.)
        if (/^\d+\./.test(trimmed)) {
            const step = trimmed.replace(/^\d+\.\s*/, '').trim();
            const item: DirectionItem = { step };

            // Collect following indented lines as notes
            const notes: string[] = [];
            i++;
            while (i < lines.length) {
                const nextLine = lines[i];
                if (nextLine.startsWith('    ') && nextLine.trim().startsWith('-')) {
                    const note = nextLine.trim().substring(1).trim();
                    notes.push(note);
                    i++;
                } else if (nextLine.trim() === '') {
                    i++;
                } else {
                    break;
                }
            }

            if (notes.length > 0) {
                item.notes = notes;
            }

            items.push(item);
        } else {
            i++;
        }
    }

    return items;
}

function parseWaitTimes(content: string): string[] {
    const times: string[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('-') && !line.startsWith('    ')) {
            const time = trimmed.substring(1).trim();
            times.push(time);
        }
    }

    return times;
}

function parseThingsToTry(content: string): ThingToTry[] {
    const items: ThingToTry[] = [];
    const lines = content.split('\n');
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip empty lines
        if (!trimmed) {
            i++;
            continue;
        }

        // Check for suggestion item (-)
        if (trimmed.startsWith('-') && !line.startsWith('    ')) {
            const suggestion = trimmed.substring(1).trim();
            const item: ThingToTry = { suggestion };

            // Check if next line has a step number (indented)
            if (i + 1 < lines.length) {
                const nextLine = lines[i + 1];
                if (nextLine.startsWith('    ') && nextLine.trim().startsWith('-')) {
                    const stepNumber = nextLine.trim().substring(1).trim();
                    item.stepNumber = stepNumber;
                    i++; // Skip next line as we've processed it
                }
            }

            items.push(item);
            i++;
        } else {
            i++;
        }
    }

    return items;
}
