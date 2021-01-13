import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook.js";
import {useMessage} from "../hooks/message.hook.js";
import {AuthContext} from "../context/auth-context.js";

export const AuthPage = () => {
    const auth = useContext(AuthContext)

    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });

    const message = useMessage();
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form});
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form});
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    const passwordKeyDownHandler = event => {
        if (event.key === "Enter") loginHandler();
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Links reducer</h1>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Input email"
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="auth-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email" className="auth-label">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Input password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="auth-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                    onKeyDown={passwordKeyDownHandler}
                                />
                                <label htmlFor="password" className="auth-label">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4 auth-btnEnter"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Login
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
