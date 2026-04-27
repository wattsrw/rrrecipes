import { Grid } from '@mui/joy';
import { useParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import Layout from '../components/Layout';

function Category() {
    const { category } = useParams<{ category: string }>();

    // Format the category name from URL slug
    const title = category
        ? category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Recipes';

    return (
        <Layout title={title}>
            {/* Recipe Grid */}
            <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🍳" title="Scrambled Eggs" link={`/${category}/scrambled-eggs`} />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🥞" title="Pancakes" link={`/${category}/pancakes`} />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🧇" title="Waffles" link={`/${category}/waffles`} />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🥐" title="Croissants" link={`/${category}/croissants`} />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🍞" title="Toast" link={`/${category}/toast`} />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🧀" title="Cheese Omelet" link={`/${category}/cheese-omelet`} />
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Category;
