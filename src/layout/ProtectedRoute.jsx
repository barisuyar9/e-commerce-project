
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  component: Component,
  children,
  ...rest
}) {
  const user = useSelector((s) => s.user?.user);
  const token =
    useSelector((s) => s.user?.token) || localStorage.getItem("token");
  const isAuthed = Boolean(user || token);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthed ? (
          Component ? (
            <Component {...routeProps} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location }, 
            }}
          />
        )
      }
    />
  );
}