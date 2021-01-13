import React from "react";

export const Loader = () => {
    const styleLoader = {
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem"
    };

    return (
        <div style={styleLoader}>
            <div className="preloader-wrapper active">
                <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle" />
                    </div>
                    <div className="gap-patch">
                        <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle" />
                    </div>
                </div>
            </div>
        </div>
    )
}
