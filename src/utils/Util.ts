export function formatTitleFromSlug(slug?: string): string {
    if (!slug) return 'Recipe';

    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
