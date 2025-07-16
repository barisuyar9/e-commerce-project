// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./layout/Header"; // Header bileşenini buradan import ettik
import Slider from "./components/home-components/Hero-Slider";
import CategoryPick from "./components/home-components/CategoryPick";

function App() {
  return (
    <Router>
      {/* Header her sayfada sabit görünecek */}
      <Header />
      <Slider />
      <CategoryPick />
      

      {/* Route içerikleri - HomePage ve diğerleri kaldırıldı, şimdilik sadece Header ve Slider görünür olacak */}
      <Switch>
        
        {/* Buraya ileride farklı sayfalarınız için rotalar ekleyebilirsiniz. */}
      </Switch>
    </Router>
  );
}

export default App;
