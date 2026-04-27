import { Grid } from '@mui/joy';
import Category from '../components/Category';
import Layout from '../components/Layout';

function Home() {
    return (
        <Layout title="RRRecipes">
            {/* Categories Grid */}
            <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={4}>
                    <Category icon="🍕" title="Breakfast" link="/recipes/breakfast" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Category icon="🥗" title="Salads" link="/recipes/salads" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Category icon="🍝" title="Pasta" link="/recipes/pasta" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Category icon="🍰" title="Desserts" link="/recipes/desserts" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Category icon="🥘" title="Main Dishes" link="/recipes/main-dishes" />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Category icon="🍲" title="Soups" link="/recipes/soups" />
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Home;
