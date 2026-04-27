import { Grid } from '@mui/joy';
import CategoryCard from '../components/CategoryCard';
import Layout from '../components/Layout';

function Home() {
    return (
        <Layout title="RRRecipes">
            {/* Categories Grid */}
            <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🍕" title="Breakfast" link="/breakfast" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🥗" title="Salads" link="/salads" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🍝" title="Pasta" link="/pasta" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🍰" title="Desserts" link="/desserts" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🥘" title="Main Dishes" link="/main-dishes" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CategoryCard icon="🍲" title="Soups" link="/soups" />
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Home;
