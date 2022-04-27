import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute, { AuthRoute } from "../protectedRoute/ProtectedRoute";
import Spinner from "../../components/shared/spinner/Spinner";
const Login = lazy(() => import("../../containers/auth/login/Login"));
const Addresses = lazy(() => import("../../containers/addresses/Addresses"));
const Profile = lazy(() => import("../../containers/profile/Profile"));

const NotFoundPage = lazy(() =>
  import("../../containers/notFoundPage/NotFoundPage")
);

const AppRoutes = ({ user }) => {
  return (
    <Suspense fallback={<Spinner isCenter={true} />}>
      <Switch>
        <AuthRoute path="/login" exact component={Login} user={user} />

        <ProtectedRoute path="/profile" component={Profile} user={user} />
        <ProtectedRoute
          path="/addresses"
          exact
          component={Addresses}
          user={user}
        />
        <Route path="/not-found" component={NotFoundPage} />
        <Redirect from="/" to="/login" exact />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
