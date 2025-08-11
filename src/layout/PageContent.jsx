import { Switch, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";

export default function PageContent() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/shop">
        <ShopPage />
      </Route>
    </Switch>
  );
}