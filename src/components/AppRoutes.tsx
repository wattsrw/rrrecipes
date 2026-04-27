import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import Recipe from '../pages/Recipe';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category" element={<Category />} />
            <Route path="/:category/:recipe" element={<Recipe />} />
        </Routes>
    );
}

export default AppRoutes;
