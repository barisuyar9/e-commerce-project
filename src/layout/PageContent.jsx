import { Switch, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import Maintenance from "../pages/Maintenance";

export default function PageContent() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/maintenance">
        <Maintenance />
      </Route>
    </Switch>
  );
}