import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router";
import { useAppContext } from "../../middleware/context-provider";
import "./map-viewer.css";

type Props = {
    children?: React.ReactNode;
};


export const MapViewer = ({ children }: Props) => {

    const [state, dispatch] = useAppContext();
    const containerRef = useRef(null);
    const { user } = state;

    const onLogout = () => {
        dispatch({ type: "LOGOUT" });
    };


    useEffect(() => {
        const container = containerRef.current;
        if (container && user) {
            dispatch({ type: "START_MAP", payload: { container } });
        }
    }, []);

    if (!user) {
        return <Navigate to="/login" />;
    }


    return (
        <>
            <div
                className="full-screen" ref={containerRef}
            />

            <Button onClick={onLogout}>Log out</Button>

        </>
    );
};
