import Header from "./Components/Header";
import Footer from "./Components/Footer";
import './bootstrap.min.css';
import {Container} from 'react-bootstrap';
import HomeScreen from "./Screens/HomeScreen";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import './index.css';

function App() {
  return (
    <Router>
      
      <Header />
      
      <main className="py-3">
        <Container>
          <Routes>
            <Route path = "/" element = {<HomeScreen /> } />
            <Route path = "/products/:id" element = {<ProductScreen />} />
            <Route path = "/cart/:id" element = {<CartScreen />} />
            <Route path = "/cart" element = {<CartScreen />} />
          </Routes>
        </Container>
      </main>
        <Footer />
    </Router>
  );
}

export default App;
