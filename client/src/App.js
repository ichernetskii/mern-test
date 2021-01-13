import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes.js";
import {useAuth} from "./hooks/auth.hook.js";
import {AuthContext} from "./context/auth-context.js";
import {Navbar} from "./components/navbar.js";
import {Loader} from "./components/loader.js";
import "materialize-css";

function App() {
    const { login, logout, token, userId, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <Navbar />}
                <div className="container">
                    <div>{routes}</div>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
