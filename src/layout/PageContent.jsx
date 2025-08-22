import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Maintenance from "../pages/Maintenance";
import ShopPage from "../pages/ShopPage";
import ProductDetail from "../pages/ProductDetail";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";
import PricingPage from "../pages/PricingPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CartPage from "../pages/CartPage";
import CheckoutAddressPage from "../pages/CheckoutAddressPage";
import ProtectedRoute from "./ProtectedRoute";
import AddAddressPage from "../pages/AddAddressPage";
import CheckoutPaymentPage from "../pages/CheckoutPaymentPage";
import OrdersPage from "../pages/OrdersPage";
import ProfilePage from "../pages/ProfilePage";

export default function PageContent() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
        <ProductDetail />
      </Route>
      <Route path="/shop">
        <ShopPage />
      </Route>
      <Route path="/cart">
        <CartPage />
      </Route>
      <ProtectedRoute path="/orders">
        <OrdersPage />
      </ProtectedRoute>
      <ProtectedRoute path="/checkout/address/new">
        <AddAddressPage />
      </ProtectedRoute>
      <ProtectedRoute path="/checkout/payment">
        <CheckoutPaymentPage />
      </ProtectedRoute>
      <ProtectedRoute path="/checkout">
        <CheckoutAddressPage />
      </ProtectedRoute>
      <ProtectedRoute path="/profile">
        <ProfilePage />
      </ProtectedRoute>
      <Route path="/contact">
        <ContactPage />
      </Route>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Route path="/pricing">
        <PricingPage />
      </Route>
      <Route path="/maintenance">
        <Maintenance />
      </Route>
    </Switch>
  );
}