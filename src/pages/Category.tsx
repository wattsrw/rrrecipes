import { Grid } from '@mui/joy';
import { useParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import Layout from '../components/Layout';
import { formatTitleFromSlug } from '../utils/Util';
import { RECIPE_MAPPING } from '../utils/RecipeMapping';

function Category() {
    const { category } = useParams<{ category: string }>();
    const title = formatTitleFromSlug(category);

    // Get recipes for this category from RECIPE_MAPPING
    const recipes = RECIPE_MAPPING[category as keyof typeof RECIPE_MAPPING] || [];

    return (
        <Layout title={title}>
            {/* Recipe Grid */}
            <Grid container spacing={2}>
                {recipes.map((recipe) => (
                    <Grid xs={12} sm={6} md={4} key={recipe}>
                        <CategoryCard
                            title={formatTitleFromSlug(recipe)}
                            link={`/${category}/${recipe}`}
                        />
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
}

export default Category;
