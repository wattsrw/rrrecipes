import React from 'react';

export function formatTitleFromSlug(slug?: string): string {
    if (!slug) return 'Recipe';

    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Singularize a word (basic implementation for common cases)
 * This is maintainable and can be extended for edge cases over time
 */
function singularize(word: string): string {
    const lower = word.toLowerCase();

    // Common plural rules (in order of specificity)
    if (lower.endsWith('ies')) return lower.slice(0, -3) + 'y';
    if (lower.endsWith('xes') || lower.endsWith('zes') || lower.endsWith('ches') || lower.endsWith('shes')) {
        return lower.slice(0, -2);
    }
    if (lower.endsWith('es')) return lower.slice(0, -2);
    if (lower.endsWith('s') && !lower.endsWith('ss')) return lower.slice(0, -1);

    return lower;
}

/**
 * Words that are modifiers/descriptors and shouldn't be highlighted on their own
 * This list can be extended as edge cases are discovered
 */
const MODIFIER_WORDS = new Set([
    'light',
    'dark',
    'heavy',
    'brown',
    'white',
    'yellow',
    'red',
    'green',
    'unsalted',
    'salted',
    'sweetened',
    'unsweetened',
    'fresh',
    'dried',
    'ground',
    'whole',
    'granulated',
    'powdered',
    'all-purpose',
    'extra-virgin',
    'raw',
    'cooked',
    'roasted',
    'toasted',
    'sliced',
    'chopped',
    'minced',
    'baking',
]);

export function highlightIngredientsInText(
    text: string,
    ingredients: string[],
    onIngredientClick?: (ingredient: string) => void
): React.ReactNode {
    if (!ingredients.length) return text;

    // Build a set of all "ingredient keywords" for quick lookup
    // Separate single-word ingredients from multi-word ingredients
    const singleWordIngredients = new Set<string>();
    const multiWordIngredientWords = new Set<string>();

    ingredients.forEach(ingredient => {
        const ingredientLower = ingredient.toLowerCase();
        const words = ingredientLower.split(/\s+/);

        if (words.length === 1) {
            // Single-word ingredient: add it and its singular form
            singleWordIngredients.add(ingredientLower);
            singleWordIngredients.add(singularize(ingredientLower));
        } else {
            // Multi-word ingredient: add full name and individual words (excluding modifiers)
            singleWordIngredients.add(ingredientLower); // Full name always matches

            words.forEach(word => {
                // Only add individual words if they're not modifiers
                if (!MODIFIER_WORDS.has(word)) {
                    multiWordIngredientWords.add(word);
                    multiWordIngredientWords.add(singularize(word));
                }
            });
        }
    });

    // Split text into tokens (words, whitespace, punctuation)
    const tokens = text.split(/(\s+|[,.!?;:])/);
    const result: React.ReactNode[] = [];
    let matchId = 0;

    for (const token of tokens) {
        // Keep whitespace and punctuation as is
        if (!token.trim()) {
            result.push(token);
            continue;
        }

        // Check if this token matches any ingredient keyword
        const tokenLower = token.toLowerCase();
        const singularForm = singularize(tokenLower);

        // Check single-word ingredients first (exact matches have priority)
        const matchesSingleWord = singleWordIngredients.has(tokenLower) || singleWordIngredients.has(singularForm);

        // Then check multi-word ingredient words (only if not a modifier)
        const matchesMultiWord = !MODIFIER_WORDS.has(tokenLower) &&
            (multiWordIngredientWords.has(tokenLower) || multiWordIngredientWords.has(singularForm));

        if (matchesSingleWord || matchesMultiWord) {
            // Find the actual ingredient name that matches
            let ingredientName = ingredients.find(ing => {
                const ingLower = ing.toLowerCase();
                return ingLower === tokenLower || ingLower === singularForm;
            });

            // If not found exactly, try matching by word
            if (!ingredientName) {
                ingredientName = ingredients.find(ing => {
                    const words = ing.toLowerCase().split(/\s+/);
                    return words.some(word => word === tokenLower || singularize(word) === singularForm);
                });
            }

            result.push(
                React.createElement(
                    'button',
                    {
                        key: `ingredient-${matchId++}`,
                        onClick: () => ingredientName && onIngredientClick?.(ingredientName),
                        style: {
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            fontWeight: 'bold',
                            color: 'var(--joy-palette-primary-500)',
                            cursor: 'pointer',
                            fontSize: 'inherit',
                            fontFamily: 'inherit',
                        },
                        type: 'button',
                    },
                    token
                )
            );
        } else {
            result.push(token);
        }
    }

    return result;
}
