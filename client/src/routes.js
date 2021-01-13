import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "./pages/links.js";
import {CreatePage} from "./pages/create.js";
import {DetailPage} from "./pages/detail.js";
import {AuthPage} from "./pages/auth.js";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
}
