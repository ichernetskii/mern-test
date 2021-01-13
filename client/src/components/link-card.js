import React from "react";

export const LinkCard = ({link}) => (
    <>
        <h2>Link</h2>
        <p>Reduced: <a href={link.to} target="__blank" rel="noopener noreferrer">{link.to}</a></p>
        <p>Original: <a href={link.from} target="__blank" rel="noopener noreferrer">{link.from}</a></p>
        <p>Count of clicks: <strong>{link.clicks}</strong></p>
        <p>Date created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
)
