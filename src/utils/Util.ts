import React from 'react';

export function formatTitleFromSlug(slug?: string): string {
    if (!slug) return 'Recipe';

    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function highlightIngredientsInText(
    text: string,
    ingredients: string[]
): React.ReactNode {
    if (!ingredients.length) return text;

    // Sort by length (longest first) to avoid partial matches
    const sortedIngredients = [...ingredients].sort((a, b) => b.length - a.length);

    // Create a regex pattern that matches any ingredient (case-insensitive, word boundaries)
    const pattern = sortedIngredients
        .map(ing => ing.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special regex chars
        .join('|');

    const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        // Add highlighted ingredient
        parts.push(
            React.createElement(
                'strong',
                {
                    key: `ingredient-${match.index}`,
                    style: { color: 'var(--joy-palette-primary-500)' }
                },
                match[0]
            )
        );

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
}
