import Header from "./Components/Header";
import Footer from "./Components/Footer";
import './bootstrap.min.css';
import {Container} from 'react-bootstrap';
import HomeScreen from "./Screens/HomeScreen";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import UserRegisterScreen from "./Screens/userRegisterScreen";
import UserProfileScreen from "./Screens/userProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import CreateProductScreen from "./Screens/CreateProductScreen";
import AllOrdersScreen from "./Screens/AllOrdersScreen";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import './index.css';

function App() {
  return (
    <Router>
      
      <Header />
      
      <main className="py-3">
        <Container>
          <Routes>
            <Route element = {<ProtectedRoutes />}>
              <Route path = '/admin/product/create' element = { <CreateProductScreen />} />
              <Route path = "/cart" element = {<CartScreen />} />
              <Route path = "/admin/product/:id/edit" element = {<ProductEditScreen /> } />
              <Route path = "/admin/products" element = {<ProductListScreen /> } />
              <Route path = "/admin/orders" element = {<AllOrdersScreen /> } />
              <Route path = "/admin/page/:page" element = {<ProductListScreen /> } />
              <Route path = "/admin/users" element = {<UserListScreen /> } />
              <Route path = "/admin/user/:id/edit" element = {<UserEditScreen /> } />  
              <Route path = "/order/:id" element = {<OrderScreen /> } />
              <Route path = "/placeorder" element = {<PlaceOrderScreen /> } /> 
              <Route path = "/payment" element = {<PaymentScreen /> } /> 
              <Route path = "/shipping" element = {<ShippingScreen /> } />
              <Route path = "/profile" element = {<UserProfileScreen />} /> 
              <Route path = "/cart/:id" element = {<CartScreen />} />
            </Route>
            
            <Route path = "/products/:id" element = {<ProductScreen />} />
            <Route path = "/login" element = {<LoginScreen /> } />
            <Route path = "/register" element = {<UserRegisterScreen /> } /> 
            <Route path = "search/:keyword" exact element = {<HomeScreen />} />
            <Route path = "search/:keyword/page/:page" element = {<HomeScreen />} />
            <Route path = "/page/:page" element = {<HomeScreen />} />
            <Route path = "/" element = {<HomeScreen /> } />
          </Routes>
        </Container>
      </main>
        <Footer />
    </Router>
  );
}

export default App;
