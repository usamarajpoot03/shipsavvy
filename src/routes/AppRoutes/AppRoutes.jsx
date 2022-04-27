import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute, { AuthRoute } from "../ProtectedRoute/ProtectedRoute";
import Spinner from "../../components/shared/Spinner/Spinner";
import SignIn from "../../containers/auth/Login/Login";
const Login = lazy(() => import("../../containers/auth/Login/Login"));
const Homepage = lazy(() => import("../../containers/Homepage/Homepage"));
const Addresses = lazy(() => import("../../containers/addresses/Addresses"));
const Profile = lazy(() => import("../../containers/Profile/Profile"));

const NotFoundPage = lazy(() =>
  import("../../containers/NotFoundPage/NotFoundPage")
);
const PrivacyPolicy = lazy(() =>
  import("../../components/static/PrivacyPolicy/PrivacyPolicy")
);
const TermsOfService = lazy(() =>
  import("../../components/static/TermsOfService/TermsOfService")
);

const AppRoutes = ({ user }) => {
  return (
    <Suspense fallback={<Spinner isCenter={true} />}>
      <Switch>
        <AuthRoute path="/login" exact component={Login} user={user} />

        <ProtectedRoute path="/profile" component={Profile} user={user} />
        <ProtectedRoute path="/home" component={Homepage} user={user} />
        <ProtectedRoute
          path="/addresses"
          exact
          component={Addresses}
          user={user}
        />

        <Route path="/privacy-policy" exact component={PrivacyPolicy} />
        <Route path="/terms-of-service" exact component={TermsOfService} />
        <Route path="/not-found" component={NotFoundPage} />
        <Redirect from="/" to="/login" exact />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
