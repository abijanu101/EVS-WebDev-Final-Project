import './App.css';
import { Routes, Route} from "react-router-dom";
import PageLayout from './components/shared/pageLayout';
import AdminLayout from './components/admin/adminLayout';
import CategoriesPage from './components/admin/createCategories';
import Category from './components/user/category';
import Categories from './components/user/categories';
import Product from './components/user/product';
import LoginPage from './components/shared/loginPage';
import SignUpPage from './components/shared/signupPage';
import HomePage from './components/shared/homePage';

function App() {
  return (
    // PUT ROUTING HERE LATER
    <>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />

          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<Category />} />
          <Route path="products/:id" element={<Product />} />
          
          <Route path="admin" element={<AdminLayout />}>
            <Route path="categories" element={<CategoriesPage />} />
          </Route>

        </Route>
      </Routes>
    </>
  );
}

export default App;
