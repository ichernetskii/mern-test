import React, {useEffect, useState, useContext} from "react";
import {AuthContext} from "../context/auth-context.js";
import {useHttp} from "../hooks/http.hook.js";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
    const history = useHistory();
    const {token} = useContext(AuthContext);
    const [link, setLink] = useState("");
    const {request} = useHttp();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const pressHandler = async event => {
        if (event.key === "Enter") {
            try {
                const data = await request("/api/link/generate", "POST", { from: link }, {
                    Authorization: `Bearer ${token}`
                });
                history.push(`/detail/${data.link._id}`);
            } catch (e) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
                <div className="input-field">
                    <input
                        placeholder="Input link"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Input link</label>
                </div>
            </div>
        </div>
    )
}
