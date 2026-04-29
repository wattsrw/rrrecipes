import { HashRouter, Route, Routes } from 'react-router-dom';
import Category from './pages/Category';
import Home from './pages/Home';
import Recipe from './pages/Recipe';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Category />} />
        <Route path="/:category/:recipe" element={<Recipe />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
