import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import { useAppContext } from "../../middleware/context-provider";
import "./map-viewer.css";
import "./scanner.css";

type Props = {
    children?: React.ReactNode;
};


export const MapViewer = ({ children }: Props) => {

    const [state, dispatch] = useAppContext();
    const containerRef = useRef(null);
    const { user } = state;

    const [isScanning, setIsScanning] = useState(false);

    const onScanClose = () => {

        console.log("CIERRA SCAN");
        setIsScanning(false);
    }


    const onLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    const onScan = () => {

        setIsScanning(true);

        console.log("Pulsamos botón Scan");
        dispatch({ type: "SCAN" });

    }

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

            {isScanning && (

                <>

                    <div className="overlay">
                        <div className="scanner">
                            <p className="scanner-exit" onClick={onScanClose}>X</p>
                            <div className="scanner-container">
                                <img src="spinner.gif" alt="spinning log" className="scanner-image" />
                                <p className="scanner-text">
                                    Escaneando...
                                </p>
                            </div>
                        </div>

                    </div>
                </>

            )}

            <Button variant="contained" onClick={onLogout}>Log out</Button>
            <Button variant="contained" onClick={onScan}>Scan</Button>

        </>
    );
};


/*
<div className="overlay">
                    <div className="scanner">
                        <p className="scanner-exit" onClick={onScanClose}>X</p>
                        <div className="scanner-container">
                            <img src="spinner.gif" alt="spinning log" className="scanner-image" />
                            <p className="scanner-text">
                                Scanning...
                            </p>
                        </div>
                    </div>
                </div>
*/