import { Grid } from '@mui/joy';
import CategoryCard from '../components/CategoryCard';
import Layout from '../components/Layout';
import { RECIPE_MAPPING } from '../utils/RecipeMapping';
import { formatTitleFromSlug } from '../utils/Util';

function Home() {
    // Get all category keys from RECIPE_MAPPING
    const categories = Object.keys(RECIPE_MAPPING) as Array<keyof typeof RECIPE_MAPPING>;

    // Category name to icon mapping
    const categoryIconMap: Record<string, string> = {
        'grill': '🔥',
        'meat': '🥩',
    };

    return (
        <Layout title="RRRecipes">
            {/* Categories Grid */}
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid xs={12} sm={6} md={4} key={category}>
                        <CategoryCard
                            icon={categoryIconMap[category]}
                            title={formatTitleFromSlug(category)}
                            link={`/${category}`}
                        />
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
}

export default Home;
