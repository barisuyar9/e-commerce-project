import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";

function App() {
  return (
    <Router>
      <Header />
      <PageContent />
      <Footer />
    </Router>
  );
}
export default App;