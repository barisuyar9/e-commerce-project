// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./layout/Header"; // Header bileşenini buradan import ettik
import Slider from "./components/home-components/Hero-Slider";
import CategoryPick from "./components/home-components/CategoryPick";
import FavProducts from "./components/home-components/FavProducts";
import BottomSlider from "./components/home-components/BottomSlider";
import CallToAction from "./components/home-components/CallToAction";
import Footer from "./layout/Footer";
import FeaturedPosts from "./components/home-components/FeaturedPosts";
function App() {
  return (
    <Router>
      {/* Header her sayfada sabit görünecek */}
      <Header />
      <Slider />
      <CategoryPick />
      <FavProducts />
      <BottomSlider />
      <CallToAction />  
      <FeaturedPosts />
      <Footer />

      {/* Route içerikleri - HomePage ve diğerleri kaldırıldı, şimdilik sadece Header ve Slider görünür olacak */}
      <Switch>
        
        {/* Buraya ileride farklı sayfalarınız için rotalar ekleyebilirsiniz. */}
      </Switch>
    </Router>
  );
}

export default App;
